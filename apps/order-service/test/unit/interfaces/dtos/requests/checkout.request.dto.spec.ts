/**
 * Checkout HTTP Request DTOs
 * @module order-service/test/unit/interfaces/dtos/requests
 */
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import {
  StartCheckoutHttpDTO,
  SelectShippingHttpDTO,
  SelectPaymentHttpDTO,
  ConfirmCheckoutHttpDTO,
} from '@interfaces/dtos/requests/checkout.request.dto.js';

async function validateDto<T extends object>(
  cls: new () => T,
  plain: Record<string, unknown>,
): Promise<string[]> {
  const i = plainToInstance(cls, plain);
  const errs = await validate(i as object, { forbidUnknownValues: false, whitelist: false });
  return errs.map((e) => e.property);
}

describe('StartCheckoutHttpDTO', () => {
  it('should pass for valid', async () => {
    const errs = await validateDto(StartCheckoutHttpDTO, {
      cartId: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
      email: 'test@example.com',
    });
    expect(errs).toEqual([]);
  });

  it('should reject invalid email', async () => {
    const errs = await validateDto(StartCheckoutHttpDTO, {
      cartId: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
      email: 'invalid',
    });
    expect(errs).toContain('email');
  });

  it('should reject missing cartId', async () => {
    const errs = await validateDto(StartCheckoutHttpDTO, { email: 'test@example.com' });
    expect(errs).toContain('cartId');
  });
});

describe('SelectShippingHttpDTO', () => {
  it('should pass valid', async () => {
    const errs = await validateDto(SelectShippingHttpDTO, {
      shippingMethodId: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
    });
    expect(errs).toEqual([]);
  });

  it('should reject missing shippingMethodId', async () => {
    const errs = await validateDto(SelectShippingHttpDTO, {});
    expect(errs).toContain('shippingMethodId');
  });
});

describe('SelectPaymentHttpDTO', () => {
  it('should pass', async () => {
    expect(await validateDto(SelectPaymentHttpDTO, { paymentMethod: 'bkash' })).toEqual([]);
  });

  it('should reject empty payment method', async () => {
    const errs = await validateDto(SelectPaymentHttpDTO, { paymentMethod: '' });
    expect(errs).toContain('paymentMethod');
  });
});

describe('ConfirmCheckoutHttpDTO', () => {
  it('should pass with required fields', async () => {
    const errs = await validateDto(ConfirmCheckoutHttpDTO, {
      paymentMethod: 'bkash',
      acceptTerms: true,
    });
    expect(errs).toEqual([]);
  });

  it('should reject missing paymentMethod', async () => {
    const errs = await validateDto(ConfirmCheckoutHttpDTO, { acceptTerms: true });
    expect(errs).toContain('paymentMethod');
  });
});
