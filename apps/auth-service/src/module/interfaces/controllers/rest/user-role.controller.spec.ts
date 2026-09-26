import { Test } from '@nestjs/testing';
import { QueryBus } from '@nestjs/cqrs';
import { UserRoleController } from './user-role.controller';

const mockQueryBus = () => ({ execute: jest.fn() });

describe('UserRoleController', () => {
  let controller: UserRoleController;
  let queryBus: ReturnType<typeof mockQueryBus>;

  beforeEach(async () => {
    queryBus = mockQueryBus();
    const moduleRef = await Test.createTestingModule({
      controllers: [UserRoleController],
      providers: [{ provide: QueryBus, useValue: queryBus }],
    }).compile();
    controller = moduleRef.get(UserRoleController);
  });

  it('should be defined', () => expect(controller).toBeDefined());

  it('list() dispatches ListUserRolesQuery', async () => {
    queryBus.execute.mockResolvedValue([]);
    await controller.list('u-1');
    expect(queryBus.execute).toHaveBeenCalled();
  });
});
