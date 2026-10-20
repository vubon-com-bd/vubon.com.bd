/**
 * CheckoutController Tests
 * @module order-service/test/unit/interfaces/controllers/rest
 */
import { jest } from '@jest/globals';
import { Test } from '@nestjs/testing';
import { CheckoutController } from '@interfaces/controllers/rest/checkout.controller.js';
import { CHECKOUT_SERVICE } from '@application/services/interfaces/checkout.service.interface.js';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CheckoutTimeoutInterceptor } from '@interfaces/interceptors/checkout-timeout.interceptor.js';

const mockService = {
  start: jest.fn(),
  selectAddress: jest.fn(),
  selectShipping: jest.fn(),
  selectPayment: jest.fn(),
  confirm: jest.fn(),
  abandon: jest.fn(),
  getById: jest.fn(),
  getPublic: jest.fn(),
};

const mockUser = { userId: 'u-1', roles: ['customer'] };

describe('CheckoutController', () => {
  let controller: CheckoutController;

  beforeEach(async () => {
    jest.clearAllMocks();

    const moduleRef = await Test.createTestingModule({
      controllers: [CheckoutController],
      providers: [
        { provide: CHECKOUT_SERVICE, useValue: mockService },
        // ⚠️ Do NOT register CheckoutTimeoutInterceptor as provider
        // (constructor takes primitive `ms`, breaks NestJS DI).
        // Use overrideInterceptor below instead.
      ],
    })
      .overrideInterceptor(CheckoutTimeoutInterceptor)
      .useValue({
        intercept: (_ctx: unknown, next: { handle: () => unknown }) => next.handle(),
      })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = moduleRef.get(CheckoutController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('start should call service.start', async () => {
    mockService.start.mockResolvedValue({ id: 'c-1' });
    await controller.start(
      { cartId: 'cart-1', email: 'a@b.com' } as never,
      mockUser as never,
    );
    expect(mockService.start).toHaveBeenCalled();
  });

  it('selectAddress should call service.selectAddress', async () => {
    mockService.selectAddress.mockResolvedValue({ id: 'c-1' });
    await controller.selectAddress('c-1', { shippingAddressId: 'addr-1' } as never);
    expect(mockService.selectAddress).toHaveBeenCalled();
  });

  it('selectShipping should call service.selectShipping', async () => {
    mockService.selectShipping.mockResolvedValue({ id: 'c-1' });
    await controller.selectShipping('c-1', { shippingMethodId: 'm-1' } as never);
    expect(mockService.selectShipping).toHaveBeenCalled();
  });

  it('selectPayment should call service.selectPayment', async () => {
    mockService.selectPayment.mockResolvedValue({ id: 'c-1' });
    await controller.selectPayment('c-1', { paymentMethod: 'bkash' } as never);
    expect(mockService.selectPayment).toHaveBeenCalled();
  });

  it('confirm should call service.confirm', async () => {
    mockService.confirm.mockResolvedValue({
      success: true, checkoutId: 'c-1', orderId: 'o-1', orderNumber: 'ORD-1',
    });
    await controller.confirm(
      'c-1',
      { paymentMethod: 'bkash', acceptTerms: true } as never,
      mockUser as never,
    );
    expect(mockService.confirm).toHaveBeenCalled();
  });

  it('abandon should call service.abandon', async () => {
    mockService.abandon.mockResolvedValue({ id: 'c-1' });
    await controller.abandon('c-1', { reason: 'changed mind' } as never);
    expect(mockService.abandon).toHaveBeenCalled();
  });

  it('getById should call service.getById', async () => {
    mockService.getById.mockResolvedValue({ id: 'c-1' });
    await controller.getById('c-1');
    expect(mockService.getById).toHaveBeenCalledWith('c-1');
  });
});
