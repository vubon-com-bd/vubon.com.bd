import { Test } from '@nestjs/testing';
import { CommandBus } from '@nestjs/cqrs';
import { AuthSsoController } from './auth-sso.controller';

const mockCommandBus = () => ({ execute: jest.fn() });

describe('AuthSsoController', () => {
  let controller: AuthSsoController;
  let commandBus: ReturnType<typeof mockCommandBus>;

  beforeEach(async () => {
    commandBus = mockCommandBus();
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthSsoController],
      providers: [{ provide: CommandBus, useValue: commandBus }],
    }).compile();
    controller = moduleRef.get(AuthSsoController);
  });

  it('should be defined', () => expect(controller).toBeDefined());

  it('login() dispatches SsoLoginCommand', async () => {
    commandBus.execute.mockResolvedValue({ redirectUrl: 'x', state: 's' });
    await controller.login({ provider: 'saml', tenantId: 'acme' } as never);
    expect(commandBus.execute).toHaveBeenCalled();
  });

  it('callback() dispatches SsoCallbackCommand', async () => {
    commandBus.execute.mockResolvedValue({});
    await controller.callback({ provider: 'saml', tenantId: 'acme', code: 'c' } as never);
    expect(commandBus.execute).toHaveBeenCalled();
  });
});
