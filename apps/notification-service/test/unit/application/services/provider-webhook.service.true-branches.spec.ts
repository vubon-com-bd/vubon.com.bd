/**
 * Provider-webhook — REAL branch coverage (FIXED)
 *
 * Two fixes over v1:
 *  1. Entity in `sending` state (not `sent`) — allows both markDelivered()
 *     and fail() transitions per the notification status state machine.
 *  2. `overrideFindFactory` returns a FRESH entity each call → multi-event
 *     batches work without hitting invalid state transitions.
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { ProviderWebhookService } from '../../../../src/module/application/services/impl/provider-webhook.service.js';
import { NotificationEntity } from '../../../../src/module/domain/entities/notification.entity.js';
import { NotificationTypeVO } from '../../../../src/module/domain/value-objects/primitives/notification-type.vo.js';
import { NotificationCategoryVO } from '../../../../src/module/domain/value-objects/primitives/notification-category.vo.js';
import { NotificationChannelVO } from '../../../../src/module/domain/value-objects/primitives/notification-channel.vo.js';
import { NotificationPriorityVO } from '../../../../src/module/domain/value-objects/primitives/notification-priority.vo.js';
import { NotificationTitleVO } from '../../../../src/module/domain/value-objects/primitives/notification-title.vo.js';
import { NotificationBodyVO } from '../../../../src/module/domain/value-objects/primitives/notification-body.vo.js';
import { UserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { NotificationContentVO } from '../../../../src/module/domain/value-objects/composites/notification-content.vo.js';
import { NotificationRecipientVO } from '../../../../src/module/domain/value-objects/composites/notification-recipient.vo.js';
import { FIXED_USER_ID, FIXED_NOTIFICATION_ID } from '../../../helpers/test-factories.js';

function makeSvc() {
  const repo = {
    findByIdVO: jest.fn().mockResolvedValue(null),
    save: jest.fn().mockImplementation(async (e: unknown) => e),
  } as never;
  const events = { publishFromEntity: jest.fn() } as never;
  return new ProviderWebhookService(repo, events);
}

/** Entity in `sending` state — allows both markDelivered() and fail() transitions. */
function buildSending(): NotificationEntity {
  const ch = NotificationChannelVO.email();
  const e = NotificationEntity.create({
    id: FIXED_NOTIFICATION_ID,
    now: new Date().toISOString(),
    props: {
      type: NotificationTypeVO.transactional(),
      category: NotificationCategoryVO.order(),
      channel: ch,
      priority: NotificationPriorityVO.normal(),
      content: NotificationContentVO.create({
        title: NotificationTitleVO.create('T'),
        body: NotificationBodyVO.create('B'),
      }),
      recipient: NotificationRecipientVO.reconstitute({
        userId: UserIdVO.reconstitute(FIXED_USER_ID),
        channel: ch,
      }),
    },
  });
  e.queue();
  e.startSending('smtp');
  return e;
}

/** Replace private method to return a fresh entity on every call. */
function overrideFindFactory(
  svc: ProviderWebhookService,
  factory: () => NotificationEntity | null,
): void {
  (svc as unknown as {
    findByProviderMessageId: (m: string) => Promise<NotificationEntity | null>;
  }).findByProviderMessageId = async () => factory();
}

/** Replace private method to return a single instance (single-event case). */
function overrideFind(
  svc: ProviderWebhookService,
  value: NotificationEntity | null,
): void {
  overrideFindFactory(svc, () => value);
}

