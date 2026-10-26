/**
 * Branch coverage booster — preference.service.ts
 */
import { PreferenceService } from '@application/services/impl/preference.service.js';
import { createMockPreferenceRepo, createMockEventBridge } from '@application-fixtures/mock-repos.fixture.js';
import { PREFERENCE_DTO } from '@application-fixtures/dtos.fixture.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';
import { DATES } from '@domain-fixtures/dates.fixture.js';
import { jest } from '@jest/globals';

function makeService() {
  const repo = createMockPreferenceRepo();
  return { svc: new PreferenceService(repo as never, createMockEventBridge() as never), repo };
}

function makePreferenceMock(overrides = {}) {
  return {
    id: IDS.preferenceId,
    vo: {
      userId: { value: IDS.userId }, type: { value: 'opt_in' }, options: [],
      quietHoursEnabled: false, quietHoursStart: null, quietHoursEnd: null,
      timezone: 'UTC', locale: 'en', locked: false,
    },
    locked: false,
    isChannelEnabled: () => true,
    isCategoryEnabled: () => true,
    updatedAt: DATES.now,
    changeQuietHours: jest.fn(),
    optOut: jest.fn(),
    optIn: jest.fn(),
    ...overrides,
  };
}

describe('PreferenceService — branch coverage', () => {
  it('unsubscribe for protected category', async () => {
    const { svc, repo } = makeService();
    const mock = makePreferenceMock({ isChannelEnabled: () => false });
    repo.findByUser.mockResolvedValue(mock);
    // CanUnsubscribeSpecification will reject
    await expect(
      svc.unsubscribe(
        { userId: IDS.userId, channel: 'email', category: 'security' } as never,
        'a',
      ),
    ).rejects.toBeInstanceOf(Error);
  });

  it('bulkUpdate handles all success', async () => {
    const { svc, repo } = makeService();
    const mock = makePreferenceMock();
    repo.findByUser.mockResolvedValue(mock);
    repo.save.mockResolvedValue(mock);
    mock.changeQuietHours.mockImplementation(() => {});
    const r = await svc.bulkUpdate(
      { userIds: [IDS.userId], updates: { email: true } } as never,
      'a',
    );
    expect(r.updated).toBe(1);
    expect(r.failed).toBe(0);
  });

  it('bulkUpdate handles all failure', async () => {
    const { svc, repo } = makeService();
    repo.findByUser.mockResolvedValue(null);
    const r = await svc.bulkUpdate(
      { userIds: [IDS.userId, IDS.userId2], updates: { email: false } } as never,
      'a',
    );
    expect(r.failed).toBe(2);
  });

  it('getMatrix without quiet hours', async () => {
    const { svc, repo } = makeService();
    repo.findByUser.mockResolvedValue(makePreferenceMock());
    const r = await svc.getMatrix(IDS.userId);
    expect(r.quietHours).toBeNull();
  });

  it('getMatrix with quiet hours', async () => {
    const { svc, repo } = makeService();
    const mock = makePreferenceMock({
      vo: {
        ...makePreferenceMock().vo,
        quietHoursEnabled: true,
        quietHoursStart: 22,
        quietHoursEnd: 8,
      },
    });
    repo.findByUser.mockResolvedValue(mock);
    const r = await svc.getMatrix(IDS.userId);
    expect(r.quietHours).not.toBeNull();
  });
});
