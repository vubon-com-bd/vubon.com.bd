/**
 * CancelController Tests
 * @module order-service/test/unit/interfaces/controllers/rest
 */
import { jest } from '@jest/globals';
import { Test } from '@nestjs/testing';
import { CancelController } from '@interfaces/controllers/rest/cancel.controller.js';
import { ORDER_CANCEL_SERVICE } from '@application/services/interfaces/order-cancel.service.interface.js';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';

const mockService = {
  request: jest.fn(),
  approve: jest.fn(),
  reject: jest.fn(),
  getById: jest.fn(),
  listByOrder: jest.fn(),
  list: jest.fn(),
};
const mockUser = { userId: 'u-1', roles: ['customer'] };

describe('CancelController', () => {
  let controller: CancelController;

  beforeEach(async () => {
    jest.clearAllMocks();
    const m = await Test.createTestingModule({
      controllers: [CancelController],
      providers: [{ provide: ORDER_CANCEL_SERVICE, useValue: mockService }],
    })
      .overrideGuard(JwtAuthGuard).useValue({ canActivate: () => true })
      .compile();
    controller = m.get(CancelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('request should call service.request', async () => {
    mockService.request.mockResolvedValue({ id: 'x-1' });
    await controller.request({ orderId: 'o-1', reason: 'customer_request' } as never, mockUser as never);
    expect(mockService.request).toHaveBeenCalled();
  });

  it('getById should call service.getById', async () => {
    mockService.getById.mockResolvedValue({ id: 'x-1' });
    await controller.getById('x-1');
    expect(mockService.getById).toHaveBeenCalledWith('x-1');
  });

  it('approve should call service.approve', async () => {
    mockService.approve.mockResolvedValue({ id: 'x-1' });
    await controller.approve('x-1', { refundAmount: 100 } as never, mockUser as never);
    expect(mockService.approve).toHaveBeenCalled();
  });

  it('reject should call service.reject', async () => {
    mockService.reject.mockResolvedValue({ id: 'x-1' });
    await controller.reject('x-1', { reason: 'too late' } as never, mockUser as never);
    expect(mockService.reject).toHaveBeenCalled();
  });
});
