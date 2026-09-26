/**
 * AuthMfaSaga — Unit Tests
 * @module auth-service/application/sagas
 */
import { AuthMfaSaga } from './auth-mfa.saga';
import { of } from 'rxjs';

describe('AuthMfaSaga', () => {
  let saga: AuthMfaSaga;

  beforeEach(() => {
    saga = new AuthMfaSaga();
  });

  it('should have a name', () => {
    expect(saga.name).toBe('AuthMfaSaga');
  });

  it('should have mfaEnabled() subscription method', () => {
    expect(typeof saga.mfaEnabled).toBe('function');
  });

  it('should have execute() and compensate()', () => {
    expect(typeof saga.execute).toBe('function');
    expect(typeof saga.compensate).toBe('function');
  });

  it('execute() and compensate() resolve', async () => {
    await expect(saga.execute({})).resolves.toBeUndefined();
    await expect(saga.compensate()).resolves.toBeUndefined();
  });

  it('mfaEnabled() emits recovery-code command on MfaEnabledEvent', async () => {
    const { MfaEnabledEvent } = await import('../../domain/events/auth-mfa.events');
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
    expect((emitted[0] as { type: string }).type).toBe('saga.send-recovery-code');
  });
});
