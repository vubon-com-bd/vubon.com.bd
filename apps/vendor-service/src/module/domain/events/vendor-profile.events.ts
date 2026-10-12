/**
 * Vendor Profile domain events
 * @module vendor-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { newEventId, now } from './event.helpers.js';

const AGGREGATE_TYPE = 'VendorProfile';

export const VENDOR_PROFILE_EVENT_TYPE = {
  CREATED: 'vendor.profile.created',
  TAGLINE_UPDATED: 'vendor.profile.tagline_updated',
  ABOUT_UPDATED: 'vendor.profile.about_updated',
  LOGO_UPDATED: 'vendor.profile.logo_updated',
  BANNER_UPDATED: 'vendor.profile.banner_updated',
  CATEGORIES_UPDATED: 'vendor.profile.categories_updated',
  SOCIAL_LINK_ADDED: 'vendor.profile.social_link_added',
} as const;

export interface VendorProfileCreatedPayload {
  readonly profileId: string;
  readonly vendorId: string;
  readonly createdAt: string;
}
export interface VendorProfileFieldUpdatedPayload {
  readonly profileId: string;
  readonly vendorId: string;
  readonly updatedAt: string;
}
export interface VendorProfileCategoriesUpdatedPayload {
  readonly profileId: string;
  readonly vendorId: string;
  readonly categories: readonly string[];
  readonly updatedAt: string;
}
export interface VendorProfileSocialLinkAddedPayload {
  readonly profileId: string;
  readonly vendorId: string;
  readonly platform: string;
  readonly addedAt: string;
}

type EventParams<TPayload> = {
  id?: string;
  aggregateId: string;
  payload: TPayload;
  occurredAt?: Timestamp;
  version?: number;
  metadata?: DomainEventMetadata;
};
function buildParams<TType extends string, TPayload>(type: TType, p: EventParams<TPayload>) {
  return {
    id: p.id ?? newEventId(),
    type,
    aggregateId: p.aggregateId,
    aggregateType: AGGREGATE_TYPE,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class VendorProfileCreatedEvent extends BaseDomainEvent<typeof VENDOR_PROFILE_EVENT_TYPE.CREATED, VendorProfileCreatedPayload> {
  constructor(p: EventParams<VendorProfileCreatedPayload>) { super(buildParams(VENDOR_PROFILE_EVENT_TYPE.CREATED, p)); }
}
export class VendorProfileTaglineUpdatedEvent extends BaseDomainEvent<typeof VENDOR_PROFILE_EVENT_TYPE.TAGLINE_UPDATED, VendorProfileFieldUpdatedPayload> {
  constructor(p: EventParams<VendorProfileFieldUpdatedPayload>) { super(buildParams(VENDOR_PROFILE_EVENT_TYPE.TAGLINE_UPDATED, p)); }
}
export class VendorProfileAboutUpdatedEvent extends BaseDomainEvent<typeof VENDOR_PROFILE_EVENT_TYPE.ABOUT_UPDATED, VendorProfileFieldUpdatedPayload> {
  constructor(p: EventParams<VendorProfileFieldUpdatedPayload>) { super(buildParams(VENDOR_PROFILE_EVENT_TYPE.ABOUT_UPDATED, p)); }
}
export class VendorProfileLogoUpdatedEvent extends BaseDomainEvent<typeof VENDOR_PROFILE_EVENT_TYPE.LOGO_UPDATED, VendorProfileFieldUpdatedPayload> {
  constructor(p: EventParams<VendorProfileFieldUpdatedPayload>) { super(buildParams(VENDOR_PROFILE_EVENT_TYPE.LOGO_UPDATED, p)); }
}
export class VendorProfileBannerUpdatedEvent extends BaseDomainEvent<typeof VENDOR_PROFILE_EVENT_TYPE.BANNER_UPDATED, VendorProfileFieldUpdatedPayload> {
  constructor(p: EventParams<VendorProfileFieldUpdatedPayload>) { super(buildParams(VENDOR_PROFILE_EVENT_TYPE.BANNER_UPDATED, p)); }
}
export class VendorProfileCategoriesUpdatedEvent extends BaseDomainEvent<typeof VENDOR_PROFILE_EVENT_TYPE.CATEGORIES_UPDATED, VendorProfileCategoriesUpdatedPayload> {
  constructor(p: EventParams<VendorProfileCategoriesUpdatedPayload>) { super(buildParams(VENDOR_PROFILE_EVENT_TYPE.CATEGORIES_UPDATED, p)); }
}
export class VendorProfileSocialLinkAddedEvent extends BaseDomainEvent<typeof VENDOR_PROFILE_EVENT_TYPE.SOCIAL_LINK_ADDED, VendorProfileSocialLinkAddedPayload> {
  constructor(p: EventParams<VendorProfileSocialLinkAddedPayload>) { super(buildParams(VENDOR_PROFILE_EVENT_TYPE.SOCIAL_LINK_ADDED, p)); }
}
