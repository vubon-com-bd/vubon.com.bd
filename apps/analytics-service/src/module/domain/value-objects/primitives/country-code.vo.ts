import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class CountryCodeVO extends BaseCodeVO {
  private static readonly PATTERN = /^[A-Z]{2}$/;

  static create(raw: string): CountryCodeVO {
    const normalized = raw.trim().toUpperCase();
    if (!CountryCodeVO.PATTERN.test(normalized)) {
      throw new Error(`Invalid ISO country code (2 letters): ${raw}`);
    }
    return new CountryCodeVO(normalized);
  }

  private constructor(value: string) {
    super(value);
  }

  get isBangladesh(): boolean {
    return this.value === 'BD';
  }

  get isSouthAsia(): boolean {
    return ['BD', 'IN', 'PK', 'NP', 'LK', 'BT', 'MV', 'AF'].includes(this.value);
  }

  get isUnknown(): boolean {
    return this.value === 'XX';
  }
}
