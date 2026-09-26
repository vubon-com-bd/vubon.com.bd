/**
 * Auth2FaVO — Unit Tests
 * @module auth-service/domain/value-objects/composites
 */
import { Auth2FaVO } from './auth-2fa.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { MfaTypeVO } from '../primitives/mfa-type.vo';

describe('Auth2FaVO', () => {
  const userId = UserIdVO.of('user-1');
  const now = Date.now();

  describe('of()', () => {
    it('should create 2FA without backup', () => {
      const vo = Auth2FaVO.of({
        userId,
        primaryMethod: MfaTypeVO.of('totp'),
        backupMethods: [],
        enabledAt: now,
      });
      expect(vo.isEnabled()).toBe(true);
      expect(vo.hasBackup()).toBe(false);
    });

    it('should create 2FA with backup methods', () => {
      const vo = Auth2FaVO.of({
        userId,
        primaryMethod: MfaTypeVO.of('totp'),
        backupMethods: [MfaTypeVO.of('sms'), MfaTypeVO.of('email')],
        enabledAt: now,
      });
      expect(vo.hasBackup()).toBe(true);
    });

    it('should reject backup same as primary', () => {
      expect(() => Auth2FaVO.of({
        userId,
        primaryMethod: MfaTypeVO.of('totp'),
        backupMethods: [MfaTypeVO.of('totp')],
        enabledAt: now,
      })).toThrow('must differ from primary');
    });

    it('should create disabled 2FA (no enabledAt)', () => {
      const vo = Auth2FaVO.of({
        userId,
        primaryMethod: MfaTypeVO.of('totp'),
        backupMethods: [],
      });
      expect(vo.isEnabled()).toBe(false);
    });
  });
});
