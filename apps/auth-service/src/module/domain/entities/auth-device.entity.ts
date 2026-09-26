/**
 * AuthDeviceEntity — Registered device (aggregate)
 * @module auth-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import type { UserId } from '@vubon/shared-types/common';
import { DeviceFingerprintVO } from '../value-objects/primitives/device-fingerprint.vo';
import { DeviceTypeVO } from '../value-objects/primitives/device-type.vo';
import { DeviceStatusVO } from '../value-objects/primitives/device-status.vo';

export interface AuthDeviceEntityProps {
  readonly id: string;
  readonly userId: UserId;
  readonly fingerprint: DeviceFingerprintVO;
  readonly type: DeviceTypeVO;
  readonly status: DeviceStatusVO;
  readonly name: string;
  readonly firstSeenAt: number;
  readonly lastSeenAt: number;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt?: string | null;
}

export class AuthDeviceEntity extends BaseEntity<string> {
  readonly userId: UserId;
  private _fingerprint: DeviceFingerprintVO;
  private _type: DeviceTypeVO;
  private _status: DeviceStatusVO;
  private _name: string;
  private _firstSeenAt: number;
  private _lastSeenAt: number;

  private constructor(props: AuthDeviceEntityProps) {
    super(props.id, props.createdAt, props.updatedAt, props.deletedAt ?? null);
    this.userId = props.userId;
    this._fingerprint = props.fingerprint;
    this._type = props.type;
    this._status = props.status;
    this._name = props.name;
    this._firstSeenAt = props.firstSeenAt;
    this._lastSeenAt = props.lastSeenAt;
  }

  static create(props: AuthDeviceEntityProps): AuthDeviceEntity {
    return new AuthDeviceEntity(props);
  }

  get fingerprint(): DeviceFingerprintVO { return this._fingerprint; }
  get type(): DeviceTypeVO { return this._type; }
  get status(): DeviceStatusVO { return this._status; }
  get name(): string { return this._name; }
  get lastSeenAt(): number { return this._lastSeenAt; }

  isTrusted(): boolean { return this._status.isActive(); }
  canLogin(): boolean { return this._status.canLogin(); }

  touch(now: number): void { this._lastSeenAt = now; }

  trust(): void { this._status = DeviceStatusVO.trusted(); }

  block(): void { this._status = DeviceStatusVO.of('blocked'); }

  revoke(): void { this._status = DeviceStatusVO.of('revoked'); }

  rename(newName: string): void {
    if (!newName.trim()) throw new Error('Device name required');
    this._name = newName.trim().slice(0, 80);
  }
}
