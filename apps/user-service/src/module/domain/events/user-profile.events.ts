/**
 * UserProfile domain events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';

interface EventParams<TPayload> {
  readonly id: string;
  readonly aggregateId: string;
  readonly payload: TPayload;
  readonly occurredAt: Timestamp;
  readonly version: number;
}

// ─── Profile Created ─────────────────────────────────
export interface ProfileCreatedPayload {
  readonly userId: string;
  readonly profileId: string;
}

export class ProfileCreatedEvent extends BaseDomainEvent<
  'profile.created',
  ProfileCreatedPayload
> {
  constructor(p: EventParams<ProfileCreatedPayload>) {
    super({
      id: p.id,
      type: 'profile.created',
      aggregateId: p.aggregateId,
      aggregateType: 'UserProfile',
      payload: p.payload,
      occurredAt: p.occurredAt,
      version: p.version,
    });
  }
}

// ─── Profile Updated ─────────────────────────────────
export interface ProfileUpdatedPayload {
  readonly userId: string;
  readonly changedFields: readonly string[];
}

export class ProfileUpdatedEvent extends BaseDomainEvent<
  'profile.updated',
  ProfileUpdatedPayload
> {
  constructor(p: EventParams<ProfileUpdatedPayload>) {
    super({
      id: p.id,
      type: 'profile.updated',
      aggregateId: p.aggregateId,
      aggregateType: 'UserProfile',
      payload: p.payload,
      occurredAt: p.occurredAt,
      version: p.version,
    });
  }
}

// ─── Profile Avatar Updated ──────────────────────────
export interface ProfileAvatarUpdatedPayload {
  readonly userId: string;
  readonly avatarUrl: string;
}

export class ProfileAvatarUpdatedEvent extends BaseDomainEvent<
  'profile.avatar.updated',
  ProfileAvatarUpdatedPayload
> {
  constructor(p: EventParams<ProfileAvatarUpdatedPayload>) {
    super({
      id: p.id,
      type: 'profile.avatar.updated',
      aggregateId: p.aggregateId,
      aggregateType: 'UserProfile',
      payload: p.payload,
      occurredAt: p.occurredAt,
      version: p.version,
    });
  }
}

// ─── Profile Visibility Changed ──────────────────────
export interface ProfileVisibilityChangedPayload {
  readonly userId: string;
  readonly visibility: string;
}

export class ProfileVisibilityChangedEvent extends BaseDomainEvent<
  'profile.visibility.changed',
  ProfileVisibilityChangedPayload
> {
  constructor(p: EventParams<ProfileVisibilityChangedPayload>) {
    super({
      id: p.id,
      type: 'profile.visibility.changed',
      aggregateId: p.aggregateId,
      aggregateType: 'UserProfile',
      payload: p.payload,
      occurredAt: p.occurredAt,
      version: p.version,
    });
  }
}
