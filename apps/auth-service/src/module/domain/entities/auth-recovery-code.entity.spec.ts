/**
 * AuthRecoveryCodeEntity — Unit Tests
 * @module auth-service/domain/entities
 */
import { AuthRecoveryCodeEntity } from './auth-recovery-code.entity';
import { RecoveryCodeVO } from '../value-objects/primitives/recovery-code.vo';
import { RecoveryCodeStatusVO } from '../value-objects/primitives/recovery-code-status.vo';

const NOW = '2024-01-01T00:00:00.000Z';
const NOW_MS = new Date(NOW).getTime();

const buildCode = (
  overrides: Partial<Parameters<typeof AuthRecoveryCodeEntity.create>[0]> = {},
) =>
  AuthRecoveryCodeEntity.create({
    id: 'rc-1',
    userId: 'user-1' as never,
    code: RecoveryCodeVO.of('ABCD-1234'),
    status: RecoveryCodeStatusVO.active(),
    createdAt: NOW,
    updatedAt: NOW,
    ...overrides,
  });

describe('AuthRecoveryCodeEntity', () => {
  describe('create()', () => {
    it('should create active recovery code', () => {
      const c = buildCode();
      expect(c.userId).toBe('user-1');
      expect(c.status.value).toBe('active');
    });
  });

  describe('isUsable()', () => {
    it('should return true for active', () => {
      expect(buildCode().isUsable()).toBe(true);
    });

    it('should return false for used', () => {
      const c = buildCode({ status: RecoveryCodeStatusVO.of('used') });
      expect(c.isUsable()).toBe(false);
    });

    it('should return false for expired', () => {
      const c = buildCode({ status: RecoveryCodeStatusVO.of('expired') });
      expect(c.isUsable()).toBe(false);
    });
  });

  describe('use()', () => {
    it('should set status to used', () => {
      const c = buildCode();
      c.use(NOW_MS);
      expect(c.status.value).toBe('used');
      expect(c.usedAt).toBe(NOW_MS);
    });

    it('should throw if already used', () => {
      const c = buildCode({ status: RecoveryCodeStatusVO.of('used') });
      expect(() => c.use(NOW_MS)).toThrow('already used');
    });

    it('should throw if expired', () => {
      const c = buildCode({ status: RecoveryCodeStatusVO.of('expired') });
      expect(() => c.use(NOW_MS)).toThrow('already used');
    });
  });

  describe('getters', () => {
    it('should expose status', () => {
      expect(buildCode().status.value).toBe('active');
    });

    it('should expose usedAt as undefined initially', () => {
      expect(buildCode().usedAt).toBeUndefined();
    });
  });
});
