import { WebhookService } from '@application/services/impl/webhook.service.js';
import { createMockWebhookRepo, createMockEventBridge } from '@application-fixtures/mock-repos.fixture.js';
import { WEBHOOK_DTO } from '@application-fixtures/dtos.fixture.js';
import {
  WebhookNotFoundApplicationError, WebhookValidationError, WebhookCreationError,
  WebhookUpdateError, WebhookTestError,
} from '@application/errors/webhook.errors.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';
import { DATES } from '@domain-fixtures/dates.fixture.js';
import { jest } from '@jest/globals';

function makeService() {
  const repo = createMockWebhookRepo();
  return { svc: new WebhookService(repo as never, createMockEventBridge() as never), repo };
}

function makeWebhookMock(overrides: Record<string, unknown> = {}) {
  return {
    id: IDS.webhookId,
    vo: {
      name: 'W',
      type: { value: 'outgoing' },
      status: { value: 'active' },
      url: { value: 'https://x.com' },
      events: ['order.created'],
      headers: null,
      hasSecret: () => true,
      lastTriggeredAt: null,
      eventCount: 1,
    },
    createdAt: DATES.now,
    updatedAt: DATES.now,
    canDeliver: () => true,
    subscribes: () => true,
    addEvents: jest.fn(),
    recordDelivery: jest.fn(),
    status: { value: 'active' },
    ...overrides,
  };
}

describe('WebhookService', () => {
  // ─── CREATE ───────────────────────────────
  it('create requires events', async () => {
    const { svc } = makeService();
    await expect(svc.create({ ...WEBHOOK_DTO.create, events: [] } as never, 'a'))
      .rejects.toBeInstanceOf(WebhookValidationError);
  });

  it('create rejects duplicate URL', async () => {
    const { svc, repo } = makeService();
    repo.findByUrl.mockResolvedValue(makeWebhookMock());
    await expect(svc.create(WEBHOOK_DTO.create, 'a')).rejects.toBeInstanceOf(WebhookValidationError);
  });

  it('create reaches stub', async () => {
    const { svc, repo } = makeService();
    repo.findByUrl.mockResolvedValue(null);
    await expect(svc.create(WEBHOOK_DTO.create, 'a')).rejects.toBeInstanceOf(WebhookCreationError);
  });

  // ─── GET ──────────────────────────────────
  it('getById throws NotFound', async () => {
    const { svc, repo } = makeService();
    repo.findByIdVO.mockResolvedValue(null);
    await expect(svc.getById(IDS.webhookId)).rejects.toBeInstanceOf(WebhookNotFoundApplicationError);
  });

  it('getById returns mapped', async () => {
    const { svc, repo } = makeService();
    repo.findByIdVO.mockResolvedValue(makeWebhookMock());
    const r = await svc.getById(IDS.webhookId);
    expect(r.id).toBe(IDS.webhookId);
  });

  // ─── UPDATE (now with events in DTO) ─────
  it('update throws when addEvents fails', async () => {
    const { svc, repo } = makeService();
    const mock = makeWebhookMock({
      addEvents: jest.fn(() => { throw new Error('invalid event'); }),
    });
    repo.findByIdVO.mockResolvedValue(mock);
    await expect(svc.update(WEBHOOK_DTO.update, 'a')).rejects.toBeInstanceOf(WebhookUpdateError);
  });

  it('update succeeds', async () => {
    const { svc, repo } = makeService();
    const mock = makeWebhookMock();
    repo.findByIdVO.mockResolvedValue(mock);
    repo.save.mockResolvedValue(mock);
    const r = await svc.update(WEBHOOK_DTO.update, 'a');
    expect(r.id).toBe(IDS.webhookId);
  });

  it('update without events skips addEvents', async () => {
    const { svc, repo } = makeService();
    const mock = makeWebhookMock();
    repo.findByIdVO.mockResolvedValue(mock);
    repo.save.mockResolvedValue(mock);
    await svc.update({ webhookId: IDS.webhookId, name: 'X' } as never, 'a');
    expect(mock.addEvents).not.toHaveBeenCalled();
  });

  // ─── TEST ─────────────────────────────────
  it('test throws WebhookTestError when canDeliver false', async () => {
    const { svc, repo } = makeService();
    const mock = makeWebhookMock({
      canDeliver: () => false,
      status: { value: 'inactive' },
    });
    repo.findByIdVO.mockResolvedValue(mock);
    await expect(svc.test(WEBHOOK_DTO.test, 'a')).rejects.toBeInstanceOf(WebhookTestError);
  });

  it('test throws WebhookTestError when event not subscribed', async () => {
    const { svc, repo } = makeService();
    const mock = makeWebhookMock({ subscribes: () => false });
    repo.findByIdVO.mockResolvedValue(mock);
    await expect(svc.test(WEBHOOK_DTO.test, 'a')).rejects.toBeInstanceOf(WebhookTestError);
  });

  it('test succeeds when spec passes', async () => {
    const { svc, repo } = makeService();
    const mock = makeWebhookMock();
    repo.findByIdVO.mockResolvedValue(mock);
    repo.save.mockResolvedValue(mock);
    const r = await svc.test(WEBHOOK_DTO.test, 'a');
    expect(r.webhookId).toBe(IDS.webhookId);
  });

  // ─── LIST ─────────────────────────────────
  it('list delegates', async () => {
    const { svc, repo } = makeService();
    repo.findPaginated.mockResolvedValue({ items: [], total: 0, page: 1, limit: 10 });
    const r = await svc.list({ page: 1, limit: 10 });
    expect(r.total).toBe(0);
  });

  it('list returns items', async () => {
    const { svc, repo } = makeService();
    repo.findPaginated.mockResolvedValue({
      items: [makeWebhookMock()], total: 1, page: 1, limit: 10,
    });
    const r = await svc.list({ page: 1, limit: 10 });
    expect(r.items.length).toBe(1);
  });
});
