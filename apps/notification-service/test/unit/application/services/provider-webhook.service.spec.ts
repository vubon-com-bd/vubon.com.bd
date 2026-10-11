import { describe, it, expect, beforeEach } from '@jest/globals';
import { ProviderWebhookService } from '../../../../src/module/application/services/impl/provider-webhook.service.js';
import { createHmac } from 'node:crypto';
import { makeNotificationRepo, makeEventBridge } from '../../../../helpers/mock-services.js';

function makeService() {
  const repo = makeNotificationRepo();
  const events = makeEventBridge();
  const svc = new ProviderWebhookService(repo as never, events as never);
  return { svc, repo, events };
}

describe('ProviderWebhookService', () => {
  let ctx: ReturnType<typeof makeService>;
  beforeEach(() => { ctx = makeService(); });

  describe('verifySignature', () => {
    it('returns true when no secret provided', () => {
      expect(ctx.svc.verifySignature('sendgrid', 'body', 'sig', undefined)).toBe(true);
    });

    it('returns false on mismatch', () => {
      expect(
        ctx.svc.verifySignature('sendgrid', 'body', 'wrong', 'secret-key'),
      ).toBe(false);
    });

    it('returns true on matching HMAC', () => {
      const secret = 'my-secret-key';
      const body = '{"k":"v"}';
      const sig = createHmac('sha256', secret).update(body).digest('hex');
      expect(ctx.svc.verifySignature('sendgrid', body, sig, secret)).toBe(true);
    });

    it('handles header with sha256= prefix', () => {
      const secret = 'my-secret-key';
      const body = '{"k":"v"}';
      const sig = `sha256=${createHmac('sha256', secret).update(body).digest('hex')}`;
      expect(ctx.svc.verifySignature('sendgrid', body, sig, secret)).toBe(true);
    });
  });

  describe('process', () => {
    it('processes sendgrid events', async () => {
      const r = await ctx.svc.process({
        provider: 'sendgrid',
        body: { events: [] },
        headers: {},
      });
      expect(r.provider).toBe('sendgrid');
      expect(r.accepted).toBe(true);
    });

    it('processes twilio status', async () => {
      const r = await ctx.svc.process({
        provider: 'twilio',
        body: { MessageSid: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', MessageStatus: 'delivered' },
        headers: {},
      });
      expect(r.provider).toBe('twilio');
    });

    it('processes ses event (Delivery)', async () => {
      const r = await ctx.svc.process({
        provider: 'ses',
        body: {
          Message: JSON.stringify({
            eventType: 'Delivery',
            mail: { messageId: '99999999-9999-9999-9999-999999999999', timestamp: new Date().toISOString() },
          }),
        },
        headers: {},
      });
      expect(r.provider).toBe('ses');
    });

    it('processes ses Bounce', async () => {
      const r = await ctx.svc.process({
        provider: 'ses',
        body: {
          Message: JSON.stringify({
            eventType: 'Bounce',
            mail: { messageId: '99999999-9999-9999-9999-999999999999', timestamp: new Date().toISOString() },
          }),
        },
        headers: {},
      });
      expect(r.provider).toBe('ses');
    });

    it('processes ses Complaint', async () => {
      const r = await ctx.svc.process({
        provider: 'ses',
        body: {
          Message: JSON.stringify({
            eventType: 'Complaint',
            mail: { messageId: '99999999-9999-9999-9999-999999999999', timestamp: new Date().toISOString() },
          }),
        },
        headers: {},
      });
      expect(r).toBeDefined();
    });

    it('handles invalid SES Message JSON', async () => {
      const r = await ctx.svc.process({
        provider: 'ses',
        body: { Message: 'not-json' },
        headers: {},
      });
      expect(r.accepted).toBe(false);
      expect(r.errors).toBeDefined();
    });

    it('handles missing SES Message', async () => {
      const r = await ctx.svc.process({
        provider: 'ses', body: {}, headers: {},
      });
      expect(r).toBeDefined();
    });

    it('ignores non-object events', async () => {
      const r = await ctx.svc.process({
        provider: 'sendgrid',
        body: { events: ['string-event', null] },
        headers: {},
      });
      expect(r.provider).toBe('sendgrid');
    });

    it('handles missing MessageSid in twilio', async () => {
      const r = await ctx.svc.process({
        provider: 'twilio', body: {}, headers: {},
      });
      expect(r).toBeDefined();
    });

    it('handles unknown provider gracefully', async () => {
      // provider must be from allowed list — but validator rejects otherwise
      await expect(ctx.svc.process({
        provider: 'unknown' as never,
        body: {}, headers: {},
      })).rejects.toThrow();
    });

    it('throws when body is null', async () => {
      await expect(ctx.svc.process({
        provider: 'sendgrid',
        body: null as never,
        headers: {},
      })).rejects.toThrow();
    });

    it('throws when headers is array', async () => {
      await expect(ctx.svc.process({
        provider: 'sendgrid',
        body: {},
        headers: [] as never,
      })).rejects.toThrow();
    });
  });
});
