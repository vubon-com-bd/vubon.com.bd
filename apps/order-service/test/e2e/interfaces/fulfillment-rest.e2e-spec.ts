/**
 * Fulfillment REST E2E
 * @module order-service/test/e2e/interfaces
 */
import { jest } from '@jest/globals';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
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

describe('Fulfillment REST E2E', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [FulfillmentController],
      providers: [{ provide: ORDER_FULFILLMENT_SERVICE, useValue: mockService }],
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

  it('POST /fulfillments/start — should start (201)', async () => {
    mockService.start.mockResolvedValue({ id: 'f-1' });
    const res = await request(app.getHttpServer())
      .post('/fulfillments/start')
      .send({
        orderId: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
        itemIds: ['7c9e6679-7425-40de-944b-e07fc1f90ae7'],
        type: 'standard',
      })
      .expect(201);
    expect(res.body.id).toBe('f-1');
  });

  it('POST /fulfillments/:id/pack — should pack (200)', async () => {
    mockService.pack.mockResolvedValue({ id: 'f-1' });
    await request(app.getHttpServer())
      .post('/fulfillments/f-1/pack')
      .send({})
      .expect(200);
  });

  it('POST /fulfillments/:id/ship — should ship (200)', async () => {
    mockService.ship.mockResolvedValue({ id: 'f-1' });
    await request(app.getHttpServer())
      .post('/fulfillments/f-1/ship')
      .send({ trackingNumber: 'TRK-123' })
      .expect(200);
  });

  it('GET /fulfillments/:id — should return (200)', async () => {
    mockService.getById.mockResolvedValue({ id: 'f-1' });
    await request(app.getHttpServer()).get('/fulfillments/f-1').expect(200);
  });
});
