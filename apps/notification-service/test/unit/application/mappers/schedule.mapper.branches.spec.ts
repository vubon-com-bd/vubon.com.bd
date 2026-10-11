import { describe, it, expect } from '@jest/globals';
import { ScheduleMapper } from '../../../../src/module/application/mappers/schedule.mapper.js';

describe('ScheduleMapper — line 46 maxOccurrences undefined', () => {
  it('toResponse with maxOccurrences set', () => {
    const fake = {
      id: 's-1',
      type: { value: 'scheduled' },
      status: { value: 'pending' },
      recurrence: { value: 'none' },
      scheduledAt: new Date().toISOString(),
      timezone: 'UTC',
      occurrenceCount: 0,
      maxOccurrences: 5,
      createdBy: 'u',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as never;
    const r = ScheduleMapper.toResponse(fake);
    expect(r.maxOccurrences).toBe(5);
  });
});
