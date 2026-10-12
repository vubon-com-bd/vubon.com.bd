import { RequestPayoutValidator } from '../../../../src/module/application/validators/request-payout.validator.js';
import { PayoutLimitExceededError } from '../../../../src/module/application/errors/payout.errors.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

function validDto(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    vendorId: UUID,
    amount: 5000,
    currency: 'BDT',
    idempotencyKey: 'req-12345678901',
    ...overrides,
  };
}

describe('RequestPayoutValidator', () => {
  const validator = new RequestPayoutValidator();

  it('passes with valid dto', () => {
    expect(() => validator.validate(validDto() as never)).not.toThrow();
  });

  it('throws on missing vendorId', () => {
    expect(() => validator.validate(validDto({ vendorId: '' }) as never)).toThrow(
      PayoutLimitExceededError,
    );
  });

  it('throws on non-numeric amount', () => {
    expect(() => validator.validate(validDto({ amount: 'abc' }) as never)).toThrow(
      PayoutLimitExceededError,
    );
  });

  it('throws on amount below min', () => {
    expect(() => validator.validate(validDto({ amount: 50 }) as never)).toThrow(
      PayoutLimitExceededError,
    );
  });

  it('throws on amount above max', () => {
    expect(() => validator.validate(validDto({ amount: 99999999999 }) as never)).toThrow(
      PayoutLimitExceededError,
    );
  });

  it('throws on invalid currency', () => {
    expect(() => validator.validate(validDto({ currency: 'AB' }) as never)).toThrow(
      PayoutLimitExceededError,
    );
  });

  it('throws on short idempotency key', () => {
    expect(() => validator.validate(validDto({ idempotencyKey: 'short' }) as never)).toThrow(
      PayoutLimitExceededError,
    );
  });
});
