/**
 * AuthLoginSaga — Unit Tests
 * @module auth-service/application/sagas
 */
import { AuthLoginSaga } from './auth-login.saga';
import { of } from 'rxjs';
import { firstValueFrom } from 'rxjs';

describe('AuthLoginSaga', () => {
  let saga: AuthLoginSaga;

  beforeEach(() => {
    saga = new AuthLoginSaga();
  });

  it('should have a name', () => {
    expect(saga.name).toBe('AuthLoginSaga');
  });

  it('should have a login() subscription method', () => {
    expect(typeof saga.login).toBe('function');
  });

  it('should have execute() method', () => {
    expect(typeof saga.execute).toBe('function');
  });

  it('should have compensate() method', () => {
    expect(typeof saga.compensate).toBe('function');
  });

  it('execute() should resolve (reactive saga — no imperative step)', async () => {
    await expect(saga.execute({})).resolves.toBeUndefined();
  });

  it('compensate() should resolve (no compensation needed)', async () => {
    await expect(saga.compensate()).resolves.toBeUndefined();
  });

  it('login() should return an Observable', () => {
    const events$ = of();
    const result = saga.login(events$);
    expect(result).toBeDefined();
    expect(typeof result.subscribe).toBe('function');
  });

  it('login() should emit commands when UserLoggedInEvent is dispatched', async () => {
    const { UserLoggedInEvent } = await import('../../domain/events/user.events');
    const occurredAt = new Date().toISOString() as never;
    const event = new UserLoggedInEvent(
      'user-1' as never,
      { userId: 'user-1' as never, ipAddress: '1.1.1.1', userAgent: 'Mozilla' },
      occurredAt,
    );

    const events$ = of(event);
    const commands$ = saga.login(events$);

    const emitted: unknown[] = [];
    await new Promise<void>((resolve) => {
      commands$.subscribe({
        next: (cmd) => emitted.push(cmd),
        complete: () => resolve(),
      });
    });

    // merge(notify$, analytics$) → 2 commands per event
    expect(emitted.length).toBe(2);
    expect(emitted.some((c) => (c as { type: string }).type === 'saga.notify-login')).toBe(true);
    expect(emitted.some((c) => (c as { type: string }).type === 'saga.update-analytics')).toBe(true);
  });
});
