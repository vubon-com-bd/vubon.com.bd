import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';
import { InvalidStatusError } from '../../errors/user.errors';

const VALID = new Set<string>([
  'trusted',
  'untrusted',
  'blocked',
  'pending',
]);

export class DeviceStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): DeviceStatusVO {
    if (!VALID.has(raw)) {
      throw new InvalidStatusError(raw);
    }
    return new DeviceStatusVO(raw);
  }
}
