/**
 * THE missing branch — actorId ?? 'system' false side.
 *
 * Every service has `this.logger.log(`... by ${actorId ?? 'system'}`)`.
 * All previous tests pass actorId='a' → 'system' never hit.
 *
 * This file calls every method WITHOUT actorId to hit 'system' branch।
 */
import { jest } from '@jest/globals';
import { BroadcastService } from '@application/services/impl/broadcast.service.js';
import { DeviceService } from '@application/services/impl/device.service.js';
import { DigestService } from '@application/services/impl/digest.service.js';
import { ScheduleService } from '@application/services/impl/schedule.service.js';
import { TemplateService } from '@application/services/impl/template.service.js';
import { WebhookService } from '@application/services/impl/webhook.service.js';
import { NotificationService } from '@application/services/impl/notification.service.js';
import {
  createMockBroadcastRepo, createMockDeviceRepo, createMockDigestRepo,
  createMockScheduleRepo, createMockTemplateRepo, createMockWebhookRepo,
  createMockNotificationRepo, createMockEventBridge,
} from '@application-fixtures/mock-repos.fixture.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';
import { DATES } from '@domain-fixtures/dates.fixture.js';

const BRIDGE = () => createMockEventBridge() as never;

// ═══════════════════════════════════════════════════════════
// ⚠️ KEY: NO actorId parameter passed → undefined → 'system'
// ═══════════════════════════════════════════════════════════

describe('actorId ?? system — broadcast.service', () => {
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

  it('start() without actorId → "system" branch', async () => {
    const { svc, repo } = setup();
    repo.findByIdVO.mockResolvedValue(mock());
    repo.save.mockResolvedValue(mock());
    await svc.start({ broadcastId: IDS.broadcastId, approvedBy: IDS.userId } as never);
    expect(repo.save).toHaveBeenCalled();
  });

  it('cancel() without actorId → "system" branch', async () => {
    const { svc, repo } = setup();
    repo.findByIdVO.mockResolvedValue(mock());
    repo.save.mockResolvedValue(mock());
    await svc.cancel({ broadcastId: IDS.broadcastId } as never);
    expect(repo.save).toHaveBeenCalled();
  });
});

describe('actorId ?? system — device.service', () => {
  function setup() {
    const repo = createMockDeviceRepo();
    return { svc: new DeviceService(repo as never, BRIDGE()), repo };
  }

  it('updateToken() without actorId → "system" branch', async () => {
    const { svc, repo } = setup();
    repo.findByIdVO.mockResolvedValue({
      id: IDS.deviceId,
      vo: { userId: { value: IDS.userId }, type: { value: 'android' }, status: { value: 'active' }, token: { masked: 'm' }, platform: { value: 'android' }, lastActiveAt: DATES.now, registeredAt: DATES.now },
      createdAt: DATES.now, updatedAt: DATES.now,
      refreshToken: jest.fn(), unregister: jest.fn(),
    });
    repo.save.mockImplementation((e) => Promise.resolve(e));
    await svc.updateToken({ deviceId: IDS.deviceId, newToken: IDS.deviceToken2 } as never);
    expect(repo.save).toHaveBeenCalled();
  });

  it('unregister() without actorId → "system" branch', async () => {
    const { svc, repo } = setup();
    repo.findByIdVO.mockResolvedValue({
      id: IDS.deviceId,
      vo: { userId: { value: IDS.userId }, type: { value: 'android' }, status: { value: 'active' }, token: { masked: 'm' }, platform: { value: 'android' }, lastActiveAt: DATES.now, registeredAt: DATES.now },
      createdAt: DATES.now, updatedAt: DATES.now,
      refreshToken: jest.fn(), unregister: jest.fn(),
    });
    repo.save.mockImplementation((e) => Promise.resolve(e));
    await svc.unregister({ deviceId: IDS.deviceId } as never);
    expect(repo.save).toHaveBeenCalled();
  });
});

describe('actorId ?? system — digest.service', () => {
  function setup() {
    const repo = createMockDigestRepo();
    return { svc: new DigestService(repo as never, BRIDGE()), repo };
  }

  it('send() without actorId → "system" branch', async () => {
    const { svc, repo } = setup();
    repo.findByIdVO.mockResolvedValue({
      id: IDS.digestId,
      vo: { userId: { value: IDS.userId }, period: { frequency: 'daily' }, type: { value: 'summary' }, status: { value: 'pending' }, categories: [], sendHour: 9, timezone: 'UTC', generatedAt: null, sentAt: null },
      itemCount: 0, items: [], createdAt: DATES.now,
      isEmpty: () => false, markSent: jest.fn(),
    });
    repo.save.mockImplementation((e) => Promise.resolve(e));
    await svc.send({ digestId: IDS.digestId } as never);
    expect(repo.save).toHaveBeenCalled();
  });
});

