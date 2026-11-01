/**
 * CheckoutService — Unit Tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { CheckoutService } from '@application/services/impl/checkout.service.js';
import type { CheckoutRepository } from '@domain/repositories/checkout.repository.interface.js';
import { CheckoutNotFoundApplicationError } from '@application/errors/checkout.errors.js';
import { makeCheckoutEntityStub, FIXTURE_ID } from '@fixtures/application/entity-factories.js';

function makeRepo(): jest.Mocked<CheckoutRepository> {
  return {
    save: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    findByIdVO: jest.fn(),
    findByCustomer: jest.fn(),
    findByStatus: jest.fn(),
    findPaginated: jest.fn(),
    findExpired: jest.fn(),
    findAbandoned: jest.fn(),
    softDelete: jest.fn(),
  } as unknown as jest.Mocked<CheckoutRepository>;
}

describe('CheckoutService', () => {
  let service: CheckoutService;
  let repo: jest.Mocked<CheckoutRepository>;

  beforeEach(() => {
    repo = makeRepo();
    service = new CheckoutService(repo);
  });

  describe('start', () => {
    it('throws CheckoutNotFound (factory pending)', async () => {
      await expect(
        service.start({ cartId: FIXTURE_ID, email: 'x@y.com' } as never, 'user-1'),
      ).rejects.toThrow(CheckoutNotFoundApplicationError);
    });
  });

  describe('selectAddress', () => {
    it('saves entity', async () => {
      repo.findByIdVO.mockResolvedValue(makeCheckoutEntityStub());
      repo.save.mockResolvedValue(makeCheckoutEntityStub());
      await service.selectAddress({ checkoutId: FIXTURE_ID } as never);
      expect(repo.save).toHaveBeenCalled();
    });
  });

  describe('abandon', () => {
    it('calls entity.abandon then saves', async () => {
      const entity = makeCheckoutEntityStub();
      (entity as unknown as { abandon: (r?: string) => void }).abandon = jest.fn();
      repo.findByIdVO.mockResolvedValue(entity);
      repo.save.mockResolvedValue(entity);
      await service.abandon({ checkoutId: FIXTURE_ID, reason: 'changed mind' } as never);
      expect((entity as unknown as { abandon: () => void }).abandon).toHaveBeenCalled();
    });
  });

  describe('confirm', () => {
    it('returns success wrapper', async () => {
      repo.findByIdVO.mockResolvedValue(makeCheckoutEntityStub());
      repo.save.mockResolvedValue(makeCheckoutEntityStub());
      const result = await service.confirm({ checkoutId: FIXTURE_ID } as never);
      expect(result.success).toBe(true);
      expect(result.checkoutId).toBe(FIXTURE_ID);
    });
  });

  describe('getById', () => {
    it('throws NotFound when missing', async () => {
      repo.findByIdVO.mockResolvedValue(null);
      await expect(service.getById(FIXTURE_ID)).rejects.toThrow(CheckoutNotFoundApplicationError);
    });
  });
});
