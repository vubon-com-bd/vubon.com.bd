import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';

const VALID = new Set<string>(['cardboard', 'plastic', 'wood', 'metal', 'bubble_wrap', 'foam']);

export class PackagingMaterialVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): PackagingMaterialVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid packaging material: ${raw}`);
    }
    return new PackagingMaterialVO(raw);
  }
}
