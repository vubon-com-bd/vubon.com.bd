/**
 * DeviceEntity — AGGREGATE ROOT
 * @module notification-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import type { DeviceVO } from '@domain/composites/device.vo.js';
import type { DeviceIdVO } from '@domain/primitives/device-id.vo.js';
import { DeviceStatusVO } from '@domain/primitives/device-status.vo.js';
import type { DeviceTokenVO } from '@domain/primitives/device-token.vo.js';

import {
  DeviceRegisteredEvent,
  DeviceUnregisteredEvent,
  DeviceTokenRefreshedEvent,
  DeviceBlockedEvent,
  DeviceActivatedEvent,
  DeviceDeactivatedEvent,
} from '@domain/events/device.events.js';

export interface DeviceEntityProps {
  readonly vo: DeviceVO;
  readonly blockedReason?: string;
  readonly blockedAt?: string;
  readonly unregisteredAt?: string;
  readonly unregisteredReason?: string;
}

export class DeviceEntity extends AggregateRoot<string> {
  private _vo: DeviceVO;
  private _blockedReason?: string;
  private _blockedAt?: string;
  private _unregisteredAt?: string;
  private _unregisteredReason?: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: DeviceEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vo = props.vo;
    this._blockedReason = props.blockedReason;
    this._blockedAt = props.blockedAt;
    this._unregisteredAt = props.unregisteredAt;
    this._unregisteredReason = props.unregisteredReason;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._vo.status.isBlocked() && !this._blockedAt) {
      throw new ValidationError('Blocked device requires blockedAt', 'blockedAt');
    }
    if (this._vo.status.isUnregistered() && !this._unregisteredAt) {
      throw new ValidationError(
        'Unregistered device requires unregisteredAt',
        'unregisteredAt',
      );
    }
  }

  get vo(): DeviceVO { return this._vo; }
  get deviceId(): DeviceIdVO { return this._vo.id; }
  get status(): DeviceVO['status'] { return this._vo.status; }
  get token(): DeviceTokenVO { return this._vo.token; }
  get blockedReason(): string | undefined { return this._blockedReason; }
  get blockedAt(): string | undefined { return this._blockedAt; }
  get unregisteredAt(): string | undefined { return this._unregisteredAt; }
  get unregisteredReason(): string | undefined { return this._unregisteredReason; }

  isActive(): boolean { return this._vo.isActive(); }
  isBlocked(): boolean { return this._vo.isBlocked(); }
  canReceive(): boolean { return this._vo.canReceive(); }
  isStale(now?: Date): boolean { return this._vo.isStale(now); }

  activate(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('active');
    this._vo = this._vo.withStatus(DeviceStatusVO.active());
    this.addDomainEvent(
      new DeviceActivatedEvent({
        aggregateId: this.id,
        payload: { deviceId: this.id, userId: this._vo.userId.value, activatedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  deactivate(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('inactive');
    this._vo = this._vo.withStatus(DeviceStatusVO.inactive());
    this.addDomainEvent(
      new DeviceDeactivatedEvent({
        aggregateId: this.id,
        payload: { deviceId: this.id, userId: this._vo.userId.value, deactivatedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  refreshToken(token: DeviceTokenVO, now: string = new Date().toISOString()): void {
    if (this._vo.status.isTerminal()) {
      throw new BusinessRuleError(
        'Cannot refresh token of terminal device',
        'DEVICE_TERMINAL',
        { deviceId: this.id, status: this._vo.status.value },
      );
    }
    this._vo = this._vo.withToken(token).withLastActive(now);
    this.addDomainEvent(
      new DeviceTokenRefreshedEvent({
        aggregateId: this.id,
        payload: { deviceId: this.id, userId: this._vo.userId.value, refreshedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  block(reason?: string, now: string = new Date().toISOString()): void {
    if (this._vo.status.isTerminal()) {
      throw new BusinessRuleError(
        'Cannot block terminal device',
        'DEVICE_TERMINAL',
        { deviceId: this.id, status: this._vo.status.value },
      );
    }
    this._vo = this._vo.withStatus(DeviceStatusVO.blocked());
    this._blockedAt = now;
    this._blockedReason = reason;
    this.addDomainEvent(
      new DeviceBlockedEvent({
        aggregateId: this.id,
        payload: {
          deviceId: this.id,
          userId: this._vo.userId.value,
          reason,
          blockedAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  unregister(reason?: string, now: string = new Date().toISOString()): void {
    if (this._vo.status.isUnregistered()) return;
    this._vo = this._vo.withStatus(DeviceStatusVO.unregistered());
    this._unregisteredAt = now;
    this._unregisteredReason = reason;
    this.addDomainEvent(
      new DeviceUnregisteredEvent({
        aggregateId: this.id,
        payload: {
          deviceId: this.id,
          userId: this._vo.userId.value,
          reason,
          unregisteredAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  touchActivity(now: string = new Date().toISOString()): void {
    this._vo = this._vo.withLastActive(now);
    this.touch(now);
    this.incrementVersion();
  }

  private assertTransitionTo(target: string): void {
    if (!this._vo.status.canTransitionTo(target)) {
      throw new BusinessRuleError(
        `Invalid device status transition: "${this._vo.status.value}" → "${target}"`,
        'INVALID_DEVICE_STATUS_TRANSITION',
        { from: this._vo.status.value, to: target, deviceId: this.id },
      );
    }
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: DeviceIdVO;
    vo: DeviceVO;
    now: string;
  }): DeviceEntity {
    if (!params.vo.isActive()) {
      throw new ValidationError('New device must be active', 'status');
    }

    const entity = new DeviceEntity(
      params.id.value,
      params.now,
      params.now,
      { vo: params.vo },
      null,
    );

    entity.addDomainEvent(
      new DeviceRegisteredEvent({
        aggregateId: params.id.value,
        payload: {
          deviceId: params.id.value,
          userId: params.vo.userId.value,
          type: params.vo.type.value,
          platform: params.vo.platform.value,
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
    deletedAt?: string | null;
    props: DeviceEntityProps;
    version?: number;
  }): DeviceEntity {
    const entity = new DeviceEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt ?? null,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
