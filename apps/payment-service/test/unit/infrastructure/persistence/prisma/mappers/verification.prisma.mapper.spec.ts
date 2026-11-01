/**
 * VerificationPrismaMapper — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { VerificationPrismaMapper } from '@infrastructure/mappers/verification.prisma.mapper';
import { VerificationEntity } from '@domain/entities/verification.entity';

const ROW = {
  id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
  paymentId: '11111111-1111-4111-8111-111111111111',
  status: 'pending',
  method: 'otp_sms',
  attempts: 0,
  expiresAt: new Date('2025-01-15T10:10:00.000Z'),
  verifiedAt: null,
  failureReason: null,
  createdAt: new Date('2025-01-15T10:00:00.000Z'),
  updatedAt: new Date('2025-01-15T10:00:00.000Z'),
  deletedAt: null,
};

describe('VerificationPrismaMapper', () => {
  it('maps a pending verification', () => {
    const entity = VerificationPrismaMapper.toDomain(ROW);
    expect(entity).toBeInstanceOf(VerificationEntity);
    expect(entity.status.isPending()).toBe(true);
    expect(entity.method.value).toBe('otp_sms');
    expect(entity.attempts).toBe(0);
    expect(entity.expiresAt).toBe('2025-01-15T10:10:00.000Z');
  });

  it('maps a verified verification', () => {
    const entity = VerificationPrismaMapper.toDomain({
      ...ROW,
      status: 'verified',
      attempts: 1,
      verifiedAt: new Date('2025-01-15T10:05:00.000Z'),
    });
    expect(entity.isVerified()).toBe(true);
    expect(entity.attempts).toBe(1);
    expect(entity.verifiedAt).toBe('2025-01-15T10:05:00.000Z');
  });

  it('maps failed with reason', () => {
    const entity = VerificationPrismaMapper.toDomain({
      ...ROW,
      status: 'failed',
      attempts: 3,
      failureReason: 'too_many_attempts',
    });
    expect(entity.failureReason).toBe('too_many_attempts');
  });

  it('round-trips via toPersistence', () => {
    const entity = VerificationPrismaMapper.toDomain(ROW);
    const data = VerificationPrismaMapper.toPersistence(entity);
    expect(data['status']).toBe('pending');
    expect(data['method']).toBe('otp_sms');
    expect(data['attempts']).toBe(0);
    expect(data['expiresAt']).toBeInstanceOf(Date);
  });
});
