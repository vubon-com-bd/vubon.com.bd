import { describe, it, expect, beforeEach } from '@jest/globals';
import { SmsService } from '../../../../src/module/application/services/impl/sms.service.js';
import { NotificationEntity } from '../../../../src/module/domain/entities/notification.entity.js';
import { FIXED_USER_ID, FIXED_NOTIFICATION_ID } from '../../../helpers/test-factories.js';
import { makeNotificationRepo, makeEventBridge } from '../../../helpers/mock-services.js';
import { makeFullEntityMock } from '../../../helpers/mock-entity.js';

function makeEntity(): never {
  return makeFullEntityMock({
    channel: 'sms',
    hasPhone: true,
    phone: '+8801712345678',
  }) as never;
}

function makeService() {
  const repo = makeNotificationRepo();
  const events = makeEventBridge();
  const svc = new SmsService(repo as never, events as never);
  return { svc, repo, events };
}

describe('SmsService', () => {
  let ctx: ReturnType<typeof makeService>;
  beforeEach(() => { ctx = makeService(); });

  describe('send', () => {
    it('queues SMS', async () => {
      const r = await ctx.svc.send({ to: '+8801712345678', message: 'Hello' });
      expect(r.success).toBe(true);
      expect(r.segments).toBeGreaterThan(0);
    });

    it('rejects empty to', async () => {
      await expect(ctx.svc.send({ to: [], message: 'Hi' } as never)).rejects.toThrow();
    });

    it('uses first from array', async () => {
      const r = await ctx.svc.send({ to: ['+8801712345678', '+8801812345678'], message: 'Hi' });
      expect(r.success).toBe(true);
    });
  });

  describe('sendBulk', () => {
    it('sends to multiple recipients', async () => {
      const r = await ctx.svc.sendBulk({
        recipients: ['+8801712345678', '+8801812345678'],
        message: 'M',
      });
      expect(r.length).toBe(2);
    });
  });

  describe('getById', () => {
    it('throws when not found', async () => {
      await expect(ctx.svc.getById({ smsId: FIXED_NOTIFICATION_ID })).rejects.toThrow();
    });

    it('returns mapped DTO', async () => {
      ctx.repo.findByIdVO.mockResolvedValueOnce(makeEntity());
      const r = await ctx.svc.getById({ smsId: FIXED_NOTIFICATION_ID });
      expect(r.id).toBe(FIXED_NOTIFICATION_ID);
      expect(r.to).toBe('+8801712345678');
      expect(r.encoding).toBe('gsm');
    });
  });

  describe('list', () => {
    it('returns paginated', async () => {
      const r = await ctx.svc.list({ page: 1, limit: 20 });
      expect(r.total).toBe(0);
    });

    it('maps items when present', async () => {
      ctx.repo.findPaginated.mockResolvedValueOnce({
        items: [makeEntity()],
        total: 1,
        page: 1,
        limit: 20,
        totalPages: 1,
      } as never);
      const r = await ctx.svc.list({ page: 1, limit: 20 });
      expect(r.items.length).toBe(1);
    });
  });

  describe('retry', () => {
    it('throws when not found', async () => {
      await expect(ctx.svc.retry(FIXED_NOTIFICATION_ID, 'actor')).rejects.toThrow();
    });

    it('retries when exists', async () => {
      ctx.repo.findByIdVO.mockResolvedValueOnce(makeEntity());
      const r = await ctx.svc.retry(FIXED_NOTIFICATION_ID, 'actor');
      expect(r.success).toBe(true);
    });
  });

  describe('cancel', () => {
    it('throws when not found', async () => {
      await expect(ctx.svc.cancel(FIXED_NOTIFICATION_ID, 'actor')).rejects.toThrow();
    });

    it('cancels existing', async () => {
      ctx.repo.findByIdVO.mockResolvedValueOnce(makeEntity());
      const r = await ctx.svc.cancel(FIXED_NOTIFICATION_ID, 'actor');
      expect(r.id).toBe(FIXED_NOTIFICATION_ID);
    });
  });
});
