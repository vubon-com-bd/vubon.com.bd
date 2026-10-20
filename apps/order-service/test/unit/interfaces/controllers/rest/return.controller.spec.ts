/**
 * ReturnController Tests
 * @module order-service/test/unit/interfaces/controllers/rest
 */
import { jest } from '@jest/globals';
import { Test } from '@nestjs/testing';
import { ReturnController } from '@interfaces/controllers/rest/return.controller.js';
import { ORDER_RETURN_SERVICE } from '@application/services/interfaces/order-return.service.interface.js';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';

const mockService = {
  request: jest.fn(),
  approve: jest.fn(),
  reject: jest.fn(),
  complete: jest.fn(),
  getById: jest.fn(),
  listByOrder: jest.fn(),
  list: jest.fn(),
};
const mockUser = { userId: 'u-1', roles: ['customer'] };

describe('ReturnController', () => {
  let controller: ReturnController;

  beforeEach(async () => {
    jest.clearAllMocks();
    const m = await Test.createTestingModule({
      controllers: [ReturnController],
      providers: [{ provide: ORDER_RETURN_SERVICE, useValue: mockService }],
    })
      .overrideGuard(JwtAuthGuard).useValue({ canActivate: () => true })
      .compile();
    controller = m.get(ReturnController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('request should call service.request', async () => {
    mockService.request.mockResolvedValue({ id: 'r-1' });
    await controller.request({ orderId: 'o-1', reason: 'defective', itemIds: ['i-1'] } as never, mockUser as never);
    expect(mockService.request).toHaveBeenCalled();
  });

  it('getById should call service.getById', async () => {
    mockService.getById.mockResolvedValue({ id: 'r-1' });
    await controller.getById('r-1');
    expect(mockService.getById).toHaveBeenCalledWith('r-1');
  });

  it('approve should call service.approve', async () => {
    mockService.approve.mockResolvedValue({ id: 'r-1' });
    await controller.approve('r-1', { notes: 'ok' } as never, mockUser as never);
    expect(mockService.approve).toHaveBeenCalled();
  });

  it('reject should call service.reject', async () => {
    mockService.reject.mockResolvedValue({ id: 'r-1' });
    await controller.reject('r-1', { reason: 'no' } as never, mockUser as never);
    expect(mockService.reject).toHaveBeenCalled();
  });

  it('complete should call service.complete', async () => {
    mockService.complete.mockResolvedValue({ id: 'r-1' });
    await controller.complete('r-1', { refundAmount: 100 } as never, mockUser as never);
    expect(mockService.complete).toHaveBeenCalled();
  });
});
