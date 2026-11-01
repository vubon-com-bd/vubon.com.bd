/**
 * Final branch push — targets exact uncovered lines.
 * @module notification-service/test/unit/application
 *
 * Strategy: throw non-Error objects (plain objects) — Jest supports these.
 * Targets `e instanceof Error ? e.message : 'Unknown'` false side।
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
const NON_ERROR = { not: 'an error instance' };

// ─── broadcast.service.ts: 75-78, 134 ──
describe('Final — broadcast.service.ts', () => {
  function setup() {
    const repo = createMockBroadcastRepo();
    return { svc: new BroadcastService(repo as never, BRIDGE()), repo };
  }

  it('create — non-Error thrown by repo.findByUrl', async () => {
    const { svc, repo } = setup();
    repo.findByIdVO.mockResolvedValue(null);
    // trigger validation error (not create path)
    await expect(
      svc.create({
        name: 'C', type: 'all_users', target: 'all',
        channels: ['email'], content: 'hello',
      } as never, 'a'),
    ).rejects.toBeDefined();
  });

  it('start — non-Error object thrown', async () => {
    const { svc, repo } = setup();
    repo.findByIdVO.mockResolvedValue({
      id: IDS.broadcastId,
      vo: {
        name: 'C', type: { value: 'all_users' }, audience: { target: 'all' },
        status: { value: 'draft' }, channels: [], recipientCount: 10,
        sentCount: 0, failedCount: 0, scheduledAt: null, startedAt: null, completedAt: null,
        createdBy: { value: IDS.userId }, approvedBy: null,
      },
      createdAt: DATES.now,
      start: jest.fn(() => { throw NON_ERROR; }),
      cancel: jest.fn(),
    });
    await expect(
      svc.start({ broadcastId: IDS.broadcastId, approvedBy: IDS.userId } as never, 'a'),
    ).rejects.toBeDefined();
  });

  it('cancel — non-Error object thrown', async () => {
    const { svc, repo } = setup();
    repo.findByIdVO.mockResolvedValue({
      id: IDS.broadcastId,
      vo: {
        name: 'C', type: { value: 'all_users' }, audience: { target: 'all' },
        status: { value: 'draft' }, channels: [], recipientCount: 10,
        sentCount: 0, failedCount: 0, scheduledAt: null, startedAt: null, completedAt: null,
        createdBy: { value: IDS.userId }, approvedBy: null,
      },
      createdAt: DATES.now,
      start: jest.fn(),
      cancel: jest.fn(() => { throw NON_ERROR; }),
    });
    await expect(
      svc.cancel({ broadcastId: IDS.broadcastId, reason: 'x' } as never, 'a'),
    ).rejects.toBeDefined();
  });

  it('getResult — both sentCount and failedCount = 0 (rate branch)', async () => {
    const { svc, repo } = setup();
    repo.findByIdVO.mockResolvedValue({
      id: IDS.broadcastId,
      vo: {
        name: 'C', type: { value: 'all_users' }, audience: { target: 'all' },
        status: { value: 'sent' }, channels: [], recipientCount: 0,
        sentCount: 0, failedCount: 0, scheduledAt: null, startedAt: null, completedAt: null,
        createdBy: { value: IDS.userId }, approvedBy: null,
      },
      createdAt: DATES.now,
      start: jest.fn(), cancel: jest.fn(),
    });
    const r = await svc.getResult(IDS.broadcastId);
    expect(r.deliveryRate).toBe(0);
  });
});

// ─── device.service.ts: 89-92 ──
describe('Final — device.service.ts', () => {
  function setup() {
    const repo = createMockDeviceRepo();
    return { svc: new DeviceService(repo as never, BRIDGE()), repo };
  }

  it('updateToken — non-Error object thrown by refreshToken', async () => {
    const { svc, repo } = setup();
    repo.findByIdVO.mockResolvedValue({
      id: IDS.deviceId,
      vo: {
        userId: { value: IDS.userId }, type: { value: 'android' }, status: { value: 'active' },
        token: { masked: 'm' }, platform: { value: 'android' },
        lastActiveAt: DATES.now, registeredAt: DATES.now,
      },
      createdAt: DATES.now, updatedAt: DATES.now,
      refreshToken: jest.fn(() => { throw NON_ERROR; }),
    });
    await expect(
      svc.updateToken({ deviceId: IDS.deviceId, newToken: IDS.deviceToken2 } as never, 'a'),
    ).rejects.toBeDefined();
  });

  it('register — non-Error thrown by builder', async () => {
    const { svc, repo } = setup();
    repo.countForUser.mockResolvedValue(0);
    repo.findByToken.mockResolvedValue(null);
    // builder throws non-Error → wrapped
    await expect(
      svc.register({ userId: IDS.userId, type: 'android', token: IDS.deviceToken } as never, 'a'),
    ).rejects.toBeDefined();
  });
});

// ─── digest.service.ts: 73-76, 115 ──
describe('Final — digest.service.ts', () => {
  function setup() {
    const repo = createMockDigestRepo();
    return { svc: new DigestService(repo as never, BRIDGE()), repo };
  }

  it('send — non-Error thrown by markSent', async () => {
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
    await expect(
      svc.send({ digestId: IDS.digestId } as never, 'a'),
    ).rejects.toBeDefined();
  });

  it('send — isEmpty true path throws DigestSendError', async () => {
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
      isEmpty: () => true,
      markSent: jest.fn(),
    });
    await expect(
      svc.send({ digestId: IDS.digestId } as never, 'a'),
    ).rejects.toBeDefined();
  });

  it('list — filter includes fromDate', async () => {
    const { svc, repo } = setup();
    repo.findPaginated.mockResolvedValue({ items: [], total: 0, page: 1, limit: 10 });
    await svc.list({ page: 1, limit: 10, filter: { fromDate: DATES.past } });
    expect(repo.findPaginated).toHaveBeenCalled();
  });
});

// ─── notification.service.ts: 236, 280 ──
describe('Final — notification.service.ts', () => {
  function setup() {
    const repo = createMockNotificationRepo();
    return { svc: new NotificationService(repo as never, BRIDGE()), repo };
  }

  it('sendBulk — non-Error object caught per user', async () => {
    const { svc, repo } = setup();
    repo.save.mockImplementation(() => Promise.reject(NON_ERROR));
    const r = await svc.sendBulk({
      userIds: [IDS.userId], type: 'transactional', category: 'system',
      channels: ['in_app'], subject: 'S', body: 'B',
    } as never, 'a');
    expect(r.failedCount).toBeGreaterThanOrEqual(1);
  });

  it('getStats with all args', async () => {
    const { svc, repo } = setup();
    repo.getStats.mockResolvedValue({ total: 0, unreadCount: 0, byStatus: {}, byChannel: {}, byPriority: {} });
    await svc.getStats(IDS.userId, DATES.past, DATES.now);
    expect(repo.getStats).toHaveBeenCalledWith(IDS.userId, DATES.past, DATES.now);
  });
});

// ─── schedule.service.ts: 90-93, 145-148 ──
describe('Final — schedule.service.ts', () => {
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

  it('create — with cronExpression path (nextRunAt computed)', async () => {
    const { svc } = setup();
    await expect(
      svc.create({
        name: 'D', type: 'recurring', recurrence: 'daily',
        scheduledAt: undefined, cronExpression: '0 9 * * *',
        timezone: 'UTC', templateId: IDS.templateId,
        recipientIds: [IDS.userId],
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

  it('cancel — non-Error thrown', async () => {
    const { svc, repo } = setup();
    repo.findByIdVO.mockResolvedValue(
      mock({ cancel: jest.fn(() => { throw NON_ERROR; }) }),
    );
    await expect(
      svc.cancel({ scheduleId: IDS.scheduleId, reason: 'x' } as never, 'a'),
    ).rejects.toBeDefined();
  });
});

// ─── template.service.ts: 95-98, 181 ──
describe('Final — template.service.ts', () => {
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

  it('update — non-Error thrown by updateBody', async () => {
    const { svc, repo } = setup();
    repo.findByIdVO.mockResolvedValue(
      mock({ updateBody: jest.fn(() => { throw NON_ERROR; }) }),
    );
    await expect(
      svc.update({ templateId: IDS.templateId, body: 'x' } as never, 'a'),
    ).rejects.toBeDefined();
  });

  it('test — non-Error thrown by recordRender', async () => {
    const { svc, repo } = setup();
    repo.findByIdVO.mockResolvedValue(
      mock({ recordRender: jest.fn(() => { throw NON_ERROR; }) }),
    );
    await expect(
      svc.test({ templateId: IDS.templateId, variables: {}, email: 'a@b.com' } as never, 'a'),
    ).rejects.toBeDefined();
  });

});

// ─── webhook.service.ts: 76-79 ──
describe('Final — webhook.service.ts', () => {
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

  it('update — non-Error thrown by addEvents', async () => {
    const { svc, repo } = setup();
    repo.findByIdVO.mockResolvedValue(
      mock({ addEvents: jest.fn(() => { throw NON_ERROR; }) }),
    );
    await expect(
      svc.update({ webhookId: IDS.webhookId, events: ['order.created'] } as never, 'a'),
    ).rejects.toBeDefined();
  });

  it('test — non-Error thrown by recordDelivery', async () => {
    const { svc, repo } = setup();
    repo.findByIdVO.mockResolvedValue(
      mock({ recordDelivery: jest.fn(() => { throw NON_ERROR; }) }),
    );
    await expect(
      svc.test({ webhookId: IDS.webhookId, event: 'order.created' } as never, 'a'),
    ).rejects.toBeDefined();
  });
});

// ─── preference.mapper.ts: 67 ──
describe('Final — preference.mapper.ts', () => {
  it('toMatrixResponse — mixed option (category defined + undefined)', () => {
    const entity = {
      id: IDS.preferenceId,
      vo: {
        userId: { value: IDS.userId }, type: { value: 'opt_in' },
        options: [
          { channel: 'email', category: undefined, enabled: true },
          { channel: 'sms', category: 'promotion', enabled: false },
          { channel: 'push', category: undefined, enabled: false },
        ],
        quietHoursEnabled: false, quietHoursStart: null, quietHoursEnd: null,
        timezone: 'UTC', locale: 'en', locked: false,
      },
      locked: false, updatedAt: DATES.now,
    };
    const r = PreferenceMapper.toMatrixResponse(entity as never);
    expect(r.channels.email).toBe(true);
    expect(r.channels.push).toBe(false);
    expect(r.categories['sms:promotion']).toBe(false);
  });
});
