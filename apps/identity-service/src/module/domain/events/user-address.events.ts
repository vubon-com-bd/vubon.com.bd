/**
 * User Address Domain Events
 * @module identity-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { AUTH_AGGREGATE_TYPE, buildEventParams, type BaseEventParams } from './event.helpers.js';

export const USER_ADDRESS_EVENT_TYPE = {
  ADDED: 'user.address_added',
  UPDATED: 'user.address_updated',
  DELETED: 'user.address_deleted',
  SET_DEFAULT: 'user.address_set_default',
} as const;

export interface UserAddressAddedPayload {
  readonly addressId: string;
  readonly userId: string;
  readonly type: string;
  readonly addedAt: string;
}

export interface UserAddressUpdatedPayload {
  readonly addressId: string;
  readonly userId: string;
  readonly fields: readonly string[];
  readonly updatedAt: string;
}

export interface UserAddressDeletedPayload {
  readonly addressId: string;
  readonly userId: string;
  readonly deletedAt: string;
}

export interface UserAddressSetDefaultPayload {
  readonly addressId: string;
  readonly userId: string;
  readonly scope: 'shipping' | 'billing' | 'both';
  readonly setAt: string;
}

export class UserAddressAddedEvent extends BaseDomainEvent<
  typeof USER_ADDRESS_EVENT_TYPE.ADDED,
  UserAddressAddedPayload
> {
  constructor(p: BaseEventParams<UserAddressAddedPayload>) {
    super(buildEventParams(USER_ADDRESS_EVENT_TYPE.ADDED, AUTH_AGGREGATE_TYPE.USER_ADDRESS, p));
  }
}

export class UserAddressUpdatedEvent extends BaseDomainEvent<
  typeof USER_ADDRESS_EVENT_TYPE.UPDATED,
  UserAddressUpdatedPayload
> {
  constructor(p: BaseEventParams<UserAddressUpdatedPayload>) {
    super(buildEventParams(USER_ADDRESS_EVENT_TYPE.UPDATED, AUTH_AGGREGATE_TYPE.USER_ADDRESS, p));
  }
}

export class UserAddressDeletedEvent extends BaseDomainEvent<
  typeof USER_ADDRESS_EVENT_TYPE.DELETED,
  UserAddressDeletedPayload
> {
  constructor(p: BaseEventParams<UserAddressDeletedPayload>) {
    super(buildEventParams(USER_ADDRESS_EVENT_TYPE.DELETED, AUTH_AGGREGATE_TYPE.USER_ADDRESS, p));
  }
}

export class UserAddressSetDefaultEvent extends BaseDomainEvent<
  typeof USER_ADDRESS_EVENT_TYPE.SET_DEFAULT,
  UserAddressSetDefaultPayload
> {
  constructor(p: BaseEventParams<UserAddressSetDefaultPayload>) {
    super(buildEventParams(USER_ADDRESS_EVENT_TYPE.SET_DEFAULT, AUTH_AGGREGATE_TYPE.USER_ADDRESS, p));
  }
}
