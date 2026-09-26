/**
 * UserAddressController — Unit Tests
 */
import { Test } from '@nestjs/testing';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UserAddressController } from './user-address.controller';

const mockCommandBus = () => ({ execute: jest.fn() });
const mockQueryBus = () => ({ execute: jest.fn() });

describe('UserAddressController', () => {
  let controller: UserAddressController;
  let commandBus: ReturnType<typeof mockCommandBus>;
  let queryBus: ReturnType<typeof mockQueryBus>;

  beforeEach(async () => {
    commandBus = mockCommandBus();
    queryBus = mockQueryBus();

    const moduleRef = await Test.createTestingModule({
      controllers: [UserAddressController],
      providers: [
        { provide: CommandBus, useValue: commandBus },
        { provide: QueryBus, useValue: queryBus },
      ],
    }).compile();

    controller = moduleRef.get(UserAddressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('list() dispatches ListUserAddressesQuery', async () => {
    queryBus.execute.mockResolvedValue([]);
    await controller.list({ id: 'u-1' } as never);
    expect(queryBus.execute).toHaveBeenCalled();
  });

  it('add() dispatches AddAddressCommand', async () => {
    commandBus.execute.mockResolvedValue({});
    await controller.add({ id: 'u-1' } as never, {} as never);
    expect(commandBus.execute).toHaveBeenCalled();
  });

  it('get() dispatches GetUserAddressQuery', async () => {
    queryBus.execute.mockResolvedValue(null);
    await controller.get('a-1');
    expect(queryBus.execute).toHaveBeenCalled();
  });

  it('update() dispatches UpdateAddressCommand', async () => {
    commandBus.execute.mockResolvedValue({});
    await controller.update('a-1', {} as never);
    expect(commandBus.execute).toHaveBeenCalled();
  });

  it('remove() dispatches DeleteAddressCommand', async () => {
    commandBus.execute.mockResolvedValue(undefined);
    await controller.remove('a-1');
    expect(commandBus.execute).toHaveBeenCalled();
  });
});
