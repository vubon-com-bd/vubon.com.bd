import { ConfigureCommissionValidator } from '../../../../src/module/application/validators/configure-commission.validator.js';
import { CommissionCalculationFailedError } from '../../../../src/module/application/errors/commission.errors.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

function validDto(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    vendorId: UUID,
    type: 'percentage',
    percent: 10,
    currency: 'BDT',
    applyOnShipping: false,
    applyOnTax: false,
    ...overrides,
  };
}

describe('ConfigureCommissionValidator', () => {
  const validator = new ConfigureCommissionValidator();

  it('passes with valid dto', () => {
    expect(() => validator.validate(validDto() as never)).not.toThrow();
  });

  it('throws on missing vendorId', () => {
    expect(() => validator.validate(validDto({ vendorId: '' }) as never)).toThrow(
      CommissionCalculationFailedError,
    );
  });

  it('throws on percent below min', () => {
    expect(() => validator.validate(validDto({ percent: 0 }) as never)).toThrow(
      CommissionCalculationFailedError,
    );
  });

  it('throws on percent above max', () => {
    expect(() => validator.validate(validDto({ percent: 51 }) as never)).toThrow(
      CommissionCalculationFailedError,
    );
  });

  it('throws on invalid currency', () => {
    expect(() => validator.validate(validDto({ currency: 'AB' }) as never)).toThrow(
      CommissionCalculationFailedError,
    );
  });

  it('throws when FIXED missing fixedAmount', () => {
    expect(() => validator.validate(validDto({ type: 'fixed' }) as never)).toThrow(
      CommissionCalculationFailedError,
    );
  });

  it('passes when HYBRID has fixedAmount', () => {
    expect(() =>
      validator.validate(validDto({ type: 'hybrid', fixedAmount: 50 }) as never),
    ).not.toThrow();
  });

  it('throws on invalid effectiveFrom', () => {
    expect(() => validator.validate(validDto({ effectiveFrom: 'bad' }) as never)).toThrow(
      CommissionCalculationFailedError,
    );
  });

  it('throws when effectiveTo <= effectiveFrom', () => {
    expect(() =>
      validator.validate(
        validDto({
          effectiveFrom: '2026-01-02T00:00:00Z',
          effectiveTo: '2026-01-01T00:00:00Z',
        }) as never,
      ),
    ).toThrow(CommissionCalculationFailedError);
  });
});
