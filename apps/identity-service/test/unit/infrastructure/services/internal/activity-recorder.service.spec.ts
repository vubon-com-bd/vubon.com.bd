/**
 * ActivityRecorderService unit tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { ActivityRecorderService } from '@infrastructure/services/internal/activity-recorder.service.js';

describe('ActivityRecorderService', () => {
  let service: ActivityRecorderService;

  beforeEach(() => {
    service = new ActivityRecorderService();
  });

  it('buildRecord returns object', () => {
    const rec = service.buildRecord({ userId: 'u-1', type: 'login' } as never);
    expect(typeof rec).toBe('object');
    expect(rec).not.toBeNull();
  });

  it('shouldRecord returns boolean', () => {
    expect(typeof service.shouldRecord('login')).toBe('boolean');
  });

  it('isSecurityEvent returns boolean for auth events', () => {
    expect(typeof service.isSecurityEvent('auth')).toBe('boolean');
  });
});
