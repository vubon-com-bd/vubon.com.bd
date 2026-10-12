import { VendorIdentityVO } from '../../../../../src/module/domain/value-objects/composites/vendor-identity.vo.js';
import { VendorIdVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-id.vo.js';
import { VendorNameVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-name.vo.js';
import { VendorSlugVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-slug.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

function makeIdentity(): VendorIdentityVO {
  return VendorIdentityVO.create({
    id: VendorIdVO.create(UUID),
    name: VendorNameVO.create('Acme Store'),
    slug: VendorSlugVO.create('acme-store'),
    displayName: VendorNameVO.create('Acme'),
  });
}

describe('VendorIdentityVO', () => {
  describe('create()', () => {
    it('creates with all fields', () => {
      const v = makeIdentity();
      expect(v.id.value).toBe(UUID);
      expect(v.name.value).toBe('Acme Store');
      expect(v.slug.value).toBe('acme-store');
      expect(v.displayName.value).toBe('Acme');
    });

    it('throws on invalid id', () => {
      expect(() =>
        VendorIdentityVO.create({
          id: 'not-id' as never,
          name: VendorNameVO.create('Acme'),
          slug: VendorSlugVO.create('acme'),
          displayName: VendorNameVO.create('Acme'),
        }),
      ).toThrow(ValidationError);
    });
  });

  describe('hasSameIdentityAs()', () => {
    it('true for same id', () => {
      const a = makeIdentity();
      const b = makeIdentity();
      expect(a.hasSameIdentityAs(b)).toBe(true);
    });
  });

  describe('hasSameSlugAs()', () => {
    it('true for same slug', () => {
      const a = makeIdentity();
      const b = makeIdentity();
      expect(a.hasSameSlugAs(b)).toBe(true);
    });
  });

  describe('withName()', () => {
    it('returns new VO with new name', () => {
      const a = makeIdentity();
      const b = a.withName(VendorNameVO.create('New Name'));
      expect(b.name.value).toBe('New Name');
      expect(b.id.value).toBe(a.id.value);
    });
  });

  describe('withDisplayName()', () => {
    it('returns new VO with new displayName', () => {
      const a = makeIdentity();
      const b = a.withDisplayName(VendorNameVO.create('New Display'));
      expect(b.displayName.value).toBe('New Display');
      expect(b.name.value).toBe(a.name.value);
    });
  });
});
