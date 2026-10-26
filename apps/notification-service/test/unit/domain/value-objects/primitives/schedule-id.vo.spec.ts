import { ScheduleIdVO } from '@domain/primitives/schedule-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { IDS } from '@domain-fixtures/ids.fixture.js';

describe('ScheduleIdVO', () => {
  it('creates valid UUID', () => {
    expect(ScheduleIdVO.create(IDS.scheduleId).value).toBe(IDS.scheduleId);
  });
  it('rejects empty', () => {
    expect(() => ScheduleIdVO.create('')).toThrow(ValidationError);
  });
  it('rejects non-UUID', () => {
    expect(() => ScheduleIdVO.create('abc')).toThrow(ValidationError);
  });
  it('reconstitute', () => {
    expect(ScheduleIdVO.reconstitute('any').value).toBe('any');
  });
});
