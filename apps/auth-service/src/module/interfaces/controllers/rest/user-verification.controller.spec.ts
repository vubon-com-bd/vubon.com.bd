import { jest } from '@jest/globals';

import { Test } from '@nestjs/testing';
import { QueryBus } from '@nestjs/cqrs';
import { UserVerificationController } from './user-verification.controller.js';

const mockQueryBus = () => ({ execute: jest.fn<() => Promise<unknown>>() });

describe('UserVerificationController', () => {
  let controller: UserVerificationController;
  let queryBus: ReturnType<typeof mockQueryBus>;

  beforeEach(async () => {
    queryBus = mockQueryBus();
    const moduleRef = await Test.createTestingModule({
      controllers: [UserVerificationController],
      providers: [{ provide: QueryBus, useValue: queryBus }],
    }).compile();
    controller = moduleRef.get(UserVerificationController);
  });

  it('should be defined', () => expect(controller).toBeDefined());

  it('status() dispatches a query', async () => {
    queryBus.execute.mockResolvedValue(null);
    await controller.status({ id: 'u-1' } as never, 'email');
    expect(queryBus.execute).toHaveBeenCalled();
  });
});
