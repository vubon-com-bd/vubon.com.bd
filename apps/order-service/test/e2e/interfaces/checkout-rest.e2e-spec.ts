/**
 * Checkout REST E2E
 * @module order-service/test/e2e/interfaces
 */
import { jest } from '@jest/globals';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
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

describe('Checkout REST E2E', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CheckoutController],
      providers: [{ provide: CHECKOUT_SERVICE, useValue: mockService }],
    })
      .overrideGuard(JwtAuthGuard).useValue({
        canActivate: (ctx: unknown) => {
          const req = (ctx as { switchToHttp: () => { getRequest: () => { user?: unknown } } })
            .switchToHttp()
            .getRequest();
          req.user = { userId: 'test-user', roles: ['customer'] };
          return true;
        },
      })
      .overrideInterceptor(CheckoutTimeoutInterceptor).useValue({
        intercept: (_ctx: unknown, next: { handle: () => unknown }) => next.handle(),
      })
      .compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /checkouts', () => {
    it('should start checkout (201)', async () => {
      mockService.start.mockResolvedValue({
        id: 'c-1',
        status: 'started',
      });

      const res = await request(app.getHttpServer())
        .post('/checkouts')
        .send({
          cartId: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
          email: 'test@example.com',
        })
        .expect(201);

      expect(res.body.id).toBe('c-1');
    });
  });

  describe('POST /checkouts/:id/address', () => {
    it('should select address (200)', async () => {
      mockService.selectAddress.mockResolvedValue({ id: 'c-1' });

      await request(app.getHttpServer())
        .post('/checkouts/c-1/address')
        .send({ shippingAddressId: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
        .expect(200);
    });
  });

  describe('POST /checkouts/:id/shipping', () => {
    it('should select shipping (200)', async () => {
      mockService.selectShipping.mockResolvedValue({ id: 'c-1' });

      await request(app.getHttpServer())
        .post('/checkouts/c-1/shipping')
        .send({ shippingMethodId: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
        .expect(200);
    });
  });

  describe('POST /checkouts/:id/payment', () => {
    it('should select payment (200)', async () => {
      mockService.selectPayment.mockResolvedValue({ id: 'c-1' });

      await request(app.getHttpServer())
        .post('/checkouts/c-1/payment')
        .send({ paymentMethod: 'bkash' })
        .expect(200);
    });
  });

  describe('POST /checkouts/:id/confirm', () => {
    it('should confirm checkout (201)', async () => {
      mockService.confirm.mockResolvedValue({
        success: true,
        checkoutId: 'c-1',
        orderId: 'o-1',
        orderNumber: 'ORD-1',
      });

      const res = await request(app.getHttpServer())
        .post('/checkouts/c-1/confirm')
        .send({ paymentMethod: 'bkash', acceptTerms: true })
        .expect(201);

      expect(res.body.success).toBe(true);
    });
  });

  describe('GET /checkouts/:id', () => {
    it('should return checkout (200)', async () => {
      mockService.getById.mockResolvedValue({ id: 'c-1' });

      const res = await request(app.getHttpServer())
        .get('/checkouts/c-1')
        .expect(200);

      expect(res.body.id).toBe('c-1');
    });
  });
});
