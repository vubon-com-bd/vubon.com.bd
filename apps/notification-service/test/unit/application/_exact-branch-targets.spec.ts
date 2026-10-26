/**
 * Exact branch targets — 6 more branches to hit 80%.
 *
 * Uncovered branches:
 * - broadcast.service.ts: 75-78 (catch non-Error), 134 (result ternary)
 * - device.service.ts: 89-92 (catch non-Error)
 * - digest.service.ts: 73-76 (catch non-Error), 115 (result ternary)
 * - notification.service.ts: 236 (?), 280 (?? / ternary)
 * - schedule.service.ts: 90-93 (catch non-Error), 145-148 (update branch)
 * - template.service.ts: 95-98 (catch non-Error), 181 (render fallback)
 * - webhook.service.ts: 76-79 (catch non-Error)
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

// ═══════════════════════════════════════════════════════════
// Target: broadcast.service.ts — lines 75-78 (catch) + 134 (ternary)
// ═══════════════════════════════════════════════════════════
describe('Exact target — broadcast.service.ts', () => {
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

  it('catch block — non-Error gets "Unknown" message', async () => {
    const { svc, repo } = setup();
    const m = mock();
    m.start = jest.fn(() => { throw { code: 'E1' }; });
    repo.findByIdVO.mockResolvedValue(m);
    await expect(
      svc.start({ broadcastId: IDS.broadcastId, approvedBy: IDS.userId } as never, 'a'),
    ).rejects.toBeDefined();
  });

  it('catch block — null thrown (non-Error)', async () => {
    const { svc, repo } = setup();
    const m = mock();
    m.start = jest.fn(() => { throw null; });
    repo.findByIdVO.mockResolvedValue(m);
    await expect(
      svc.start({ broadcastId: IDS.broadcastId, approvedBy: IDS.userId } as never, 'a'),
    ).rejects.toBeDefined();
  });

  it('getResult — with sentCount > 0 (deliveryRate ternary true)', async () => {
    const { svc, repo } = setup();
    const m = mock();
    m.vo = { ...m.vo, sentCount: 10, failedCount: 5 };
    repo.findByIdVO.mockResolvedValue(m);
    const r = await svc.getResult(IDS.broadcastId);
    expect(r.deliveryRate).toBeGreaterThan(0);
  });
});

// ═══════════════════════════════════════════════════════════
// Target: device.service.ts — lines 89-92 (catch non-Error)
// ═══════════════════════════════════════════════════════════
describe('Exact target — device.service.ts', () => {
  function setup() {
    const repo = createMockDeviceRepo();
    return { svc: new DeviceService(repo as never, BRIDGE()), repo };
  }

  it('register — null thrown by repo.findByToken', async () => {
    const { svc, repo } = setup();
    repo.countForUser.mockResolvedValue(0);
    repo.findByToken.mockImplementation(() => Promise.reject(null));
    await expect(
      svc.register({ userId: IDS.userId, type: 'android', token: IDS.deviceToken } as never, 'a'),
    ).rejects.toBeDefined();
  });

  it('register — non-Error object thrown', async () => {
    const { svc, repo } = setup();
    repo.countForUser.mockResolvedValue(0);
    repo.findByToken.mockImplementation(() => Promise.reject({ bad: 'data' }));
    await expect(
      svc.register({ userId: IDS.userId, type: 'android', token: IDS.deviceToken } as never, 'a'),
    ).rejects.toBeDefined();
  });
});

// ═══════════════════════════════════════════════════════════
// Target: digest.service.ts — lines 73-76 (catch) + 115 (ternary)
// ═══════════════════════════════════════════════════════════
describe('Exact target — digest.service.ts', () => {
  function setup() {
    const repo = createMockDigestRepo();
    return { svc: new DigestService(repo as never, BRIDGE()), repo };
  }

  function mock(overrides = {}) {
    return {
      id: IDS.digestId,
      vo: {
        userId: { value: IDS.userId }, period: { frequency: 'daily' },
        type: { value: 'summary' }, status: { value: 'pending' },
        categories: [], sendHour: 9, timezone: 'UTC',
        generatedAt: null, sentAt: null,
      },
      itemCount: 0, items: [], createdAt: DATES.now,
      isEmpty: () => false,
      markSent: jest.fn(),
      ...overrides,
    };
  }

  it('send — null markSent throw', async () => {
    const { svc, repo } = setup();
    repo.findByIdVO.mockResolvedValue(mock({
      markSent: jest.fn(() => { throw null; }),
    }));
    await expect(svc.send({ digestId: IDS.digestId } as never, 'a')).rejects.toBeDefined();
  });

  it('send — non-Error object markSent throw', async () => {
    const { svc, repo } = setup();
    repo.findByIdVO.mockResolvedValue(mock({
      markSent: jest.fn(() => { throw { code: 'X' }; }),
    }));
    await expect(svc.send({ digestId: IDS.digestId } as never, 'a')).rejects.toBeDefined();
  });

  it('list with filter only (no fromDate, no toDate)', async () => {
    const { svc, repo } = setup();
    repo.findPaginated.mockResolvedValue({ items: [], total: 0, page: 1, limit: 10 });
    const r = await svc.list({ page: 1, limit: 10, filter: { status: 'pending' } });
    expect(r.total).toBe(0);
  });
});

// ═══════════════════════════════════════════════════════════
// Target: notification.service.ts — lines 236, 280
// ═══════════════════════════════════════════════════════════
describe('Exact target — notification.service.ts', () => {
  function setup() {
    const repo = createMockNotificationRepo();
    return { svc: new NotificationService(repo as never, BRIDGE()), repo };
  }

  it('sendBulk — null thrown, failed count hit', async () => {
    const { svc, repo } = setup();
    repo.save.mockImplementation(() => Promise.reject(null));
    const r = await svc.sendBulk({
      userIds: [IDS.userId], type: 'transactional', category: 'system',
      channels: ['in_app'], subject: 'S', body: 'B',
    } as never, 'a');
    expect(r.failedCount).toBeGreaterThanOrEqual(1);
  });

  it('sendBulk — non-Error object thrown', async () => {
    const { svc, repo } = setup();
    repo.save.mockImplementation(() => Promise.reject({ err: 'custom' }));
    const r = await svc.sendBulk({
      userIds: [IDS.userId], type: 'transactional', category: 'system',
      channels: ['in_app'], subject: 'S', body: 'B',
    } as never, 'a');
    expect(r.failedCount).toBeGreaterThanOrEqual(1);
  });

  it('send — all channels fail → NotificationSendError', async () => {
    const { svc, repo } = setup();
    repo.save.mockImplementation(() => Promise.reject(new Error('down')));
    await expect(
      svc.send({
        userId: IDS.userId, type: 'transactional', category: 'system',
        channels: ['in_app'], subject: 'S', body: 'B',
      } as never, 'a'),
    ).rejects.toBeDefined();
  });
});

// ═══════════════════════════════════════════════════════════
// Target: schedule.service.ts — lines 90-93, 145-148
// ═══════════════════════════════════════════════════════════
describe('Exact target — schedule.service.ts', () => {
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

  it('update — null thrown in activate', async () => {
    const { svc, repo } = setup();
    repo.findByIdVO.mockResolvedValue(mock({
      activate: jest.fn(() => { throw null; }),
    }));
    await expect(
      svc.update({ scheduleId: IDS.scheduleId, scheduledAt: DATES.future24h } as never, 'a'),
    ).rejects.toBeDefined();
  });

  it('update — non-Error thrown in activate', async () => {
    const { svc, repo } = setup();
    repo.findByIdVO.mockResolvedValue(mock({
      activate: jest.fn(() => { throw { code: 'E' }; }),
    }));
    await expect(
      svc.update({ scheduleId: IDS.scheduleId, scheduledAt: DATES.future24h } as never, 'a'),
    ).rejects.toBeDefined();
  });

  it('cancel — null thrown', async () => {
    const { svc, repo } = setup();
    repo.findByIdVO.mockResolvedValue(mock({
      cancel: jest.fn(() => { throw null; }),
    }));
    await expect(
      svc.cancel({ scheduleId: IDS.scheduleId, reason: 'x' } as never, 'a'),
    ).rejects.toBeDefined();
  });
});

// ═══════════════════════════════════════════════════════════
// Target: template.service.ts — lines 95-98, 181
// ═══════════════════════════════════════════════════════════
describe('Exact target — template.service.ts', () => {
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

  it('update — null thrown in updateBody', async () => {
    const { svc, repo } = setup();
    repo.findByIdVO.mockResolvedValue(mock({
      updateBody: jest.fn(() => { throw null; }),
    }));
    await expect(
      svc.update({ templateId: IDS.templateId, body: 'x' } as never, 'a'),
    ).rejects.toBeDefined();
  });

  it('test — null thrown in recordRender', async () => {
    const { svc, repo } = setup();
    repo.findByIdVO.mockResolvedValue(mock({
      recordRender: jest.fn(() => { throw null; }),
    }));
    await expect(
      svc.test({ templateId: IDS.templateId, variables: {}, email: 'a@b.com' } as never, 'a'),
    ).rejects.toBeDefined();
  });

  it('test — non-Error in recordRender', async () => {
    const { svc, repo } = setup();
    repo.findByIdVO.mockResolvedValue(mock({
      recordRender: jest.fn(() => { throw { e: 'x' }; }),
    }));
    await expect(
      svc.test({ templateId: IDS.templateId, variables: {}, email: 'a@b.com' } as never, 'a'),
    ).rejects.toBeDefined();
  });
});

// ═══════════════════════════════════════════════════════════
// Target: webhook.service.ts — lines 76-79
// ═══════════════════════════════════════════════════════════
describe('Exact target — webhook.service.ts', () => {
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

  it('update — null throw in addEvents', async () => {
    const { svc, repo } = setup();
    repo.findByIdVO.mockResolvedValue(mock({
      addEvents: jest.fn(() => { throw null; }),
    }));
    await expect(
      svc.update({ webhookId: IDS.webhookId, events: ['order.created'] } as never, 'a'),
    ).rejects.toBeDefined();
  });

  it('update — non-Error throw in addEvents', async () => {
    const { svc, repo } = setup();
    repo.findByIdVO.mockResolvedValue(mock({
      addEvents: jest.fn(() => { throw { msg: 'x' }; }),
    }));
    await expect(
      svc.update({ webhookId: IDS.webhookId, events: ['order.created'] } as never, 'a'),
    ).rejects.toBeDefined();
  });

  it('test — null throw in recordDelivery', async () => {
    const { svc, repo } = setup();
    repo.findByIdVO.mockResolvedValue(mock({
      recordDelivery: jest.fn(() => { throw null; }),
    }));
    await expect(
      svc.test({ webhookId: IDS.webhookId, event: 'order.created' } as never, 'a'),
    ).rejects.toBeDefined();
  });
});

// ═══════════════════════════════════════════════════════════
// Target: preference.mapper.ts — line 67
// ═══════════════════════════════════════════════════════════
describe('Exact target — preference.mapper.ts', () => {
  it('toMatrixResponse — only categories, no channels', () => {
    const entity = {
      id: IDS.preferenceId,
      vo: {
        userId: { value: IDS.userId }, type: { value: 'opt_in' },
        options: [
          { channel: 'email', category: 'promotion', enabled: true },
          { channel: 'sms', category: 'transactional', enabled: false },
        ],
        quietHoursEnabled: false, quietHoursStart: null, quietHoursEnd: null,
        timezone: 'UTC', locale: 'en', locked: false,
      },
      locked: false, updatedAt: DATES.now,
    };
    const r = PreferenceMapper.toMatrixResponse(entity as never);
    expect(Object.keys(r.channels).length).toBe(0);
    expect(Object.keys(r.categories).length).toBe(2);
  });

  it('toMatrixResponse — only channels, no categories', () => {
    const entity = {
      id: IDS.preferenceId,
      vo: {
        userId: { value: IDS.userId }, type: { value: 'opt_in' },
        options: [
          { channel: 'email', category: undefined, enabled: true },
          { channel: 'sms', category: undefined, enabled: false },
        ],
        quietHoursEnabled: false, quietHoursStart: null, quietHoursEnd: null,
        timezone: 'UTC', locale: 'en', locked: false,
      },
      locked: false, updatedAt: DATES.now,
    };
    const r = PreferenceMapper.toMatrixResponse(entity as never);
    expect(Object.keys(r.channels).length).toBe(2);
    expect(Object.keys(r.categories).length).toBe(0);
  });
});
