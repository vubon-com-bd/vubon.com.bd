import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { COURIER_STATUS } from '@vubon/shared-constants/logistics';

const VALID = new Set<string>(Object.values(COURIER_STATUS));

export class CourierStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): CourierStatusVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid courier status: ${raw}`);
    }
    return new CourierStatusVO(raw);
  }
}
