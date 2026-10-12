import { RegisterVendorValidator } from '../../../../src/module/application/validators/register-vendor.validator.js';
import { VendorRegistrationFailedError } from '../../../../src/module/application/errors/vendor.errors.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

function validDto(overrides: Partial<Record<string, unknown>> = {}): Record<string, unknown> {
  return {
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
    ...overrides,
  };
}

describe('RegisterVendorValidator', () => {
  const validator = new RegisterVendorValidator();

  it('passes with valid dto', () => {
    expect(() => validator.validate(validDto() as never)).not.toThrow();
  });

  it('throws on missing ownerId', () => {
    expect(() => validator.validate(validDto({ ownerId: '' }) as never)).toThrow(
      VendorRegistrationFailedError,
    );
  });

  it('throws on short businessName', () => {
    expect(() => validator.validate(validDto({ businessName: 'A' }) as never)).toThrow(
      VendorRegistrationFailedError,
    );
  });

  it('throws on short displayName', () => {
    expect(() => validator.validate(validDto({ displayName: 'A' }) as never)).toThrow(
      VendorRegistrationFailedError,
    );
  });

  it('throws on invalid contactEmail', () => {
    expect(() => validator.validate(validDto({ contactEmail: 'invalid' }) as never)).toThrow(
      VendorRegistrationFailedError,
    );
  });

  it('throws on short contactPhone', () => {
    expect(() => validator.validate(validDto({ contactPhone: '12' }) as never)).toThrow(
      VendorRegistrationFailedError,
    );
  });

  it('throws on short addressLine1', () => {
    expect(() => validator.validate(validDto({ addressLine1: 'A' }) as never)).toThrow(
      VendorRegistrationFailedError,
    );
  });

  it('throws when division missing', () => {
    expect(() => validator.validate(validDto({ division: '' }) as never)).toThrow(
      VendorRegistrationFailedError,
    );
  });

  it('throws when district missing', () => {
    expect(() => validator.validate(validDto({ district: '' }) as never)).toThrow(
      VendorRegistrationFailedError,
    );
  });

  it('throws when acceptTerms false', () => {
    expect(() => validator.validate(validDto({ acceptTerms: false }) as never)).toThrow(
      VendorRegistrationFailedError,
    );
  });

  it('throws on too many documents', () => {
    expect(() =>
      validator.validate(
        validDto({
          documents: new Array(25).fill({ type: 'tax_id', url: 'https://x.com/a.pdf' }),
        }) as never,
      ),
    ).toThrow(VendorRegistrationFailedError);
  });

  it('throws on invalid document URL', () => {
    expect(() =>
      validator.validate(
        validDto({
          documents: [{ type: 'tax_id', url: 'not-a-url' }],
        }) as never,
      ),
    ).toThrow(VendorRegistrationFailedError);
  });

  it('throws on duplicate document type', () => {
    expect(() =>
      validator.validate(
        validDto({
          documents: [
            { type: 'tax_id', url: 'https://x.com/a.pdf' },
            { type: 'tax_id', url: 'https://x.com/b.pdf' },
          ],
        }) as never,
      ),
    ).toThrow(VendorRegistrationFailedError);
  });

  it('requiresDocumentType returns true for required types', () => {
    expect(validator.requiresDocumentType('business_license')).toBe(true);
    expect(validator.requiresDocumentType('tax_id')).toBe(true);
    expect(validator.requiresDocumentType('other')).toBe(false);
  });
});
