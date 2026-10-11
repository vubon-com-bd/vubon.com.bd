import { describe, it, expect } from '@jest/globals';
import { ScheduleValidator } from '../../../../src/module/application/validators/schedule.validator.js';

const validSchedule = {
  id: '00000000-0000-0000-0000-000000000001',
  name: 'Test',
  type: 'scheduled',
  recurrence: 'none',
  status: 'pending',
  scheduledAt: new Date(Date.now() + 3600_000).toISOString(),
  timezone: 'Asia/Dhaka',
  runCount: 0,
  createdBy: '00000000-0000-0000-0000-000000000001',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe('ScheduleValidator', () => {
  it('validateSchedule ok', () => {
    expect(() => ScheduleValidator.validateSchedule(validSchedule)).not.toThrow();
  });

  it('validateSchedule fails', () => {
    expect(() => ScheduleValidator.validateSchedule({})).toThrow();
  });

  it('validateCreateInput ok', () => {
    expect(() => ScheduleValidator.validateCreateInput({
      name: 'T', type: 'scheduled', recurrence: 'none',
      scheduledAt: new Date(Date.now() + 3600_000).toISOString(),
      timezone: 'Asia/Dhaka',
    })).not.toThrow();
  });

  it('validateCreateInput fails', () => {
    expect(() => ScheduleValidator.validateCreateInput({})).toThrow();
  });

  it('validateFutureDate ok', () => {
    const future = new Date(Date.now() + 3600_000).toISOString();
    expect(ScheduleValidator.validateFutureDate(future)).toBe(future);
  });

  it('validateFutureDate past fails', () => {
    const past = new Date(Date.now() - 3600_000).toISOString();
    expect(() => ScheduleValidator.validateFutureDate(past)).toThrow();
  });

  it('validateFutureDate invalid fails', () => {
    expect(() => ScheduleValidator.validateFutureDate('not-a-date')).toThrow();
  });
});
