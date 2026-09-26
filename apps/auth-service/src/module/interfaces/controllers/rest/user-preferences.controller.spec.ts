import { Test } from '@nestjs/testing';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UserPreferencesController } from './user-preferences.controller';

const mockCommandBus = () => ({ execute: jest.fn() });
const mockQueryBus = () => ({ execute: jest.fn() });

describe('UserPreferencesController', () => {
  let controller: UserPreferencesController;
  let commandBus: ReturnType<typeof mockCommandBus>;
  let queryBus: ReturnType<typeof mockQueryBus>;

  beforeEach(async () => {
    commandBus = mockCommandBus();
    queryBus = mockQueryBus();
    const moduleRef = await Test.createTestingModule({
      controllers: [UserPreferencesController],
      providers: [
        { provide: CommandBus, useValue: commandBus },
        { provide: QueryBus, useValue: queryBus },
      ],
    }).compile();
    controller = moduleRef.get(UserPreferencesController);
  });

  it('should be defined', () => expect(controller).toBeDefined());

  it('get() dispatches GetUserPreferencesQuery', async () => {
    queryBus.execute.mockResolvedValue(null);
    await controller.get({ id: 'u-1' } as never);
    expect(queryBus.execute).toHaveBeenCalled();
  });

  it('update() dispatches UpdatePreferencesCommand', async () => {
    commandBus.execute.mockResolvedValue({});
    await controller.update({ id: 'u-1' } as never, {} as never);
    expect(commandBus.execute).toHaveBeenCalled();
  });
});
