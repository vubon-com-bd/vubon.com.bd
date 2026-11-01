/**
 * VerificationService — Unit Tests (full branch coverage)
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';

jest.mock('@nestjs/common', () => ({
  Injectable: () => (target: unknown) => target,
  Inject: () => () => undefined,
  Logger: class {
    log(): void {}
    error(): void {}
    warn(): void {}
    debug(): void {}
    verbose(): void {}
  },
}));

import { VerificationService } from '@application/services/impl/verification.service';
import type { VerificationRepository } from '@domain/repositories/verification.repository.interface';
import { VerificationEntity } from '@domain/entities/verification.entity';
import { VerificationIdVO } from '@domain/primitives/verification-id.vo';
import { VerificationMethodVO } from '@domain/primitives/verification-method.vo';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';
import { VALID_PAYMENT_ID } from '@app-fixtures/payment-entity.fixture';

const VERIFICATION_ID = 'a23e4567-e89b-42d3-a456-426614174099';

function makeMockRepo() {
  return {
    save: jest.fn(),
    findByIdVO: jest.fn(),
    findByPayment: jest.fn(),
    findPending: jest.fn(),
    findExpired: jest.fn(),
    findPaginated: jest.fn(),
    findStale: jest.fn(),
    findById: jest.fn(),
    findAll: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
    softDelete: jest.fn(),
  };
}

function makeEntity() {
  return VerificationEntity.create({
    id: VerificationIdVO.create(VERIFICATION_ID),
    now: '2025-01-15T10:00:00.000Z',
    props: {
      paymentId: PaymentIdVO.create(VALID_PAYMENT_ID),
      method: VerificationMethodVO.create('otp_sms'),
      expiresAt: '2030-01-15T10:00:00.000Z',
    },
  });
}

describe('VerificationService', () => {
  let service: VerificationService;
  let mockRepo: ReturnType<typeof makeMockRepo>;

  beforeEach(() => {
    mockRepo = makeMockRepo();
    service = new VerificationService(mockRepo as unknown as VerificationRepository);
  });

  describe('initiate', () => {
    it('should initiate with custom TTL', async () => {
      mockRepo.save.mockImplementation(async (e: unknown) => e);
      const result = await service.initiate(
        { paymentId: VALID_PAYMENT_ID, method: 'otp_sms', ttlSeconds: 600 },
        'user-1',
      );
      expect(result.success).toBe(true);
      expect(result.verificationId).toBeDefined();
      expect(result.status).toBe('pending');
    });

    it('should initiate with default TTL', async () => {
      mockRepo.save.mockImplementation(async (e: unknown) => e);
      const result = await service.initiate({
        paymentId: VALID_PAYMENT_ID,
        method: 'otp_email',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('verify', () => {
    it('should record attempt and mark verified', async () => {
      mockRepo.findByIdVO.mockResolvedValue(makeEntity());
      mockRepo.save.mockImplementation(async (e: unknown) => e);
      const result = await service.verify(
        { verificationId: VERIFICATION_ID, code: '123456' },
        'user-1',
      );
      expect(result.status).toBe('verified');
      expect(result.attempts).toBe(1);
    });

    it('should throw on not found', async () => {
      mockRepo.findByIdVO.mockResolvedValue(null);
      await expect(
        service.verify({ verificationId: VERIFICATION_ID, code: '123' }, 'user-1'),
      ).rejects.toThrow();
    });
  });

  describe('getById', () => {
    it('should return DTO', async () => {
      mockRepo.findByIdVO.mockResolvedValue(makeEntity());
      const dto = await service.getById(VERIFICATION_ID);
      expect(dto.id).toBe(VERIFICATION_ID);
    });

    it('should throw on not found', async () => {
      mockRepo.findByIdVO.mockResolvedValue(null);
      await expect(service.getById(VERIFICATION_ID)).rejects.toThrow();
    });
  });

  describe('listByPayment', () => {
    it('should return empty', async () => {
      mockRepo.findByPayment.mockResolvedValue([]);
      expect(await service.listByPayment(VALID_PAYMENT_ID)).toHaveLength(0);
    });

    it('should return one', async () => {
      mockRepo.findByPayment.mockResolvedValue([makeEntity()]);
      expect(await service.listByPayment(VALID_PAYMENT_ID)).toHaveLength(1);
    });
  });
});
