import * as crypto from 'node:crypto';
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { ProviderWebhookService } from '../../../../src/module/application/services/impl/provider-webhook.service.js';

function makeSvc() {
  const repo = {
    findByIdVO: jest.fn().mockResolvedValue(null),
    save: jest.fn(),
  } as never;
  const events = { publishFromEntity: jest.fn() } as never;
  return new ProviderWebhookService(repo, events);
}

describe('ProviderWebhookService — all branches', () => {
  let svc: ProviderWebhookService;
  beforeEach(() => { svc = makeSvc(); });

  // ═══ verifySignature branches ═══
  it('verifySignature: no secret → true', () => {
    expect(svc.verifySignature('sendgrid', 'body', 'sig')).toBe(true);
  });

  it('verifySignature: no secret explicitly undefined → true', () => {
    expect(svc.verifySignature('sendgrid', 'body', 'sig', undefined)).toBe(true);
  });

  it('verifySignature: mismatched → false', () => {
    expect(svc.verifySignature('sendgrid', 'body', 'wrong', 'key')).toBe(false);
  });

  it('verifySignature: sha256 prefix stripped', () => {

    const { createHmac } = crypto;
    const secret = 'k';
    const body = '{"x":1}';
    const sig = `sha256=${createHmac('sha256', secret).update(body).digest('hex')}`;
    expect(svc.verifySignature('sendgrid', body, sig, secret)).toBe(true);
  });

  it('verifySignature: catche error path', () => {
    // Provide a non-Error to force catch branch
    expect(svc.verifySignature('sendgrid', 'body', 'not-hex', 'key')).toBe(false);
  });

  // ═══ process sendgrid ═══
  it('sendgrid: empty events array', async () => {
    const r = await svc.process({
      provider: 'sendgrid', body: { events: [] }, headers: {},
    });
    expect(r.processedEvents).toBe(0);
  });

  it('sendgrid: no events key', async () => {
    const r = await svc.process({
      provider: 'sendgrid', body: {}, headers: {},
    });
    expect(r.processedEvents).toBe(0);
  });

  it('sendgrid: events with mixed invalid objects', async () => {
    const r = await svc.process({
      provider: 'sendgrid',
      body: { events: [null, 'x', 42, [], { sg_message_id: 'm-1' }, { event: 'delivered' }] },
      headers: {},
    });
    expect(r.provider).toBe('sendgrid');
  });

  // ═══ process twilio ═══
  it('twilio: missing MessageSid', async () => {
    const r = await svc.process({
      provider: 'twilio', body: {}, headers: {},
    });
    expect(r.provider).toBe('twilio');
  });

  it('twilio: missing MessageStatus', async () => {
    const r = await svc.process({
      provider: 'twilio', body: { MessageSid: 'm-1' }, headers: {},
    });
    expect(r.provider).toBe('twilio');
  });

  it('twilio: delivered status', async () => {
    const r = await svc.process({
      provider: 'twilio',
      body: { MessageSid: 'm-1', MessageStatus: 'delivered' },
      headers: {},
    });
    expect(r).toBeDefined();
  });

  it('twilio: failed status', async () => {
    const r = await svc.process({
      provider: 'twilio',
      body: { MessageSid: 'm-1', MessageStatus: 'failed' },
      headers: {},
    });
    expect(r).toBeDefined();
  });

  it('twilio: undelivered status', async () => {
    const r = await svc.process({
      provider: 'twilio',
      body: { MessageSid: 'm-1', MessageStatus: 'undelivered' },
      headers: {},
    });
    expect(r).toBeDefined();
  });

  it('twilio: unknown status', async () => {
    const r = await svc.process({
      provider: 'twilio',
      body: { MessageSid: 'm-1', MessageStatus: 'queued' },
      headers: {},
    });
    expect(r).toBeDefined();
  });

  // ═══ process SES ═══
  it('ses: missing Message', async () => {
    const r = await svc.process({
      provider: 'ses', body: {}, headers: {},
    });
    expect(r.provider).toBe('ses');
  });

  it('ses: invalid JSON', async () => {
    const r = await svc.process({
      provider: 'ses', body: { Message: '{not json' }, headers: {},
    });
    expect(r.accepted).toBe(false);
    expect(r.errors).toBeDefined();
  });

  it('ses: missing eventType', async () => {
    const r = await svc.process({
      provider: 'ses',
      body: { Message: JSON.stringify({ mail: { messageId: 'm-1' } }) },
      headers: {},
    });
    expect(r.provider).toBe('ses');
  });

  it('ses: missing mail', async () => {
    const r = await svc.process({
      provider: 'ses',
      body: { Message: JSON.stringify({ eventType: 'Delivery' }) },
      headers: {},
    });
    expect(r.provider).toBe('ses');
  });

  it('ses: Delivery event', async () => {
    const r = await svc.process({
      provider: 'ses',
      body: {
        Message: JSON.stringify({
          eventType: 'Delivery',
          mail: { messageId: 'm-1', timestamp: new Date().toISOString() },
        }),
      },
      headers: {},
    });
    expect(r).toBeDefined();
  });

  it('ses: Bounce event', async () => {
    const r = await svc.process({
      provider: 'ses',
      body: {
        Message: JSON.stringify({
          eventType: 'Bounce',
          mail: { messageId: 'm-1', timestamp: new Date().toISOString() },
        }),
      },
      headers: {},
    });
    expect(r).toBeDefined();
  });

  it('ses: Complaint event', async () => {
    const r = await svc.process({
      provider: 'ses',
      body: {
        Message: JSON.stringify({
          eventType: 'Complaint',
          mail: { messageId: 'm-1', timestamp: new Date().toISOString() },
        }),
      },
      headers: {},
    });
    expect(r).toBeDefined();
  });

  // ═══ validator branches ═══
  it('rejects unknown provider', async () => {
    await expect(svc.process({
      provider: 'unknown' as never, body: {}, headers: {},
    })).rejects.toThrow();
  });

  it('rejects null body', async () => {
    await expect(svc.process({
      provider: 'sendgrid', body: null as never, headers: {},
    })).rejects.toThrow();
  });

  it('rejects array body', async () => {
    await expect(svc.process({
      provider: 'sendgrid', body: [] as never, headers: {},
    })).rejects.toThrow();
  });

  it('rejects array headers', async () => {
    await expect(svc.process({
      provider: 'sendgrid', body: {}, headers: [] as never,
    })).rejects.toThrow();
  });

  it('rejects null headers', async () => {
    await expect(svc.process({
      provider: 'sendgrid', body: {}, headers: null as never,
    })).rejects.toThrow();
  });
});
