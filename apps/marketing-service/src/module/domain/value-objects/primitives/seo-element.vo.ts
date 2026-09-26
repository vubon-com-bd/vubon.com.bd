import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class SeoElementVO extends BaseCodeVO {
  static create(raw: string): SeoElementVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('SeoElement cannot be empty');
    }
    return new SeoElementVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
