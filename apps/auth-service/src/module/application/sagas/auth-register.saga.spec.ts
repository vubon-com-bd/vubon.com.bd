/**
 * AuthRegisterSaga — Unit Tests
 * @module auth-service/application/sagas
 */
import { AuthRegisterSaga } from './auth-register.saga';
import { of } from 'rxjs';

describe('AuthRegisterSaga', () => {
  let saga: AuthRegisterSaga;

  beforeEach(() => {
    saga = new AuthRegisterSaga();
  });

  it('should have a name', () => {
    expect(saga.name).toBe('AuthRegisterSaga');
  });

  it('should have register() subscription method', () => {
    expect(typeof saga.register).toBe('function');
  });

  it('should have execute() and compensate()', () => {
    expect(typeof saga.execute).toBe('function');
    expect(typeof saga.compensate).toBe('function');
  });

  it('execute() and compensate() resolve', async () => {
    await expect(saga.execute({})).resolves.toBeUndefined();
    await expect(saga.compensate()).resolves.toBeUndefined();
  });

  it('register() returns Observable', () => {
    const result = saga.register(of());
    expect(typeof result.subscribe).toBe('function');
  });

  it('register() emits welcome + verification commands on UserCreatedEvent', async () => {
    const { UserCreatedEvent } = await import('../../domain/events/user.events');
    const { UserEmailVO } = await import('../../domain/value-objects/primitives/user-email.vo');
    const occurredAt = new Date().toISOString() as never;
    const event = new UserCreatedEvent(
      'user-1' as never,
      { userId: 'user-1' as never, email: UserEmailVO.of('john@example.com') },
      occurredAt,
    );

    const commands$ = saga.register(of(event));
    const emitted: unknown[] = [];
    await new Promise<void>((resolve) => {
      commands$.subscribe({
        next: (cmd) => emitted.push(cmd),
        complete: () => resolve(),
      });
    });

    // merge(welcome$, verify$) → 2 commands per event
    expect(emitted.length).toBe(2);
    expect(emitted.some((c) => (c as { type: string }).type === 'saga.send-welcome-email')).toBe(true);
    expect(emitted.some((c) => (c as { type: string }).type === 'saga.send-verification-email')).toBe(true);
  });
});