describe('actorId ?? system — schedule.service', () => {
  function setup() {
    const repo = createMockScheduleRepo();
    return { svc: new ScheduleService(repo as never, BRIDGE()), repo };
  }
  function mock() {
    return {
      id: IDS.scheduleId,
      vo: { name: 'D', type: { value: 'recurring' }, status: { value: 'pending' }, frequency: { value: 'daily' }, time: { scheduledAt: DATES.future24h, timezone: 'UTC' }, templateId: { value: IDS.templateId }, cronExpression: undefined, recipientCount: () => 1, hasRecipients: () => true },
      nextRunAt: DATES.future24h, lastRunAt: undefined, runCount: 0,
      createdAt: DATES.now, updatedAt: DATES.now,
      activate: jest.fn(), cancel: jest.fn(),
    };
  }

  it('update() without actorId → "system" branch', async () => {
    const { svc, repo } = setup();
    repo.findByIdVO.mockResolvedValue(mock());
    repo.save.mockImplementation((e) => Promise.resolve(e));
    await svc.update({ scheduleId: IDS.scheduleId, scheduledAt: DATES.future24h } as never);
    expect(repo.save).toHaveBeenCalled();
  });

  it('cancel() without actorId → "system" branch', async () => {
    const { svc, repo } = setup();
    repo.findByIdVO.mockResolvedValue(mock());
    repo.save.mockImplementation((e) => Promise.resolve(e));
    await svc.cancel({ scheduleId: IDS.scheduleId, reason: 'x' } as never);
    expect(repo.save).toHaveBeenCalled();
  });
});

describe('actorId ?? system — template.service', () => {
  function setup() {
    const repo = createMockTemplateRepo();
    return { svc: new TemplateService(repo as never, BRIDGE()), repo };
  }
  function mock() {
    return {
      id: IDS.templateId,
      vo: { name: { value: 'T' }, slug: 'w', type: { value: 'system' }, status: 'active', format: { value: 'html' }, subject: null, body: { value: 'b' }, variables: [], locale: 'en', version: 1 },
      templateId: { value: IDS.templateId },
      createdAt: DATES.now, updatedAt: DATES.now, renderedHistory: [],
      updateBody: jest.fn(), recordRender: jest.fn(),
    };
  }

  it('update() without actorId → "system" branch', async () => {
    const { svc, repo } = setup();
    repo.findByIdVO.mockResolvedValue(mock());
    repo.save.mockImplementation((e) => Promise.resolve(e));
    await svc.update({ templateId: IDS.templateId, subject: 'New' } as never);
    expect(repo.save).toHaveBeenCalled();
  });
});

describe('actorId ?? system — webhook.service', () => {
  function setup() {
    const repo = createMockWebhookRepo();
    return { svc: new WebhookService(repo as never, BRIDGE()), repo };
  }
  function mock() {
    return {
      id: IDS.webhookId,
      vo: { name: 'W', type: { value: 'outgoing' }, status: { value: 'active' }, url: { value: 'https://x.com' }, events: ['order.created'], headers: null, hasSecret: () => true, lastTriggeredAt: null, eventCount: 1 },
      createdAt: DATES.now, updatedAt: DATES.now,
      canDeliver: () => true, subscribes: () => true,
      addEvents: jest.fn(), recordDelivery: jest.fn(),
      status: { value: 'active' },
    };
  }

  it('update() without actorId → "system" branch', async () => {
    const { svc, repo } = setup();
    repo.findByIdVO.mockResolvedValue(mock());
    repo.save.mockImplementation((e) => Promise.resolve(e));
    await svc.update({ webhookId: IDS.webhookId, name: 'X' } as never);
    expect(repo.save).toHaveBeenCalled();
  });
});

describe('actorId ?? system — notification.service', () => {
  function setup() {
    const repo = createMockNotificationRepo();
    return { svc: new NotificationService(repo as never, BRIDGE()), repo };
  }

  it('send() without actorId → "system" branch', async () => {
    const { svc, repo } = setup();
    repo.save.mockImplementation((e) => Promise.resolve(e));
    await svc.send({
      userId: IDS.userId, type: 'transactional', category: 'system',
      channels: ['in_app'], subject: 'S', body: 'B',
    } as never);
    expect(repo.save).toHaveBeenCalled();
  });

  it('sendBulk() without actorId → "system" branch', async () => {
    const { svc, repo } = setup();
    repo.save.mockImplementation((e) => Promise.resolve(e));
    await svc.sendBulk({
      userIds: [IDS.userId], type: 'transactional', category: 'system',
      channels: ['in_app'], subject: 'S', body: 'B',
    } as never);
    expect(repo.save).toHaveBeenCalled();
  });
});
