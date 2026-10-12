import { VendorEmailVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-email.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('VendorEmailVO', () => {
  describe('create()', () => {
    it('accepts valid email', () => {
      expect(VendorEmailVO.create('shop@acme.com').value).toBe('shop@acme.com');
    });

    it('lowercases email', () => {
      expect(VendorEmailVO.create('Shop@ACME.com').value).toBe('shop@acme.com');
    });

    it('trims whitespace', () => {
      expect(VendorEmailVO.create('  shop@acme.com  ').value).toBe('shop@acme.com');
    });

    it('throws on invalid email', () => {
      expect(() => VendorEmailVO.create('not-an-email')).toThrow(ValidationError);
    });

    it('throws on non-string', () => {
      expect(() => VendorEmailVO.create(123 as unknown as string)).toThrow(ValidationError);
    });
  });

  describe('isBusinessDomain()', () => {
    it('false for gmail', () => {
      expect(VendorEmailVO.create('user@gmail.com').isBusinessDomain()).toBe(false);
    });

    it('true for custom domain', () => {
      expect(VendorEmailVO.create('shop@acme.com').isBusinessDomain()).toBe(true);
    });
  });

  describe('getDomain() / getLocalPart()', () => {
    it('extracts domain', () => {
      expect(VendorEmailVO.create('shop@acme.com').domain).toBe('acme.com');
    });

    it('extracts local part', () => {
      expect(VendorEmailVO.create('shop@acme.com').localPart).toBe('shop');
    });
  });
});
