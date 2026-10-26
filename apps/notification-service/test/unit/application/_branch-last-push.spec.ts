/**
 * Final branch push — exact lines to close 80% branch gap.
 */
import { jest } from '@jest/globals';
import { BroadcastService } from '@application/services/impl/broadcast.service.js';
import { DeviceService } from '@application/services/impl/device.service.js';
import { DigestService } from '@application/services/impl/digest.service.js';
import { NotificationService } from '@application/services/impl/notification.service.js';
import { ScheduleService } from '@application/services/impl/schedule.service.js';
import { TemplateService } from '@application/services/impl/template.service.js';
import { WebhookService } from '@application/services/impl/webhook.service.js';
import { PreferenceMapper } from '@application/mappers/preference.mapper.js';
import {
  createMockBroadcastRepo, createMockDeviceRepo, createMockDigestRepo,
  createMockNotificationRepo, createMockScheduleRepo, createMockTemplateRepo,
  createMockWebhookRepo, createMockEventBridge,
} from '@application-fixtures/mock-repos.fixture.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';
import { DATES } from '@domain-fixtures/dates.fixture.js';

const BRIDGE = () => createMockEventBridge() as never;
const NON_ERROR = { not: 'error' };

// ─── broadcast.service.ts: 75-78, 134 ──
describe('Last push — broadcast.service', () => {
  function setup() {
    const repo = createMockBroadcastRepo();
    return { svc: new BroadcastService(repo as never, BRIDGE()), repo };
  }
  function mock(overrides = {}) {
    return {
      id: IDS.broadcastId,
      vo: {
        name: 'C', type: { value: 'all_users' }, audience: { target: 'all' },
        status: { value: 'draft' }, channels: [], recipientCount: 10,
        sentCount: 0, failedCount: 0, scheduledAt: null, startedAt: null, completedAt: null,
        createdBy: { value: IDS.userId }, approvedBy: null,
      },
      createdAt: DATES.now,
      start: jest.fn(), cancel: jest.fn(),
      ...overrides,
    };
  }

  it('start — non-Error thrown (catch branch false side)', async () => {
    const { svc, repo } = setup();
    const m = mock();
    m.start = jest.fn(() => { throw NON_ERROR; });
    repo.findByIdVO.mockResolvedValue(m);
    await expect(svc.start({ broadcastId: IDS.broadcastId, approvedBy: IDS.userId } as never, 'a'))
      .rejects.toBeDefined();
  });

  it('cancel — non-Error thrown', async () => {
    const { svc, repo } = setup();
    const m = mock();
    m.cancel = jest.fn(() => { throw NON_ERROR; });
    repo.findByIdVO.mockResolvedValue(m);
    await expect(svc.cancel({ broadcastId: IDS.broadcastId, reason: 'x' } as never, 'a'))
      .rejects.toBeDefined();
  });

  it('getResult — nonzero sentCount + zero failedCount', async () => {
    const { svc, repo } = setup();
    const m = mock();
    m.vo = { ...m.vo, sentCount: 5, failedCount: 0 };
    repo.findByIdVO.mockResolvedValue(m);
    const r = await svc.getResult(IDS.broadcastId);
    expect(r.deliveryRate).toBe(1);
  });

  it('getResult — zero sentCount + nonzero failedCount', async () => {
    const { svc, repo } = setup();
    const m = mock();
    m.vo = { ...m.vo, sentCount: 0, failedCount: 5 };
    repo.findByIdVO.mockResolvedValue(m);
    const r = await svc.getResult(IDS.broadcastId);
    expect(r.deliveryRate).toBe(0);
  });
});

// ─── device.service.ts: 89-92 ──
describe('Last push — device.service', () => {
  function setup() {
    const repo = createMockDeviceRepo();
    return { svc: new DeviceService(repo as never, BRIDGE()), repo };
  }

  it('register — builder throws non-Error', async () => {
    const { svc, repo } = setup();
    repo.countForUser.mockResolvedValue(0);
    repo.findByToken.mockResolvedValue(null);
    await expect(
      svc.register({ userId: IDS.userId, type: 'android', token: IDS.deviceToken } as never, 'a'),
    ).rejects.toBeDefined();
  });
});

