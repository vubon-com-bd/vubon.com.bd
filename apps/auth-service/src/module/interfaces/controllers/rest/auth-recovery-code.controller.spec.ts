import { Test } from '@nestjs/testing';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthRecoveryCodeController } from './auth-recovery-code.controller';

const mockCommandBus = () => ({ execute: jest.fn() });
const mockQueryBus = () => ({ execute: jest.fn() });

describe('AuthRecoveryCodeController', () => {
  let controller: AuthRecoveryCodeController;
  let commandBus: ReturnType<typeof mockCommandBus>;
  let queryBus: ReturnType<typeof mockQueryBus>;

  beforeEach(async () => {
    commandBus = mockCommandBus();
    queryBus = mockQueryBus();
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthRecoveryCodeController],
      providers: [
        { provide: CommandBus, useValue: commandBus },
        { provide: QueryBus, useValue: queryBus },
      ],
    }).compile();
    controller = moduleRef.get(AuthRecoveryCodeController);
  });

  it('should be defined', () => expect(controller).toBeDefined());

  it('generate() dispatches GenerateRecoveryCodesCommand', async () => {
    commandBus.execute.mockResolvedValue({ codes: [] });
    await controller.generate({ id: 'u-1' } as never, { password: 'x' } as never);
    expect(commandBus.execute).toHaveBeenCalled();
  });

  it('recover() dispatches RecoverAccountCommand', async () => {
    commandBus.execute.mockResolvedValue(undefined);
    await controller.recover({ email: 'a@b.com' } as never);
    expect(commandBus.execute).toHaveBeenCalled();
  });

  it('listMine() dispatches GetAuthRecoveryCodesQuery', async () => {
    queryBus.execute.mockResolvedValue([]);
    await controller.listMine({ id: 'u-1' } as never);
    expect(queryBus.execute).toHaveBeenCalled();
  });
});
