/**
 * Delivery REST E2E
 * @module order-service/test/e2e/interfaces
 */
import { jest } from '@jest/globals';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
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

describe('Delivery REST E2E', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [DeliveryController],
      providers: [{ provide: DELIVERY_SERVICE, useValue: mockService }],
    })
      .overrideGuard(JwtAuthGuard).useValue({ canActivate: () => true })
      .compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => { await app.close(); });
  beforeEach(() => { jest.clearAllMocks(); });

  it('POST /deliveries — should schedule (201)', async () => {
    mockService.schedule.mockResolvedValue({ id: 'd-1' });
    const res = await request(app.getHttpServer())
      .post('/deliveries')
      .send({ orderId: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
      .expect(201);
    expect(res.body.id).toBe('d-1');
  });

  it('GET /deliveries — should list (200)', async () => {
    mockService.list.mockResolvedValue({
      items: [], total: 0, page: 1, limit: 20, totalPages: 0,
    });
    const res = await request(app.getHttpServer())
      .get('/deliveries?page=1&limit=20')
      .expect(200);
    expect(res.body.items).toEqual([]);
  });

  it('GET /deliveries/:id — should return (200)', async () => {
    mockService.getById.mockResolvedValue({ id: 'd-1' });
    await request(app.getHttpServer()).get('/deliveries/d-1').expect(200);
  });

  it('POST /deliveries/:id/reschedule — should reschedule (200)', async () => {
    mockService.reschedule.mockResolvedValue({ id: 'd-1' });
    await request(app.getHttpServer())
      .post('/deliveries/d-1/reschedule?orderId=o-1')
      .send({ reason: 'customer unavailable' })
      .expect(200);
  });

  it('POST /deliveries/:id/confirm — should confirm (200)', async () => {
    mockService.confirm.mockResolvedValue({ id: 'd-1' });
    await request(app.getHttpServer())
      .post('/deliveries/d-1/confirm?orderId=o-1')
      .send({ receivedBy: 'Jane' })
      .expect(200);
  });
});
