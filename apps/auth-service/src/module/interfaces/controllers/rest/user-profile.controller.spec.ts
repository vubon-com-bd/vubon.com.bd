import { Test } from '@nestjs/testing';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UserProfileController } from './user-profile.controller';

const mockCommandBus = () => ({ execute: jest.fn() });
const mockQueryBus = () => ({ execute: jest.fn() });

describe('UserProfileController', () => {
  let controller: UserProfileController;
  let commandBus: ReturnType<typeof mockCommandBus>;
  let queryBus: ReturnType<typeof mockQueryBus>;

  beforeEach(async () => {
    commandBus = mockCommandBus();
    queryBus = mockQueryBus();
    const moduleRef = await Test.createTestingModule({
      controllers: [UserProfileController],
      providers: [
        { provide: CommandBus, useValue: commandBus },
        { provide: QueryBus, useValue: queryBus },
      ],
    }).compile();
    controller = moduleRef.get(UserProfileController);
  });

  it('should be defined', () => expect(controller).toBeDefined());

  it('get() dispatches GetUserProfileQuery', async () => {
    queryBus.execute.mockResolvedValue(null);
    await controller.get({ id: 'u-1' } as never);
    expect(queryBus.execute).toHaveBeenCalled();
  });

  it('update() dispatches UpdateProfileCommand', async () => {
    commandBus.execute.mockResolvedValue({});
    await controller.update({ id: 'u-1' } as never, {} as never);
    expect(commandBus.execute).toHaveBeenCalled();
  });
});
