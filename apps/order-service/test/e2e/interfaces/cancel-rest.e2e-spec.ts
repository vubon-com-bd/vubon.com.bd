/**
 * Cancel REST E2E
 * @module order-service/test/e2e/interfaces
 */
import { jest } from '@jest/globals';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
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

describe('Cancel REST E2E', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CancelController],
      providers: [{ provide: ORDER_CANCEL_SERVICE, useValue: mockService }],
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
      .compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => { await app.close(); });
  beforeEach(() => { jest.clearAllMocks(); });

  it('POST /cancels — should request cancel (201)', async () => {
    mockService.request.mockResolvedValue({ id: 'x-1' });

    const res = await request(app.getHttpServer())
      .post('/cancels')
      .send({
        orderId: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
        reason: 'customer_request',
      })
      .expect(201);

    expect(res.body.id).toBe('x-1');
  });

  it('POST /cancels/:id/approve — should approve (200)', async () => {
    mockService.approve.mockResolvedValue({ id: 'x-1' });

    await request(app.getHttpServer())
      .post('/cancels/x-1/approve')
      .send({ refundAmount: 100 })
      .expect(200);
  });

  it('POST /cancels/:id/reject — should reject (200)', async () => {
    mockService.reject.mockResolvedValue({ id: 'x-1' });

    await request(app.getHttpServer())
      .post('/cancels/x-1/reject')
      .send({ reason: 'too late' })
      .expect(200);
  });

  it('GET /cancels/:id — should return cancel (200)', async () => {
    mockService.getById.mockResolvedValue({ id: 'x-1' });

    const res = await request(app.getHttpServer())
      .get('/cancels/x-1')
      .expect(200);

    expect(res.body.id).toBe('x-1');
  });
});
