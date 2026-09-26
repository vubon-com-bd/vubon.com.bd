import { Test } from '@nestjs/testing';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UserContactController } from './user-contact.controller';

const mockCommandBus = () => ({ execute: jest.fn() });
const mockQueryBus = () => ({ execute: jest.fn() });

describe('UserContactController', () => {
  let controller: UserContactController;
  let commandBus: ReturnType<typeof mockCommandBus>;
  let queryBus: ReturnType<typeof mockQueryBus>;

  beforeEach(async () => {
    commandBus = mockCommandBus();
    queryBus = mockQueryBus();
    const moduleRef = await Test.createTestingModule({
      controllers: [UserContactController],
      providers: [
        { provide: CommandBus, useValue: commandBus },
        { provide: QueryBus, useValue: queryBus },
      ],
    }).compile();
    controller = moduleRef.get(UserContactController);
  });

  it('should be defined', () => expect(controller).toBeDefined());

  it('list() dispatches ListUserContactsQuery', async () => {
    queryBus.execute.mockResolvedValue([]);
    await controller.list({ id: 'u-1' } as never);
    expect(queryBus.execute).toHaveBeenCalled();
  });

  it('add() dispatches AddContactCommand', async () => {
    commandBus.execute.mockResolvedValue({});
    await controller.add({ id: 'u-1' } as never, {} as never);
    expect(commandBus.execute).toHaveBeenCalled();
  });

  it('get() dispatches GetUserContactQuery', async () => {
    queryBus.execute.mockResolvedValue(null);
    await controller.get('c-1');
    expect(queryBus.execute).toHaveBeenCalled();
  });

  it('update() dispatches UpdateContactCommand', async () => {
    commandBus.execute.mockResolvedValue({});
    await controller.update({} as never);
    expect(commandBus.execute).toHaveBeenCalled();
  });

  it('remove() dispatches DeleteContactCommand', async () => {
    commandBus.execute.mockResolvedValue(undefined);
    await controller.remove('c-1');
    expect(commandBus.execute).toHaveBeenCalled();
  });
});
