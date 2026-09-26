/**
 * AuthSessionController — Unit Tests
 */
import { Test } from '@nestjs/testing';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthSessionController } from './auth-session.controller';
import { SessionControllerMapper } from '../../mappers/session.controller.mapper';

const mockCommandBus = () => ({ execute: jest.fn() });
const mockQueryBus = () => ({ execute: jest.fn() });
const mockMapper = () => ({
  toResponse: jest.fn((x: unknown) => x),
  toResponseList: jest.fn((x: unknown[]) => x),
});

describe('AuthSessionController', () => {
  let controller: AuthSessionController;
  let queryBus: ReturnType<typeof mockQueryBus>;
  let commandBus: ReturnType<typeof mockCommandBus>;
  let mapper: ReturnType<typeof mockMapper>;

  beforeEach(async () => {
    queryBus = mockQueryBus();
    commandBus = mockCommandBus();
    mapper = mockMapper();

    const moduleRef = await Test.createTestingModule({
      controllers: [AuthSessionController],
      providers: [
        { provide: QueryBus, useValue: queryBus },
        { provide: CommandBus, useValue: commandBus },
        { provide: SessionControllerMapper, useValue: mapper },
      ],
    }).compile();

    controller = moduleRef.get(AuthSessionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('listMine()', () => {
    it('should dispatch ListAuthSessionsQuery', async () => {
      queryBus.execute.mockResolvedValue([]);

      await controller.listMine({ id: 'u-1' } as never);

      expect(queryBus.execute).toHaveBeenCalled();
      expect(mapper.toResponseList).toHaveBeenCalled();
    });
  });

  describe('getOne()', () => {
    it('should dispatch GetAuthSessionQuery', async () => {
      queryBus.execute.mockResolvedValue({ sessionId: 's-1' });

      await controller.getOne('s-1');

      expect(queryBus.execute).toHaveBeenCalled();
      expect(mapper.toResponse).toHaveBeenCalled();
    });
  });

  describe('revoke()', () => {
    it('should dispatch revoke command', async () => {
      commandBus.execute.mockResolvedValue(undefined);

      await controller.revoke('s-1');

      expect(commandBus.execute).toHaveBeenCalled();
    });
  });
});
