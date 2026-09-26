/**
 * UserVerificationEntity — Unit Tests
 * @module auth-service/domain/entities
 */
import { UserVerificationEntity } from './user-verification.entity';
import { VerificationCodeVO } from '../value-objects/primitives/verification-code.vo';
import { VerificationTypeVO } from '../value-objects/primitives/verification-type.vo';
import { VerificationStatusVO } from '../value-objects/primitives/verification-status.vo';

const NOW = '2024-01-01T00:00:00.000Z';
const NOW_MS = new Date(NOW).getTime();

const buildVerification = (
  overrides: Partial<Parameters<typeof UserVerificationEntity.create>[0]> = {},
) =>
  UserVerificationEntity.create({
    id: 'ver-1',
    userId: 'user-1' as never,
    type: VerificationTypeVO.of('email'),
    code: VerificationCodeVO.of('123456'),
    status: VerificationStatusVO.pending(),
    expiresAt: NOW_MS + 15 * 60 * 1000,
    createdAt: NOW,
    updatedAt: NOW,
    ...overrides,
  });

describe('UserVerificationEntity', () => {
  describe('create()', () => {
    it('should create a pending verification', () => {
      const v = buildVerification();
      expect(v.type.value).toBe('email');
      expect(v.status.value).toBe('pending');
      expect(v.expiresAt).toBe(NOW_MS + 15 * 60 * 1000);
    });
  });

  describe('isExpired()', () => {
    it('should return false before expiry', () => {
      const v = buildVerification();
      expect(v.isExpired(NOW_MS)).toBe(false);
    });

    it('should return true after expiry', () => {
      const v = buildVerification();
      expect(v.isExpired(NOW_MS + 20 * 60 * 1000)).toBe(true);
    });

    it('should return true at exactly expiry time', () => {
      const v = buildVerification();
      expect(v.isExpired(NOW_MS + 15 * 60 * 1000)).toBe(true);
    });
  });

  describe('verify()', () => {
    it('should verify with correct code', () => {
      const v = buildVerification();
      v.verify(VerificationCodeVO.of('123456'), NOW_MS);
      expect(v.status.value).toBe('verified');
    });

    it('should reject wrong code', () => {
      const v = buildVerification();
      expect(() => v.verify(VerificationCodeVO.of('654321'), NOW_MS))
        .toThrow('mismatch');
    });

    it('should reject expired verification', () => {
      const v = buildVerification();
      expect(() => v.verify(VerificationCodeVO.of('123456'), NOW_MS + 20 * 60 * 1000))
        .toThrow('expired');
    });

    it('should set status to expired on expiry', () => {
      const v = buildVerification();
      try {
        v.verify(VerificationCodeVO.of('123456'), NOW_MS + 20 * 60 * 1000);
      } catch {
        // expected
      }
      expect(v.status.value).toBe('expired');
    });
  });

  describe('reject()', () => {
    it('should set status to rejected', () => {
      const v = buildVerification();
      v.reject();
      expect(v.status.value).toBe('rejected');
    });
  });
});
