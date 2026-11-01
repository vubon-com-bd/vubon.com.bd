/**
 * DigestBuilderService
 * @module notification-service/domain/services
 *
 * Groups notifications into digest items by category/priority।
 * Sorts + limits per config।
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { NOTIFICATION_DIGEST } from '@vubon/shared-constants/platform';

import { DigestItemVO } from '@domain/composites/digest-item.vo.js';
import { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';
import { NotificationCategoryVO } from '@domain/primitives/notification-category.vo.js';
import { NotificationPriorityVO } from '@domain/primitives/notification-priority.vo.js';

export interface DigestSourceItem {
  readonly notificationId: string;
  readonly category: string;
  readonly priority: string;
  readonly title: string;
  readonly body: string;
  readonly actionUrl?: string;
  readonly occurredAt: string;
}

export interface BuildDigestInput {
  readonly items: readonly DigestSourceItem[];
  readonly groupByCategory?: boolean;
  readonly maxItems?: number;
  readonly unreadOnly?: boolean;
  readonly isReadMap?: Readonly<Record<string, boolean>>;
}

export interface BuildDigestResult {
  readonly items: readonly DigestItemVO[];
  readonly totalInput: number;
  readonly totalOutput: number;
  readonly groups: Readonly<Record<string, readonly DigestItemVO[]>>;
}

const PRIORITY_WEIGHT: Readonly<Record<string, number>> = {
  critical: 5,
  high: 4,
  normal: 3,
  low: 2,
  silent: 1,
};

export class DigestBuilderService {
  static build(input: BuildDigestInput): BuildDigestResult {
    const max = input.maxItems ?? NOTIFICATION_DIGEST.MAX_ITEMS_PER_DIGEST;
    const groupBy = input.groupByCategory ?? NOTIFICATION_DIGEST.GROUP_BY_CATEGORY;

    if (!Array.isArray(input.items)) {
      throw new BusinessRuleError('items must be an array', 'INVALID_INPUT');
    }

    // Filter unread
    let pool = [...input.items];
    if (input.unreadOnly && input.isReadMap) {
      pool = pool.filter((x) => !input.isReadMap![x.notificationId]);
    }

    // Sort by priority (descending) then recency (descending)
    pool.sort((a, b) => {
      const pa = PRIORITY_WEIGHT[a.priority] ?? 3;
      const pb = PRIORITY_WEIGHT[b.priority] ?? 3;
      if (pa !== pb) return pb - pa;
      return new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime();
    });

    // Take top N
    const top = pool.slice(0, max);

    // Build DigestItems
    const digestItems = top.map((x) =>
      DigestItemVO.create({
        notificationId: NotificationIdVO.create(x.notificationId),
        category: NotificationCategoryVO.create(x.category),
        priority: NotificationPriorityVO.create(x.priority),
        title: x.title,
        summary: this.summarize(x.body),
        actionUrl: x.actionUrl,
        occurredAt: x.occurredAt,
      }),
    );

    // Group if requested
    const groups: Record<string, DigestItemVO[]> = {};
    if (groupBy) {
      for (const item of digestItems) {
        const key = item.category.value;
        (groups[key] ??= []).push(item);
      }
    }

    return {
      items: digestItems,
      totalInput: input.items.length,
      totalOutput: digestItems.length,
      groups,
    };
  }

  private static summarize(body: string, maxLen = 120): string {
    const single = body.replace(/\s+/g, ' ').trim();
    if (single.length <= maxLen) return single;
    return single.slice(0, maxLen - 1) + '…';
  }
}
