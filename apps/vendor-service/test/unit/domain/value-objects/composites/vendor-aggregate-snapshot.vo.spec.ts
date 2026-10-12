import { VendorAggregateSnapshotVO } from '../../../../../src/module/domain/value-objects/composites/vendor-aggregate-snapshot.vo.js';
import { VendorIdentityVO } from '../../../../../src/module/domain/value-objects/composites/vendor-identity.vo.js';
import { VendorContactVO } from '../../../../../src/module/domain/value-objects/composites/vendor-contact.vo.js';
import { VendorBusinessInfoVO } from '../../../../../src/module/domain/value-objects/composites/vendor-business-info.vo.js';
import { VendorLocationVO } from '../../../../../src/module/domain/value-objects/composites/vendor-location.vo.js';
import { VendorBrandingVO } from '../../../../../src/module/domain/value-objects/composites/vendor-branding.vo.js';
import { VendorIdVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-id.vo.js';
import { VendorNameVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-name.vo.js';
import { VendorSlugVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-slug.vo.js';
import { VendorEmailVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-email.vo.js';
import { VendorTypeVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-type.vo.js';
import { VendorBusinessTypeVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-business-type.vo.js';
import { VendorAddressVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-address.vo.js';
import { VendorDivisionVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-division.vo.js';
import { VendorDistrictVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-district.vo.js';
import { VendorUpazilaVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-upazila.vo.js';
import { BusinessNameVO } from '../../../../../src/module/domain/value-objects/primitives/business-name.vo.js';
import { VendorStatusVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-status.vo.js';
import { VendorTierVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-tier.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

function makeSnapshot(): VendorAggregateSnapshotVO {
  return VendorAggregateSnapshotVO.create({
    identity: VendorIdentityVO.create({
      id: VendorIdVO.create(UUID),
      name: VendorNameVO.create('Acme Store'),
      slug: VendorSlugVO.create('acme-store'),
      displayName: VendorNameVO.create('Acme'),
    }),
    status: VendorStatusVO.active(),
    tier: VendorTierVO.reconstitute('bronze'),
    contact: VendorContactVO.create({
      email: VendorEmailVO.create('shop@acme.com'),
    }),
    businessInfo: VendorBusinessInfoVO.create({
      type: VendorTypeVO.create('individual'),
      businessType: VendorBusinessTypeVO.create('retailer'),
      legalName: BusinessNameVO.create('Acme'),
    }),
    location: VendorLocationVO.create({
      address: VendorAddressVO.create({
        line1: '123 Main Street',
        upazila: 'Savar',
        district: 'Dhaka',
        division: 'Dhaka',
        country: 'BD',
      }),
      division: VendorDivisionVO.create('Dhaka'),
      district: VendorDistrictVO.create('Dhaka'),
      upazila: VendorUpazilaVO.create('Savar'),
    }),
    branding: VendorBrandingVO.empty(),
    snapshotAt: NOW,
  });
}

describe('VendorAggregateSnapshotVO', () => {
  describe('create()', () => {
    it('creates valid snapshot', () => {
      const v = makeSnapshot();
      expect(v.vendorId).toBe(UUID);
      expect(v.status.isActive()).toBe(true);
    });

    it('throws on invalid identity', () => {
      expect(() =>
        VendorAggregateSnapshotVO.create({
          identity: 'bad' as never,
          status: VendorStatusVO.active(),
          tier: VendorTierVO.reconstitute('bronze'),
          contact: VendorContactVO.create({ email: VendorEmailVO.create('a@b.com') }),
          businessInfo: VendorBusinessInfoVO.create({
            type: VendorTypeVO.create('individual'),
            businessType: VendorBusinessTypeVO.create('retailer'),
            legalName: BusinessNameVO.create('Acme'),
          }),
          location: VendorLocationVO.create({
            address: VendorAddressVO.create({
              line1: '123 Main Street',
              upazila: 'Savar',
              district: 'Dhaka',
              division: 'Dhaka',
              country: 'BD',
            }),
            division: VendorDivisionVO.create('Dhaka'),
            district: VendorDistrictVO.create('Dhaka'),
            upazila: VendorUpazilaVO.create('Savar'),
          }),
          branding: VendorBrandingVO.empty(),
          snapshotAt: NOW,
        }),
      ).toThrow(ValidationError);
    });

    it('throws on invalid snapshotAt', () => {
      expect(() =>
        VendorAggregateSnapshotVO.create({
          ...makeSnapshot().value,
          snapshotAt: 'bad',
        }),
      ).toThrow(ValidationError);
    });
  });

  describe('isOperational', () => {
    it('true for active', () => {
      expect(makeSnapshot().isOperational()).toBe(true);
    });

    it('false for pending', () => {
      const v = VendorAggregateSnapshotVO.create({
        ...makeSnapshot().value,
        status: VendorStatusVO.pending(),
      });
      expect(v.isOperational()).toBe(false);
    });
  });

  describe('isPubliclyVisible', () => {
    it('false without branding', () => {
      expect(makeSnapshot().isPubliclyVisible()).toBe(false);
    });
  });

  describe('isFullyOnboarded', () => {
    it('false without complete branding', () => {
      expect(makeSnapshot().isFullyOnboarded()).toBe(false);
    });
  });

  describe('toSummary()', () => {
    it('returns summary object', () => {
      const r = makeSnapshot().toSummary();
      expect(r.id).toBe(UUID);
      expect(r.slug).toBe('acme-store');
      expect(r.status).toBe('active');
      expect(r.tier).toBe('bronze');
    });
  });
});
