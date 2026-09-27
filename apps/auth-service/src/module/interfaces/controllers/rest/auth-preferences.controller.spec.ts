import { jest } from '@jest/globals';

import { Test } from '@nestjs/testing';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthPreferencesController } from './auth-preferences.controller.js';

const mockCommandBus = () => ({ execute: jest.fn<() => Promise<unknown>>() });
const mockQueryBus = () => ({ execute: jest.fn<() => Promise<unknown>>() });

describe('AuthPreferencesController', () => {
  let controller: AuthPreferencesController;
  let commandBus: ReturnType<typeof mockCommandBus>;
  let queryBus: ReturnType<typeof mockQueryBus>;

  beforeEach(async () => {
    commandBus = mockCommandBus();
    queryBus = mockQueryBus();
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthPreferencesController],
      providers: [
        { provide: CommandBus, useValue: commandBus },
        { provide: QueryBus, useValue: queryBus },
      ],
    }).compile();
    controller = moduleRef.get(AuthPreferencesController);
  });

  it('should be defined', () => expect(controller).toBeDefined());

  it('get() dispatches GetUserPreferencesQuery', async () => {
    queryBus.execute.mockResolvedValue({});
    await controller.get({ id: 'u-1' } as never);
    expect(queryBus.execute).toHaveBeenCalled();
  });

  it('update() dispatches UpdateAuthPreferencesCommand', async () => {
    commandBus.execute.mockResolvedValue({});
    await controller.update({ id: 'u-1' } as never, {});
    expect(commandBus.execute).toHaveBeenCalled();
  });
});
