import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class FunnelStepVO extends BaseCodeVO {
  private static readonly MAX_LENGTH = 100;

  static create(raw: string): FunnelStepVO {
    const trimmed = raw.trim();
    if (trimmed.length === 0) {
      throw new Error('FunnelStep cannot be empty');
    }
    if (trimmed.length > FunnelStepVO.MAX_LENGTH) {
      throw new Error(`FunnelStep too long: ${trimmed.length}`);
    }
    return new FunnelStepVO(trimmed);
  }

  private constructor(value: string) {
    super(value);
  }

  get normalized(): string {
    return this.value.toLowerCase();
  }

  equals(other: FunnelStepVO): boolean {
    return this.normalized === other.normalized;
  }
}
