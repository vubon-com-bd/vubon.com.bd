/**
 * AuthRecoveryCodeVO — Unit Tests
 * @module auth-service/domain/value-objects/composites
 */
import { AuthRecoveryCodeVO } from './auth-recovery-code.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { RecoveryCodeVO } from '../primitives/recovery-code.vo';
import { RecoveryCodeStatusVO } from '../primitives/recovery-code-status.vo';

describe('AuthRecoveryCodeVO', () => {
  const userId = UserIdVO.of('user-1');
  const code = RecoveryCodeVO.of('ABCD-1234');
  const now = Date.now();

  describe('of()', () => {
    it('should create active recovery code', () => {
      const vo = AuthRecoveryCodeVO.of({
        codeId: 'rc-1',
        userId,
        code,
        status: RecoveryCodeStatusVO.of('active'),
        createdAt: now,
      });
      expect(vo.isUsable()).toBe(true);
    });

    it('should create used recovery code', () => {
      const vo = AuthRecoveryCodeVO.of({
        codeId: 'rc-1',
        userId,
        code,
        status: RecoveryCodeStatusVO.of('used'),
        createdAt: now,
        usedAt: now + 1000,
      });
      expect(vo.isUsable()).toBe(false);
    });
  });

  describe('isUsable()', () => {
    it('should return true for active', () => {
      const vo = AuthRecoveryCodeVO.of({
        codeId: 'rc-1', userId, code,
        status: RecoveryCodeStatusVO.of('active'), createdAt: now,
      });
      expect(vo.isUsable()).toBe(true);
    });

    it('should return false for used', () => {
      const vo = AuthRecoveryCodeVO.of({
        codeId: 'rc-1', userId, code,
        status: RecoveryCodeStatusVO.of('used'), createdAt: now,
      });
      expect(vo.isUsable()).toBe(false);
    });

    it('should return false for expired', () => {
      const vo = AuthRecoveryCodeVO.of({
        codeId: 'rc-1', userId, code,
        status: RecoveryCodeStatusVO.of('expired'), createdAt: now,
      });
      expect(vo.isUsable()).toBe(false);
    });
  });
});
