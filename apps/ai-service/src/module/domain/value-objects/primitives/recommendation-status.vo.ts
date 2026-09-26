import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';

const VALID = new Set<string>([
  'pending',
  'generated',
  'served',
  'clicked',
  'converted',
  'expired',
]);

export class RecommendationStatusVO extends BaseStatusVO<string> {
  static create(raw: string): RecommendationStatusVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid recommendation status: ${raw}`);
    }
    return new RecommendationStatusVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }

  isConverted(): boolean { return this.value === 'converted'; }
  isExpired(): boolean { return this.value === 'expired'; }
}
