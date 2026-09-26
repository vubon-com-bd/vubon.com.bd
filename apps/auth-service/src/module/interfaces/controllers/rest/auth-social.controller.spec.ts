import { Test } from '@nestjs/testing';
import { CommandBus } from '@nestjs/cqrs';
import { AuthSocialController } from './auth-social.controller';

const mockCommandBus = () => ({ execute: jest.fn() });

describe('AuthSocialController', () => {
  let controller: AuthSocialController;
  let commandBus: ReturnType<typeof mockCommandBus>;

  beforeEach(async () => {
    commandBus = mockCommandBus();
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthSocialController],
      providers: [{ provide: CommandBus, useValue: commandBus }],
    }).compile();
    controller = moduleRef.get(AuthSocialController);
  });

  it('should be defined', () => expect(controller).toBeDefined());

  it('login() dispatches SocialLoginCommand', async () => {
    commandBus.execute.mockResolvedValue({ authUrl: 'x', state: 's' });
    await controller.login({ provider: 'google' } as never);
    expect(commandBus.execute).toHaveBeenCalled();
  });

  it('callback() dispatches SocialCallbackCommand', async () => {
    commandBus.execute.mockResolvedValue({});
    await controller.callback({ provider: 'google', code: 'c', state: 's' } as never);
    expect(commandBus.execute).toHaveBeenCalled();
  });

  it('link() dispatches LinkSocialCommand', async () => {
    commandBus.execute.mockResolvedValue(undefined);
    await controller.link({ id: 'u-1' } as never, {} as never);
    expect(commandBus.execute).toHaveBeenCalled();
  });

  it('unlink() dispatches UnlinkSocialCommand', async () => {
    commandBus.execute.mockResolvedValue(undefined);
    await controller.unlink({ id: 'u-1' } as never, {} as never);
    expect(commandBus.execute).toHaveBeenCalled();
  });
});
