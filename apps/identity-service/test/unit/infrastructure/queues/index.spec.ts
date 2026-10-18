import { describe, it, expect } from '@jest/globals';
import * as Barrel from '@infrastructure/queues/index.js';

describe('Queues barrel', () => {
  it('exports AuthQueue', () => {
    expect(Barrel).toHaveProperty('AuthQueue');
  });
  it('exports SessionQueue', () => {
    expect(Barrel).toHaveProperty('SessionQueue');
  });
  it('exports NotificationQueue', () => {
    expect(Barrel).toHaveProperty('NotificationQueue');
  });
});
