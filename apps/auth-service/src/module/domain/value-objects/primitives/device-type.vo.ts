import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { AUTH_DEVICE_TYPE } from '@vubon/shared-constants/auth';
import { InvalidTypeError } from '../../errors/user.errors';

const VALID = new Set<string>(Object.values(AUTH_DEVICE_TYPE));

export class DeviceTypeVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): DeviceTypeVO {
    if (!VALID.has(raw)) {
      throw new InvalidTypeError(raw);
    }
    return new DeviceTypeVO(raw);
  }
}
