/**
 * DeviceEntity — registered device for push notifications
 * @module notification-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { NOTIFICATION_DEVICE } from '@vubon/shared-constants/platform/notification';

import { DeviceIdVO } from '../value-objects/primitives/device-id.vo.js';
import { DeviceTypeVO } from '../value-objects/primitives/device-type.vo.js';
import { DeviceStatusVO } from '../value-objects/primitives/device-status.vo.js';
import { DeviceTokenVO } from '../value-objects/primitives/device-token.vo.js';

import {
  DeviceRegisteredEvent,
  DeviceTokenRefreshedEvent,
  DeviceUnregisteredEvent,
  DeviceBlockedEvent,
  DeviceInvalidatedEvent,
  DeviceReactivatedEvent,
} from '../events/device.events.js';

export interface DeviceEntityProps {
  readonly userId: string;
  readonly type: DeviceTypeVO;
  readonly status: DeviceStatusVO;
  readonly token: DeviceTokenVO;
  readonly platform?: string;
  readonly appVersion?: string;
  readonly osVersion?: string;
  readonly lastActiveAt?: string;
  readonly registeredAt: string;
}

export class DeviceEntity extends AggregateRoot<string> {
  private _status: DeviceStatusVO;
  private _token: DeviceTokenVO;
  private _lastActiveAt?: string;
  private _appVersion?: string;
  private _osVersion?: string;

  private readonly _userId: string;
  private readonly _type: DeviceTypeVO;
  private readonly _platform?: string;
  private readonly _registeredAt: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: DeviceEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._type = props.type;
    this._status = props.status;
    this._token = props.token;
    this._platform = props.platform;
    this._appVersion = props.appVersion;
    this._osVersion = props.osVersion;
    this._lastActiveAt = props.lastActiveAt;
    this._registeredAt = props.registeredAt;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (!this._userId || this._userId.length === 0) {
      throw new ValidationError('Device requires a userId', 'userId');
    }
  }

  get userId(): string { return this._userId; }
  get type(): DeviceTypeVO { return this._type; }
  get status(): DeviceStatusVO { return this._status; }
  get token(): DeviceTokenVO { return this._token; }
  get platform(): string | undefined { return this._platform; }
  get appVersion(): string | undefined { return this._appVersion; }
  get osVersion(): string | undefined { return this._osVersion; }
  get lastActiveAt(): string | undefined { return this._lastActiveAt; }
  get registeredAt(): string { return this._registeredAt; }

  get toIdVO(): DeviceIdVO { return DeviceIdVO.reconstitute(this.id); }

  isActive(): boolean { return this._status.isActive(); }
  isBlocked(): boolean { return this._status.isBlocked(); }
  isInvalid(): boolean { return this._status.isInvalid(); }
  isUnregistered(): boolean { return this._status.isUnregistered(); }
  isTerminal(): boolean { return this._status.isTerminal(); }

  canReceivePush(): boolean { return this._status.canReceivePush(); }

  isStale(days: number, at: Date = new Date()): boolean {
    const ref = this._lastActiveAt ?? this._registeredAt;
    const elapsed = at.getTime() - new Date(ref).getTime();
    return elapsed > days * 86_400_000;
  }

  // ═══ Business Methods ═══
  refreshToken(
    newToken: DeviceTokenVO,
    now: string = new Date().toISOString(),
  ): void {
    if (this._status.isTerminal()) {
      throw new BusinessRuleError(
        `Cannot refresh token for device "${this.id}" in status "${this._status.value}"`,
        'DEVICE_CANNOT_REFRESH_TOKEN',
        { deviceId: this.id, status: this._status.value },
      );
    }
    const previousTokenMasked = this._token.masked();
    this._token = newToken;
    this._lastActiveAt = now;
    if (!this._status.isActive()) {
      this._status = DeviceStatusVO.active();
    }
    this.addDomainEvent(
      new DeviceTokenRefreshedEvent({
        aggregateId: this.id,
        payload: {
          deviceId: this.id,
          userId: this._userId,
          previousTokenMasked,
          newTokenMasked: newToken.masked(),
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  markActive(now: string = new Date().toISOString()): void {
    this._lastActiveAt = now;
    if (this._status.isInactive()) {
      this._status = DeviceStatusVO.active();
    }
    this.touch(now);
  }

  unregister(reason?: string, now: string = new Date().toISOString()): void {
    if (this._status.isUnregistered()) return;
    this._status = DeviceStatusVO.unregistered();
    this.addDomainEvent(
      new DeviceUnregisteredEvent({
        aggregateId: this.id,
        payload: { deviceId: this.id, userId: this._userId, reason },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  block(reason: string, blockedBy?: string, now: string = new Date().toISOString()): void {
    this._status = DeviceStatusVO.blocked();
    this.addDomainEvent(
      new DeviceBlockedEvent({
        aggregateId: this.id,
        payload: { deviceId: this.id, userId: this._userId, reason, blockedBy },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  invalidate(reason: string, now: string = new Date().toISOString()): void {
    this._status = DeviceStatusVO.invalid();
    this.addDomainEvent(
      new DeviceInvalidatedEvent({
        aggregateId: this.id,
        payload: { deviceId: this.id, userId: this._userId, reason },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  reactivate(now: string = new Date().toISOString()): void {
    this._status = DeviceStatusVO.active();
    this._lastActiveAt = now;
    this.addDomainEvent(
      new DeviceReactivatedEvent({
        aggregateId: this.id,
        payload: { deviceId: this.id, userId: this._userId },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  updateAppInfo(
    appVersion?: string,
    osVersion?: string,
    now: string = new Date().toISOString(),
  ): void {
    if (appVersion !== undefined) this._appVersion = appVersion;
    if (osVersion !== undefined) this._osVersion = osVersion;
    this.touch(now);
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // ═══ Factories ═══
  static create(params: {
    id: string;
    props: Omit<DeviceEntityProps, 'status' | 'lastActiveAt'> & {
      status?: DeviceStatusVO;
    };
    now: string;
  }): DeviceEntity {
    return DeviceEntity.register(params);
  }

  static register(params: {
    id: string;
    props: Omit<DeviceEntityProps, 'status' | 'lastActiveAt'> & {
      status?: DeviceStatusVO;
    };
    now: string;
  }): DeviceEntity {
    const fullProps: DeviceEntityProps = {
      ...params.props,
      status: params.props.status ?? DeviceStatusVO.active(),
      lastActiveAt: params.now,
    };
    const entity = new DeviceEntity(params.id, params.now, params.now, fullProps);
    entity.addDomainEvent(
      new DeviceRegisteredEvent({
        aggregateId: params.id,
        payload: {
          deviceId: params.id,
          userId: params.props.userId,
          type: params.props.type.value,
          platform: params.props.platform ?? 'unknown',
          hasToken: true,
          appVersion: params.props.appVersion,
          osVersion: params.props.osVersion,
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
    deletedAt?: string | null;
    props: DeviceEntityProps;
    version?: number;
  }): DeviceEntity {
    const entity = new DeviceEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
