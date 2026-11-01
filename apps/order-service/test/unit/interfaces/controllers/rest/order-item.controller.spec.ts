/**
 * OrderItemController Tests
 * @module order-service/test/unit/interfaces/controllers/rest
 */
import { jest } from '@jest/globals';
import { Test } from '@nestjs/testing';
import { OrderItemController } from '@interfaces/controllers/rest/order-item.controller.js';
import { ORDER_ITEM_SERVICE } from '@application/services/interfaces/order-item.service.interface.js';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';

const mockService = {
  add: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
  getById: jest.fn(),
  listByOrder: jest.fn(),
};
const mockUser = { userId: 'u-1', roles: ['customer'] };

describe('OrderItemController', () => {
  let controller: OrderItemController;

  beforeEach(async () => {
    jest.clearAllMocks();
    const m = await Test.createTestingModule({
      controllers: [OrderItemController],
      providers: [{ provide: ORDER_ITEM_SERVICE, useValue: mockService }],
    })
      .overrideGuard(JwtAuthGuard).useValue({ canActivate: () => true })
      .compile();
    controller = m.get(OrderItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('add should call service.add', async () => {
    mockService.add.mockResolvedValue({ id: 'i-1' });
    await controller.add('o-1', { productId: 'p-1', quantity: 1 } as never, mockUser as never);
    expect(mockService.add).toHaveBeenCalled();
  });

  it('list should call service.listByOrder', async () => {
    mockService.listByOrder.mockResolvedValue({ items: [], total: 0 });
    await controller.list('o-1');
    expect(mockService.listByOrder).toHaveBeenCalledWith('o-1');
  });

  it('getById should call service.getById', async () => {
    mockService.getById.mockResolvedValue({ id: 'i-1' });
    await controller.getById('i-1');
    expect(mockService.getById).toHaveBeenCalledWith('i-1');
  });

  it('update should call service.update', async () => {
    mockService.update.mockResolvedValue({ id: 'i-1' });
    await controller.update('o-1', 'i-1', { quantity: 2 } as never, mockUser as never);
    expect(mockService.update).toHaveBeenCalled();
  });

  it('remove should call service.remove', async () => {
    mockService.remove.mockResolvedValue(undefined);
    await controller.remove('o-1', 'i-1', {} as never, mockUser as never);
    expect(mockService.remove).toHaveBeenCalled();
  });
});
