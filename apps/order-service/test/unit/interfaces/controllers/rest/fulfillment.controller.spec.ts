/**
 * FulfillmentController Tests
 * @module order-service/test/unit/interfaces/controllers/rest
 */
import { jest } from '@jest/globals';
import { Test } from '@nestjs/testing';
import { FulfillmentController } from '@interfaces/controllers/rest/fulfillment.controller.js';
import { ORDER_FULFILLMENT_SERVICE } from '@application/services/interfaces/order-fulfillment.service.interface.js';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';

const mockService = {
  start: jest.fn(),
  pack: jest.fn(),
  ship: jest.fn(),
  complete: jest.fn(),
  getById: jest.fn(),
  listByOrder: jest.fn(),
  list: jest.fn(),
};
const mockUser = { userId: 'u-1', roles: ['admin'] };

describe('FulfillmentController', () => {
  let controller: FulfillmentController;

  beforeEach(async () => {
    jest.clearAllMocks();
    const m = await Test.createTestingModule({
      controllers: [FulfillmentController],
      providers: [{ provide: ORDER_FULFILLMENT_SERVICE, useValue: mockService }],
    })
      .overrideGuard(JwtAuthGuard).useValue({ canActivate: () => true })
      .compile();
    controller = m.get(FulfillmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('start should call service.start', async () => {
    mockService.start.mockResolvedValue({ id: 'f-1' });
    await controller.start({ orderId: 'o-1', itemIds: ['i-1'], type: 'standard' } as never, mockUser as never);
    expect(mockService.start).toHaveBeenCalled();
  });

  it('pack should call service.pack', async () => {
    mockService.pack.mockResolvedValue({ id: 'f-1' });
    await controller.pack('f-1', {} as never, mockUser as never);
    expect(mockService.pack).toHaveBeenCalled();
  });

  it('ship should call service.ship', async () => {
    mockService.ship.mockResolvedValue({ id: 'f-1' });
    await controller.ship('f-1', { trackingNumber: 'TRK-123' } as never, mockUser as never);
    expect(mockService.ship).toHaveBeenCalled();
  });

  it('complete should call service.complete', async () => {
    mockService.complete.mockResolvedValue({ id: 'f-1' });
    await controller.complete('f-1', {} as never, mockUser as never);
    expect(mockService.complete).toHaveBeenCalled();
  });

  it('getById should call service.getById', async () => {
    mockService.getById.mockResolvedValue({ id: 'f-1' });
    await controller.getById('f-1');
    expect(mockService.getById).toHaveBeenCalledWith('f-1');
  });
});
