/**
 * UserKycController — Unit Tests
 */
import { Test } from '@nestjs/testing';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UserKycController } from './user-kyc.controller';

const mockCommandBus = () => ({ execute: jest.fn() });
const mockQueryBus = () => ({ execute: jest.fn() });

describe('UserKycController', () => {
  let controller: UserKycController;
  let commandBus: ReturnType<typeof mockCommandBus>;
  let queryBus: ReturnType<typeof mockQueryBus>;

  beforeEach(async () => {
    commandBus = mockCommandBus();
    queryBus = mockQueryBus();

    const moduleRef = await Test.createTestingModule({
      controllers: [UserKycController],
      providers: [
        { provide: CommandBus, useValue: commandBus },
        { provide: QueryBus, useValue: queryBus },
      ],
    }).compile();

    controller = moduleRef.get(UserKycController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('myStatus() dispatches GetUserKycStatusQuery', async () => {
    queryBus.execute.mockResolvedValue(null);
    await controller.myStatus({ id: 'u-1' } as never);
    expect(queryBus.execute).toHaveBeenCalled();
  });

  it('submit() dispatches SubmitKycCommand', async () => {
    commandBus.execute.mockResolvedValue({});
    await controller.submit({ id: 'u-1' } as never, {} as never);
    expect(commandBus.execute).toHaveBeenCalled();
  });

  it('verify() dispatches VerifyKycCommand', async () => {
    commandBus.execute.mockResolvedValue({});
    await controller.verify({} as never);
    expect(commandBus.execute).toHaveBeenCalled();
  });

  it('reject() dispatches RejectKycCommand', async () => {
    commandBus.execute.mockResolvedValue({});
    await controller.reject({} as never);
    expect(commandBus.execute).toHaveBeenCalled();
  });
});
