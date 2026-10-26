import { ScheduleValidator } from '@application/validators/schedule.validator.js';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors';
import { SCHEDULE_DTO } from '@application-fixtures/dtos.fixture.js';

describe('ScheduleValidator', () => {
  it('validateCreate accepts valid', () => {
    expect(() => ScheduleValidator.validateCreate(SCHEDULE_DTO.create)).not.toThrow();
  });

  it('validateCreate rejects empty', () => {
    expect(() => ScheduleValidator.validateCreate({})).toThrow(ApplicationValidationError);
  });

  it('validateUpdate accepts valid', () => {
    expect(() => ScheduleValidator.validateUpdate(SCHEDULE_DTO.update)).not.toThrow();
  });

  it('validateUpdate rejects no-op update', () => {
    expect(() => ScheduleValidator.validateUpdate({ scheduleId: SCHEDULE_DTO.update.scheduleId }))
      .toThrow(ApplicationValidationError);
  });

  it('validateCancel accepts valid', () => {
    expect(() => ScheduleValidator.validateCancel(SCHEDULE_DTO.cancel)).not.toThrow();
  });

  it('validateCancel rejects invalid id', () => {
    expect(() => ScheduleValidator.validateCancel({ scheduleId: 'bad' }))
      .toThrow(ApplicationValidationError);
  });

  it('non-Zod error rethrown', () => {
    expect(() => ScheduleValidator.validateCreate(null)).toThrow();
  });
});
