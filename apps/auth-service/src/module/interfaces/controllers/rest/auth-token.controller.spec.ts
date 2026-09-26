import { Test } from '@nestjs/testing';
import { QueryBus } from '@nestjs/cqrs';
import { AuthTokenController } from './auth-token.controller';

const mockQueryBus = () => ({ execute: jest.fn() });

describe('AuthTokenController', () => {
  let controller: AuthTokenController;
  let queryBus: ReturnType<typeof mockQueryBus>;

  beforeEach(async () => {
    queryBus = mockQueryBus();
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthTokenController],
      providers: [{ provide: QueryBus, useValue: queryBus }],
    }).compile();
    controller = moduleRef.get(AuthTokenController);
  });

  it('should be defined', () => expect(controller).toBeDefined());

  it('listMine() dispatches ListAuthTokensQuery', async () => {
    queryBus.execute.mockResolvedValue([]);
    await controller.listMine({ id: 'u-1' } as never);
    expect(queryBus.execute).toHaveBeenCalled();
  });
});
