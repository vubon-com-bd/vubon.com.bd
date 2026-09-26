import { Test } from '@nestjs/testing';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthAccountLockController } from './auth-account-lock.controller';

const mockCommandBus = () => ({ execute: jest.fn() });
const mockQueryBus = () => ({ execute: jest.fn() });

describe('AuthAccountLockController', () => {
  let controller: AuthAccountLockController;
  let commandBus: ReturnType<typeof mockCommandBus>;
  let queryBus: ReturnType<typeof mockQueryBus>;

  beforeEach(async () => {
    commandBus = mockCommandBus();
    queryBus = mockQueryBus();
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthAccountLockController],
      providers: [
        { provide: CommandBus, useValue: commandBus },
        { provide: QueryBus, useValue: queryBus },
      ],
    }).compile();
    controller = moduleRef.get(AuthAccountLockController);
  });

  it('should be defined', () => expect(controller).toBeDefined());

  it('lock() dispatches LockAccountCommand', async () => {
    commandBus.execute.mockResolvedValue({});
    await controller.lock({ userId: 'u-1' } as never);
    expect(commandBus.execute).toHaveBeenCalled();
  });

  it('unlock() dispatches UnlockAccountCommand', async () => {
    commandBus.execute.mockResolvedValue({});
    await controller.unlock({ userId: 'u-1' } as never);
    expect(commandBus.execute).toHaveBeenCalled();
  });

  it('myLockStatus() dispatches GetAuthAccountLockStatusQuery', async () => {
    queryBus.execute.mockResolvedValue(null);
    await controller.myLockStatus({ id: 'u-1' } as never);
    expect(queryBus.execute).toHaveBeenCalled();
  });
});