describe('ProviderWebhookService — REAL branch coverage', () => {
  let svc: ProviderWebhookService;
  beforeEach(() => { svc = makeSvc(); });

  // ═══ Line 55: default case (unsupported but valid provider) ═══
  it('mailgun → default case', async () => {
    const r = await svc.process({ provider: 'mailgun', body: {}, headers: {} });
    expect(r.provider).toBe('mailgun');
  });

  it('fcm → default case', async () => {
    const r = await svc.process({ provider: 'fcm', body: {}, headers: {} });
    expect(r.provider).toBe('fcm');
  });

  it('apns → default case', async () => {
    const r = await svc.process({ provider: 'apns', body: {}, headers: {} });
    expect(r.provider).toBe('apns');
  });

  // ═══ Lines 82-83: verifySignature catch ═══
  it('verifySignature throws on undefined signature → false', () => {
    expect(svc.verifySignature('sendgrid', 'body', undefined as never, 'secret')).toBe(false);
  });

  it('verifySignature throws on null signature → false', () => {
    expect(svc.verifySignature('sendgrid', 'body', null as never, 'secret')).toBe(false);
  });

  // ═══ Lines 102-113: processSendGrid WITH entity ═══
  it('sendgrid delivered → markDelivered', async () => {
    overrideFind(svc, buildSending());
    const r = await svc.process({
      provider: 'sendgrid',
      body: { events: [{ sg_message_id: 'm1', event: 'delivered' }] },
      headers: {},
    });
    expect(r.processedEvents).toBe(1);
  });

  it('sendgrid bounce → fail invalid_address', async () => {
    overrideFind(svc, buildSending());
    const r = await svc.process({
      provider: 'sendgrid',
      body: { events: [{ sg_message_id: 'm1', event: 'bounce' }] },
      headers: {},
    });
    expect(r.processedEvents).toBe(1);
  });

  it('sendgrid dropped → fail blocked', async () => {
    overrideFind(svc, buildSending());
    const r = await svc.process({
      provider: 'sendgrid',
      body: { events: [{ sg_message_id: 'm1', event: 'dropped' }] },
      headers: {},
    });
    expect(r.processedEvents).toBe(1);
  });

  it('sendgrid open → markRead', async () => {
    overrideFind(svc, buildSending());
    const r = await svc.process({
      provider: 'sendgrid',
      body: { events: [{ sg_message_id: 'm1', event: 'open' }] },
      headers: {},
    });
    expect(r.processedEvents).toBe(1);
  });

  it('sendgrid unknown event type → still saves', async () => {
    overrideFind(svc, buildSending());
    const r = await svc.process({
      provider: 'sendgrid',
      body: { events: [{ sg_message_id: 'm1', event: 'clicked' }] },
      headers: {},
    });
    expect(r.processedEvents).toBe(1);
  });

  it('sendgrid save throws → catch → errors.push', async () => {
    const s = makeSvc();
    overrideFind(s, buildSending());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const repo = (s as any).notificationRepo as { save: jest.Mock };
    repo.save.mockRejectedValueOnce(new Error('db error'));
    const r = await s.process({
      provider: 'sendgrid',
      body: { events: [{ sg_message_id: 'm1', event: 'delivered' }] },
      headers: {},
    });
    expect(r.errors?.length).toBeGreaterThan(0);
    expect(r.accepted).toBe(false);
  });

  // ═══ Lines 130-139: processTwilio WITH entity ═══
  it('twilio delivered', async () => {
    overrideFind(svc, buildSending());
    const r = await svc.process({
      provider: 'twilio',
      body: { MessageSid: 'm1', MessageStatus: 'delivered' },
      headers: {},
    });
    expect(r.processedEvents).toBe(1);
  });

  it('twilio failed', async () => {
    overrideFind(svc, buildSending());
    const r = await svc.process({
      provider: 'twilio',
      body: { MessageSid: 'm1', MessageStatus: 'failed' },
      headers: {},
    });
    expect(r.processedEvents).toBe(1);
  });

  it('twilio undelivered', async () => {
    overrideFind(svc, buildSending());
    const r = await svc.process({
      provider: 'twilio',
      body: { MessageSid: 'm1', MessageStatus: 'undelivered' },
      headers: {},
    });
    expect(r.processedEvents).toBe(1);
  });

  it('twilio unknown status → still saves', async () => {
    overrideFind(svc, buildSending());
    const r = await svc.process({
      provider: 'twilio',
      body: { MessageSid: 'm1', MessageStatus: 'queued' },
      headers: {},
    });
    expect(r.processedEvents).toBe(1);
  });

  it('twilio save throws → catch', async () => {
    const s = makeSvc();
    overrideFind(s, buildSending());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const repo = (s as any).notificationRepo as { save: jest.Mock };
    repo.save.mockRejectedValueOnce(new Error('db error'));
    const r = await s.process({
      provider: 'twilio',
      body: { MessageSid: 'm1', MessageStatus: 'delivered' },
      headers: {},
    });
    expect(r.errors?.length).toBeGreaterThan(0);
  });

  // ═══ Lines 165-177: processSes WITH entity ═══
  it('ses Delivery → markDelivered', async () => {
    overrideFind(svc, buildSending());
    const r = await svc.process({
      provider: 'ses',
      body: {
        Message: JSON.stringify({
          eventType: 'Delivery',
          mail: { messageId: 'm1', timestamp: new Date().toISOString() },
        }),
      },
      headers: {},
    });
    expect(r.processedEvents).toBe(1);
  });

  it('ses Bounce → fail invalid_address', async () => {
    overrideFind(svc, buildSending());
    const r = await svc.process({
      provider: 'ses',
      body: {
        Message: JSON.stringify({
          eventType: 'Bounce',
          mail: { messageId: 'm1', timestamp: new Date().toISOString() },
        }),
      },
      headers: {},
    });
    expect(r.processedEvents).toBe(1);
  });

  it('ses Complaint → fail blocked', async () => {
    overrideFind(svc, buildSending());
    const r = await svc.process({
      provider: 'ses',
      body: {
        Message: JSON.stringify({
          eventType: 'Complaint',
          mail: { messageId: 'm1', timestamp: new Date().toISOString() },
        }),
      },
      headers: {},
    });
    expect(r.processedEvents).toBe(1);
  });

  it('ses unknown event type → still saves', async () => {
    overrideFind(svc, buildSending());
    const r = await svc.process({
      provider: 'ses',
      body: {
        Message: JSON.stringify({
          eventType: 'Unknown',
          mail: { messageId: 'm1', timestamp: new Date().toISOString() },
        }),
      },
      headers: {},
    });
    expect(r.processedEvents).toBe(1);
  });

  it('ses save throws → catch', async () => {
    const s = makeSvc();
    overrideFind(s, buildSending());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const repo = (s as any).notificationRepo as { save: jest.Mock };
    repo.save.mockRejectedValueOnce(new Error('db error'));
    const r = await s.process({
      provider: 'ses',
      body: {
        Message: JSON.stringify({
          eventType: 'Delivery',
          mail: { messageId: 'm1', timestamp: new Date().toISOString() },
        }),
      },
      headers: {},
    });
    expect(r.errors?.length).toBeGreaterThan(0);
  });

  // ═══ Lines 186-201: failure mappers via above tests ═══

  // ═══ Multiple events — factory returns fresh entity per call ═══
  it('sendgrid multiple events, mixed (fresh entity per event)', async () => {
    overrideFindFactory(svc, buildSending);
    const r = await svc.process({
      provider: 'sendgrid',
      body: {
        events: [
          { sg_message_id: 'm1', event: 'delivered' },
          { sg_message_id: 'm2', event: 'bounce' },
          null,
          'not-object',
          { sg_message_id: '', event: 'delivered' },
          { sg_message_id: 'm3', event: 'open' },
        ],
      },
      headers: {},
    });
    // m1 delivered ✓, m2 bounce ✓, m3 open ✓ → 3 processed
    expect(r.processedEvents).toBe(3);
  });
});
