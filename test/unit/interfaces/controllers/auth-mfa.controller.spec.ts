/**
 * AuthMfaController tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { AuthMfaController } from '@interfaces/controllers/rest/auth-mfa.controller.js';
import {
  makeCommandBusMock,
  makeQueryBusMock,
  makeCurrentUser,
  makeEnableMfaDto,
  makeVerifyMfaDto,
} from '@fixtures/interfaces/index.js';

describe('AuthMfaController', () => {
  let controller: AuthMfaController;
  let commandBus: ReturnType<typeof makeCommandBusMock>;
  let queryBus: ReturnType<typeof makeQueryBusMock>;

  beforeEach(() => {
    commandBus = makeCommandBusMock();
    queryBus = makeQueryBusMock();
    controller = new AuthMfaController(commandBus as never, queryBus as never);
  });

  describe('setup()', () => {
    it('should return setup response', async () => {
      const user = makeCurrentUser();
      commandBus.execute.mockResolvedValue({
        secret: 'ABC123',
        qrCodeUrl: 'data:image/png',
        otpauthUrl: 'otpauth://',
        backupCodes: ['ABC'],
      });

      const r = await controller.setup({ method: 'totp' }, user as never);
      expect(r.success).toBe(true);
      expect(r.secret).toBe('ABC123');
    });
  });

  describe('enable()', () => {
    it('should dispatch enable and return result', async () => {
      const user = makeCurrentUser();
      commandBus.execute.mockResolvedValue({ success: true, enabled: true });

      const r = await controller.enable(makeEnableMfaDto(), user as never);
      expect(r).toEqual({ success: true, enabled: true });
    });
  });

  describe('disable()', () => {
    it('should return disabled response', async () => {
      const user = makeCurrentUser();
      commandBus.execute.mockResolvedValue({ success: true });

      const r = await controller.disable(
        { password: 'StrongP@ss123' },
        user as never,
      );
      expect(r.enabled).toBe(false);
    });
  });

  describe('verify()', () => {
    it('should verify MFA code', async () => {
      commandBus.execute.mockResolvedValue({ verified: true });

      const r = await controller.verify(makeVerifyMfaDto());
      expect(r.verified).toBe(true);
    });
  });

  describe('verifyBackupCode()', () => {
    it('should verify backup code', async () => {
      const user = makeCurrentUser();
      commandBus.execute.mockResolvedValue({ success: true, verified: true });

      const r = await controller.verifyBackupCode(
        { challengeId: '11111111-1111-4111-8111-111111111111', code: 'ABCD1234' },
        user as never,
      );
      expect(r.verified).toBe(true);
    });
  });

  describe('getSettings()', () => {
    it('should fetch MFA settings', async () => {
      const user = makeCurrentUser();
      queryBus.execute.mockResolvedValue({ success: true, enabled: true });

      const r = await controller.getSettings(user as never);
      expect(r.enabled).toBe(true);
    });
  });

  describe('getRecoveryCodes()', () => {
    it('should fetch recovery code count', async () => {
      const user = makeCurrentUser();
      queryBus.execute.mockResolvedValue({ total: 10, remaining: 8, used: 2 });

      const r = await controller.getRecoveryCodes(user as never);
      expect(r.remaining).toBe(8);
    });
  });
});
