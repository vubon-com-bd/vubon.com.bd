/**
 * TrackingController Tests
 * @module order-service/test/unit/interfaces/controllers/rest
 */
import { jest } from '@jest/globals';
import { Test } from '@nestjs/testing';
import { TrackingController } from '@interfaces/controllers/rest/tracking.controller.js';
import { ORDER_TRACKING_SERVICE } from '@application/services/interfaces/order-tracking.service.interface.js';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';

const mockService = {
  add: jest.fn(),
  update: jest.fn(),
  getById: jest.fn(),
  getSummaryByOrder: jest.fn(),
  listByOrder: jest.fn(),
  listByTrackingNumber: jest.fn(),
};
const mockUser = { userId: 'u-1', roles: ['admin'] };

describe('TrackingController', () => {
  let controller: TrackingController;

  beforeEach(async () => {
    jest.clearAllMocks();
    const m = await Test.createTestingModule({
      controllers: [TrackingController],
      providers: [{ provide: ORDER_TRACKING_SERVICE, useValue: mockService }],
    })
      .overrideGuard(JwtAuthGuard).useValue({ canActivate: () => true })
      .compile();
    controller = m.get(TrackingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('add should call service.add', async () => {
    mockService.add.mockResolvedValue({ id: 't-1' });
    await controller.add({ orderId: 'o-1', event: 'in_transit', message: 'x' } as never, mockUser as never);
    expect(mockService.add).toHaveBeenCalled();
  });

  it('getSummary should call service.getSummaryByOrder', async () => {
    mockService.getSummaryByOrder.mockResolvedValue({ orderId: 'o-1', events: [] });
    await controller.getSummary('o-1');
    expect(mockService.getSummaryByOrder).toHaveBeenCalledWith('o-1');
  });

  it('listEvents should call service.listByOrder', async () => {
    mockService.listByOrder.mockResolvedValue({ items: [], total: 0 });
    await controller.listEvents('o-1');
    expect(mockService.listByOrder).toHaveBeenCalledWith('o-1');
  });

  it('getById should call service.getById', async () => {
    mockService.getById.mockResolvedValue({ id: 't-1' });
    await controller.getById('t-1');
    expect(mockService.getById).toHaveBeenCalledWith('t-1');
  });

  it('update should call service.update', async () => {
    mockService.update.mockResolvedValue({ id: 't-1' });
    await controller.update('t-1', { message: 'x' } as never, mockUser as never);
    expect(mockService.update).toHaveBeenCalled();
  });
});
