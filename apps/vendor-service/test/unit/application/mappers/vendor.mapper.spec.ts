import { VendorMapper } from '../../../../src/module/application/mappers/vendor.mapper.js';
import { VendorEntity } from '../../../../src/module/domain/entities/vendor.entity.js';
import { VendorNameVO } from '../../../../src/module/domain/value-objects/primitives/vendor-name.vo.js';
import { VendorSlugVO } from '../../../../src/module/domain/value-objects/primitives/vendor-slug.vo.js';
import { VendorEmailVO } from '../../../../src/module/domain/value-objects/primitives/vendor-email.vo.js';
import { VendorTypeVO } from '../../../../src/module/domain/value-objects/primitives/vendor-type.vo.js';
import { VendorBusinessTypeVO } from '../../../../src/module/domain/value-objects/primitives/vendor-business-type.vo.js';
import { VendorTierVO } from '../../../../src/module/domain/value-objects/primitives/vendor-tier.vo.js';
import { RatingScoreVO } from '../../../../src/module/domain/value-objects/primitives/rating-score.vo.js';
import { VendorContactVO } from '../../../../src/module/domain/value-objects/composites/vendor-contact.vo.js';
import { VendorLocationVO } from '../../../../src/module/domain/value-objects/composites/vendor-location.vo.js';
import { VendorAddressVO } from '../../../../src/module/domain/value-objects/primitives/vendor-address.vo.js';
import { VendorDivisionVO } from '../../../../src/module/domain/value-objects/primitives/vendor-division.vo.js';
import { VendorDistrictVO } from '../../../../src/module/domain/value-objects/primitives/vendor-district.vo.js';
import { VendorUpazilaVO } from '../../../../src/module/domain/value-objects/primitives/vendor-upazila.vo.js';
import { VendorBrandingVO } from '../../../../src/module/domain/value-objects/composites/vendor-branding.vo.js';
import { VendorLogoVO } from '../../../../src/module/domain/value-objects/primitives/vendor-logo.vo.js';
import { BusinessDescriptionVO } from '../../../../src/module/domain/value-objects/primitives/business-description.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

function makeVendor(): VendorEntity {
  return VendorEntity.create({
    id: UUID,
    now: NOW,
    props: {
      userId: UUID,
      name: VendorNameVO.create('Acme Store'),
      slug: VendorSlugVO.create('acme-store'),
      displayName: VendorNameVO.create('Acme'),
      description: BusinessDescriptionVO.create('We sell quality products.'),
      type: VendorTypeVO.create('individual'),
      businessType: VendorBusinessTypeVO.create('retailer'),
      email: VendorEmailVO.create('shop@acme.com'),
      contact: VendorContactVO.create({ email: VendorEmailVO.create('shop@acme.com') }),
      location: VendorLocationVO.create({
        address: VendorAddressVO.create({
          line1: '123 Main St',
          upazila: 'Savar',
          district: 'Dhaka',
          division: 'Dhaka',
          country: 'BD',
        }),
        division: VendorDivisionVO.create('Dhaka'),
        district: VendorDistrictVO.create('Dhaka'),
        upazila: VendorUpazilaVO.create('Savar'),
      }),
      branding: VendorBrandingVO.create({
        logo: VendorLogoVO.create('https://cdn.example.com/logo.png'),
      }),
      tier: VendorTierVO.reconstitute('bronze'),
      rating: RatingScoreVO.create(4.5),
      totalSales: 10000,
      totalOrders: 50,
      isVerified: true,
      isFeatured: false,
      joinedAt: NOW,
    },
  });
}

describe('VendorMapper', () => {
  describe('toResponse()', () => {
    it('maps all fields', () => {
      const r = VendorMapper.toResponse(makeVendor());
      expect(r.id).toBe(UUID);
      expect(r.name).toBe('Acme Store');
      expect(r.slug).toBe('acme-store');
      expect(r.status).toBe('pending');
      expect(r.email).toBe('shop@acme.com');
      expect(r.rating).toBe(4.5);
      expect(r.totalSales).toBe(10000);
      expect(r.totalOrders).toBe(50);
      expect(r.isVerified).toBe(true);
    });

    it('maps contact', () => {
      const r = VendorMapper.toResponse(makeVendor());
      expect(r.contact.email).toBe('shop@acme.com');
    });

    it('maps address', () => {
      const r = VendorMapper.toResponse(makeVendor());
      expect(r.address.line1).toBe('123 Main St');
      expect(r.address.district).toBe('Dhaka');
    });

    it('maps branding', () => {
      const r = VendorMapper.toResponse(makeVendor());
      expect(r.branding.logoUrl).toBe('https://cdn.example.com/logo.png');
    });

    it('maps description', () => {
      const r = VendorMapper.toResponse(makeVendor());
      expect(r.description).toBe('We sell quality products.');
    });
  });

  describe('toPublic()', () => {
    it('maps public fields', () => {
      const r = VendorMapper.toPublic(makeVendor());
      expect(r.id).toBe(UUID);
      expect(r.slug).toBe('acme-store');
      expect(r.rating).toBe(4.5);
      expect(r.logoUrl).toBe('https://cdn.example.com/logo.png');
    });

    it('excludes private fields', () => {
      const r = VendorMapper.toPublic(makeVendor());
      expect(r).not.toHaveProperty('email');
      expect(r).not.toHaveProperty('commission');
    });
  });

  describe('toSummary()', () => {
    it('maps summary fields', () => {
      const r = VendorMapper.toSummary(makeVendor());
      expect(r.id).toBe(UUID);
      expect(r.displayName).toBe('Acme');
      expect(r.status).toBe('pending');
      expect(r.tier).toBe('bronze');
    });
  });

  describe('toSummaryList()', () => {
    it('maps multiple', () => {
      const r = VendorMapper.toSummaryList([makeVendor()]);
      expect(r).toHaveLength(1);
    });

    it('maps empty', () => {
      expect(VendorMapper.toSummaryList([])).toHaveLength(0);
    });
  });

  describe('toPublicList()', () => {
    it('maps multiple', () => {
      const r = VendorMapper.toPublicList([makeVendor()]);
      expect(r).toHaveLength(1);
    });
  });
});
