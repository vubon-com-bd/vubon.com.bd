import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class UtmMediumVO extends BaseCodeVO {
  private static readonly MAX_LENGTH = 200;

  static create(raw: string): UtmMediumVO {
    const normalized = raw.trim().toLowerCase();
    if (normalized.length === 0) {
      throw new Error('UtmMedium cannot be empty');
    }
    if (normalized.length > UtmMediumVO.MAX_LENGTH) {
      throw new Error(`UtmMedium too long: ${normalized.length}`);
    }
    return new UtmMediumVO(normalized);
  }

  private constructor(value: string) {
    super(value);
  }

  get isPaidMedium(): boolean {
    return ['cpc', 'cpm', 'cpv', 'paid', 'ppc'].includes(this.value);
  }

  get isOrganicMedium(): boolean {
    return ['organic', 'seo'].includes(this.value);
  }

  get isEmailMedium(): boolean {
    return this.value === 'email' || this.value === 'newsletter';
  }
}