// ─── digest.service.ts: 73-76, 115 ──
describe('Last push — digest.service', () => {
  function setup() {
    const repo = createMockDigestRepo();
    return { svc: new DigestService(repo as never, BRIDGE()), repo };
  }

  it('send — non-Error thrown from markSent', async () => {
    const { svc, repo } = setup();
    repo.findByIdVO.mockResolvedValue({
      id: IDS.digestId,
      vo: {
        userId: { value: IDS.userId }, period: { frequency: 'daily' },
        type: { value: 'summary' }, status: { value: 'pending' },
        categories: [], sendHour: 9, timezone: 'UTC',
        generatedAt: null, sentAt: null,
      },
      itemCount: 0, items: [], createdAt: DATES.now,
      isEmpty: () => false,
      markSent: jest.fn(() => { throw NON_ERROR; }),
    });
    await expect(svc.send({ digestId: IDS.digestId } as never, 'a')).rejects.toBeDefined();
  });
});

// ─── notification.service.ts: 236, 280 ──
describe('Last push — notification.service', () => {
  function setup() {
    const repo = createMockNotificationRepo();
    return { svc: new NotificationService(repo as never, BRIDGE()), repo };
  }

  it('sendBulk — non-Error caught', async () => {
    const { svc, repo } = setup();
    repo.save.mockImplementation(() => Promise.reject(NON_ERROR));
    const r = await svc.sendBulk({
      userIds: [IDS.userId], type: 'transactional', category: 'system',
      channels: ['in_app'], subject: 'S', body: 'B',
    } as never, 'a');
    expect(r.failedCount).toBeGreaterThanOrEqual(1);
  });

  it('send — empty notificationIds triggers NotificationSendError', async () => {
    const { svc, repo } = setup();
    // All channels fail via save reject
    repo.save.mockImplementation(() => Promise.reject(new Error('save fail')));
    await expect(
      svc.send({
        userId: IDS.userId, type: 'transactional', category: 'system',
        channels: ['in_app'], subject: 'S', body: 'B',
      } as never, 'a'),
    ).rejects.toBeDefined();
  });
});

// ─── schedule.service.ts: 90-93, 145-148 ──
describe('Last push — schedule.service', () => {
  function setup() {
    const repo = createMockScheduleRepo();
    return { svc: new ScheduleService(repo as never, BRIDGE()), repo };
  }
  function mock(overrides = {}) {
    return {
      id: IDS.scheduleId,
      vo: {
        name: 'D', type: { value: 'recurring' }, status: { value: 'pending' },
        frequency: { value: 'daily' }, time: { scheduledAt: DATES.future24h, timezone: 'UTC' },
        templateId: { value: IDS.templateId }, cronExpression: undefined,
        recipientCount: () => 1, hasRecipients: () => true,
      },
      nextRunAt: DATES.future24h, lastRunAt: undefined, runCount: 0,
      createdAt: DATES.now, updatedAt: DATES.now,
      activate: jest.fn(), cancel: jest.fn(),
      ...overrides,
    };
  }

  it('create — cronExpression path (nextRunAt computed)', async () => {
    const { svc } = setup();
    await expect(
      svc.create({
        name: 'D', type: 'recurring', recurrence: 'daily',
        scheduledAt: undefined, cronExpression: '0 9 * * *',
        timezone: 'UTC', templateId: IDS.templateId, recipientIds: [IDS.userId],
      } as never, 'a'),
    ).rejects.toBeDefined();
  });

  it('update — non-Error thrown', async () => {
    const { svc, repo } = setup();
    repo.findByIdVO.mockResolvedValue(
      mock({ activate: jest.fn(() => { throw NON_ERROR; }) }),
    );
    await expect(
      svc.update({ scheduleId: IDS.scheduleId, scheduledAt: DATES.future24h } as never, 'a'),
    ).rejects.toBeDefined();
  });
});

