import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { COURIER_TYPE } from '@vubon/shared-constants/logistics';

const VALID = new Set<string>(Object.values(COURIER_TYPE));

export class CourierTypeVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): CourierTypeVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid courier type: ${raw}`);
    }
    return new CourierTypeVO(raw);
  }
}
