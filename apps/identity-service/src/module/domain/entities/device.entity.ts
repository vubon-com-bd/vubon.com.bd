/**
 * DeviceEntity — AGGREGATE ROOT
 * @module identity-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

import { DeviceIdVO } from '../value-objects/primitives/device-id.vo.js';
import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';
import { DeviceTypeVO } from '../value-objects/primitives/device-type.vo.js';
import { DeviceFingerprintVO } from '../value-objects/primitives/device-fingerprint.vo.js';
import { IpAddressVO } from '../value-objects/primitives/ip-address.vo.js';
import { UserAgentVO } from '../value-objects/primitives/user-agent.vo.js';

import {
  DeviceRegisteredEvent,
  DeviceTrustedEvent,
  DeviceUnregisteredEvent,
} from '../events/device.events.js';

export interface DeviceEntityProps {
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
}

export class DeviceEntity extends AggregateRoot<string> {
  private _trusted: boolean;
  private _trustedUntil?: string;
  private _lastActiveAt: string;

  private readonly _userId: UserIdVO;
  private readonly _type: DeviceTypeVO;
  private readonly _fingerprint: DeviceFingerprintVO;
  private readonly _name?: string;
  private readonly _os?: string;
  private readonly _browser?: string;
  private readonly _appVersion?: string;
  private readonly _ipAddress?: IpAddressVO;
  private readonly _userAgent?: UserAgentVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: DeviceEntityProps,
  ) {
    super(id, createdAt, updatedAt, null);
    this._userId = props.userId;
    this._type = props.type;
    this._fingerprint = props.fingerprint;
    this._name = props.name;
    this._os = props.os;
    this._browser = props.browser;
    this._appVersion = props.appVersion;
    this._ipAddress = props.ipAddress;
    this._userAgent = props.userAgent;
    this._trusted = props.trusted;
    this._trustedUntil = props.trustedUntil;
    this._lastActiveAt = props.lastActiveAt;
  }

  get userId(): UserIdVO { return this._userId; }
  get type(): DeviceTypeVO { return this._type; }
  get fingerprint(): DeviceFingerprintVO { return this._fingerprint; }
  get name(): string | undefined { return this._name; }
  get os(): string | undefined { return this._os; }
  get browser(): string | undefined { return this._browser; }
  get appVersion(): string | undefined { return this._appVersion; }
  get ipAddress(): IpAddressVO | undefined { return this._ipAddress; }
  get userAgent(): UserAgentVO | undefined { return this._userAgent; }
  get trusted(): boolean { return this._trusted; }
  get trustedUntil(): string | undefined { return this._trustedUntil; }
  get lastActiveAt(): string { return this._lastActiveAt; }

  isTrustActive(nowMs: number = Date.now()): boolean {
    if (!this._trusted || !this._trustedUntil) return false;
    return nowMs < Date.parse(this._trustedUntil);
  }

  trust(trustedUntil: string, now: string = new Date().toISOString()): void {
    if (this._trusted) {
      throw new BusinessRuleError(
        'Device already trusted',
        'DEVICE_ALREADY_TRUSTED',
        { deviceId: this.id },
      );
    }
    this._trusted = true;
    this._trustedUntil = trustedUntil;
    this.addDomainEvent(
      new DeviceTrustedEvent({
        aggregateId: this.id,
        payload: {
          deviceId: this.id,
          userId: this._userId.value,
          trustedAt: now,
          trustedUntil,
        },
        version: this.version + 1,
      }),
    );
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  untrust(now: string = new Date().toISOString()): void {
    if (!this._trusted) return;
    this._trusted = false;
    this._trustedUntil = undefined;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  touchActive(now: string = new Date().toISOString()): void {
    this._lastActiveAt = now;
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: DeviceIdVO;
    props: Omit<DeviceEntityProps, 'trusted' | 'lastActiveAt'>;
    now: string;
  }): DeviceEntity {
    const entity = new DeviceEntity(
      params.id.value,
      params.now,
      params.now,
      {
        ...params.props,
        trusted: false,
        lastActiveAt: params.now,
      },
    );

    entity.addDomainEvent(
      new DeviceRegisteredEvent({
        aggregateId: params.id.value,
        payload: {
          deviceId: params.id.value,
          userId: params.props.userId.value,
          type: params.props.type.value,
          fingerprint: params.props.fingerprint.value,
          registeredAt: params.now,
        },
        version: 1,
      }),
    );
    entity.incrementVersion();
    return entity;
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: DeviceEntityProps;
    version?: number;
  }): DeviceEntity {
    const entity = new DeviceEntity(params.id, params.createdAt, params.updatedAt, params.props);
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
