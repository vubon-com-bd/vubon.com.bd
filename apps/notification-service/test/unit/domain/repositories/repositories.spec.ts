import { describe, it, expect } from '@jest/globals';
import * as Repos from '../../../../src/module/domain/repositories/index.js';

describe('Repositories barrel', () => {
  it('exports all repository tokens', () => {
    expect(Repos.NOTIFICATION_REPOSITORY).toBeDefined();
    expect(Repos.TEMPLATE_REPOSITORY).toBeDefined();
    expect(Repos.SCHEDULE_REPOSITORY).toBeDefined();
    expect(Repos.BROADCAST_REPOSITORY).toBeDefined();
    expect(Repos.DIGEST_REPOSITORY).toBeDefined();
    expect(Repos.PREFERENCE_REPOSITORY).toBeDefined();
    expect(Repos.DEVICE_REPOSITORY).toBeDefined();
    expect(Repos.WEBHOOK_REPOSITORY).toBeDefined();
  });
  it('tokens are Symbols', () => {
    expect(typeof Repos.NOTIFICATION_REPOSITORY).toBe('symbol');
    expect(typeof Repos.TEMPLATE_REPOSITORY).toBe('symbol');
  });
  it('tokens are unique', () => {
    const all = [
      Repos.NOTIFICATION_REPOSITORY,
      Repos.TEMPLATE_REPOSITORY,
      Repos.SCHEDULE_REPOSITORY,
      Repos.BROADCAST_REPOSITORY,
      Repos.DIGEST_REPOSITORY,
      Repos.PREFERENCE_REPOSITORY,
      Repos.DEVICE_REPOSITORY,
      Repos.WEBHOOK_REPOSITORY,
    ];
    const unique = new Set(all);
    expect(unique.size).toBe(all.length);
  });
});
