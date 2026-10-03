/**
 * CheckoutSessionService tests
 */
import { jest } from '@jest/globals';
import { CheckoutSessionService } from '../../../../src/module/application/services/impl/checkout-session.service.js';
import { CheckoutSessionEntity } from '../../../../src/module/domain/entities/checkout-session.entity.js';
import { CheckoutIdVO } from '../../../../src/module/domain/value-objects/primitives/checkout-id.vo.js';
import { CustomerIdVO } from '../../../../src/module/domain/value-objects/primitives/customer-id.vo.js';
import { CheckoutSessionNotFoundApplicationError } from '../../../../src/module/application/errors/checkout.errors.js';

const NOW = '2026-01-01T10:00:00Z';
const FUTURE = '2027-01-01T10:00:00Z';
const UUID_CHECKOUT = '77777777-7777-4777-8777-777777777777';
const UUID_CUSTOMER = '22222222-2222-4222-8222-222222222222';
const SESSION_ID = '88888888-8888-4888-8888-888888888888';

function makeSession(): CheckoutSessionEntity {
  return CheckoutSessionEntity.create({
    id: SESSION_ID,
    now: NOW,
    props: {
      checkoutId: CheckoutIdVO.create(UUID_CHECKOUT),
      customerId: CustomerIdVO.create(UUID_CUSTOMER),
      token: 'a'.repeat(32),
      expiresAt: FUTURE,
    },
  });
}

function makeMockRepo() {
  return {
    findById: jest.fn().mockResolvedValue(null),
    findByCheckoutId: jest.fn().mockResolvedValue(null),
    findByToken: jest.fn().mockResolvedValue(null),
    findByCustomerId: jest.fn().mockResolvedValue([]),
    findExpired: jest.fn().mockResolvedValue([]),
    findAll: jest.fn().mockResolvedValue([]),
    exists: jest.fn().mockResolvedValue(false),
    save: jest.fn().mockImplementation(async (s: CheckoutSessionEntity) => s),
    delete: jest.fn().mockResolvedValue(undefined),
    deleteByCheckoutId: jest.fn().mockResolvedValue(undefined),
  };
}

describe('CheckoutSessionService', () => {
  let repo: ReturnType<typeof makeMockRepo>;
  let service: CheckoutSessionService;

  beforeEach(() => {
    repo = makeMockRepo();
    service = new CheckoutSessionService(repo as never);
  });

  describe('create()', () => {
    it('creates session with token', async () => {
      const result = await service.create(UUID_CHECKOUT, UUID_CUSTOMER);
      expect(repo.save).toHaveBeenCalled();
      expect(result.checkoutId).toBe(UUID_CHECKOUT);
      expect(result.customerId).toBe(UUID_CUSTOMER);
      expect(result.token.length).toBeGreaterThan(16);
      expect(result.isExpired).toBe(false);
    });
  });

  describe('getById()', () => {
    it('returns DTO', async () => {
      repo.findById.mockResolvedValue(makeSession());
      const result = await service.getById(SESSION_ID);
      expect(result.id).toBe(SESSION_ID);
    });

    it('throws when missing', async () => {
      repo.findById.mockResolvedValue(null);
      await expect(service.getById('x')).rejects.toThrow(CheckoutSessionNotFoundApplicationError);
    });
  });

  describe('getByToken()', () => {
    it('returns DTO', async () => {
      repo.findByToken.mockResolvedValue(makeSession());
      const result = await service.getByToken('a'.repeat(32));
      expect(result.id).toBe(SESSION_ID);
    });

    it('throws when missing', async () => {
      repo.findByToken.mockResolvedValue(null);
      await expect(service.getByToken('bad')).rejects.toThrow(CheckoutSessionNotFoundApplicationError);
    });
  });

  describe('getByCheckoutId()', () => {
    it('returns null when none', async () => {
      repo.findByCheckoutId.mockResolvedValue(null);
      const result = await service.getByCheckoutId(UUID_CHECKOUT);
      expect(result).toBeNull();
    });
  });

  describe('deleteByCheckoutId()', () => {
    it('delegates to repo', async () => {
      await service.deleteByCheckoutId(UUID_CHECKOUT);
      expect(repo.deleteByCheckoutId).toHaveBeenCalled();
    });
  });
});
