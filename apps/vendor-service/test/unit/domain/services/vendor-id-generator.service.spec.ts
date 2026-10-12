/**
 * VendorIdGeneratorService — unit tests
 * @module vendor-service/test/unit/domain/services
 */
import { VendorIdGeneratorService } from '../../../../src/module/domain/services/vendor-id-generator.service.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('VendorIdGeneratorService', () => {
  describe('generateUUID()', () => {
    it('returns a valid UUID v4', () => {
      const id = VendorIdGeneratorService.generateUUID();
      expect(VendorIdGeneratorService.isValidUUID(id)).toBe(true);
    });

    it('returns unique IDs across calls', () => {
      const a = VendorIdGeneratorService.generateUUID();
      const b = VendorIdGeneratorService.generateUUID();
      expect(a).not.toBe(b);
    });

    it('matches UUID v4 pattern', () => {
      const id = VendorIdGeneratorService.generateUUID();
      expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
    });

    it('generates UUID with correct v4 version byte', () => {
      const ids = Array.from({ length: 50 }, () => VendorIdGeneratorService.generateUUID());
      for (const id of ids) {
        expect(id[14]).toBe('4');
        expect(['8', '9', 'a', 'b']).toContain(id[19]?.toLowerCase());
      }
    });
  });

  describe('isValidUUID()', () => {
    it('true for valid v4 UUID', () => {
      expect(VendorIdGeneratorService.isValidUUID('7c9e6679-7425-40de-944b-e07fc1f90ae7')).toBe(true);
    });

    it('false for UUID with non-v4 version nibble', () => {
      // v1 UUID (version nibble = 1)
      expect(VendorIdGeneratorService.isValidUUID('7c9e6679-7425-10de-944b-e07fc1f90ae7')).toBe(false);
    });

    it('false for garbage string', () => {
      expect(VendorIdGeneratorService.isValidUUID('not-a-uuid')).toBe(false);
    });
  });

  describe('generateVendorCode()', () => {
    it('starts with default prefix', () => {
      const code = VendorIdGeneratorService.generateVendorCode();
      expect(code).toMatch(/^VND-[A-Z0-9]{4}-[A-Z0-9]{4}$/);
    });

    it('uses custom prefix', () => {
      const code = VendorIdGeneratorService.generateVendorCode('SHOP');
      expect(code).toMatch(/^SHOP-[A-Z0-9]{4}-[A-Z0-9]{4}$/);
    });

    it('generates unique codes', () => {
      const a = VendorIdGeneratorService.generateVendorCode();
      const b = VendorIdGeneratorService.generateVendorCode();
      expect(a).not.toBe(b);
    });

    it('generates 100 unique codes', () => {
      const codes = new Set<string>();
      for (let i = 0; i < 100; i++) {
        codes.add(VendorIdGeneratorService.generateVendorCode());
      }
      expect(codes.size).toBe(100);
    });

    it('custom prefix applies', () => {
      const code = VendorIdGeneratorService.generateVendorCode('XYZ');
      expect(code.startsWith('XYZ-')).toBe(true);
    });
  });

  describe('generatePayoutNumber()', () => {
    it('matches PO-YYYYMMDD-XXXXXX pattern', () => {
      const num = VendorIdGeneratorService.generatePayoutNumber();
      expect(num).toMatch(/^PO-\d{8}-[A-Z0-9]{6}$/);
    });

    it('uses given date', () => {
      const num = VendorIdGeneratorService.generatePayoutNumber(new Date('2026-01-15T00:00:00Z'));
      expect(num).toContain('20260115');
    });

    it('format is PO-YYYYMMDD-XXXXXX with specific date', () => {
      const num = VendorIdGeneratorService.generatePayoutNumber(new Date('2026-05-15T00:00:00Z'));
      expect(num).toMatch(/^PO-\d{8}-[A-Z0-9]{6}$/);
      expect(num).toContain('20260515');
    });
  });

  describe('generateSettlementNumber()', () => {
    it('matches ST-YYYYMMDD-XXXXXX pattern', () => {
      const num = VendorIdGeneratorService.generateSettlementNumber();
      expect(num).toMatch(/^ST-\d{8}-[A-Z0-9]{6}$/);
    });

    it('uses given date', () => {
      const num = VendorIdGeneratorService.generateSettlementNumber(new Date('2026-05-20T00:00:00Z'));
      expect(num).toContain('20260520');
    });

    it('format is ST-YYYYMMDD-XXXXXX with specific date', () => {
      const num = VendorIdGeneratorService.generateSettlementNumber(new Date('2026-05-15T00:00:00Z'));
      expect(num).toMatch(/^ST-\d{8}-[A-Z0-9]{6}$/);
    });
  });

  describe('generateInvoiceNumber()', () => {
    it('matches INV-YYYYMM-XXXXXXXXXX pattern', () => {
      const num = VendorIdGeneratorService.generateInvoiceNumber(1);
      expect(num).toMatch(/^INV-\d{6}-\d{10}$/);
    });

    it('pads sequence to 10 digits', () => {
      const num = VendorIdGeneratorService.generateInvoiceNumber(42);
      expect(num).toContain('0000000042');
    });

    it('throws on negative sequence', () => {
      expect(() => VendorIdGeneratorService.generateInvoiceNumber(-1)).toThrow(ValidationError);
    });

    it('throws on non-integer sequence', () => {
      expect(() => VendorIdGeneratorService.generateInvoiceNumber(1.5)).toThrow(ValidationError);
    });
  });

  describe('generateInviteToken()', () => {
    it('generates 32-char token', () => {
      const t = VendorIdGeneratorService.generateInviteToken();
      expect(t).toHaveLength(32);
    });

    it('generates unique tokens', () => {
      const a = VendorIdGeneratorService.generateInviteToken();
      const b = VendorIdGeneratorService.generateInviteToken();
      expect(a).not.toBe(b);
    });

    it('alphanumeric only', () => {
      const t = VendorIdGeneratorService.generateInviteToken();
      expect(t).toMatch(/^[A-Z0-9]+$/);
    });
  });

  describe('generateReportId()', () => {
    it('matches RPT-XXX-XXXXXXXXXX pattern', () => {
      const id = VendorIdGeneratorService.generateReportId();
      expect(id).toMatch(/^RPT-[A-Z0-9]{10}-[A-Z0-9]{10}$/);
    });

    it('generates unique report IDs', () => {
      const a = VendorIdGeneratorService.generateReportId();
      const b = VendorIdGeneratorService.generateReportId();
      expect(a).not.toBe(b);
    });
  });
});
