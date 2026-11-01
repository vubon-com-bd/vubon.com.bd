import {
  BroadcastNotFoundApplicationError,
  BroadcastValidationError,
  BroadcastCreationError,
  BroadcastStartError,
  BroadcastCancelError,
  BroadcastQueryError,
} from '@application/errors/broadcast.errors.js';
import { ApplicationError } from '@vubon/shared-kernel/application/errors';

describe('Broadcast application errors', () => {
  it('all extend ApplicationError', () => {
    expect(new BroadcastNotFoundApplicationError('b')).toBeInstanceOf(ApplicationError);
    expect(new BroadcastValidationError('x')).toBeInstanceOf(ApplicationError);
    expect(new BroadcastCreationError('c')).toBeInstanceOf(ApplicationError);
    expect(new BroadcastStartError('b', 's')).toBeInstanceOf(ApplicationError);
    expect(new BroadcastCancelError('b', 'c')).toBeInstanceOf(ApplicationError);
    expect(new BroadcastQueryError('q')).toBeInstanceOf(ApplicationError);
  });
});
