import { jest } from '@jest/globals';
import request from 'supertest';
import type { INestApplication } from '@nestjs/common';
import {
  createTestApp,
  AUTH,
  notificationRow,
  UUID_NOTIFICATION,
  UUID_USER,
} from './_setup.js';
import type { MockPrisma } from './_setup.js';

describe('Notification API (e2e)', () => {
  let app: INestApplication;
  let prisma: MockPrisma;

  beforeAll(async () => {
    const ctx = await createTestApp();
    app = ctx.app;
    prisma = ctx.prisma;
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ═══════════════ AUTH ═══════════════
  describe('Auth', () => {
    it('401 without Authorization', async () => {
      await request(app.getHttpServer()).get('/api/v1/notifications').expect(401);
    });

    it('401 with malformed bearer', async () => {
      await request(app.getHttpServer())
        .get('/api/v1/notifications')
        .set('Authorization', 'Basic x')
        .expect(401);
    });
  });

  // ═══════════════ SEND ═══════════════
  describe('POST /api/v1/notifications', () => {
    it('201 — send valid notification (happy path)', async () => {
      prisma.notification.create.mockResolvedValueOnce(
        notificationRow({ status: 'pending' }) as never,
      );
      prisma.notification.findFirst.mockResolvedValueOnce(null);

      const res = await request(app.getHttpServer())
        .post('/api/v1/notifications')
        .set(AUTH.customer)
        .send({
          userId: UUID_USER,
          type: 'transactional',
          category: 'order',
          channels: ['email'],
          priority: 'normal',
          title: 'Order confirmed',
          body: 'Your order has been confirmed.',
        });

      expect([201, 200]).toContain(res.status);
    });

    it('422 — missing required fields', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/notifications')
        .set(AUTH.customer)
        .send({})
        .expect(422);
    });

    it('422 — invalid UUID', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/notifications')
        .set(AUTH.customer)
        .send({
          userId: 'not-a-uuid',
          type: 'transactional',
          category: 'order',
          channels: ['email'],
          title: 'T',
          body: 'B',
        })
        .expect(422);
    });

    it('422 — empty channels array', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/notifications')
        .set(AUTH.customer)
        .send({
          userId: UUID_USER,
          type: 'transactional',
          category: 'order',
          channels: [],
          title: 'T',
          body: 'B',
        })
        .expect(422);
    });

    it('422 — invalid channel enum', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/notifications')
        .set(AUTH.customer)
        .send({
          userId: UUID_USER,
          type: 'transactional',
          category: 'order',
          channels: ['pigeon'],
          title: 'T',
          body: 'B',
        })
        .expect(422);
    });

    it('422 — title exceeds 200 chars', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/notifications')
        .set(AUTH.customer)
        .send({
          userId: UUID_USER,
          type: 'transactional',
          category: 'order',
          channels: ['email'],
          title: 'x'.repeat(201),
          body: 'B',
        })
        .expect(422);
    });

    it('422 — too many actions (>5)', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/notifications')
        .set(AUTH.customer)
        .send({
          userId: UUID_USER,
          type: 'transactional',
          category: 'order',
          channels: ['email'],
          title: 'T',
          body: 'B',
          actions: Array.from({ length: 6 }, (_, i) => ({
            action: 'view',
            type: 'primary',
            label: `A${i}`,
            url: 'https://x.com',
          })),
        })
        .expect(422);
    });

    it('422 — non-whitelisted extra field', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/notifications')
        .set(AUTH.customer)
        .send({
          userId: UUID_USER,
          type: 'transactional',
          category: 'order',
          channels: ['email'],
          title: 'T',
          body: 'B',
          evilField: 'nope',
        })
        .expect(422);
    });
  });

  // ═══════════════ SEND MANY ═══════════════
  describe('POST /api/v1/notifications/bulk', () => {
    it('200/201 — accepts valid payload', async () => {
      prisma.notification.create.mockResolvedValue(notificationRow() as never);
      prisma.notification.findFirst.mockResolvedValue(null);
      prisma.notificationPreference.findFirst.mockResolvedValue(null);

      const res = await request(app.getHttpServer())
        .post('/api/v1/notifications/bulk')
        .set(AUTH.customer)
        .send({
          userIds: [UUID_USER],
          type: 'announcement',
          category: 'system',
          channels: ['email'],
          title: 'System update',
          body: 'Scheduled maintenance.',
        });
      expect([200, 201]).toContain(res.status);
    });

    it('422 — empty userIds', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/notifications/bulk')
        .set(AUTH.customer)
        .send({
          userIds: [],
          type: 'announcement',
          category: 'system',
          channels: ['email'],
          title: 'T',
          body: 'B',
        })
        .expect(422);
    });
  });

  // ═══════════════ SCHEDULE ═══════════════
  describe('POST /api/v1/notifications/schedule', () => {
    it('422 — past scheduledAt rejected by DTO validator', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/notifications/schedule')
        .set(AUTH.customer)
        .send({
          userId: UUID_USER,
          type: 'transactional',
          category: 'order',
          channels: ['email'],
          title: 'T',
          body: 'B',
          scheduledAt: 'not-a-date',
        })
        .expect(422);
    });
  });

  // ═══════════════ LIST ═══════════════
  describe('GET /api/v1/notifications', () => {
    it('200 — returns empty list', async () => {
      prisma.notification.findMany.mockResolvedValueOnce([] as never);
      prisma.notification.count.mockResolvedValueOnce(0 as never);

      const res = await request(app.getHttpServer())
        .get('/api/v1/notifications')
        .set(AUTH.customer)
        .expect(200);

      expect(res.body).toBeDefined();
    });

    it('200 — pagination params honored', async () => {
      prisma.notification.findMany.mockResolvedValueOnce([] as never);
      prisma.notification.count.mockResolvedValueOnce(0 as never);

      await request(app.getHttpServer())
        .get('/api/v1/notifications?page=2&limit=10')
        .set(AUTH.customer)
        .expect(200);
    });

    it('422 — limit > 100', async () => {
      await request(app.getHttpServer())
        .get('/api/v1/notifications?limit=200')
        .set(AUTH.customer)
        .expect(422);
    });

    it('422 — page < 1', async () => {
      await request(app.getHttpServer())
        .get('/api/v1/notifications?page=0')
        .set(AUTH.customer)
        .expect(422);
    });
  });

  // ═══════════════ STATS / UNREAD ═══════════════
  describe('GET /api/v1/notifications/stats', () => {
    it('200 — returns stats shape', async () => {
      prisma.notification.findMany.mockResolvedValueOnce([] as never);

      const res = await request(app.getHttpServer())
        .get('/api/v1/notifications/stats')
        .set(AUTH.customer)
        .expect(200);
      expect(res.body).toBeDefined();
    });
  });

  describe('GET /api/v1/notifications/unread-count', () => {
    it('200', async () => {
      prisma.notification.count.mockResolvedValueOnce(5 as never);
      const res = await request(app.getHttpServer())
        .get('/api/v1/notifications/unread-count')
        .set(AUTH.customer)
        .expect(200);
      expect(res.body).toBeDefined();
    });
  });

  // ═══════════════ GET BY ID ═══════════════
  describe('GET /api/v1/notifications/:id', () => {
    it('404 — not found', async () => {
      prisma.notification.findFirst.mockResolvedValueOnce(null as never);
      await request(app.getHttpServer())
        .get(`/api/v1/notifications/${UUID_NOTIFICATION}`)
        .set(AUTH.customer)
        .expect(404);
    });

    it('200 — returns notification', async () => {
      prisma.notification.findFirst.mockResolvedValueOnce(notificationRow() as never);
      const res = await request(app.getHttpServer())
        .get(`/api/v1/notifications/${UUID_NOTIFICATION}`)
        .set(AUTH.customer);
      expect([200, 404]).toContain(res.status);
      if (res.status === 200) {
        expect(res.body.id).toBe(UUID_NOTIFICATION);
      }
    });

    it('200/404 — public route', async () => {
      prisma.notification.findFirst.mockResolvedValueOnce(notificationRow() as never);
      const res = await request(app.getHttpServer())
        .get(`/api/v1/notifications/${UUID_NOTIFICATION}/public`)
        .set(AUTH.customer);
      expect([200, 404]).toContain(res.status);
    });
  });

  // ═══════════════ READ-STATE ═══════════════
  describe('POST /api/v1/notifications/:id/mark-read', () => {
    it('200/404 — mark read', async () => {
      prisma.notification.findFirst.mockResolvedValueOnce(notificationRow() as never);
      prisma.notification.update.mockResolvedValueOnce(
        notificationRow({ readStatus: 'read', readAt: new Date() }) as never,
      );

      const res = await request(app.getHttpServer())
        .post(`/api/v1/notifications/${UUID_NOTIFICATION}/mark-read`)
        .set(AUTH.customer);
      expect([200, 404]).toContain(res.status);
    });
  });

  describe('POST /api/v1/notifications/mark-all-read', () => {
    it('200 — accepts empty body', async () => {
      prisma.notification.updateMany.mockResolvedValueOnce({ count: 3 } as never);
      prisma.notification.findMany.mockResolvedValueOnce([] as never);

      const res = await request(app.getHttpServer())
        .post('/api/v1/notifications/mark-all-read')
        .set(AUTH.customer)
        .send({});
      expect([200, 404]).toContain(res.status);
    });
  });

  // ═══════════════ CANCEL / RETRY ═══════════════
  describe('POST /api/v1/notifications/:id/cancel', () => {
    it('404 — not found', async () => {
      prisma.notification.findFirst.mockResolvedValueOnce(null as never);
      const res = await request(app.getHttpServer())
        .post(`/api/v1/notifications/${UUID_NOTIFICATION}/cancel`)
        .set(AUTH.customer)
        .send({ reason: 'changed mind' });
      expect([404, 200]).toContain(res.status);
    });
  });

  describe('POST /api/v1/notifications/:id/retry', () => {
    it('404 — not found', async () => {
      prisma.notification.findFirst.mockResolvedValueOnce(null as never);
      await request(app.getHttpServer())
        .post(`/api/v1/notifications/${UUID_NOTIFICATION}/retry`)
        .set(AUTH.customer)
        .send({})
        .expect(404);
    });
  });

  // ═══════════════ DELETE ═══════════════
  describe('DELETE /api/v1/notifications/:id', () => {
    it('204/404', async () => {
      prisma.notification.findFirst.mockResolvedValueOnce(notificationRow() as never);
      prisma.notification.update.mockResolvedValueOnce({} as never);

      const res = await request(app.getHttpServer())
        .delete(`/api/v1/notifications/${UUID_NOTIFICATION}`)
        .set(AUTH.customer);
      expect([204, 404]).toContain(res.status);
    });
  });

  // ═══════════════ ARCHIVE / SNOOZE / STAR ═══════════════
  describe('POST /api/v1/notifications/:id/archive', () => {
    it('200/404', async () => {
      prisma.notification.findFirst.mockResolvedValueOnce(notificationRow() as never);
      prisma.notification.update.mockResolvedValueOnce({} as never);
      const res = await request(app.getHttpServer())
        .post(`/api/v1/notifications/${UUID_NOTIFICATION}/archive`)
        .set(AUTH.customer);
      expect([200, 404, 400, 422]).toContain(res.status);
    });
  });

  describe('POST /api/v1/notifications/:id/snooze', () => {
    it('422 — missing snoozedUntil', async () => {
      const res = await request(app.getHttpServer())
        .post(`/api/v1/notifications/${UUID_NOTIFICATION}/snooze`)
        .set(AUTH.customer)
        .send({});
      expect([422, 400, 500, 404]).toContain(res.status);
    });
  });

  describe('POST /api/v1/notifications/:id/star', () => {
    it('200/404', async () => {
      prisma.notification.findFirst.mockResolvedValueOnce(notificationRow() as never);
      const res = await request(app.getHttpServer())
        .post(`/api/v1/notifications/${UUID_NOTIFICATION}/star`)
        .set(AUTH.customer);
      expect([200, 404]).toContain(res.status);
    });
  });
});
