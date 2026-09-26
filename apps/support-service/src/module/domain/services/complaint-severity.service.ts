/**
 * ComplaintSeverityService — Suggest severity from complaint data
 * @module support-service/domain/services
 */
import { ComplaintEntity } from '../entities/complaint.entity';
import { ComplaintSeverityVO } from '../value-objects/primitives/complaint-severity.vo';
import { COMPLAINT_SEVERITY } from '@vubon/shared-constants/support';

export interface SeveritySuggestion {
  readonly severity: ComplaintSeverityVO;
  readonly reason: string;
  readonly requiresEscalation: boolean;
}

const CRITICAL_KEYWORDS = [
  'fraud', 'scam', 'hacked', 'stolen', 'harassment', 'threat',
  'violence', 'illegal', 'safety', 'emergency',
];

const HIGH_KEYWORDS = [
  'damaged', 'broken', 'wrong', 'missing', 'never arrived',
  'refund', 'chargeback', 'overcharged', 'duplicate',
];

export class ComplaintSeverityService {
  suggest(complaint: ComplaintEntity): SeveritySuggestion {
    const text = `${complaint.description}`.toLowerCase();

    if (this.hasAny(text, CRITICAL_KEYWORDS) || complaint.type.isSevere()) {
      return {
        severity: ComplaintSeverityVO.create(COMPLAINT_SEVERITY.CRITICAL),
        reason: 'critical_keyword_or_severe_type',
        requiresEscalation: true,
      };
    }
    if (this.hasAny(text, HIGH_KEYWORDS) || complaint.isCritical) {
      return {
        severity: ComplaintSeverityVO.create(COMPLAINT_SEVERITY.HIGH),
        reason: 'high_keyword',
        requiresEscalation: false,
      };
    }
    return {
      severity: ComplaintSeverityVO.create(COMPLAINT_SEVERITY.MEDIUM),
      reason: 'default',
      requiresEscalation: false,
    };
  }

  shouldEscalate(complaint: ComplaintEntity): boolean {
    return complaint.isCritical || complaint.type.isSevere();
  }

  requiresImmediateAction(complaint: ComplaintEntity): boolean {
    return complaint.needsImmediateAttention;
  }

  private hasAny(haystack: string, needles: readonly string[]): boolean {
    return needles.some((n) => haystack.includes(n));
  }
}
