import { describe, it, expect } from '@jest/globals';
import { BroadcastValidator } from '../../../../src/module/application/validators/broadcast.validator.js';

const validBroadcast = {
  id: '00000000-0000-0000-0000-000000000001',
  name: 'X',
  type: 'all_users',
  target: 'all',
  status: 'draft',
  channels: ['email'],
  recipientCount: 0,
  sentCount: 0,
  failedCount: 0,
  createdBy: '00000000-0000-0000-0000-000000000001',
  createdAt: new Date().toISOString(),
};

describe('BroadcastValidator', () => {
  it('validateBroadcast ok', () => {
    expect(() => BroadcastValidator.validateBroadcast(validBroadcast)).not.toThrow();
  });

  it('validateBroadcast fails', () => {
    expect(() => BroadcastValidator.validateBroadcast({})).toThrow();
  });

  it('validateChannels ok', () => {
    expect(BroadcastValidator.validateChannels(['email'])).toEqual(['email']);
  });

  it('validateChannels empty fails', () => {
    expect(() => BroadcastValidator.validateChannels([])).toThrow();
  });

  it('validateChannels > 10 fails', () => {
    expect(() =>
      BroadcastValidator.validateChannels(Array.from({ length: 11 }, (_, i) => `c${i}`)),
    ).toThrow();
  });

  it('validateChannels non-array fails', () => {
    expect(() => BroadcastValidator.validateChannels('not-array')).toThrow();
  });
});
