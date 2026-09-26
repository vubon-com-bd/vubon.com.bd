/**
 * UserController — Unit Tests
 */
import { Test } from '@nestjs/testing';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UserController } from './user.controller';
import { UserControllerMapper } from '../../mappers/user.controller.mapper';

const mockCommandBus = () => ({ execute: jest.fn() });
const mockQueryBus = () => ({ execute: jest.fn() });
const mockMapper = () => ({
  toResponse: jest.fn((x: unknown) => x),
  toResponseList: jest.fn((x: unknown[]) => x),
});

describe('UserController', () => {
  let controller: UserController;
  let commandBus: ReturnType<typeof mockCommandBus>;
  let queryBus: ReturnType<typeof mockQueryBus>;

  beforeEach(async () => {
    commandBus = mockCommandBus();
    queryBus = mockQueryBus();

    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: CommandBus, useValue: commandBus },
        { provide: QueryBus, useValue: queryBus },
        { provide: UserControllerMapper, useValue: mockMapper() },
      ],
    }).compile();

    controller = moduleRef.get(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it('should dispatch CreateUserCommand', async () => {
      commandBus.execute.mockResolvedValue({ id: 'u-1' });
      await controller.create({ email: 'new@example.com' } as never);
      expect(commandBus.execute).toHaveBeenCalled();
    });
  });

  describe('list()', () => {
    it('should dispatch ListUsersQuery', async () => {
      queryBus.execute.mockResolvedValue([]);
      await controller.list('50', '0');
      expect(queryBus.execute).toHaveBeenCalled();
    });

    it('should use default limit/offset', async () => {
      queryBus.execute.mockResolvedValue([]);
      await controller.list();
      expect(queryBus.execute).toHaveBeenCalled();
    });
  });

  describe('get()', () => {
    it('should dispatch GetUserQuery', async () => {
      queryBus.execute.mockResolvedValue({ id: 'u-1' });
      await controller.get('u-1');
      expect(queryBus.execute).toHaveBeenCalled();
    });
  });

  describe('update()', () => {
    it('should dispatch UpdateUserCommand', async () => {
      commandBus.execute.mockResolvedValue({ id: 'u-1' });
      await controller.update('u-1', { name: 'New' } as never);
      expect(commandBus.execute).toHaveBeenCalled();
    });
  });

  describe('remove()', () => {
    it('should dispatch DeleteUserCommand', async () => {
      commandBus.execute.mockResolvedValue(undefined);
      await controller.remove('u-1', { reason: 'test' } as never);
      expect(commandBus.execute).toHaveBeenCalled();
    });
  });
});
