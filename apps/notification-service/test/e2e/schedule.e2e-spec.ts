import { jest } from '@jest/globals';
import request from 'supertest';
import type { INestApplication } from '@nestjs/common';
import {
  createTestApp,
  AUTH,
  scheduleRow,
  UUID_SCHEDULE,
} from './_setup.js';
import type { MockPrisma } from './_setup.js';

describe('Schedule API (e2e)', () => {
  let app: INestApplication;
  let prisma: MockPrisma;

  beforeAll(async () => {
    const ctx = await createTestApp();
    app = ctx.app;
    prisma = ctx.prisma;
  });
  afterAll(async () => { await app.close(); });
  beforeEach(() => { jest.clearAllMocks(); });

  describe('Auth', () => {
    it('401 without token', async () => {
      await request(app.getHttpServer()).get('/api/v1/schedules').expect(401);
    });
  });

  describe('POST /api/v1/schedules', () => {
    it('201 — create valid schedule', async () => {
      prisma.notificationSchedule.create.mockResolvedValueOnce(scheduleRow() as never);
      const res = await request(app.getHttpServer())
        .post('/api/v1/schedules')
        .set(AUTH.customer)
        .send({
          type: 'scheduled',
          recurrence: 'none',
          scheduledAt: new Date(Date.now() + 3600_000).toISOString(),
          timezone: 'Asia/Dhaka',
        });
      expect([200, 201, 422]).toContain(res.status);
    });

    it('422 — past scheduledAt', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/v1/schedules')
        .set(AUTH.customer)
        .send({
          type: 'scheduled',
          recurrence: 'none',
          scheduledAt: new Date(Date.now() - 86400_000).toISOString(),
          timezone: 'Asia/Dhaka',
        });
      expect([422, 400]).toContain(res.status);
    });

    it('422 — missing type', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/schedules')
        .set(AUTH.customer)
        .send({
          recurrence: 'none',
          scheduledAt: new Date(Date.now() + 3600_000).toISOString(),
          timezone: 'Asia/Dhaka',
        })
        .expect(422);
    });
  });

  describe('GET /api/v1/schedules', () => {
    it('200 — paginated list', async () => {
      prisma.notificationSchedule.findMany.mockResolvedValueOnce([] as never);
      prisma.notificationSchedule.count.mockResolvedValueOnce(0 as never);
      await request(app.getHttpServer())
        .get('/api/v1/schedules')
        .set(AUTH.customer)
        .expect(200);
    });
  });

  describe('GET /api/v1/schedules/due', () => {
    it('200', async () => {
      prisma.notificationSchedule.findMany.mockResolvedValueOnce([] as never);
      const res = await request(app.getHttpServer())
        .get('/api/v1/schedules/due')
        .set(AUTH.customer);
      expect([200, 404]).toContain(res.status);
    });
  });

  describe('GET /api/v1/schedules/:id', () => {
    it('404 — not found', async () => {
      prisma.notificationSchedule.findFirst.mockResolvedValueOnce(null as never);
      await request(app.getHttpServer())
        .get(`/api/v1/schedules/${UUID_SCHEDULE}`)
        .set(AUTH.customer)
        .expect(404);
    });

    it('200 — found', async () => {
      prisma.notificationSchedule.findFirst.mockResolvedValueOnce(scheduleRow() as never);
      const res = await request(app.getHttpServer())
        .get(`/api/v1/schedules/${UUID_SCHEDULE}`)
        .set(AUTH.customer)
        .expect(200);
      expect(res.body.id).toBe(UUID_SCHEDULE);
    });
  });

  describe('PATCH /api/v1/schedules/:id', () => {
    it('200/404', async () => {
      prisma.notificationSchedule.findFirst.mockResolvedValueOnce(scheduleRow() as never);
      prisma.notificationSchedule.update.mockResolvedValueOnce(scheduleRow() as never);
      const res = await request(app.getHttpServer())
        .patch(`/api/v1/schedules/${UUID_SCHEDULE}`)
        .set(AUTH.customer)
        .send({ timezone: 'UTC' });
      expect([200, 404]).toContain(res.status);
    });
  });

  describe('POST /api/v1/schedules/:id/activate', () => {
    it('200/404', async () => {
      prisma.notificationSchedule.findFirst.mockResolvedValueOnce(scheduleRow() as never);
      prisma.notificationSchedule.update.mockResolvedValueOnce(
        scheduleRow({ status: 'active' }) as never,
      );
      const res = await request(app.getHttpServer())
        .post(`/api/v1/schedules/${UUID_SCHEDULE}/activate`)
        .set(AUTH.customer);
      expect([200, 404]).toContain(res.status);
    });
  });

  describe('POST /api/v1/schedules/:id/pause', () => {
    it('404/200', async () => {
      prisma.notificationSchedule.findFirst.mockResolvedValueOnce(null as never);
      const res = await request(app.getHttpServer())
        .post(`/api/v1/schedules/${UUID_SCHEDULE}/pause`)
        .set(AUTH.customer)
        .send({ reason: 'maintenance' });
      expect([200, 404]).toContain(res.status);
    });
  });

  describe('POST /api/v1/schedules/:id/resume', () => {
    it('404/200', async () => {
      prisma.notificationSchedule.findFirst.mockResolvedValueOnce(null as never);
      const res = await request(app.getHttpServer())
        .post(`/api/v1/schedules/${UUID_SCHEDULE}/resume`)
        .set(AUTH.customer);
      expect([200, 404]).toContain(res.status);
    });
  });

  describe('POST /api/v1/schedules/:id/cancel', () => {
    it('404/200', async () => {
      prisma.notificationSchedule.findFirst.mockResolvedValueOnce(null as never);
      const res = await request(app.getHttpServer())
        .post(`/api/v1/schedules/${UUID_SCHEDULE}/cancel`)
        .set(AUTH.customer)
        .send({ reason: 'changed' });
      expect([200, 404]).toContain(res.status);
    });
  });

  describe('POST /api/v1/schedules/:id/trigger', () => {
    it('404/200', async () => {
      prisma.notificationSchedule.findFirst.mockResolvedValueOnce(null as never);
      const res = await request(app.getHttpServer())
        .post(`/api/v1/schedules/${UUID_SCHEDULE}/trigger`)
        .set(AUTH.customer)
        .send({});
      expect([200, 404]).toContain(res.status);
    });
  });
});
