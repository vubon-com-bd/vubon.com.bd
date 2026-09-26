import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { DISTRICT } from '@vubon/shared-constants/common';
import { InvalidDistrictError } from '../../errors/address.errors';

const VALID = new Set<string>(Object.values(DISTRICT as Record<string, string>));

export class DistrictVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): DistrictVO {
    if (VALID.size > 0 && !VALID.has(raw)) {
      throw new InvalidDistrictError(raw);
    }
    return new DistrictVO(raw);
  }
}
