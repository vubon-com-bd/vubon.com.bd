import { NotImplementedError } from '@application/errors/not-implemented.error.js';
import { ApplicationError } from '@vubon/shared-kernel/application/errors';

describe('NotImplementedError', () => {
  it('extends ApplicationError, 501', () => {
    const err = new NotImplementedError('Feature X', 'Domain VO factory');
    expect(err).toBeInstanceOf(ApplicationError);
    expect(err.httpStatus).toBe(501);
    expect(err.feature).toBe('Feature X');
    expect(err.requirement).toBe('Domain VO factory');
  });
});
