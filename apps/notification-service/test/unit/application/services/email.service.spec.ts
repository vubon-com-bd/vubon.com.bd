import { describe, it, expect, beforeEach } from '@jest/globals';
import { EmailService } from '../../../../src/module/application/services/impl/email.service.js';
import { FIXED_NOTIFICATION_ID } from '../../../helpers/test-factories.js';
import { makeNotificationRepo, makeEventBridge } from '../../../helpers/mock-services.js';
import { makeFullEntityMock } from '../../../helpers/mock-entity.js';

function makeEntity(): never {
  return makeFullEntityMock({
    hasEmail: true,
    email: 'x@y.com',
    channel: 'email',
  }) as never;
}

function makeService() {
  const repo = makeNotificationRepo();
  const events = makeEventBridge();
  const svc = new EmailService(repo as never, events as never);
  return { svc, repo, events };
}

describe('EmailService', () => {
  let ctx: ReturnType<typeof makeService>;

  beforeEach(() => {
    ctx = makeService();
  });

  describe('send', () => {
    it('queues email with one recipient', async () => {
      const r = await ctx.svc.send({ to: 'x@y.com', subject: 'S', text: 'T' });
      expect(r.success).toBe(true);
      expect(ctx.repo.save).toHaveBeenCalled();
    });

    it('rejects empty to list', async () => {
      await expect(ctx.svc.send({ to: [], subject: 'S' } as never)).rejects.toThrow();
    });

    it('accepts to as string', async () => {
      const r = await ctx.svc.send({ to: 'x@y.com', subject: 'S' });
      expect(r.success).toBe(true);
    });

    it('with html content', async () => {
      const r = await ctx.svc.send({ to: 'x@y.com', subject: 'S', html: '<p>H</p>' });
      expect(r.success).toBe(true);
    });

    it('with template data', async () => {
      const r = await ctx.svc.send({
        to: 'x@y.com',
        subject: 'S',
        text: 'T',
        templateData: { k: 'v' },
      });
      expect(r.success).toBe(true);
    });
  });

  describe('sendWithTemplate', () => {
    it('queues with template slug', async () => {
      const r = await ctx.svc.sendWithTemplate({
        to: 'x@y.com',
        templateSlug: 'welcome',
        templateData: { name: 'Rahim' },
      });
      expect(r.success).toBe(true);
    });

    it('accepts array of recipients', async () => {
      const r = await ctx.svc.sendWithTemplate({
        to: ['x@y.com', 'z@y.com'],
        templateSlug: 'welcome',
        templateData: {},
      });
      expect(r.success).toBe(true);
    });
  });

  describe('getById', () => {
    it('throws when not found', async () => {
      await expect(ctx.svc.getById({ emailId: FIXED_NOTIFICATION_ID })).rejects.toThrow();
    });

    it('returns mapped DTO when found', async () => {
      ctx.repo.findByIdVO.mockResolvedValueOnce(makeEntity());
      const r = await ctx.svc.getById({ emailId: FIXED_NOTIFICATION_ID });
      expect(r.id).toBe(FIXED_NOTIFICATION_ID);
      expect(r.to[0]).toBe('x@y.com');
    });
  });

  describe('list', () => {
    it('returns paginated', async () => {
      const r = await ctx.svc.list({ page: 1, limit: 20 });
      expect(r.total).toBe(0);
    });
  });

  describe('retry', () => {
    it('throws when not found', async () => {
      await expect(ctx.svc.retry(FIXED_NOTIFICATION_ID, 'actor')).rejects.toThrow();
    });

    it('retries existing', async () => {
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
