import { PreferenceService } from '@application/services/impl/preference.service.js';
import { createMockPreferenceRepo, createMockEventBridge } from '@application-fixtures/mock-repos.fixture.js';
import { PREFERENCE_DTO } from '@application-fixtures/dtos.fixture.js';
import {
  PreferenceNotFoundApplicationError, PreferenceValidationError, PreferenceUpdateError,
} from '@application/errors/preference.errors.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';
import { DATES } from '@domain-fixtures/dates.fixture.js';
import { jest } from '@jest/globals';

const MOCK = {
  id: IDS.preferenceId,
  vo: {
    userId: { value: IDS.userId }, type: { value: 'opt_in' }, options: [],
    quietHoursEnabled: false, quietHoursStart: null, quietHoursEnd: null,
    timezone: 'UTC', locale: 'en', locked: false,
  },
  locked: false,
  isChannelEnabled: () => true,
  updatedAt: DATES.now,
  changeQuietHours: jest.fn(),
  optOut: jest.fn(),
};

function makeService() {
  const repo = createMockPreferenceRepo();
  return { svc: new PreferenceService(repo as never, createMockEventBridge() as never), repo };
}

describe('PreferenceService', () => {
  it('update existing applies quiet hours', async () => {
    const { svc, repo } = makeService();
    repo.findByUser.mockResolvedValue(MOCK);
    repo.save.mockResolvedValue(MOCK);
    MOCK.changeQuietHours.mockImplementation(() => {});
    await svc.update(PREFERENCE_DTO.update, 'a');
    expect(MOCK.changeQuietHours).toHaveBeenCalled();
  });

  it('update without quietHours skips', async () => {
    const { svc, repo } = makeService();
    repo.findByUser.mockResolvedValue(MOCK);
    repo.save.mockResolvedValue(MOCK);
    MOCK.changeQuietHours.mockReset();
    await svc.update({ userId: IDS.userId, email: true } as never, 'a');
    expect(MOCK.changeQuietHours).not.toHaveBeenCalled();
  });

  it('update new user throws NotFound', async () => {
    const { svc, repo } = makeService();
    repo.findByUser.mockResolvedValue(null);
    await expect(svc.update(PREFERENCE_DTO.update, 'a')).rejects.toBeInstanceOf(PreferenceNotFoundApplicationError);
  });

  it('update throws PreferenceUpdateError when domain rejects', async () => {
    const { svc, repo } = makeService();
    repo.findByUser.mockResolvedValue(MOCK);
    MOCK.changeQuietHours.mockImplementation(() => { throw new Error('bad'); });
    await expect(svc.update(PREFERENCE_DTO.update, 'a')).rejects.toBeInstanceOf(PreferenceUpdateError);
  });

  it('bulkUpdate counts updated/failed', async () => {
    const { svc, repo } = makeService();
    repo.findByUser.mockResolvedValueOnce(MOCK).mockResolvedValueOnce(null);
    repo.save.mockResolvedValue(MOCK);
    MOCK.changeQuietHours.mockImplementation(() => {});
    const r = await svc.bulkUpdate(PREFERENCE_DTO.bulkUpdate, 'a');
    expect(r.updated + r.failed).toBe(2);
  });

  it('unsubscribe requires userId', async () => {
    const { svc } = makeService();
    await expect(svc.unsubscribe({ channel: 'email' } as never, 'a'))
      .rejects.toBeInstanceOf(PreferenceValidationError);
  });

  it('unsubscribe throws when locked', async () => {
    const { svc, repo } = makeService();
    const lockedMock = { ...MOCK, locked: true };
    repo.findByUser.mockResolvedValue(lockedMock);
    await expect(svc.unsubscribe(PREFERENCE_DTO.unsubscribe, 'a'))
      .rejects.toBeInstanceOf(PreferenceValidationError);
  });

  it('unsubscribe succeeds', async () => {
    const { svc, repo } = makeService();
    repo.findByUser.mockResolvedValue(MOCK);
    repo.save.mockResolvedValue(MOCK);
    MOCK.optOut.mockImplementation(() => {});
    const r = await svc.unsubscribe(PREFERENCE_DTO.unsubscribe, 'a');
    expect(r.userId).toBe(IDS.userId);
  });

  it('getByUser returns mapped', async () => {
    const { svc, repo } = makeService();
    repo.findByUser.mockResolvedValue(MOCK);
    const r = await svc.getByUser(IDS.userId);
    expect(r.userId).toBe(IDS.userId);
  });

  it('getMatrix returns matrix', async () => {
    const { svc, repo } = makeService();
    repo.findByUser.mockResolvedValue(MOCK);
    const r = await svc.getMatrix(IDS.userId);
    expect(r.userId).toBe(IDS.userId);
  });

  it('getDefaults returns default shape', async () => {
    const { svc } = makeService();
    const r = await svc.getDefaults();
    expect(typeof r.email).toBe('boolean');
  });

  it('list delegates', async () => {
    const { svc, repo } = makeService();
    repo.findPaginated.mockResolvedValue({ items: [], total: 0, page: 1, limit: 10 });
    expect((await svc.list({ page: 1, limit: 10 })).total).toBe(0);
  });
});
