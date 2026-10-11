/**
 * DeviceVO — registered device snapshot
 * @module notification-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { DeviceIdVO } from '../primitives/device-id.vo.js';
import { DeviceTypeVO } from '../primitives/device-type.vo.js';
import { DeviceStatusVO } from '../primitives/device-status.vo.js';
import { DeviceTokenVO } from '../primitives/device-token.vo.js';

export interface DeviceVOProps {
  readonly id: DeviceIdVO;
  readonly userId: string;
  readonly type: DeviceTypeVO;
  readonly status: DeviceStatusVO;
  readonly token: DeviceTokenVO;
  readonly platform?: string;
  readonly appVersion?: string;
  readonly osVersion?: string;
  readonly lastActiveAt?: string;
  readonly registeredAt: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class DeviceVO extends BaseVO<DeviceVOProps> {
  private constructor(props: DeviceVOProps) {
    super(props);
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
    if (!v.userId || v.userId.length === 0) {
      throw new ValidationError('Device requires a userId', 'userId');
    }
  }

  get id(): DeviceIdVO { return this.value.id; }
  get userId(): string { return this.value.userId; }
  get type(): DeviceTypeVO { return this.value.type; }
  get status(): DeviceStatusVO { return this.value.status; }
  get token(): DeviceTokenVO { return this.value.token; }
  get platform(): string | undefined { return this.value.platform; }
  get appVersion(): string | undefined { return this.value.appVersion; }
  get osVersion(): string | undefined { return this.value.osVersion; }
  get lastActiveAt(): string | undefined { return this.value.lastActiveAt; }
  get registeredAt(): string { return this.value.registeredAt; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  canReceivePush(): boolean { return this.value.status.canReceivePush(); }
  isStale(days: number, at: Date = new Date()): boolean {
    const ref = this.value.lastActiveAt ?? this.value.registeredAt;
    const elapsed = at.getTime() - new Date(ref).getTime();
    return elapsed > days * 86_400_000;
  }
}