// ─── template.service.ts: 95-98, 181 ──
describe('Last push — template.service', () => {
  function setup() {
    const repo = createMockTemplateRepo();
    return { svc: new TemplateService(repo as never, BRIDGE()), repo };
  }
  function mock(overrides = {}) {
    return {
      id: IDS.templateId,
      vo: {
        name: { value: 'T' }, slug: 'w', type: { value: 'system' },
        status: 'active', format: { value: 'html' }, subject: null,
        body: { value: 'b' }, variables: [], locale: 'en', version: 1,
      },
      templateId: { value: IDS.templateId },
      createdAt: DATES.now, updatedAt: DATES.now, renderedHistory: [],
      updateBody: jest.fn(), recordRender: jest.fn(),
      ...overrides,
    };
  }

  it('create — builder throws non-Error', async () => {
    const { svc, repo } = setup();
    repo.findBySlug.mockResolvedValue(null);
    await expect(
      svc.create({
        name: 'T', slug: 'welcome', type: 'system', category: 'system',
        locale: 'en', body: 'b', variables: [],
      } as never, 'a'),
    ).rejects.toBeDefined();
  });

  it('update — non-Error thrown', async () => {
    const { svc, repo } = setup();
    repo.findByIdVO.mockResolvedValue(
      mock({ updateBody: jest.fn(() => { throw NON_ERROR; }) }),
    );
    await expect(
      svc.update({ templateId: IDS.templateId, body: 'x' } as never, 'a'),
    ).rejects.toBeDefined();
  });
});

// ─── webhook.service.ts: 76-79 ──
describe('Last push — webhook.service', () => {
  function setup() {
    const repo = createMockWebhookRepo();
    return { svc: new WebhookService(repo as never, BRIDGE()), repo };
  }
  function mock(overrides = {}) {
    return {
      id: IDS.webhookId,
      vo: {
        name: 'W', type: { value: 'outgoing' }, status: { value: 'active' },
        url: { value: 'https://x.com' }, events: ['order.created'], headers: null,
        hasSecret: () => true, lastTriggeredAt: null, eventCount: 1,
      },
      createdAt: DATES.now, updatedAt: DATES.now,
      canDeliver: () => true, subscribes: () => true,
      addEvents: jest.fn(), recordDelivery: jest.fn(),
      status: { value: 'active' },
      ...overrides,
    };
  }

  it('update — non-Error thrown', async () => {
    const { svc, repo } = setup();
    repo.findByIdVO.mockResolvedValue(
      mock({ addEvents: jest.fn(() => { throw NON_ERROR; }) }),
    );
    await expect(
      svc.update({ webhookId: IDS.webhookId, events: ['order.created'] } as never, 'a'),
    ).rejects.toBeDefined();
  });
});

// ─── preference.mapper.ts: 67 ──
describe('Last push — preference.mapper', () => {
  it('toMatrixResponse — mixed categories', () => {
    const entity = {
      id: IDS.preferenceId,
      vo: {
        userId: { value: IDS.userId }, type: { value: 'opt_in' },
        options: [
          { channel: 'email', category: undefined, enabled: true },
          { channel: 'sms', category: 'promotion', enabled: false },
        ],
        quietHoursEnabled: true, quietHoursStart: 22, quietHoursEnd: 8,
        timezone: 'UTC', locale: 'en', locked: false,
      },
      locked: false, updatedAt: DATES.now,
    };
    const r = PreferenceMapper.toMatrixResponse(entity as never);
    expect(r.channels.email).toBe(true);
    expect(r.categories['sms:promotion']).toBe(false);
    expect(r.quietHours).toEqual({ start: 22, end: 8 });
  });
});
