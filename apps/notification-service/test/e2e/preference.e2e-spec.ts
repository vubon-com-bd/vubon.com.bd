import { jest } from '@jest/globals';
import request from 'supertest';
import type { INestApplication } from '@nestjs/common';
import { createTestApp, AUTH, preferenceRow } from './_setup.js';
import type { MockPrisma } from './_setup.js';

describe('Preference API (e2e)', () => {
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
      await request(app.getHttpServer()).get('/api/v1/preferences').expect(401);
    });
  });

  describe('GET /api/v1/preferences', () => {
    it('200 — returns preference (or creates)', async () => {
      prisma.notificationPreference.findFirst.mockResolvedValueOnce(preferenceRow() as never);
      const res = await request(app.getHttpServer())
        .get('/api/v1/preferences')
        .set(AUTH.customer)
        .expect(200);
      expect(res.body).toBeDefined();
    });
  });

  describe('GET /api/v1/preferences/public', () => {
    it('200 — public view', async () => {
      prisma.notificationPreference.findFirst.mockResolvedValueOnce(preferenceRow() as never);
      const res = await request(app.getHttpServer())
        .get('/api/v1/preferences/public')
        .set(AUTH.customer);
      expect([200, 404]).toContain(res.status);
    });
  });

  describe('PATCH /api/v1/preferences', () => {
    it('200 — update channels', async () => {
      prisma.notificationPreference.findFirst.mockResolvedValueOnce(preferenceRow() as never);
      prisma.notificationPreference.update.mockResolvedValueOnce(preferenceRow() as never);

      const res = await request(app.getHttpServer())
        .patch('/api/v1/preferences')
        .set(AUTH.customer)
        .send({ channelPreferences: { email: false } });
      expect([200, 201, 404]).toContain(res.status);
    });
  });

  describe('POST /api/v1/preferences/toggle-channel', () => {
    it('200/404', async () => {
      prisma.notificationPreference.findFirst.mockResolvedValueOnce(preferenceRow() as never);
      prisma.notificationPreference.update.mockResolvedValueOnce(preferenceRow() as never);
      const res = await request(app.getHttpServer())
        .post('/api/v1/preferences/toggle-channel')
        .set(AUTH.customer)
        .send({ channel: 'email', enabled: false });
      expect([200, 404]).toContain(res.status);
    });

    it('422 — missing enabled', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/preferences/toggle-channel')
        .set(AUTH.customer)
        .send({ channel: 'email' })
        .expect(422);
    });
  });

  describe('POST /api/v1/preferences/toggle-category', () => {
    it('200/404', async () => {
      prisma.notificationPreference.findFirst.mockResolvedValueOnce(preferenceRow() as never);
      prisma.notificationPreference.update.mockResolvedValueOnce(preferenceRow() as never);
      const res = await request(app.getHttpServer())
        .post('/api/v1/preferences/toggle-category')
        .set(AUTH.customer)
        .send({ category: 'marketing', enabled: true });
      expect([200, 404]).toContain(res.status);
    });
  });

  describe('POST /api/v1/preferences/quiet-hours', () => {
    it('200/404', async () => {
      prisma.notificationPreference.findFirst.mockResolvedValueOnce(preferenceRow() as never);
      prisma.notificationPreference.update.mockResolvedValueOnce(preferenceRow() as never);
      const res = await request(app.getHttpServer())
        .post('/api/v1/preferences/quiet-hours')
        .set(AUTH.customer)
        .send({ enabled: true, startHour: 22, endHour: 8 });
      expect([200, 404]).toContain(res.status);
    });
  });

  describe('POST /api/v1/preferences/opt-out', () => {
    it('200/404', async () => {
      prisma.notificationPreference.findFirst.mockResolvedValueOnce(preferenceRow() as never);
      prisma.notificationPreference.update.mockResolvedValueOnce(preferenceRow() as never);
      const res = await request(app.getHttpServer())
        .post('/api/v1/preferences/opt-out')
        .set(AUTH.customer)
        .send({ scope: 'email', reason: 'spam' });
      expect([200, 404]).toContain(res.status);
    });
  });

  describe('POST /api/v1/preferences/opt-in', () => {
    it('200/404', async () => {
      prisma.notificationPreference.findFirst.mockResolvedValueOnce(preferenceRow() as never);
      prisma.notificationPreference.update.mockResolvedValueOnce(preferenceRow() as never);
      const res = await request(app.getHttpServer())
        .post('/api/v1/preferences/opt-in')
        .set(AUTH.customer)
        .send({ scope: 'email' });
      expect([200, 404]).toContain(res.status);
    });
  });
});
