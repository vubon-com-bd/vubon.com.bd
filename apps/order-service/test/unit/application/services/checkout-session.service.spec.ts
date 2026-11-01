/**
 * CheckoutSessionService — Unit Tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { CheckoutSessionService } from '@application/services/impl/checkout-session.service.js';
import type { CheckoutSessionRepository } from '@domain/repositories/checkout-session.repository.interface.js';
import { CheckoutSessionNotFoundApplicationError } from '@application/errors/checkout.errors.js';
import {
  makeCheckoutSessionEntityStub,
  FIXTURE_ID,
} from '@fixtures/application/entity-factories.js';

function makeRepo(): jest.Mocked<CheckoutSessionRepository> {
  return {
    save: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    findByCheckout: jest.fn(),
    findLatestByCheckout: jest.fn(),
    softDelete: jest.fn(),
  } as unknown as jest.Mocked<CheckoutSessionRepository>;
}

describe('CheckoutSessionService', () => {
  let service: CheckoutSessionService;
  let repo: jest.Mocked<CheckoutSessionRepository>;

  beforeEach(() => {
    repo = makeRepo();
    service = new CheckoutSessionService(repo);
  });

  describe('getById', () => {
    it('returns DTO', async () => {
      repo.findById.mockResolvedValue(
        makeCheckoutSessionEntityStub() as never,
      );
      const result = await service.getById(FIXTURE_ID);
      expect(result.id).toBe(FIXTURE_ID);
    });

    it('throws NotFound when missing', async () => {
      repo.findById.mockResolvedValue(null);
      await expect(service.getById(FIXTURE_ID)).rejects.toThrow(
        CheckoutSessionNotFoundApplicationError,
      );
    });
  });

  describe('getLatestByCheckout', () => {
    it('returns null when missing', async () => {
      repo.findLatestByCheckout.mockResolvedValue(null);
      const result = await service.getLatestByCheckout(FIXTURE_ID);
      expect(result).toBeNull();
    });

    it('returns DTO when found', async () => {
      repo.findLatestByCheckout.mockResolvedValue(
        makeCheckoutSessionEntityStub() as never,
      );
      const result = await service.getLatestByCheckout(FIXTURE_ID);
      expect(result).not.toBeNull();
    });
  });

  describe('listByCheckout', () => {
    it('returns array', async () => {
      repo.findByCheckout.mockResolvedValue([
        makeCheckoutSessionEntityStub() as never,
      ]);
      const result = await service.listByCheckout(FIXTURE_ID);
      expect(result.length).toBe(1);
    });
  });
});
