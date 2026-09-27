import { jest } from '@jest/globals';

import { ActivityRecorderService } from '@infrastructure/services/internal/activity-recorder.service';

describe('ActivityRecorderService', () => {
  let service: ActivityRecorderService;
  let repo: {
    save: jest.Mock;
    countByUserId: jest.Mock;
    deleteOlderThan: jest.Mock;
  };

  beforeEach(() => {
    repo = {
      save: jest.fn().mockResolvedValue(undefined),
      countByUserId: jest.fn().mockResolvedValue(10),
      deleteOlderThan: jest.fn().mockResolvedValue(5),
    };
    service = new ActivityRecorderService(repo as never);
  });

  it('record saves an activity', async () => {
    await service.record({ userId: 'user-1', type: 'login' });
    expect(repo.save).toHaveBeenCalled();
  });

  it('countForUser delegates to repo', async () => {
    expect(await service.countForUser('user-1')).toBe(10);
  });

  it('cleanupOlderThan delegates to repo', async () => {
    expect(await service.cleanupOlderThan(30)).toBe(5);
  });
});
