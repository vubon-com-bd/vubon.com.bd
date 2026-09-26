import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class DimensionValueVO extends BaseCodeVO {
  private static readonly MAX_LENGTH = 500;

  static create(raw: string): DimensionValueVO {
    const trimmed = raw.trim();
    if (trimmed.length === 0) {
      throw new Error('DimensionValue cannot be empty');
    }
    if (trimmed.length > DimensionValueVO.MAX_LENGTH) {
      throw new Error(`DimensionValue too long: ${trimmed.length}`);
    }
    return new DimensionValueVO(trimmed);
  }

  static fromNumber(value: number): DimensionValueVO {
    return new DimensionValueVO(String(value));
  }

  static fromBoolean(value: boolean): DimensionValueVO {
    return new DimensionValueVO(String(value));
  }

  private constructor(value: string) {
    super(value);
  }

  get asNumber(): number | null {
    const n = Number(this.value);
    return Number.isFinite(n) ? n : null;
  }

  get asBoolean(): boolean | null {
    if (this.value === 'true') return true;
    if (this.value === 'false') return false;
    return null;
  }
}
