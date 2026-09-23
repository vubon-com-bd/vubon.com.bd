import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';

const VALID = new Set<string>(['available', 'in_use', 'maintenance', 'out_of_service']);

export class VehicleStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): VehicleStatusVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid vehicle status: ${raw}`);
    }
    return new VehicleStatusVO(raw);
  }
}
