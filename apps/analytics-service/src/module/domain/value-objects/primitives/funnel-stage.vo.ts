import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';

const VALID_STAGES = new Set<string>([
  'awareness', 'interest', 'consideration', 'intent', 'evaluation',
  'purchase', 'retention', 'loyalty', 'advocacy',
]);

export class FunnelStageVO extends BaseTypeVO<string> {
  static create(raw: string): FunnelStageVO {
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STAGES.has(normalized)) {
      throw new Error(`Invalid funnel stage: ${raw}`);
    }
    return new FunnelStageVO(normalized);
  }

  private constructor(value: string) {
    super(value);
  }

  get order(): number {
    const order: Record<string, number> = {
      awareness: 1, interest: 2, consideration: 3, intent: 4,
      evaluation: 5, purchase: 6, retention: 7, loyalty: 8, advocacy: 9,
    };
    return order[this.value] ?? 0;
  }

  comesBefore(other: FunnelStageVO): boolean {
    return this.order < other.order;
  }

  comesAfter(other: FunnelStageVO): boolean {
    return this.order > other.order;
  }
}
