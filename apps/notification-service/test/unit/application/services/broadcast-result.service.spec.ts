import { BroadcastResultService } from '@application/services/impl/broadcast-result.service.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';
import { DATES } from '@domain-fixtures/dates.fixture.js';
import { jest } from '@jest/globals';

const VO = {
  broadcastId: { value: IDS.broadcastId },
  recipientCount: 100, sentCount: 90, deliveredCount: 85, failedCount: 10,
  openCount: 40, clickCount: 20, unsubscribedCount: 5,
  deliveryRate: 0.85, openRate: 0.4, clickRate: 0.2, unsubscribeRate: 0.05,
  durationMs: 5000, throughputPerSecond: 10,
};

const MOCK = { id: 'br-1', broadcastId: { value: IDS.broadcastId }, result: VO };

function makeService() {
  const repo = {
    findByBroadcast: jest.fn(), findWithHighFailureRate: jest.fn(),
    findRecent: jest.fn(), averageDeliveryRate: jest.fn(), averageOpenRate: jest.fn(),
  };
  return { svc: new BroadcastResultService(repo as never), repo };
}

describe('BroadcastResultService', () => {
  it('getByBroadcast returns null when missing', async () => {
    const { svc, repo } = makeService();
    repo.findByBroadcast.mockResolvedValue(null);
    expect(await svc.getByBroadcast(IDS.broadcastId)).toBeNull();
  });

  it('getByBroadcast returns mapped', async () => {
    const { svc, repo } = makeService();
    repo.findByBroadcast.mockResolvedValue(MOCK);
    const r = await svc.getByBroadcast(IDS.broadcastId);
    expect(r!.sentCount).toBe(90);
  });

  it('listHighFailure', async () => {
    const { svc, repo } = makeService();
    repo.findWithHighFailureRate.mockResolvedValue([MOCK]);
    expect((await svc.listHighFailure(0.2)).length).toBe(1);
  });

  it('listRecent', async () => {
    const { svc, repo } = makeService();
    repo.findRecent.mockResolvedValue([]);
    expect((await svc.listRecent(10)).length).toBe(0);
  });

  it('getAverageDeliveryRate', async () => {
    const { svc, repo } = makeService();
    repo.averageDeliveryRate.mockResolvedValue(0.95);
    expect(await svc.getAverageDeliveryRate(DATES.past, DATES.now)).toBe(0.95);
  });

  it('getAverageOpenRate', async () => {
    const { svc, repo } = makeService();
    repo.averageOpenRate.mockResolvedValue(0.4);
    expect(await svc.getAverageOpenRate()).toBe(0.4);
  });
});
