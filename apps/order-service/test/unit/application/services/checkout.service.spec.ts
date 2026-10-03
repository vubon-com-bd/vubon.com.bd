/**
 * CheckoutService tests (mock CheckoutRepository)
 */
import { jest } from '@jest/globals';
import { CheckoutService } from '../../../../src/module/application/services/impl/checkout.service.js';
import { CheckoutEntity } from '../../../../src/module/domain/entities/checkout.entity.js';
import { CheckoutStatusVO } from '../../../../src/module/domain/value-objects/primitives/checkout-status.vo.js';
import { CheckoutStepVO } from '../../../../src/module/domain/value-objects/primitives/checkout-step.vo.js';
import { CustomerIdVO } from '../../../../src/module/domain/value-objects/primitives/customer-id.vo.js';
import { CHECKOUT_STEP } from '@vubon/shared-constants/business/checkout';
import {
  CheckoutNotFoundApplicationError,
  CheckoutStartError,
} from '../../../../src/module/application/errors/checkout.errors.js';

const NOW = '2026-01-01T10:00:00Z';
const FUTURE = '2027-01-01T10:00:00Z';
const UUID_CHECKOUT = '77777777-7777-4777-8777-777777777777';
const UUID_CUSTOMER = '22222222-2222-4222-8222-222222222222';

function makeCheckout(): CheckoutEntity {
  return CheckoutEntity.create({
    id: UUID_CHECKOUT,
    now: NOW,
    props: {
      customerId: CustomerIdVO.create(UUID_CUSTOMER),
      status: CheckoutStatusVO.pending(),
      currentStep: CheckoutStepVO.create(CHECKOUT_STEP.CART_REVIEW),
      type: 'registered',
      currency: 'BDT',
      subtotal: 0,
      discountAmount: 0,
      taxAmount: 0,
      shippingAmount: 0,
      total: 0,
      expiresAt: FUTURE,
    },
  });
}

function makeMockCheckoutRepo() {
  return {
    findById: jest.fn().mockResolvedValue(null),
    findByIdVO: jest.fn().mockResolvedValue(null),
    findByCustomerId: jest.fn().mockResolvedValue([]),
    findActiveByCustomer: jest.fn().mockResolvedValue(null),
    findByCartId: jest.fn().mockResolvedValue(null),
    findByStatus: jest.fn().mockResolvedValue([]),
    findByOrderId: jest.fn().mockResolvedValue(null),
    findExpired: jest.fn().mockResolvedValue([]),
    findAll: jest.fn().mockResolvedValue([]),
    exists: jest.fn().mockResolvedValue(false),
    save: jest.fn().mockImplementation(async (c: CheckoutEntity) => c),
    delete: jest.fn().mockResolvedValue(undefined),
    softDelete: jest.fn().mockResolvedValue(undefined),
  };
}

describe('CheckoutService', () => {
  let repo: ReturnType<typeof makeMockCheckoutRepo>;
  let service: CheckoutService;

  beforeEach(() => {
    repo = makeMockCheckoutRepo();
    service = new CheckoutService(repo as never);
  });

  describe('start()', () => {
    it('requires actorId (auth)', async () => {
      await expect(
        service.start({
          email: 'c@example.com',
          cartId: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
        } as never),
      ).rejects.toThrow(CheckoutStartError);
    });

    it('creates checkout with actorId', async () => {
      const result = await service.start(
        { email: 'c@example.com', cartId: '7c9e6679-7425-40de-944b-e07fc1f90ae7' } as never,
        UUID_CUSTOMER,
      );
      expect(repo.save).toHaveBeenCalled();
      expect(result.customerId).toBe(UUID_CUSTOMER);
      expect(result.status).toBe('pending');
    });
  });

  describe('selectAddress()', () => {
    it('updates shipping address and step', async () => {
      repo.findById.mockResolvedValue(makeCheckout());
      const result = await service.selectAddress({
        checkoutId: UUID_CHECKOUT,
        shippingAddress: {
          line1: '123 Main',
          city: 'Dhaka',
          country: 'BD',
        },
      } as never);
      expect(result.currentStep).toBe(CHECKOUT_STEP.SHIPPING_METHOD);
    });

    it('throws when not found', async () => {
      repo.findById.mockResolvedValue(null);
      await expect(
        service.selectAddress({ checkoutId: 'x', shippingAddress: {} } as never),
      ).rejects.toThrow(CheckoutNotFoundApplicationError);
    });
  });

  describe('selectShipping()', () => {
    it('sets shipping method', async () => {
      const c = makeCheckout();
      c.selectAddress(
        // build shipping line via internal API
        {
          value: {
            fullName: 'J', phone: '017', line1: 'x', city: 'Dhaka', country: 'BD',
          },
        } as never,
        undefined,
        NOW,
      );
      repo.findById.mockResolvedValue(c);
      const result = await service.selectShipping({
        checkoutId: UUID_CHECKOUT,
        shippingMethodId: 'std',
      } as never);
      expect(result.shippingMethodId).toBe('std');
    });
  });

  describe('selectPayment()', () => {
    it('requires shipping first', async () => {
      repo.findById.mockResolvedValue(makeCheckout());
      await expect(
        service.selectPayment({
          checkoutId: UUID_CHECKOUT,
          paymentMethod: 'card',
        } as never),
      ).rejects.toThrow();
    });
  });

  describe('confirm()', () => {
    it('throws when checkout not ready', async () => {
      repo.findById.mockResolvedValue(makeCheckout());
      await expect(
        service.confirm({ checkoutId: UUID_CHECKOUT } as never),
      ).rejects.toThrow();
    });
  });

  describe('abandon()', () => {
    it('marks as abandoned', async () => {
      repo.findById.mockResolvedValue(makeCheckout());
      const result = await service.abandon({ checkoutId: UUID_CHECKOUT } as never);
      expect(result.status).toBe('abandoned');
    });
  });

  describe('getById()', () => {
    it('returns DTO', async () => {
      repo.findById.mockResolvedValue(makeCheckout());
      const result = await service.getById(UUID_CHECKOUT);
      expect(result.id).toBe(UUID_CHECKOUT);
    });

    it('throws when not found', async () => {
      repo.findById.mockResolvedValue(null);
      await expect(service.getById('x')).rejects.toThrow(CheckoutNotFoundApplicationError);
    });
  });

  describe('getActiveByCustomer()', () => {
    it('returns null when none', async () => {
      repo.findActiveByCustomer.mockResolvedValue(null);
      const result = await service.getActiveByCustomer(UUID_CUSTOMER);
      expect(result).toBeNull();
    });

    it('returns DTO when found', async () => {
      repo.findActiveByCustomer.mockResolvedValue(makeCheckout());
      const result = await service.getActiveByCustomer(UUID_CUSTOMER);
      expect(result?.id).toBe(UUID_CHECKOUT);
    });
  });
});
