/**
 * AuthMfaVO — Unit Tests
 * @module auth-service/domain/value-objects/composites
 */
import { AuthMfaVO } from './auth-mfa.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { MfaTypeVO } from '../primitives/mfa-type.vo';
import { MfaStatusVO } from '../primitives/mfa-status.vo';

describe('AuthMfaVO', () => {
  const userId = UserIdVO.of('user-1');

  describe('of()', () => {
    it('should create with enabled status', () => {
      const vo = AuthMfaVO.of({
        userId,
        type: MfaTypeVO.of('totp'),
        status: MfaStatusVO.of('enabled'),
      });
      expect(vo.isEnabled()).toBe(true);
    });

    it('should create with disabled status', () => {
      const vo = AuthMfaVO.of({
        userId,
        type: MfaTypeVO.of('totp'),
        status: MfaStatusVO.of('disabled'),
      });
      expect(vo.isEnabled()).toBe(false);
    });

    it('should create with pending status', () => {
      const vo = AuthMfaVO.of({
        userId,
        type: MfaTypeVO.of('totp'),
        status: MfaStatusVO.of('pending'),
      });
      expect(vo.requiresVerification()).toBe(true);
    });
  });
});
