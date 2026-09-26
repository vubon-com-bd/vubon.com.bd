import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';

const VALID = new Set<string>(['standard', 'express', 'same_day', 'economy', 'priority']);

export class ShippingMethodTypeVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ShippingMethodTypeVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid shipping method type: ${raw}`);
    }
    return new ShippingMethodTypeVO(raw);
  }
}
