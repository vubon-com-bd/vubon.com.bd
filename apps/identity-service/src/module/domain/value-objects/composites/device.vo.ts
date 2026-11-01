/**
 * DeviceVO
 * @module identity-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { DeviceIdVO } from '../primitives/device-id.vo.js';
import { UserIdVO } from '../primitives/user-id.vo.js';
import { DeviceTypeVO } from '../primitives/device-type.vo.js';
import { DeviceFingerprintVO } from '../primitives/device-fingerprint.vo.js';
import { IpAddressVO } from '../primitives/ip-address.vo.js';
import { UserAgentVO } from '../primitives/user-agent.vo.js';

export interface DeviceVOProps {
  readonly id: DeviceIdVO;
  readonly userId: UserIdVO;
  readonly type: DeviceTypeVO;
  readonly fingerprint: DeviceFingerprintVO;
  readonly name?: string;
  readonly os?: string;
  readonly browser?: string;
  readonly appVersion?: string;
  readonly ipAddress?: IpAddressVO;
  readonly userAgent?: UserAgentVO;
  readonly trusted: boolean;
  readonly trustedUntil?: string;
  readonly lastActiveAt: string;
  readonly createdAt: string;
}

export class DeviceVO extends BaseVO<DeviceVOProps> {
  private constructor(props: DeviceVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: DeviceVOProps): DeviceVO {
    const vo = new DeviceVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: DeviceVOProps): DeviceVO {
    return new DeviceVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (v.trusted && !v.trustedUntil) {
      throw new ValidationError(
        'trustedUntil is required when trusted is true',
        'trustedUntil',
      );
    }
  }

  get id(): DeviceIdVO { return this.value.id; }
  get userId(): UserIdVO { return this.value.userId; }
  get type(): DeviceTypeVO { return this.value.type; }
  get fingerprint(): DeviceFingerprintVO { return this.value.fingerprint; }
  get name(): string | undefined { return this.value.name; }
  get os(): string | undefined { return this.value.os; }
  get browser(): string | undefined { return this.value.browser; }
  get appVersion(): string | undefined { return this.value.appVersion; }
  get ipAddress(): IpAddressVO | undefined { return this.value.ipAddress; }
  get userAgent(): UserAgentVO | undefined { return this.value.userAgent; }
  get trusted(): boolean { return this.value.trusted; }
  get trustedUntil(): string | undefined { return this.value.trustedUntil; }
  get lastActiveAt(): string { return this.value.lastActiveAt; }
  get createdAt(): string { return this.value.createdAt; }

  isTrustActive(nowMs: number = Date.now()): boolean {
    if (!this.trusted) return false;
    if (!this.trustedUntil) return false;
    return nowMs < Date.parse(this.trustedUntil);
  }
}
