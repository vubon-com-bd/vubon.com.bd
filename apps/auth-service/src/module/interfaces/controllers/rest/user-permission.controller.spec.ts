import { Test } from '@nestjs/testing';
import { QueryBus } from '@nestjs/cqrs';
import { UserPermissionController } from './user-permission.controller';

const mockQueryBus = () => ({ execute: jest.fn() });

describe('UserPermissionController', () => {
  let controller: UserPermissionController;
  let queryBus: ReturnType<typeof mockQueryBus>;

  beforeEach(async () => {
    queryBus = mockQueryBus();
    const moduleRef = await Test.createTestingModule({
      controllers: [UserPermissionController],
      providers: [{ provide: QueryBus, useValue: queryBus }],
    }).compile();
    controller = moduleRef.get(UserPermissionController);
  });

  it('should be defined', () => expect(controller).toBeDefined());

  it('list() dispatches ListUserPermissionsQuery', async () => {
    queryBus.execute.mockResolvedValue({});
    await controller.list('u-1');
    expect(queryBus.execute).toHaveBeenCalled();
  });
});
