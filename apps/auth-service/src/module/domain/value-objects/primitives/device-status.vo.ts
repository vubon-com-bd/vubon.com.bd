/**
 * DeviceStatusVO — Trust status of a device
 * @module auth-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';

export type DeviceStatusValue =
  | 'pending'
  | 'trusted'
  | 'untrusted'
  | 'blocked'
  | 'revoked';

const ALLOWED: ReadonlySet<string> = new Set<string>([
  'pending', 'trusted', 'untrusted', 'blocked', 'revoked',
]);

export class DeviceStatusVO extends BaseStatusVO<DeviceStatusValue> {
  private constructor(value: DeviceStatusValue) {
    super(value);
  }

  static of(raw: string): DeviceStatusVO {
    if (!ALLOWED.has(raw)) {
      throw new Error(`Unknown device status: ${raw}`);
    }
    return new DeviceStatusVO(raw as DeviceStatusValue);
  }

  static trusted(): DeviceStatusVO {
    return new DeviceStatusVO('trusted');
  }

  override isActive(): boolean {
    return this.value === 'trusted';
  }

  canLogin(): boolean {
    return this.value === 'trusted' || this.value === 'pending';
  }
}
