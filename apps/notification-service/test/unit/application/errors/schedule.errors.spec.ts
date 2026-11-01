import {
  ScheduleNotFoundApplicationError,
  ScheduleValidationError,
  ScheduleCreationError,
  ScheduleUpdateError,
  ScheduleCancelError,
  ScheduleQueryError,
} from '@application/errors/schedule.errors.js';
import { ApplicationError } from '@vubon/shared-kernel/application/errors';

describe('Schedule application errors', () => {
  it('all extend ApplicationError', () => {
    expect(new ScheduleNotFoundApplicationError('s')).toBeInstanceOf(ApplicationError);
    expect(new ScheduleValidationError('x')).toBeInstanceOf(ApplicationError);
    expect(new ScheduleCreationError('c')).toBeInstanceOf(ApplicationError);
    expect(new ScheduleUpdateError('s', 'u')).toBeInstanceOf(ApplicationError);
    expect(new ScheduleCancelError('s', 'c')).toBeInstanceOf(ApplicationError);
    expect(new ScheduleQueryError('q')).toBeInstanceOf(ApplicationError);
  });

  it('NotFound 404', () => {
    expect(new ScheduleNotFoundApplicationError('s').httpStatus).toBe(404);
  });
});
