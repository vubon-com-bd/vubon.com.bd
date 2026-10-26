import { PreferenceMatrixService } from '@application/services/impl/preference-matrix.service.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';
import { jest } from '@jest/globals';

function makeService() {
  const repo = { findLatestSnapshot: jest.fn(), findHistory: jest.fn() };
  return { svc: new PreferenceMatrixService(repo as never), repo };
}

describe('PreferenceMatrixService', () => {
  it('getByUser returns empty when missing', async () => {
    const { svc, repo } = makeService();
    repo.findLatestSnapshot.mockResolvedValue(null);
    const r = await svc.getByUser(IDS.userId);
    expect(r.userId).toBe(IDS.userId);
    expect(r.quietHours).toBeNull();
  });

  it('getByUser returns snapshot when exists', async () => {
    const { svc, repo } = makeService();
    repo.findLatestSnapshot.mockResolvedValue({
      matrix: {
        userId: { value: IDS.userId }, options: [],
        quietHoursEnabled: false, quietHoursStart: null, quietHoursEnd: null,
        timezone: 'UTC', locale: 'en',
      },
    });
    const r = await svc.getByUser(IDS.userId);
    expect(r.userId).toBe(IDS.userId);
  });

  it('getSnapshot returns null when missing', async () => {
    const { svc, repo } = makeService();
    repo.findLatestSnapshot.mockResolvedValue(null);
    expect(await svc.getSnapshot(IDS.userId)).toBeNull();
  });

  it('getSnapshot returns mapped', async () => {
    const { svc, repo } = makeService();
    repo.findLatestSnapshot.mockResolvedValue({
      matrix: { userId: { value: IDS.userId }, options: [], quietHoursEnabled: false, timezone: 'UTC', locale: 'en' },
    });
    expect((await svc.getSnapshot(IDS.userId))!.userId).toBe(IDS.userId);
  });

  it('getHistory returns list', async () => {
    const { svc, repo } = makeService();
    repo.findHistory.mockResolvedValue([]);
    expect((await svc.getHistory(IDS.userId)).length).toBe(0);
  });
});
