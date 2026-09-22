import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';
import { InvalidSuspensionIdError } from '../../errors/suspension.errors';

export class SuspensionIdVO extends BaseIdVO {
  static create(value: string): SuspensionIdVO {
    if (!value || value.trim().length === 0) {
      throw new InvalidSuspensionIdError(value);
    }
    return new SuspensionIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
