/**
 * AuthSettingsController — Unit Tests
 */
import { Test } from '@nestjs/testing';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthSettingsController } from './auth-settings.controller';

const mockCommandBus = () => ({ execute: jest.fn() });
const mockQueryBus = () => ({ execute: jest.fn() });

describe('AuthSettingsController', () => {
  let controller: AuthSettingsController;
  let commandBus: ReturnType<typeof mockCommandBus>;
  let queryBus: ReturnType<typeof mockQueryBus>;

  beforeEach(async () => {
    commandBus = mockCommandBus();
    queryBus = mockQueryBus();

    const moduleRef = await Test.createTestingModule({
      controllers: [AuthSettingsController],
      providers: [
        { provide: CommandBus, useValue: commandBus },
        { provide: QueryBus, useValue: queryBus },
      ],
    }).compile();

    controller = moduleRef.get(AuthSettingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('get() dispatches GetAuthSettingsQuery', async () => {
    queryBus.execute.mockResolvedValue({});
    await controller.get({ id: 'u-1' } as never);
    expect(queryBus.execute).toHaveBeenCalled();
  });

  it('update() dispatches UpdateAuthSettingsCommand', async () => {
    commandBus.execute.mockResolvedValue({});
    await controller.update({ id: 'u-1' } as never, {});
    expect(commandBus.execute).toHaveBeenCalled();
  });
});
