/**
 * PublicOrderController Tests
 * @module order-service/test/unit/interfaces/controllers/rest
 */
import { jest } from '@jest/globals';
import { Test } from '@nestjs/testing';
import { PublicOrderController } from '@interfaces/controllers/rest/public-order.controller.js';
import { ORDER_SERVICE } from '@application/services/interfaces/order.service.interface.js';

const mockService = {
  getPublic: jest.fn(),
  getByNumber: jest.fn(),
};

describe('PublicOrderController', () => {
  let controller: PublicOrderController;

  beforeEach(async () => {
    jest.clearAllMocks();
    const m = await Test.createTestingModule({
      controllers: [PublicOrderController],
      providers: [{ provide: ORDER_SERVICE, useValue: mockService }],
    }).compile();
    controller = m.get(PublicOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getPublic should call service.getPublic', async () => {
    mockService.getPublic.mockResolvedValue({ id: 'o-1', orderNumber: 'ORD-1' });
    const result = await controller.getPublic('o-1');
    expect(mockService.getPublic).toHaveBeenCalledWith('o-1');
    expect(result).toBeDefined();
  });

  it('getByNumber should call service.getByNumber', async () => {
    mockService.getByNumber.mockResolvedValue({ id: 'o-1', orderNumber: 'ORD-1' });
    const result = await controller.getByNumber('ORD-1');
    expect(mockService.getByNumber).toHaveBeenCalledWith('ORD-1');
    expect(result).toBeDefined();
  });
});
