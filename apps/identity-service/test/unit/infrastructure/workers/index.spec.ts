import { describe, it, expect } from '@jest/globals';
import * as Barrel from '@infrastructure/workers/index.js';

describe('Workers barrel', () => {
  it('exports BaseWorker', () => {
    expect(Barrel).toHaveProperty('BaseWorker');
  });
  it('exports SessionCleanupWorker', () => {
    expect(Barrel).toHaveProperty('SessionCleanupWorker');
  });
});
