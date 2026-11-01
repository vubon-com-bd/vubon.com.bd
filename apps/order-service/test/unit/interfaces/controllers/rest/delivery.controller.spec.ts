/**
 * DeliveryController Tests
 * @module order-service/test/unit/interfaces/controllers/rest
 */
import { jest } from '@jest/globals';
import { Test } from '@nestjs/testing';
import { DeliveryController } from '@interfaces/controllers/rest/delivery.controller.js';
import { DELIVERY_SERVICE } from '@application/services/interfaces/delivery.service.interface.js';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';

const mockService = {
  schedule: jest.fn(),
  reschedule: jest.fn(),
  confirm: jest.fn(),
  getById: jest.fn(),
  list: jest.fn(),
};

describe('DeliveryController', () => {
  let controller: DeliveryController;

  beforeEach(async () => {
    jest.clearAllMocks();
    const m = await Test.createTestingModule({
      controllers: [DeliveryController],
      providers: [{ provide: DELIVERY_SERVICE, useValue: mockService }],
    })
      .overrideGuard(JwtAuthGuard).useValue({ canActivate: () => true })
      .compile();
    controller = m.get(DeliveryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('schedule should call service.schedule', async () => {
    mockService.schedule.mockResolvedValue({ id: 'd-1' });
    await controller.schedule({ orderId: 'o-1' } as never);
    expect(mockService.schedule).toHaveBeenCalled();
  });

  it('list should call service.list', async () => {
    mockService.list.mockResolvedValue({ items: [], total: 0, page: 1, limit: 20, totalPages: 0 });
    await controller.list('2', '50');
    expect(mockService.list).toHaveBeenCalledWith(
      expect.objectContaining({ page: 2, limit: 50 }),
    );
  });

  it('getById should call service.getById', async () => {
    mockService.getById.mockResolvedValue({ id: 'd-1' });
    await controller.getById('d-1');
    expect(mockService.getById).toHaveBeenCalledWith('d-1');
  });

  it('reschedule should call service.reschedule', async () => {
    mockService.reschedule.mockResolvedValue({ id: 'd-1' });
    await controller.reschedule('d-1', 'o-1', { reason: 'test' } as never);
    expect(mockService.reschedule).toHaveBeenCalled();
  });

  it('confirm should call service.confirm', async () => {
    mockService.confirm.mockResolvedValue({ id: 'd-1' });
    await controller.confirm('d-1', 'o-1', { receivedBy: 'Jane' } as never);
    expect(mockService.confirm).toHaveBeenCalled();
  });
});
