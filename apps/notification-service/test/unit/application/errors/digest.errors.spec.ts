import {
  DigestNotFoundApplicationError,
  DigestValidationError,
  DigestCreationError,
  DigestSendError,
  DigestQueryError,
} from '@application/errors/digest.errors.js';
import { ApplicationError } from '@vubon/shared-kernel/application/errors';

describe('Digest application errors', () => {
  it('all extend ApplicationError', () => {
    expect(new DigestNotFoundApplicationError('d')).toBeInstanceOf(ApplicationError);
    expect(new DigestValidationError('x')).toBeInstanceOf(ApplicationError);
    expect(new DigestCreationError('c')).toBeInstanceOf(ApplicationError);
    expect(new DigestSendError('d', 's')).toBeInstanceOf(ApplicationError);
    expect(new DigestQueryError('q')).toBeInstanceOf(ApplicationError);
  });
});
