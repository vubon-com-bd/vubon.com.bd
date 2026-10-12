import {
  VENDOR_PROFILE_EVENT_TYPE,
  VendorProfileCreatedEvent,
  VendorProfileTaglineUpdatedEvent,
  VendorProfileAboutUpdatedEvent,
  VendorProfileLogoUpdatedEvent,
  VendorProfileBannerUpdatedEvent,
  VendorProfileCategoriesUpdatedEvent,
  VendorProfileSocialLinkAddedEvent,
} from '../../../../src/module/domain/events/vendor-profile.events.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

describe('Vendor profile events', () => {
  it('constants defined', () => {
    expect(VENDOR_PROFILE_EVENT_TYPE.CREATED).toBe('vendor.profile.created');
    expect(VENDOR_PROFILE_EVENT_TYPE.CATEGORIES_UPDATED).toBe('vendor.profile.categories_updated');
  });

  it('VendorProfileCreatedEvent', () => {
    const e = new VendorProfileCreatedEvent({
      aggregateId: UUID,
      payload: { profileId: UUID, vendorId: UUID, createdAt: NOW },
    });
    expect(e.type).toBe('vendor.profile.created');
    expect(e.aggregateType).toBe('VendorProfile');
  });

  it('VendorProfileTaglineUpdatedEvent', () => {
    const e = new VendorProfileTaglineUpdatedEvent({
      aggregateId: UUID,
      payload: { profileId: UUID, vendorId: UUID, updatedAt: NOW },
    });
    expect(e.type).toBe('vendor.profile.tagline_updated');
  });

  it('VendorProfileAboutUpdatedEvent', () => {
    const e = new VendorProfileAboutUpdatedEvent({
      aggregateId: UUID,
      payload: { profileId: UUID, vendorId: UUID, updatedAt: NOW },
    });
    expect(e.type).toBe('vendor.profile.about_updated');
  });

  it('VendorProfileLogoUpdatedEvent', () => {
    const e = new VendorProfileLogoUpdatedEvent({
      aggregateId: UUID,
      payload: { profileId: UUID, vendorId: UUID, updatedAt: NOW },
    });
    expect(e.type).toBe('vendor.profile.logo_updated');
  });

  it('VendorProfileBannerUpdatedEvent', () => {
    const e = new VendorProfileBannerUpdatedEvent({
      aggregateId: UUID,
      payload: { profileId: UUID, vendorId: UUID, updatedAt: NOW },
    });
    expect(e.type).toBe('vendor.profile.banner_updated');
  });

  it('VendorProfileCategoriesUpdatedEvent', () => {
    const e = new VendorProfileCategoriesUpdatedEvent({
      aggregateId: UUID,
      payload: {
        profileId: UUID, vendorId: UUID,
        categories: ['electronics', 'fashion'], updatedAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.profile.categories_updated');
    expect(e.payload.categories).toHaveLength(2);
  });

  it('VendorProfileSocialLinkAddedEvent', () => {
    const e = new VendorProfileSocialLinkAddedEvent({
      aggregateId: UUID,
      payload: { profileId: UUID, vendorId: UUID, platform: 'facebook', addedAt: NOW },
    });
    expect(e.type).toBe('vendor.profile.social_link_added');
  });
});
