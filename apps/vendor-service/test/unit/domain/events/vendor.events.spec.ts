import {
  VENDOR_EVENT_TYPE,
  VendorRegisteredEvent,
  VendorStatusChangedEvent,
  VendorActivatedEvent,
  VendorDeactivatedEvent,
  VendorApprovedEvent,
  VendorRejectedEvent,
  VendorSuspendedEvent,
  VendorSuspensionLiftedEvent,
  VendorBlockedEvent,
  VendorDeletedEvent,
  VendorProfileUpdatedEvent,
  VendorContactUpdatedEvent,
  VendorBrandingUpdatedEvent,
  VendorCommissionConfiguredEvent,
  VendorPayoutConfiguredEvent,
  VendorVerifiedEvent,
  VendorFeaturedEvent,
  VendorUnfeaturedEvent,
  VendorTierUpgradedEvent,
  VendorTierDowngradedEvent,
  VendorRatingUpdatedEvent,
  VendorSalesRecordedEvent,
} from '../../../../src/module/domain/events/vendor.events.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

describe('Vendor aggregate events', () => {
  it('VENDOR_EVENT_TYPE constants are defined', () => {
    expect(VENDOR_EVENT_TYPE.REGISTERED).toBe('vendor.registered');
    expect(VENDOR_EVENT_TYPE.APPROVED).toBe('vendor.approved');
    expect(VENDOR_EVENT_TYPE.SALES_RECORDED).toBe('vendor.sales_recorded');
  });

  describe('VendorRegisteredEvent', () => {
    it('creates event with payload', () => {
      const e = new VendorRegisteredEvent({
        aggregateId: UUID,
        payload: {
          vendorId: UUID, userId: UUID,
          name: 'Acme', slug: 'acme', email: 'a@b.com',
          type: 'individual', businessType: 'retailer',
          registeredAt: NOW,
        },
      });
      expect(e.type).toBe('vendor.registered');
      expect(e.aggregateId).toBe(UUID);
      expect(e.aggregateType).toBe('Vendor');
      expect(e.payload.name).toBe('Acme');
      expect(e.occurredAt).toBeDefined();
    });
  });

  describe('VendorStatusChangedEvent', () => {
    it('creates event', () => {
      const e = new VendorStatusChangedEvent({
        aggregateId: UUID,
        payload: {
          vendorId: UUID,
          fromStatus: 'pending', toStatus: 'approved',
          changedAt: NOW,
        },
      });
      expect(e.type).toBe('vendor.status_changed');
      expect(e.payload.fromStatus).toBe('pending');
    });
  });

  describe('VendorActivatedEvent', () => {
    it('creates event', () => {
      const e = new VendorActivatedEvent({
        aggregateId: UUID,
        payload: { vendorId: UUID, activatedAt: NOW },
      });
      expect(e.type).toBe('vendor.activated');
    });
  });

  describe('VendorDeactivatedEvent', () => {
    it('creates event with reason', () => {
      const e = new VendorDeactivatedEvent({
        aggregateId: UUID,
        payload: { vendorId: UUID, reason: 'moved', deactivatedAt: NOW },
      });
      expect(e.type).toBe('vendor.deactivated');
      expect(e.payload.reason).toBe('moved');
    });
  });

  describe('VendorApprovedEvent', () => {
    it('creates event', () => {
      const e = new VendorApprovedEvent({
        aggregateId: UUID,
        payload: { vendorId: UUID, approvedBy: UUID, approvedAt: NOW },
      });
      expect(e.type).toBe('vendor.approved');
    });
  });

  describe('VendorRejectedEvent', () => {
    it('creates event with reason', () => {
      const e = new VendorRejectedEvent({
        aggregateId: UUID,
        payload: {
          vendorId: UUID, rejectedBy: UUID,
          reason: 'incomplete', rejectedAt: NOW,
        },
      });
      expect(e.type).toBe('vendor.rejected');
    });
  });

  describe('VendorSuspendedEvent', () => {
    it('creates event', () => {
      const e = new VendorSuspendedEvent({
        aggregateId: UUID,
        payload: {
          vendorId: UUID, reason: 'policy', durationDays: 30,
          suspendedBy: UUID, suspendedAt: NOW,
        },
      });
      expect(e.type).toBe('vendor.suspended');
      expect(e.payload.durationDays).toBe(30);
    });
  });

  describe('VendorSuspensionLiftedEvent', () => {
    it('creates event', () => {
      const e = new VendorSuspensionLiftedEvent({
        aggregateId: UUID,
        payload: { vendorId: UUID, liftedBy: UUID, liftedAt: NOW },
      });
      expect(e.type).toBe('vendor.suspension_lifted');
    });
  });

  describe('VendorBlockedEvent', () => {
    it('creates event', () => {
      const e = new VendorBlockedEvent({
        aggregateId: UUID,
        payload: { vendorId: UUID, reason: 'fraud', blockedBy: UUID, blockedAt: NOW },
      });
      expect(e.type).toBe('vendor.blocked');
    });
  });

  describe('VendorDeletedEvent', () => {
    it('creates event', () => {
      const e = new VendorDeletedEvent({
        aggregateId: UUID,
        payload: { vendorId: UUID, deletedBy: UUID, deletedAt: NOW },
      });
      expect(e.type).toBe('vendor.deleted');
    });
  });

  describe('VendorProfileUpdatedEvent', () => {
    it('creates event with changes', () => {
      const e = new VendorProfileUpdatedEvent({
        aggregateId: UUID,
        payload: { vendorId: UUID, changes: ['name', 'displayName'], updatedAt: NOW },
      });
      expect(e.type).toBe('vendor.profile_updated');
      expect(e.payload.changes).toHaveLength(2);
    });
  });

  describe('VendorContactUpdatedEvent', () => {
    it('creates event', () => {
      const e = new VendorContactUpdatedEvent({
        aggregateId: UUID,
        payload: { vendorId: UUID, updatedAt: NOW },
      });
      expect(e.type).toBe('vendor.contact_updated');
    });
  });

  describe('VendorBrandingUpdatedEvent', () => {
    it('creates event', () => {
      const e = new VendorBrandingUpdatedEvent({
        aggregateId: UUID,
        payload: { vendorId: UUID, hasLogo: true, hasBanner: false, updatedAt: NOW },
      });
      expect(e.type).toBe('vendor.branding_updated');
      expect(e.payload.hasLogo).toBe(true);
    });
  });

  describe('VendorCommissionConfiguredEvent', () => {
    it('creates event', () => {
      const e = new VendorCommissionConfiguredEvent({
        aggregateId: UUID,
        payload: {
          vendorId: UUID, type: 'percentage', percent: 10,
          effectiveFrom: NOW,
        },
      });
      expect(e.type).toBe('vendor.commission_configured');
    });
  });

  describe('VendorPayoutConfiguredEvent', () => {
    it('creates event', () => {
      const e = new VendorPayoutConfiguredEvent({
        aggregateId: UUID,
        payload: {
          vendorId: UUID, method: 'bank_transfer', cycle: 'weekly',
          bankAccountId: UUID,
        },
      });
      expect(e.type).toBe('vendor.payout_configured');
    });
  });

  describe('VendorVerifiedEvent', () => {
    it('creates event', () => {
      const e = new VendorVerifiedEvent({
        aggregateId: UUID,
        payload: { vendorId: UUID, verifiedAt: NOW },
      });
      expect(e.type).toBe('vendor.verified');
    });
  });

  describe('VendorFeaturedEvent', () => {
    it('creates event', () => {
      const e = new VendorFeaturedEvent({
        aggregateId: UUID,
        payload: { vendorId: UUID, featuredAt: NOW, featuredBy: UUID },
      });
      expect(e.type).toBe('vendor.featured');
    });
  });

  describe('VendorUnfeaturedEvent', () => {
    it('creates event', () => {
      const e = new VendorUnfeaturedEvent({
        aggregateId: UUID,
        payload: { vendorId: UUID, featuredAt: NOW },
      });
      expect(e.type).toBe('vendor.unfeatured');
    });
  });

  describe('VendorTierUpgradedEvent', () => {
    it('creates event', () => {
      const e = new VendorTierUpgradedEvent({
        aggregateId: UUID,
        payload: {
          vendorId: UUID, fromTier: 'bronze', toTier: 'silver',
          reason: 'auto', changedAt: NOW,
        },
      });
      expect(e.type).toBe('vendor.tier_upgraded');
      expect(e.payload.toTier).toBe('silver');
    });
  });

  describe('VendorTierDowngradedEvent', () => {
    it('creates event', () => {
      const e = new VendorTierDowngradedEvent({
        aggregateId: UUID,
        payload: {
          vendorId: UUID, fromTier: 'gold', toTier: 'silver',
          reason: 'manual', changedAt: NOW,
        },
      });
      expect(e.type).toBe('vendor.tier_downgraded');
    });
  });

  describe('VendorRatingUpdatedEvent', () => {
    it('creates event', () => {
      const e = new VendorRatingUpdatedEvent({
        aggregateId: UUID,
        payload: {
          vendorId: UUID, previousRating: 4.0, newRating: 4.5,
          totalReviews: 10, updatedAt: NOW,
        },
      });
      expect(e.type).toBe('vendor.rating_updated');
      expect(e.payload.newRating).toBe(4.5);
    });
  });

  describe('VendorSalesRecordedEvent', () => {
    it('creates event', () => {
      const e = new VendorSalesRecordedEvent({
        aggregateId: UUID,
        payload: {
          vendorId: UUID, orderId: UUID, amount: 1000,
          currency: 'BDT', recordedAt: NOW,
        },
      });
      expect(e.type).toBe('vendor.sales_recorded');
      expect(e.payload.amount).toBe(1000);
    });
  });
});
