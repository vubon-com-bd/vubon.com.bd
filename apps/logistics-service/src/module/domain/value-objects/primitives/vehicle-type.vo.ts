import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';

const VALID = new Set<string>([
  'truck',
  'van',
  'bike',
  'car',
  'pickup',
  'trailer',
]);

export class VehicleTypeVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): VehicleTypeVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid vehicle type: ${raw}`);
    }
    return new VehicleTypeVO(raw);
  }
}
