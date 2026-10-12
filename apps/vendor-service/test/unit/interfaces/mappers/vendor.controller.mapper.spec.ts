/**
 * VendorControllerMapper — unit tests
 */
import { VendorControllerMapper } from '../../../../src/module/interfaces/mappers/vendor.controller.mapper.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

describe('VendorControllerMapper', () => {
  describe('toRegisterAppDto', () => {
    it('maps register DTO with ownerId from arg', () => {
      const r = VendorControllerMapper.toRegisterAppDto(
        {
          ownerId: 'ignored',
          businessName: 'Acme',
          displayName: 'Acme',
          vendorType: 'individual' as never,
          businessType: 'retailer' as never,
          contactEmail: 'a@b.com',
          contactPhone: '01712345678',
          addressLine1: '123 Main',
          division: 'Dhaka',
          district: 'Dhaka',
          acceptTerms: true,
        },
        UUID,
      );
      expect(r.ownerId).toBe(UUID);
      expect(r.businessName).toBe('Acme');
    });

    it('preserves optional fields', () => {
      const r = VendorControllerMapper.toRegisterAppDto(
        {
          ownerId: 'x',
          businessName: 'Acme',
          displayName: 'Acme',
          slug: 'acme',
          vendorType: 'individual' as never,
          businessType: 'retailer' as never,
          businessRegistration: 'REG-1',
          businessDescription: 'Best store',
          contactEmail: 'a@b.com',
          contactPhone: '01712345678',
          addressLine1: '123 Main',
          addressLine2: 'Suite 100',
          division: 'Dhaka',
          district: 'Dhaka',
          upazila: 'Savar',
          postalCode: '1340',
          acceptTerms: true,
        },
        UUID,
      );
      expect(r.slug).toBe('acme');
      expect(r.businessRegistration).toBe('REG-1');
      expect(r.addressLine2).toBe('Suite 100');
      expect(r.postalCode).toBe('1340');
    });
  });

  describe('toUpdateAppDto', () => {
    it('maps update DTO', () => {
      const r = VendorControllerMapper.toUpdateAppDto(UUID, {
        name: 'New Name',
        displayName: 'New Display',
      });
      expect(r.vendorId).toBe(UUID);
      expect(r.name).toBe('New Name');
      expect(r.displayName).toBe('New Display');
    });

    it('passes optional fields', () => {
      const r = VendorControllerMapper.toUpdateAppDto(UUID, {
        description: 'new desc',
        logoUrl: 'https://x.com/l.png',
        bannerUrl: 'https://x.com/b.png',
        website: 'https://x.com',
      });
      expect(r.description).toBe('new desc');
      expect(r.logoUrl).toBe('https://x.com/l.png');
    });
  });

  describe('toUpdateProfileAppDto', () => {
    it('maps profile update', () => {
      const r = VendorControllerMapper.toUpdateProfileAppDto(UUID, {
        tagline: 'Best store',
        about: 'We sell quality products.',
        categories: ['electronics'],
      });
      expect(r.vendorId).toBe(UUID);
      expect(r.tagline).toBe('Best store');
      expect(r.categories).toEqual(['electronics']);
    });
  });

  describe('toUpdateBusinessAppDto', () => {
    it('maps business update', () => {
      const r = VendorControllerMapper.toUpdateBusinessAppDto(UUID, {
        type: 'limited_company' as never,
        businessType: 'retailer' as never,
        legalName: 'Acme Ltd',
        registrationNumber: 'REG-1',
      });
      expect(r.vendorId).toBe(UUID);
      expect(r.legalName).toBe('Acme Ltd');
    });
  });

  describe('toActivateAppDto', () => {
    it('maps activate DTO', () => {
      const r = VendorControllerMapper.toActivateAppDto(UUID, {});
      expect(r.vendorId).toBe(UUID);
    });
  });

  describe('toDeactivateAppDto', () => {
    it('maps with reason', () => {
      const r = VendorControllerMapper.toDeactivateAppDto(UUID, { reason: 'vacation' });
      expect(r.reason).toBe('vacation');
    });
  });

  describe('toSuspendAppDto', () => {
    it('injects suspendedBy', () => {
      const r = VendorControllerMapper.toSuspendAppDto(
        UUID,
        { reason: 'poor_performance' as never, durationDays: 30 },
        'admin-1',
      );
      expect(r.suspendedBy).toBe('admin-1');
      expect(r.durationDays).toBe(30);
    });
  });

  describe('toReinstateAppDto', () => {
    it('injects liftedBy', () => {
      const r = VendorControllerMapper.toReinstateAppDto(UUID, {}, 'admin-1');
      expect(r.liftedBy).toBe('admin-1');
    });
  });

  describe('toApproveAppDto', () => {
    it('injects reviewedBy', () => {
      const r = VendorControllerMapper.toApproveAppDto(UUID, { note: 'ok' }, 'admin-1');
      expect(r.reviewedBy).toBe('admin-1');
      expect(r.note).toBe('ok');
    });
  });

  describe('toRejectAppDto', () => {
    it('injects reviewedBy + reason', () => {
      const r = VendorControllerMapper.toRejectAppDto(
        UUID,
        { reason: 'invalid_documents' as never },
        'admin-1',
      );
      expect(r.reviewedBy).toBe('admin-1');
      expect(r.reason).toBe('invalid_documents');
    });
  });

  describe('toAppealAppDto', () => {
    it('maps appeal', () => {
      const r = VendorControllerMapper.toAppealAppDto(UUID, {
        suspensionId: UUID,
        appealReason: 'unfair',
      });
      expect(r.vendorId).toBe(UUID);
      expect(r.appealReason).toBe('unfair');
    });
  });

  describe('toListOptions', () => {
    it('returns defaults', () => {
      const r = VendorControllerMapper.toListOptions({});
      expect(r.page).toBe(1);
      expect(r.limit).toBe(20);
    });

    it('applies filters', () => {
      const r = VendorControllerMapper.toListOptions({
        page: 2,
        limit: 50,
        status: 'active',
        tier: 'gold',
        isVerified: true,
        minRating: 4,
        search: 'acme',
      });
      expect(r.page).toBe(2);
      expect(r.limit).toBe(50);
      expect(r.filter?.status).toBe('active');
      expect(r.filter?.tier).toBe('gold');
      expect(r.filter?.isVerified).toBe(true);
      expect(r.filter?.minRating).toBe(4);
      expect(r.filter?.search).toBe('acme');
    });
  });

  describe('toUploadDocumentAppDto', () => {
    it('maps upload', () => {
      const r = VendorControllerMapper.toUploadDocumentAppDto(UUID, {
        type: 'business_license' as never,
        fileUrl: 'https://x.com/d.pdf',
        fileName: 'd.pdf',
        mimeType: 'application/pdf',
        fileSize: 1000,
      });
      expect(r.vendorId).toBe(UUID);
      expect(r.fileName).toBe('d.pdf');
    });
  });

  describe('toSubmitVerificationAppDto', () => {
    it('maps submit', () => {
      const r = VendorControllerMapper.toSubmitVerificationAppDto(UUID, { documents: [] });
      expect(r.vendorId).toBe(UUID);
    });
  });

  describe('toInviteTeamAppDto', () => {
    it('injects invitedBy', () => {
      const r = VendorControllerMapper.toInviteTeamAppDto(
        UUID,
        { email: 'x@y.com', role: 'vendor_viewer' as never },
        'owner-1',
      );
      expect(r.invitedBy).toBe('owner-1');
      expect(r.email).toBe('x@y.com');
    });
  });

  describe('toAcceptTeamInviteAppDto', () => {
    it('injects userId', () => {
      const r = VendorControllerMapper.toAcceptTeamInviteAppDto(
        { token: 'abc123def456ghi7', name: 'Md Member' },
        UUID,
      );
      expect(r.userId).toBe(UUID);
      expect(r.name).toBe('Md Member');
    });
  });

  describe('toRoleChangeArgs', () => {
    it('returns role + idempotencyKey', () => {
      const r = VendorControllerMapper.toRoleChangeArgs({ newRole: 'vendor_manager' as never });
      expect(r.newRole).toBe('vendor_manager');
    });
  });

  describe('wrap', () => {
    it('wraps data in success response', () => {
      const r = VendorControllerMapper.wrap({ foo: 'bar' });
      expect(r.success).toBe(true);
      expect(r.data).toEqual({ foo: 'bar' });
      expect(r.timestamp).toBeDefined();
    });
  });
});
