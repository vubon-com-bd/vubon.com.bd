/**
 * AuthControllerMapper — Unit Tests
 */
import { AuthControllerMapper } from './auth.controller.mapper';

describe('AuthControllerMapper', () => {
  let mapper: AuthControllerMapper;

  beforeEach(() => {
    mapper = new AuthControllerMapper();
  });

  describe('toLoginResponse()', () => {
    it('should map normal login response', () => {
      const source = {
        success: true,
        user: { id: 'u-1' },
        session: { sessionId: 's-1' },
        accessToken: 'acc',
        refreshToken: 'ref',
        tokenType: 'Bearer' as const,
        expiresAt: Date.now() + 900_000,
      };
      const result = mapper.toLoginResponse(source as never);
      expect(result.success).toBe(true);
      expect(result.accessToken).toBe('acc');
      expect(result.refreshToken).toBe('ref');
      expect(result.tokenType).toBe('Bearer');
    });

    it('should map MFA-required response', () => {
      const source = {
        success: true,
        requiresMfa: true as const,
        challengeId: 'c-1',
        mfaMethods: ['totp'],
        expiresAt: '2024-01-01T00:00:00.000Z',
      };
      const result = mapper.toLoginResponse(source as never);
      expect(result.success).toBe(true);
      expect(result.requiresMfa).toBe(true);
      expect(result.challengeId).toBe('c-1');
      expect(result.accessToken).toBe('');
    });

    it('should preserve requiresVerification flag', () => {
      const source = {
        success: true,
        requiresVerification: true,
        accessToken: 'a',
        refreshToken: 'r',
        tokenType: 'Bearer' as const,
        expiresAt: 0,
      };
      const result = mapper.toLoginResponse(source as never);
      expect(result.requiresVerification).toBe(true);
    });
  });

  describe('toRegisterResponse()', () => {
    it('should map register response', () => {
      const source = {
        user: { id: 'u-1', email: 'new@example.com' },
        verificationSent: true,
        nextStep: 'verify_email',
      };
      const result = mapper.toRegisterResponse(source as never);
      expect(result.user).toEqual(source.user);
      expect(result.verificationSent).toBe(true);
      expect(result.nextStep).toBe('verify_email');
    });

    it('should handle nextStep="none"', () => {
      const source = {
        user: {},
        verificationSent: false,
        nextStep: 'none',
      };
      const result = mapper.toRegisterResponse(source as never);
      expect(result.nextStep).toBe('none');
    });
  });
});
