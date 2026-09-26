/**
 * AuthController — Unit Tests
 * @module auth-service/interfaces/controllers/rest
 */
import { Test } from '@nestjs/testing';
import { CommandBus } from '@nestjs/cqrs';
import { AuthController } from './auth.controller';
import { AuthControllerMapper } from '../../mappers/auth.controller.mapper';

const mockCommandBus = () => ({ execute: jest.fn() });
const mockMapper = () => ({
  toLoginResponse: jest.fn((x: unknown) => x),
  toRegisterResponse: jest.fn((x: unknown) => x),
});

describe('AuthController', () => {
  let controller: AuthController;
  let commandBus: ReturnType<typeof mockCommandBus>;
  let mapper: ReturnType<typeof mockMapper>;

  beforeEach(async () => {
    commandBus = mockCommandBus();
    mapper = mockMapper();

    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: CommandBus, useValue: commandBus },
        { provide: AuthControllerMapper, useValue: mapper },
      ],
    }).compile();

    controller = moduleRef.get(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login()', () => {
    it('should dispatch LoginCommand', async () => {
      commandBus.execute.mockResolvedValue({ success: true, accessToken: 'tok' });

      const body = {
        identifier: 'john@example.com',
        password: 'Test1234!',
      };

      await controller.login(body as never);

      expect(commandBus.execute).toHaveBeenCalled();
      expect(mapper.toLoginResponse).toHaveBeenCalled();
    });
  });

  describe('register()', () => {
    it('should dispatch RegisterCommand', async () => {
      commandBus.execute.mockResolvedValue({
        user: {},
        verificationSent: true,
        nextStep: 'verify_email',
      });

      const body = {
        identifier: 'new@example.com',
        password: 'Str0ng!Pass#2024',
        firstName: 'John',
        acceptTerms: true,
      };

      await controller.register(body as never);

      expect(commandBus.execute).toHaveBeenCalled();
      expect(mapper.toRegisterResponse).toHaveBeenCalled();
    });
  });

  describe('refresh()', () => {
    it('should dispatch RefreshTokenCommand', async () => {
      commandBus.execute.mockResolvedValue({ accessToken: 'new' });

      await controller.refresh({ refreshToken: 'a'.repeat(64) } as never);

      expect(commandBus.execute).toHaveBeenCalled();
    });
  });

  describe('logout()', () => {
    it('should dispatch LogoutCommand', async () => {
      commandBus.execute.mockResolvedValue(undefined);

      await controller.logout({ id: 'u-1', sessionId: 's-1' } as never);

      expect(commandBus.execute).toHaveBeenCalled();
    });
  });

  describe('forgotPassword()', () => {
    it('should dispatch ForgotPasswordCommand', async () => {
      commandBus.execute.mockResolvedValue(undefined);

      await controller.forgotPassword({ identifier: 'john@example.com' });

      expect(commandBus.execute).toHaveBeenCalled();
    });
  });

  describe('resetPassword()', () => {
    it('should dispatch ResetPasswordCommand', async () => {
      commandBus.execute.mockResolvedValue(undefined);

      await controller.resetPassword({
        token: 'a'.repeat(32),
        newPassword: 'New123!',
        confirmPassword: 'New123!',
      } as never);

      expect(commandBus.execute).toHaveBeenCalled();
    });
  });

  describe('verifyEmail()', () => {
    it('should dispatch VerifyEmailCommand', async () => {
      commandBus.execute.mockResolvedValue(undefined);

      await controller.verifyEmail({
        email: 'john@example.com',
        code: '123456',
      });

      expect(commandBus.execute).toHaveBeenCalled();
    });
  });

  describe('resendVerification()', () => {
    it('should dispatch ResendVerificationCommand', async () => {
      commandBus.execute.mockResolvedValue(undefined);

      await controller.resendVerification({ identifier: 'john@example.com' });

      expect(commandBus.execute).toHaveBeenCalled();
    });
  });
});
