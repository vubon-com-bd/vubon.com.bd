import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';

const VALID = new Set<string>(['box', 'envelope', 'bag', 'tube', 'pallet', 'crate']);

export class PackagingTypeVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): PackagingTypeVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid packaging type: ${raw}`);
    }
    return new PackagingTypeVO(raw);
  }
}
