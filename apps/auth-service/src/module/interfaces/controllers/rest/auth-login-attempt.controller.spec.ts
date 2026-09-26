import { Test } from '@nestjs/testing';
import { QueryBus } from '@nestjs/cqrs';
import { AuthLoginAttemptController } from './auth-login-attempt.controller';

const mockQueryBus = () => ({ execute: jest.fn() });

describe('AuthLoginAttemptController', () => {
  let controller: AuthLoginAttemptController;
  let queryBus: ReturnType<typeof mockQueryBus>;

  beforeEach(async () => {
    queryBus = mockQueryBus();
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthLoginAttemptController],
      providers: [{ provide: QueryBus, useValue: queryBus }],
    }).compile();
    controller = moduleRef.get(AuthLoginAttemptController);
  });

  it('should be defined', () => expect(controller).toBeDefined());

  it('list() dispatches ListAuthLoginAttemptsQuery', async () => {
    queryBus.execute.mockResolvedValue([]);
    await controller.list({ id: 'u-1' } as never, '20');
    expect(queryBus.execute).toHaveBeenCalled();
  });

  it('list() works without limit param', async () => {
    queryBus.execute.mockResolvedValue([]);
    await controller.list({ id: 'u-1' } as never);
    expect(queryBus.execute).toHaveBeenCalled();
  });
});
