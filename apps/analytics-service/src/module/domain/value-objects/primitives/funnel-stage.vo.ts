/**
 * Funnel Stage Value Object
 * @module analytics-service/domain/value-objects/primitives
 *
 * Funnel-এর high-level stage (awareness, interest, consideration, intent, evaluation, purchase, retention, advocacy)।
 * Business Rule:
 * - Funnel stage = marketing/psychology framework stages
 * - Ordered for AARRR + traditional funnel
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';

export const FUNNEL_STAGE = {
  AWARENESS: 'awareness',
  INTEREST: 'interest',
  CONSIDERATION: 'consideration',
  INTENT: 'intent',
  EVALUATION: 'evaluation',
  PURCHASE: 'purchase',
  RETENTION: 'retention',
  ADVOCACY: 'advocacy',
} as const;

export type FunnelStageValue = (typeof FUNNEL_STAGE)[keyof typeof FUNNEL_STAGE];

const VALID_STAGES: readonly string[] = Object.values(FUNNEL_STAGE);

const STAGE_ORDER: Record<string, number> = {
  [FUNNEL_STAGE.AWARENESS]: 1,
  [FUNNEL_STAGE.INTEREST]: 2,
  [FUNNEL_STAGE.CONSIDERATION]: 3,
  [FUNNEL_STAGE.INTENT]: 4,
  [FUNNEL_STAGE.EVALUATION]: 5,
  [FUNNEL_STAGE.PURCHASE]: 6,
  [FUNNEL_STAGE.RETENTION]: 7,
  [FUNNEL_STAGE.ADVOCACY]: 8,
};

export class FunnelStageVO extends BaseTypeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): FunnelStageVO {
    if (typeof raw !== 'string') {
      throw new Error('FunnelStage must be a string');
    }

    const normalized = raw.trim().toLowerCase();

    if (!VALID_STAGES.includes(normalized)) {
      throw new Error(
        `Invalid FunnelStage: "${normalized}". Valid: ${VALID_STAGES.join(', ')}`
      );
    }

    return new FunnelStageVO(normalized);
  }

  isAwareness(): boolean {
    return this.value === FUNNEL_STAGE.AWARENESS;
  }

  isInterest(): boolean {
    return this.value === FUNNEL_STAGE.INTEREST;
  }

  isConsideration(): boolean {
    return this.value === FUNNEL_STAGE.CONSIDERATION;
  }

  isIntent(): boolean {
    return this.value === FUNNEL_STAGE.INTENT;
  }

  isEvaluation(): boolean {
    return this.value === FUNNEL_STAGE.EVALUATION;
  }

  isPurchase(): boolean {
    return this.value === FUNNEL_STAGE.PURCHASE;
  }

  isRetention(): boolean {
    return this.value === FUNNEL_STAGE.RETENTION;
  }

  isAdvocacy(): boolean {
    return this.value === FUNNEL_STAGE.ADVOCACY;
  }

  /** Numeric order */
  order(): number {
    return STAGE_ORDER[this.value] ?? 0;
  }

  /** Pre-purchase stage কিনা */
  isPrePurchase(): boolean {
    return this.order() < STAGE_ORDER[FUNNEL_STAGE.PURCHASE];
  }

  /** Post-purchase stage কিনা */
  isPostPurchase(): boolean {
    return this.order() > STAGE_ORDER[FUNNEL_STAGE.PURCHASE];
  }

  /** Purchase stage — conversion point */
  isConversionPoint(): boolean {
    return this.isPurchase();
  }

  /** এই stage অন্য stage-এর আগে কিনা */
  isBefore(other: FunnelStageVO): boolean {
    return this.order() < other.order();
  }

  /** এই stage অন্য stage-এর পরে কিনা */
  isAfter(other: FunnelStageVO): boolean {
    return this.order() > other.order();
  }
}
