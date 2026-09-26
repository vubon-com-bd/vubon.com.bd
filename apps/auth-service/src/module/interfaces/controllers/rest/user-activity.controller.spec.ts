import { Test } from '@nestjs/testing';
import { QueryBus } from '@nestjs/cqrs';
import { UserActivityController } from './user-activity.controller';

const mockQueryBus = () => ({ execute: jest.fn() });

describe('UserActivityController', () => {
  let controller: UserActivityController;
  let queryBus: ReturnType<typeof mockQueryBus>;

  beforeEach(async () => {
    queryBus = mockQueryBus();
    const moduleRef = await Test.createTestingModule({
      controllers: [UserActivityController],
      providers: [{ provide: QueryBus, useValue: queryBus }],
    }).compile();
    controller = moduleRef.get(UserActivityController);
  });

  it('should be defined', () => expect(controller).toBeDefined());

  it('list() dispatches ListUserActivitiesQuery', async () => {
    queryBus.execute.mockResolvedValue([]);
    await controller.list({ id: 'u-1' } as never, '50');
    expect(queryBus.execute).toHaveBeenCalled();
  });

  it('list() works with default limit', async () => {
    queryBus.execute.mockResolvedValue([]);
    await controller.list({ id: 'u-1' } as never);
    expect(queryBus.execute).toHaveBeenCalled();
  });
});
