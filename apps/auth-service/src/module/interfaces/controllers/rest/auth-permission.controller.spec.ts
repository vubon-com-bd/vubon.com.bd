import { Test } from '@nestjs/testing';
import { QueryBus } from '@nestjs/cqrs';
import { AuthPermissionController } from './auth-permission.controller';

const mockQueryBus = () => ({ execute: jest.fn() });

describe('AuthPermissionController', () => {
  let controller: AuthPermissionController;
  let queryBus: ReturnType<typeof mockQueryBus>;

  beforeEach(async () => {
    queryBus = mockQueryBus();
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthPermissionController],
      providers: [{ provide: QueryBus, useValue: queryBus }],
    }).compile();
    controller = moduleRef.get(AuthPermissionController);
  });

  it('should be defined', () => expect(controller).toBeDefined());

  it('list() dispatches ListAuthPermissionsQuery', async () => {
    queryBus.execute.mockResolvedValue([]);
    await controller.list('user');
    expect(queryBus.execute).toHaveBeenCalled();
  });

  it('list() works without resource', async () => {
    queryBus.execute.mockResolvedValue([]);
    await controller.list();
    expect(queryBus.execute).toHaveBeenCalled();
  });
});
