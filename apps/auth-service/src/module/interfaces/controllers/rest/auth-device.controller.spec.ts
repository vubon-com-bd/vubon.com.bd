import { Test } from '@nestjs/testing';
import { QueryBus } from '@nestjs/cqrs';
import { AuthDeviceController } from './auth-device.controller';

const mockQueryBus = () => ({ execute: jest.fn() });

describe('AuthDeviceController', () => {
  let controller: AuthDeviceController;
  let queryBus: ReturnType<typeof mockQueryBus>;

  beforeEach(async () => {
    queryBus = mockQueryBus();
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthDeviceController],
      providers: [{ provide: QueryBus, useValue: queryBus }],
    }).compile();
    controller = moduleRef.get(AuthDeviceController);
  });

  it('should be defined', () => expect(controller).toBeDefined());

  it('listMine() dispatches ListAuthDevicesQuery', async () => {
    queryBus.execute.mockResolvedValue([]);
    await controller.listMine({ id: 'u-1' } as never);
    expect(queryBus.execute).toHaveBeenCalled();
  });

  it('getOne() dispatches GetAuthDeviceQuery', async () => {
    queryBus.execute.mockResolvedValue({});
    await controller.getOne('d-1');
    expect(queryBus.execute).toHaveBeenCalled();
  });
});
