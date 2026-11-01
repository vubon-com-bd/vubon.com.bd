/**
 * Role & Permission Domain Events
 * @module identity-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { AUTH_AGGREGATE_TYPE, buildEventParams, type BaseEventParams } from './event.helpers.js';

export const ROLE_PERMISSION_EVENT_TYPE = {
  ROLE_ASSIGNED: 'identity.role.assigned',
  ROLE_REVOKED: 'identity.role.revoked',
  PERMISSION_GRANTED: 'identity.permission.granted',
  PERMISSION_REVOKED: 'identity.permission.revoked',
} as const;

export interface RoleAssignedPayload {
  readonly userId: string;
  readonly role: string;
  readonly assignedBy: string;
  readonly assignedAt: string;
  readonly expiresAt?: string;
}

export interface RoleRevokedPayload {
  readonly userId: string;
  readonly role: string;
  readonly revokedBy: string;
  readonly revokedAt: string;
  readonly reason?: string;
}

export interface PermissionGrantedPayload {
  readonly userId: string;
  readonly permission: string;
  readonly grantedBy: string;
  readonly grantedAt: string;
  readonly expiresAt?: string;
}

export interface PermissionRevokedPayload {
  readonly userId: string;
  readonly permission: string;
  readonly revokedBy: string;
  readonly revokedAt: string;
  readonly reason?: string;
}

export class RoleAssignedEvent extends BaseDomainEvent<
  typeof ROLE_PERMISSION_EVENT_TYPE.ROLE_ASSIGNED,
  RoleAssignedPayload
> {
  constructor(p: BaseEventParams<RoleAssignedPayload>) {
    super(buildEventParams(ROLE_PERMISSION_EVENT_TYPE.ROLE_ASSIGNED, AUTH_AGGREGATE_TYPE.ROLE, p));
  }
}

export class RoleRevokedEvent extends BaseDomainEvent<
  typeof ROLE_PERMISSION_EVENT_TYPE.ROLE_REVOKED,
  RoleRevokedPayload
> {
  constructor(p: BaseEventParams<RoleRevokedPayload>) {
    super(buildEventParams(ROLE_PERMISSION_EVENT_TYPE.ROLE_REVOKED, AUTH_AGGREGATE_TYPE.ROLE, p));
  }
}

export class PermissionGrantedEvent extends BaseDomainEvent<
  typeof ROLE_PERMISSION_EVENT_TYPE.PERMISSION_GRANTED,
  PermissionGrantedPayload
> {
  constructor(p: BaseEventParams<PermissionGrantedPayload>) {
    super(buildEventParams(ROLE_PERMISSION_EVENT_TYPE.PERMISSION_GRANTED, AUTH_AGGREGATE_TYPE.PERMISSION, p));
  }
}

export class PermissionRevokedEvent extends BaseDomainEvent<
  typeof ROLE_PERMISSION_EVENT_TYPE.PERMISSION_REVOKED,
  PermissionRevokedPayload
> {
  constructor(p: BaseEventParams<PermissionRevokedPayload>) {
    super(buildEventParams(ROLE_PERMISSION_EVENT_TYPE.PERMISSION_REVOKED, AUTH_AGGREGATE_TYPE.PERMISSION, p));
  }
}
