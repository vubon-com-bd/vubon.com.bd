import { Test } from '@nestjs/testing';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UserSettingsController } from './user-settings.controller';

const mockCommandBus = () => ({ execute: jest.fn() });
const mockQueryBus = () => ({ execute: jest.fn() });

describe('UserSettingsController', () => {
  let controller: UserSettingsController;
  let commandBus: ReturnType<typeof mockCommandBus>;
  let queryBus: ReturnType<typeof mockQueryBus>;

  beforeEach(async () => {
    commandBus = mockCommandBus();
    queryBus = mockQueryBus();
    const moduleRef = await Test.createTestingModule({
      controllers: [UserSettingsController],
      providers: [
        { provide: CommandBus, useValue: commandBus },
        { provide: QueryBus, useValue: queryBus },
      ],
    }).compile();
    controller = moduleRef.get(UserSettingsController);
  });

  it('should be defined', () => expect(controller).toBeDefined());

  it('get() dispatches GetUserSettingsQuery', async () => {
    queryBus.execute.mockResolvedValue(null);
    await controller.get({ id: 'u-1' } as never);
    expect(queryBus.execute).toHaveBeenCalled();
  });

  it('update() dispatches UpdateSettingsCommand', async () => {
    commandBus.execute.mockResolvedValue({});
    await controller.update({ id: 'u-1' } as never, {} as never);
    expect(commandBus.execute).toHaveBeenCalled();
  });
});
