/**
 * AuthMfaController — Unit Tests
 */
import { Test } from '@nestjs/testing';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthMfaController } from './auth-mfa.controller';
import { MfaControllerMapper } from '../../mappers/mfa.controller.mapper';

const mockCommandBus = () => ({ execute: jest.fn() });
const mockQueryBus = () => ({ execute: jest.fn() });
const mockMapper = () => ({ toResponse: jest.fn((x: unknown) => x) });

describe('AuthMfaController', () => {
  let controller: AuthMfaController;
  let commandBus: ReturnType<typeof mockCommandBus>;
  let queryBus: ReturnType<typeof mockQueryBus>;

  beforeEach(async () => {
    commandBus = mockCommandBus();
    queryBus = mockQueryBus();

    const moduleRef = await Test.createTestingModule({
      controllers: [AuthMfaController],
      providers: [
        { provide: CommandBus, useValue: commandBus },
        { provide: QueryBus, useValue: queryBus },
        { provide: MfaControllerMapper, useValue: mockMapper() },
      ],
    }).compile();

    controller = moduleRef.get(AuthMfaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('enable()', () => {
    it('should dispatch EnableMfaCommand', async () => {
      commandBus.execute.mockResolvedValue({ secret: 'X', qrCodeUrl: 'y', recoveryCodes: [] });
      await controller.enable({ id: 'u-1' } as never, { type: 'totp', password: 'x' } as never);
      expect(commandBus.execute).toHaveBeenCalled();
    });
  });

  describe('disable()', () => {
    it('should dispatch DisableMfaCommand', async () => {
      commandBus.execute.mockResolvedValue(undefined);
      await controller.disable({ id: 'u-1' } as never, { password: 'x' } as never);
      expect(commandBus.execute).toHaveBeenCalled();
    });
  });

  describe('verify()', () => {
    it('should dispatch VerifyMfaCommand', async () => {
      commandBus.execute.mockResolvedValue(true);
      const result = await controller.verify(
        { id: 'u-1' } as never,
        { challengeId: 'c-1', code: '123456' } as never,
      );
      expect(result.verified).toBe(true);
    });
  });

  describe('status()', () => {
    it('should dispatch GetAuthMfaSettingsQuery', async () => {
      queryBus.execute.mockResolvedValue({ enabled: false, type: 'none' });
      await controller.status({ id: 'u-1' } as never);
      expect(queryBus.execute).toHaveBeenCalled();
    });
  });
});
