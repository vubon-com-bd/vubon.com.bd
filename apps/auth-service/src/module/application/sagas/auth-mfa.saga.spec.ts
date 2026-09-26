/**
 * AuthMfaSaga — Unit Tests
 * @module auth-service/application/sagas
 */
import { of } from 'rxjs';
import { AuthMfaSaga } from './auth-mfa.saga';
import { MfaEnabledEvent } from '../../domain/events/auth-mfa.events';

describe('AuthMfaSaga', () => {
  let saga: AuthMfaSaga;
  beforeEach(() => { saga = new AuthMfaSaga(); });

  it('should have a name', () => expect(saga.name).toBe('AuthMfaSaga'));
  it('should have mfaEnabled() method', () => expect(typeof saga.mfaEnabled).toBe('function'));

  it('execute() and compensate() resolve', async () => {
    await expect(saga.execute({})).resolves.toBeUndefined();
    await expect(saga.compensate()).resolves.toBeUndefined();
  });

  it('mfaEnabled() emits 1 command', async () => {
    const occurredAt = new Date().toISOString() as never;
    const event = new MfaEnabledEvent(
      'user-1' as never,
      { userId: 'user-1' as never, type: 'totp' },
      occurredAt,
    );
    const commands$ = saga.mfaEnabled(of(event));
    const emitted: unknown[] = [];
    await new Promise<void>((resolve) => {
      commands$.subscribe({
        next: (cmd) => emitted.push(cmd),
        complete: () => resolve(),
      });
    });
    expect(emitted.length).toBe(1);
  });
});
