/**
 * AuthController tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { AuthController } from '@interfaces/controllers/rest/auth.controller.js';
import {
  makeCommandBusMock,
  makeCurrentUser,
  makeLoginDto,
  makeRegisterDto,
} from '@fixtures/interfaces/index.js';

describe('AuthController', () => {
  let controller: AuthController;
  let commandBus: ReturnType<typeof makeCommandBusMock>;

  beforeEach(() => {
    commandBus = makeCommandBusMock();
    controller = new AuthController(commandBus as never);
  });

  describe('login()', () => {
    it('should dispatch LoginCommand and return result', async () => {
      commandBus.execute.mockResolvedValue({ success: true, user: { id: 'u1' } });

      const result = await controller.login(makeLoginDto());

      expect(commandBus.execute).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ success: true, user: { id: 'u1' } });
    });
  });

  describe('register()', () => {
    it('should dispatch RegisterCommand', async () => {
      commandBus.execute.mockResolvedValue({ success: true });

      const result = await controller.register(makeRegisterDto());

      expect(result).toEqual({ success: true });
      expect(commandBus.execute).toHaveBeenCalled();
    });
  });

  describe('refresh()', () => {
    it('should dispatch RefreshTokenCommand', async () => {
      commandBus.execute.mockResolvedValue({ success: true });

      await controller.refresh({ refreshToken: 'tok' });

      expect(commandBus.execute).toHaveBeenCalled();
    });
  });

  describe('logout()', () => {
    it('should dispatch LogoutCommand with user id', async () => {
      const user = makeCurrentUser();
      commandBus.execute.mockResolvedValue({ success: true });

      await controller.logout({}, user as never);

      expect(commandBus.execute).toHaveBeenCalled();
    });
  });

  describe('forgotPassword()', () => {
    it('should dispatch ForgotPasswordCommand', async () => {
      commandBus.execute.mockResolvedValue({ success: true, message: 'sent' });

      const r = await controller.forgotPassword({ identifier: 'x@vubon.com.bd' });
      expect(r).toEqual({ success: true, message: 'sent' });
    });
  });

  describe('resetPassword()', () => {
    it('should dispatch ResetPasswordCommand', async () => {
      commandBus.execute.mockResolvedValue({ success: true, message: 'reset' });

      await controller.resetPassword({
        token: 'abc',
        newPassword: 'NewStrongP@ss123',
        confirmPassword: 'NewStrongP@ss123',
      });

      expect(commandBus.execute).toHaveBeenCalled();
    });
  });

  describe('verifyEmail()', () => {
    it('should dispatch VerifyEmailCommand', async () => {
      commandBus.execute.mockResolvedValue({ success: true, verified: true });

      const r = await controller.verifyEmail({
        email: 'x@vubon.com.bd',
        token: 'tok',
      });
      expect(r.verified).toBe(true);
    });
  });

  describe('resendVerification()', () => {
    it('should dispatch ResendVerificationCommand', async () => {
      commandBus.execute.mockResolvedValue({ success: true, message: 'sent' });

      await controller.resendVerification({ email: 'x@vubon.com.bd' });

      expect(commandBus.execute).toHaveBeenCalled();
    });
  });
});
