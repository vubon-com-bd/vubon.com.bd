/**
 * Tracking REST E2E
 * @module order-service/test/e2e/interfaces
 */
import { jest } from '@jest/globals';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
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

describe('Tracking REST E2E', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TrackingController],
      providers: [{ provide: ORDER_TRACKING_SERVICE, useValue: mockService }],
    })
      .overrideGuard(JwtAuthGuard).useValue({
        canActivate: (ctx: unknown) => {
          const req = (ctx as { switchToHttp: () => { getRequest: () => { user?: unknown } } })
            .switchToHttp()
            .getRequest();
          req.user = { userId: 'test-admin', roles: ['admin'] };
          return true;
        },
      })
      .compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => { await app.close(); });
  beforeEach(() => { jest.clearAllMocks(); });

  it('POST /tracking — should add tracking (201)', async () => {
    mockService.add.mockResolvedValue({ id: 't-1' });
    const res = await request(app.getHttpServer())
      .post('/tracking')
      .send({
        orderId: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
        event: 'in_transit',
        message: 'Package moving',
      })
      .expect(201);
    expect(res.body.id).toBe('t-1');
  });

  it('GET /tracking/orders/:orderId — should return summary (200)', async () => {
    mockService.getSummaryByOrder.mockResolvedValue({
      orderId: 'o-1',
      events: [],
    });
    const res = await request(app.getHttpServer())
      .get('/tracking/orders/o-1')
      .expect(200);
    expect(res.body.orderId).toBe('o-1');
  });

  it('GET /tracking/orders/:orderId/events — should list events (200)', async () => {
    mockService.listByOrder.mockResolvedValue({ items: [], total: 0 });
    await request(app.getHttpServer())
      .get('/tracking/orders/o-1/events')
      .expect(200);
  });
});
