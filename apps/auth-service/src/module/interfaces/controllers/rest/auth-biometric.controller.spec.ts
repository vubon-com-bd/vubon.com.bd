import { Test } from '@nestjs/testing';
import { CommandBus } from '@nestjs/cqrs';
import { AuthBiometricController } from './auth-biometric.controller';

const mockCommandBus = () => ({ execute: jest.fn() });

describe('AuthBiometricController', () => {
  let controller: AuthBiometricController;
  let commandBus: ReturnType<typeof mockCommandBus>;

  beforeEach(async () => {
    commandBus = mockCommandBus();
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthBiometricController],
      providers: [{ provide: CommandBus, useValue: commandBus }],
    }).compile();
    controller = moduleRef.get(AuthBiometricController);
  });

  it('should be defined', () => expect(controller).toBeDefined());

  it('enable() dispatches EnableBiometricCommand', async () => {
    commandBus.execute.mockResolvedValue({});
    await controller.enable({ id: 'u-1' } as never, {} as never);
    expect(commandBus.execute).toHaveBeenCalled();
  });

  it('disable() dispatches DisableBiometricCommand', async () => {
    commandBus.execute.mockResolvedValue(undefined);
    await controller.disable({ id: 'u-1' } as never, {} as never);
    expect(commandBus.execute).toHaveBeenCalled();
  });

  it('verify() dispatches VerifyBiometricCommand and returns boolean', async () => {
    commandBus.execute.mockResolvedValue(true);
    const result = await controller.verify({} as never);
    expect(result.verified).toBe(true);
  });
});
