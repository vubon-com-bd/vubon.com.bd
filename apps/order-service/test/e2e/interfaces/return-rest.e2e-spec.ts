/**
 * Return REST E2E
 * @module order-service/test/e2e/interfaces
 */
import { jest } from '@jest/globals';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
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

describe('Return REST E2E', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ReturnController],
      providers: [{ provide: ORDER_RETURN_SERVICE, useValue: mockService }],
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

  it('POST /returns — should request return (201)', async () => {
    mockService.request.mockResolvedValue({ id: 'r-1' });

    const res = await request(app.getHttpServer())
      .post('/returns')
      .send({
        orderId: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
        reason: 'defective',
        itemIds: ['7c9e6679-7425-40de-944b-e07fc1f90ae7'],
      })
      .expect(201);

    expect(res.body.id).toBe('r-1');
  });

  it('POST /returns/:id/approve — should approve (200)', async () => {
    mockService.approve.mockResolvedValue({ id: 'r-1' });
    await request(app.getHttpServer())
      .post('/returns/r-1/approve')
      .send({})
      .expect(200);
  });

  it('POST /returns/:id/complete — should complete (200)', async () => {
    mockService.complete.mockResolvedValue({ id: 'r-1' });
    await request(app.getHttpServer())
      .post('/returns/r-1/complete')
      .send({ refundAmount: 100 })
      .expect(200);
  });

  it('GET /returns/:id — should return (200)', async () => {
    mockService.getById.mockResolvedValue({ id: 'r-1' });
    const res = await request(app.getHttpServer())
      .get('/returns/r-1')
      .expect(200);
    expect(res.body.id).toBe('r-1');
  });
});
