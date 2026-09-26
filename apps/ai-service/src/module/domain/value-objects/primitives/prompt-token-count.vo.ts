import { BaseQuantityVO } from '@vubon/shared-kernel/domain/primitives/quantity.vo';

const MAX_TOKENS = 128000;

export class PromptTokenCountVO extends BaseQuantityVO {
  static create(raw: number): PromptTokenCountVO {
    BaseQuantityVO.validateNonNegative(raw, 'PromptTokenCount');
    if (!Number.isInteger(raw)) {
      throw new Error('PromptTokenCount must be an integer');
    }
    if (raw > MAX_TOKENS) {
      throw new Error(`PromptTokenCount exceeds max (${MAX_TOKENS})`);
    }
    return new PromptTokenCountVO(raw);
  }

  private constructor(value: number) {
    super(value);
  }

  exceeds(other: PromptTokenCountVO): boolean {
    return this.value > other.value;
  }
}
