/**
 * Vendor HTTP request validators (Zod schemas)
 */
import {
  VendorIdParamSchema,
  RegisterVendorHttpSchema,
  UpdateVendorHttpSchema,
  SuspendVendorHttpSchema,
  RejectVendorHttpSchema,
  ApproveVendorHttpSchema,
} from '../../../../src/module/interfaces/validators/vendor-request.validators.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

describe('HTTP request validators', () => {
  describe('VendorIdParamSchema', () => {
    it('accepts valid UUID', () => {
      expect(VendorIdParamSchema.safeParse({ vendorId: UUID }).success).toBe(true);
    });

    it('rejects non-UUID', () => {
      expect(VendorIdParamSchema.safeParse({ vendorId: 'not-uuid' }).success).toBe(false);
    });
  });

  describe('RegisterVendorHttpSchema', () => {
    const valid = {
      ownerId: UUID,
      businessName: 'Acme Store',
      displayName: 'Acme',
      vendorType: 'individual',
      businessType: 'retailer',
      contactEmail: 'shop@acme.com',
      contactPhone: '01712345678',
      addressLine1: '123 Main Street',
      division: 'Dhaka',
      district: 'Dhaka',
      acceptTerms: true,
    };

    it('accepts valid input', () => {
      expect(RegisterVendorHttpSchema.safeParse(valid).success).toBe(true);
    });

    it('accepts with optional fields', () => {
      expect(RegisterVendorHttpSchema.safeParse({ ...valid, slug: 'acme', postalCode: '1340' }).success).toBe(true);
    });

    it('rejects missing required fields', () => {
      expect(RegisterVendorHttpSchema.safeParse({}).success).toBe(false);
    });

    it('rejects invalid email', () => {
      expect(RegisterVendorHttpSchema.safeParse({ ...valid, contactEmail: 'bad' }).success).toBe(false);
    });

    it('rejects acceptTerms=false', () => {
      expect(RegisterVendorHttpSchema.safeParse({ ...valid, acceptTerms: false }).success).toBe(false);
    });

    it('rejects short businessName', () => {
      expect(RegisterVendorHttpSchema.safeParse({ ...valid, businessName: 'A' }).success).toBe(false);
    });

    it('rejects invalid postalCode', () => {
      expect(RegisterVendorHttpSchema.safeParse({ ...valid, postalCode: 'ABC' }).success).toBe(false);
    });

    it('accepts input (extra fields are ignored by default)', () => {
      const result = RegisterVendorHttpSchema.safeParse({ ...valid, extraField: 'x' });
      expect(result.success).toBe(true);
    });
  });

  describe('UpdateVendorHttpSchema', () => {
    it('accepts empty object', () => {
      expect(UpdateVendorHttpSchema.safeParse({}).success).toBe(true);
    });

    it('accepts partial', () => {
      expect(UpdateVendorHttpSchema.safeParse({ name: 'New Name' }).success).toBe(true);
    });

    it('rejects invalid logo URL', () => {
      expect(UpdateVendorHttpSchema.safeParse({ logoUrl: 'not-url' }).success).toBe(false);
    });

    it('rejects short name', () => {
      expect(UpdateVendorHttpSchema.safeParse({ name: 'A' }).success).toBe(false);
    });
  });

  describe('SuspendVendorHttpSchema', () => {
    it('accepts valid', () => {
      expect(
        SuspendVendorHttpSchema.safeParse({
          reason: 'policy',
          durationDays: 30,
          suspendedBy: UUID,
        }).success,
      ).toBe(true);
    });

    it('rejects duration out of range', () => {
      expect(
        SuspendVendorHttpSchema.safeParse({
          reason: 'policy',
          durationDays: 500,
          suspendedBy: UUID,
        }).success,
      ).toBe(false);
    });

    it('rejects short reason', () => {
      expect(
        SuspendVendorHttpSchema.safeParse({
          reason: 'ab',
          durationDays: 30,
          suspendedBy: UUID,
        }).success,
      ).toBe(false);
    });
  });

  describe('RejectVendorHttpSchema', () => {
    it('accepts valid', () => {
      expect(
        RejectVendorHttpSchema.safeParse({
          reviewedBy: UUID,
          reason: 'invalid_documents',
        }).success,
      ).toBe(true);
    });

    it('rejects missing reviewedBy', () => {
      expect(
        RejectVendorHttpSchema.safeParse({ reason: 'invalid_documents' }).success,
      ).toBe(false);
    });
  });

  describe('ApproveVendorHttpSchema', () => {
    it('accepts valid', () => {
      expect(ApproveVendorHttpSchema.safeParse({ reviewedBy: UUID }).success).toBe(true);
    });

    it('rejects missing reviewedBy', () => {
      expect(ApproveVendorHttpSchema.safeParse({}).success).toBe(false);
    });
  });
});
