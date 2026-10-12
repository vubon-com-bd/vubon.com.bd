/**
 * Composite VO Coverage — Batch 1A (top 4 low branch)
 * @module vendor-service/test/unit/domain/value-objects/composites
 *
 * Covers: vendor-bank-account, vendor-identity, vendor-aggregate-snapshot, vendor-location
 */
import { describe, it, expect } from '@jest/globals';

// ─── Imports for all four ───
import { VendorBankAccountVO } from '../../../../../src/module/domain/value-objects/composites/vendor-bank-account.vo.js';
import { VendorIdentityVO } from '../../../../../src/module/domain/value-objects/composites/vendor-identity.vo.js';
import { VendorAggregateSnapshotVO } from '../../../../../src/module/domain/value-objects/composites/vendor-aggregate-snapshot.vo.js';
import { VendorLocationVO } from '../../../../../src/module/domain/value-objects/composites/vendor-location.vo.js';

// Primitives
import { BankNameVO } from '../../../../../src/module/domain/value-objects/primitives/bank-name.vo.js';
import { BankAccountNumberVO } from '../../../../../src/module/domain/value-objects/primitives/bank-account-number.vo.js';
import { BankRoutingNumberVO } from '../../../../../src/module/domain/value-objects/primitives/bank-routing-number.vo.js';
import { AccountHolderNameVO } from '../../../../../src/module/domain/value-objects/primitives/account-holder-name.vo.js';
import { VendorIdVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-id.vo.js';
import { VendorNameVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-name.vo.js';
import { VendorSlugVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-slug.vo.js';
import { VendorAddressVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-address.vo.js';
import { VendorDivisionVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-division.vo.js';
import { VendorDistrictVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-district.vo.js';
import { VendorUpazilaVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-upazila.vo.js';
import { PostalCodeVO } from '../../../../../src/module/domain/value-objects/primitives/postal-code.vo.js';
import { VendorStatusVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-status.vo.js';
import { VendorTierVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-tier.vo.js';

// Other composites
import { VendorContactVO } from '../../../../../src/module/domain/value-objects/composites/vendor-contact.vo.js';
import { VendorBusinessInfoVO } from '../../../../../src/module/domain/value-objects/composites/vendor-business-info.vo.js';
import { VendorBrandingVO } from '../../../../../src/module/domain/value-objects/composites/vendor-branding.vo.js';
import { VendorEmailVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-email.vo.js';
import { VendorTypeVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-type.vo.js';
import { VendorBusinessTypeVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-business-type.vo.js';
import { BusinessNameVO } from '../../../../../src/module/domain/value-objects/primitives/business-name.vo.js';

const UUID = '11111111-1111-4111-8111-111111111111';

// ═══════════════════════════════════════════════════════════════════
// 1. VendorBankAccountVO — 25% branch
// ═══════════════════════════════════════════════════════════════════
describe('VendorBankAccountVO — 25% → 90%+', () => {
  function valid() {
    return {
      bankName: BankNameVO.create('Dutch Bangla Bank'),
      accountNumber: BankAccountNumberVO.create('1234567890123'),
      routingNumber: BankRoutingNumberVO.create('090261234'),
      accountHolderName: AccountHolderNameVO.create('Md Rahat Hossain'),
    };
  }

  it('create() with valid props', () => {
    const vo = VendorBankAccountVO.create(valid());
    expect(vo.bankName.value).toBe('Dutch Bangla Bank');
  });

  it('create() rejects invalid bankName', () => {
    expect(() =>
      VendorBankAccountVO.create({
        ...valid(),
        bankName: 'not-a-vo' as never,
      }),
    ).toThrow();
  });

  it('create() rejects invalid accountNumber', () => {
    expect(() =>
      VendorBankAccountVO.create({
        ...valid(),
        accountNumber: 'not-a-vo' as never,
      }),
    ).toThrow();
  });

  it('create() rejects invalid routingNumber', () => {
    expect(() =>
      VendorBankAccountVO.create({
        ...valid(),
        routingNumber: 'not-a-vo' as never,
      }),
    ).toThrow();
  });

  it('create() rejects invalid accountHolderName', () => {
    expect(() =>
      VendorBankAccountVO.create({
        ...valid(),
        accountHolderName: 'not-a-vo' as never,
      }),
    ).toThrow();
  });

  it('masked() returns all fields with masked account number', () => {
    const vo = VendorBankAccountVO.create(valid());
    const masked = vo.masked();
    expect(masked.bankName).toBe('Dutch Bangla Bank');
    expect(masked.accountNumber).toContain('*');
    expect(masked.accountNumber.endsWith('0123')).toBe(true);
  });

  it('fingerprint() combines routing + last4', () => {
    const vo = VendorBankAccountVO.create(valid());
    expect(vo.fingerprint()).toBe('090261234:0123');
  });

  it('reconstitute bypasses validation', () => {
    const vo = VendorBankAccountVO.reconstitute(valid());
    expect(vo.bankName.value).toBe('Dutch Bangla Bank');
  });
});

// ═══════════════════════════════════════════════════════════════════
// 2. VendorIdentityVO — 25% branch
// ═══════════════════════════════════════════════════════════════════
describe('VendorIdentityVO — 25% → 90%+', () => {
  function valid() {
    return {
      id: VendorIdVO.create(UUID),
      name: VendorNameVO.create('Acme Store'),
      slug: VendorSlugVO.create('acme-store'),
      displayName: VendorNameVO.create('Acme'),
    };
  }

  it('create() with all valid props', () => {
    const vo = VendorIdentityVO.create(valid());
    expect(vo.id.value).toBe(UUID);
  });

  it('create() rejects invalid id', () => {
    expect(() => VendorIdentityVO.create({ ...valid(), id: 'not-vo' as never })).toThrow();
  });

  it('create() rejects invalid name', () => {
    expect(() => VendorIdentityVO.create({ ...valid(), name: 'not-vo' as never })).toThrow();
  });

  it('create() rejects invalid slug', () => {
    expect(() => VendorIdentityVO.create({ ...valid(), slug: 'not-vo' as never })).toThrow();
  });

  it('create() rejects invalid displayName', () => {
    expect(() => VendorIdentityVO.create({ ...valid(), displayName: 'not-vo' as never })).toThrow();
  });

  it('hasSameIdentityAs true for same id', () => {
    const a = VendorIdentityVO.create(valid());
    const b = VendorIdentityVO.create(valid());
    expect(a.hasSameIdentityAs(b)).toBe(true);
  });

  it('hasSameIdentityAs false for different id', () => {
    const a = VendorIdentityVO.create(valid());
    const b = VendorIdentityVO.create({
      ...valid(),
      id: VendorIdVO.create('22222222-2222-4222-8222-222222222222'),
    });
    expect(a.hasSameIdentityAs(b)).toBe(false);
  });

  it('hasSameSlugAs true for same slug', () => {
    const a = VendorIdentityVO.create(valid());
    const b = VendorIdentityVO.create(valid());
    expect(a.hasSameSlugAs(b)).toBe(true);
  });

  it('withName() returns new identity with updated name', () => {
    const vo = VendorIdentityVO.create(valid());
    const updated = vo.withName(VendorNameVO.create('New Name'));
    expect(updated.name.value).toBe('New Name');
    expect(updated.id.value).toBe(UUID); // unchanged
  });

  it('withDisplayName() returns new identity with updated displayName', () => {
    const vo = VendorIdentityVO.create(valid());
    const updated = vo.withDisplayName(VendorNameVO.create('New DN'));
    expect(updated.displayName.value).toBe('New DN');
  });
});

// ═══════════════════════════════════════════════════════════════════
// 3. VendorAggregateSnapshotVO — 38.46% branch
// ═══════════════════════════════════════════════════════════════════
describe('VendorAggregateSnapshotVO — 38% → 90%+', () => {
  const NOW = '2025-01-01T00:00:00.000Z';

  function fullProps() {
    const identity = VendorIdentityVO.create({
      id: VendorIdVO.create(UUID),
      name: VendorNameVO.create('Acme Store'),
      slug: VendorSlugVO.create('acme-store'),
      displayName: VendorNameVO.create('Acme'),
    });
    const contact = VendorContactVO.create({
      email: VendorEmailVO.create('hello@acme.com'),
    });
    const businessInfo = VendorBusinessInfoVO.create({
      type: VendorTypeVO.create('individual'),
      businessType: VendorBusinessTypeVO.create('retailer'),
      legalName: BusinessNameVO.create('Acme Pvt'),
    });
    const location = VendorLocationVO.create({
      address: VendorAddressVO.create({
        line1: '123 Main St',
        upazila: 'Mirpur',
        district: 'Dhaka',
        division: 'Dhaka',
        country: 'BD',
      }),
      division: VendorDivisionVO.create('Dhaka'),
      district: VendorDistrictVO.create('Dhaka'),
      upazila: VendorUpazilaVO.create('Mirpur'),
    });
    const branding = VendorBrandingVO.empty();

    return {
      identity,
      status: VendorStatusVO.active(),
      tier: VendorTierVO.reconstitute('bronze'),
      contact,
      businessInfo,
      location,
      branding,
      snapshotAt: NOW,
    };
  }

  it('create() with valid props', () => {
    const vo = VendorAggregateSnapshotVO.create(fullProps());
    expect(vo.vendorId).toBe(UUID);
  });

  it('create() rejects invalid identity', () => {
    expect(() =>
      VendorAggregateSnapshotVO.create({ ...fullProps(), identity: 'bad' as never }),
    ).toThrow();
  });

  it('create() rejects invalid status', () => {
    expect(() =>
      VendorAggregateSnapshotVO.create({ ...fullProps(), status: 'bad' as never }),
    ).toThrow();
  });

  it('create() rejects invalid tier', () => {
    expect(() =>
      VendorAggregateSnapshotVO.create({ ...fullProps(), tier: 'bad' as never }),
    ).toThrow();
  });

  it('create() rejects invalid contact', () => {
    expect(() =>
      VendorAggregateSnapshotVO.create({ ...fullProps(), contact: 'bad' as never }),
    ).toThrow();
  });

  it('create() rejects invalid businessInfo', () => {
    expect(() =>
      VendorAggregateSnapshotVO.create({ ...fullProps(), businessInfo: 'bad' as never }),
    ).toThrow();
  });

  it('create() rejects invalid location', () => {
    expect(() =>
      VendorAggregateSnapshotVO.create({ ...fullProps(), location: 'bad' as never }),
    ).toThrow();
  });

  it('create() rejects invalid branding', () => {
    expect(() =>
      VendorAggregateSnapshotVO.create({ ...fullProps(), branding: 'bad' as never }),
    ).toThrow();
  });

  it('create() rejects invalid snapshotAt', () => {
    expect(() =>
      VendorAggregateSnapshotVO.create({ ...fullProps(), snapshotAt: 'not-a-date' }),
    ).toThrow();
  });

  it('getters return all components', () => {
    const vo = VendorAggregateSnapshotVO.create(fullProps());
    expect(vo.identity).toBeDefined();
    expect(vo.status.value).toBe('active');
    expect(vo.tier.value).toBe('bronze');
    expect(vo.contact).toBeDefined();
    expect(vo.businessInfo).toBeDefined();
    expect(vo.location).toBeDefined();
    expect(vo.branding).toBeDefined();
    expect(vo.snapshotAt).toBe(NOW);
  });

  it('vendorId returns identity id', () => {
    const vo = VendorAggregateSnapshotVO.create(fullProps());
    expect(vo.vendorId).toBe(UUID);
  });

  it('isOperational returns true for active status', () => {
    const vo = VendorAggregateSnapshotVO.create(fullProps());
    expect(vo.isOperational()).toBe(true);
  });

  it('isOperational returns false for pending status', () => {
    const vo = VendorAggregateSnapshotVO.create({
      ...fullProps(),
      status: VendorStatusVO.pending(),
    });
    expect(vo.isOperational()).toBe(false);
  });

  it('isPubliclyVisible requires active + branded', () => {
    const vo = VendorAggregateSnapshotVO.create(fullProps());
    // Branding empty → not branded → false
    expect(vo.isPubliclyVisible()).toBe(false);
  });

  it('isFullyOnboarded false when branding empty', () => {
    const vo = VendorAggregateSnapshotVO.create(fullProps());
    expect(vo.isFullyOnboarded()).toBe(false);
  });

  it('toSummary returns compact object', () => {
    const vo = VendorAggregateSnapshotVO.create(fullProps());
    const summary = vo.toSummary();
    expect(summary.id).toBe(UUID);
    expect(summary.slug).toBe('acme-store');
    expect(summary.status).toBe('active');
  });
});

// ═══════════════════════════════════════════════════════════════════
// 4. VendorLocationVO — 42.85% branch
// ═══════════════════════════════════════════════════════════════════
describe('VendorLocationVO — 42% → 90%+', () => {
  function valid() {
    return {
      address: VendorAddressVO.create({
        line1: '123 Main Street',
        upazila: 'Mirpur',
        district: 'Dhaka',
        division: 'Dhaka',
        country: 'BD',
      }),
      division: VendorDivisionVO.create('Dhaka'),
      district: VendorDistrictVO.create('Dhaka'),
      upazila: VendorUpazilaVO.create('Mirpur'),
    };
  }

  it('create() with all valid fields', () => {
    const vo = VendorLocationVO.create(valid());
    expect(vo.district.value).toBe('Dhaka');
  });

  it('create() rejects invalid address', () => {
    expect(() => VendorLocationVO.create({ ...valid(), address: 'bad' as never })).toThrow();
  });

  it('create() rejects invalid division', () => {
    expect(() => VendorLocationVO.create({ ...valid(), division: 'bad' as never })).toThrow();
  });

  it('create() rejects invalid district', () => {
    expect(() => VendorLocationVO.create({ ...valid(), district: 'bad' as never })).toThrow();
  });

  it('create() rejects invalid upazila', () => {
    expect(() => VendorLocationVO.create({ ...valid(), upazila: 'bad' as never })).toThrow();
  });

  it('create() rejects mismatched division in address vs top-level', () => {
    expect(() =>
      VendorLocationVO.create({
        ...valid(),
        address: VendorAddressVO.create({
          line1: '123 Main Street',
          upazila: 'Savar',
          district: 'Dhaka',
          division: 'Khulna', // mismatch!
          country: 'BD',
        }),
      }),
    ).toThrow();
  });

  it('create() accepts postalCode', () => {
    const vo = VendorLocationVO.create({
      ...valid(),
      postalCode: PostalCodeVO.create('1206'),
    });
    expect(vo.hasPostalCode()).toBe(true);
  });

  it('getters return all values', () => {
    const vo = VendorLocationVO.create(valid());
    expect(vo.address).toBeDefined();
    expect(vo.division.value).toBe('Dhaka');
    expect(vo.district.value).toBe('Dhaka');
    expect(vo.upazila.value).toBe('Mirpur');
    expect(vo.postalCode).toBeUndefined();
  });

  it('isBangladeshi true for BD address', () => {
    expect(VendorLocationVO.create(valid()).isBangladeshi()).toBe(true);
  });

  it('hasPostalCode false when not set', () => {
    expect(VendorLocationVO.create(valid()).hasPostalCode()).toBe(false);
  });

  it('oneLine returns joined string', () => {
    const vo = VendorLocationVO.create(valid());
    expect(vo.oneLine()).toContain('Dhaka');
  });

  it('isInSameRegionAs true for same district + upazila', () => {
    const a = VendorLocationVO.create(valid());
    const b = VendorLocationVO.create(valid());
    expect(a.isInSameRegionAs(b)).toBe(true);
  });

  it('isInSameRegionAs false for different district', () => {
    const a = VendorLocationVO.create(valid());
    const b = VendorLocationVO.create({
      ...valid(),
      district: VendorDistrictVO.create('Chittagong'),
    });
    expect(a.isInSameRegionAs(b)).toBe(false);
  });

  it('reconstitute bypasses validation', () => {
    const vo = VendorLocationVO.reconstitute(valid());
    expect(vo.district.value).toBe('Dhaka');
  });
});
