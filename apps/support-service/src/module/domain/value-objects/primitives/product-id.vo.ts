import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class ProductIdVO extends BaseIdVO {
  static create(value: string): ProductIdVO {
    return new ProductIdVO(value);
  }
  private constructor(value: string) {
    super(value);
  }
}
