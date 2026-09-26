import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { DIVISION } from '@vubon/shared-constants/common';
import { InvalidDivisionError } from '../../errors/address.errors';

const VALID = new Set<string>(Object.values(DIVISION as Record<string, string>));

export class DivisionVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): DivisionVO {
    if (VALID.size > 0 && !VALID.has(raw)) {
      throw new InvalidDivisionError(raw);
    }
    return new DivisionVO(raw);
  }
}
