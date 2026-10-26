/**
 * PriorityCalculatorService
 * @module notification-service/domain/services
 *
 * Computes priority score using:
 *  - base priority weight
 *  - category urgency factor
 *  - channel factor
 *  - recency decay
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import type { NotificationCategoryVO } from '@domain/primitives/notification-category.vo.js';
import type { NotificationChannelVO } from '@domain/primitives/notification-channel.vo.js';
import { NotificationPriorityVO } from '@domain/primitives/notification-priority.vo.js';
import { NOTIFICATION_PRIORITY } from '@vubon/shared-constants/platform';

export interface PriorityScoreInput {
  readonly priority: NotificationPriorityVO;
  readonly category: NotificationCategoryVO;
  readonly channel: NotificationChannelVO;
  readonly createdAt?: string;
}

export interface PriorityScoreResult {
  readonly score: number; // 0.0 - 100.0
  readonly weight: number;
  readonly reasons: readonly string[];
}

const CATEGORY_URGENCY: Readonly<Record<string, number>> = {
  security: 1.5,
  payment: 1.3,
  order: 1.2,
  shipping: 1.1,
  auth: 1.5,
  system: 1.0,
  user: 0.9,
  reminder: 0.8,
  promotion: 0.5,
  marketing: 0.5,
  support: 0.9,
  product: 0.6,
};

const CHANNEL_FACTOR: Readonly<Record<string, number>> = {
  push: 1.0,
  sms: 1.2,
  email: 0.8,
  in_app: 0.9,
  webhook: 0.7,
  whatsapp: 1.1,
  telegram: 1.0,
  slack: 0.9,
  voice: 1.3,
  messenger: 1.0,
};

export class PriorityCalculatorService {
  static calculate(input: PriorityScoreInput): PriorityScoreResult {
    if (!Number.isFinite(input.priority.weight)) {
      throw new BusinessRuleError(
        'Invalid priority weight',
        'INVALID_PRIORITY_WEIGHT',
        { priority: input.priority.value },
      );
    }

    const base = input.priority.weight * 20; // 0-100 scale
    const catFactor = CATEGORY_URGENCY[input.category.value] ?? 1.0;
    const chFactor = CHANNEL_FACTOR[input.channel.value] ?? 1.0;

    // Recency decay (older → less urgent)
    let recencyFactor = 1.0;
    if (input.createdAt) {
      const ageHours =
        (Date.now() - new Date(input.createdAt).getTime()) / (1000 * 60 * 60);
      if (ageHours > 0) {
        recencyFactor = Math.max(0.5, 1.0 - ageHours / 168); // decay over 7 days
      }
    }

    const score = Math.min(100, base * catFactor * chFactor * recencyFactor);

    const reasons: string[] = [];
    if (input.priority.isUrgent()) reasons.push('urgent-priority');
    if (catFactor > 1) reasons.push(`category-${input.category.value}-urgent`);
    if (chFactor > 1) reasons.push(`channel-${input.channel.value}-high`);
    if (recencyFactor < 0.9) reasons.push('age-decayed');

    return {
      score: Math.round(score * 10) / 10,
      weight: input.priority.weight,
      reasons,
    };
  }

  /** Suggest priority from computed score */
  static suggestPriority(score: number): NotificationPriorityVO {
    if (score >= 80) return NotificationPriorityVO.create(NOTIFICATION_PRIORITY.CRITICAL);
    if (score >= 60) return NotificationPriorityVO.create(NOTIFICATION_PRIORITY.HIGH);
    if (score >= 40) return NotificationPriorityVO.create(NOTIFICATION_PRIORITY.NORMAL);
    if (score >= 20) return NotificationPriorityVO.create(NOTIFICATION_PRIORITY.LOW);
    return NotificationPriorityVO.create(NOTIFICATION_PRIORITY.SILENT);
  }
}
