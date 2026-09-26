import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';

const VALID = new Set<string>(['petrol', 'diesel', 'cng', 'electric', 'hybrid']);

export class VehicleFuelTypeVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): VehicleFuelTypeVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid fuel type: ${raw}`);
    }
    return new VehicleFuelTypeVO(raw);
  }
}
