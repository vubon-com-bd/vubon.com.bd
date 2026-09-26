/**
 * AuthLoginSaga — Unit Tests
 * @module auth-service/application/sagas
 */
import { of } from 'rxjs';
import { AuthLoginSaga } from './auth-login.saga';
import { UserLoggedInEvent } from '../../domain/events/user.events';

describe('AuthLoginSaga', () => {
  let saga: AuthLoginSaga;
  beforeEach(() => { saga = new AuthLoginSaga(); });

  it('should have a name', () => expect(saga.name).toBe('AuthLoginSaga'));
  it('should have login() method', () => expect(typeof saga.login).toBe('function'));
  it('should have execute() method', () => expect(typeof saga.execute).toBe('function'));
  it('should have compensate() method', () => expect(typeof saga.compensate).toBe('function'));

  it('execute() resolves', async () => {
    await expect(saga.execute({})).resolves.toBeUndefined();
  });

  it('compensate() resolves', async () => {
    await expect(saga.compensate()).resolves.toBeUndefined();
  });

  it('login() returns Observable', () => {
    const result = saga.login(of());
    expect(typeof result.subscribe).toBe('function');
  });

  it('login() emits 2 commands on UserLoggedInEvent', async () => {
    const occurredAt = new Date().toISOString() as never;
    const event = new UserLoggedInEvent(
      'user-1' as never,
      { userId: 'user-1' as never, ipAddress: '1.1.1.1', userAgent: 'Mozilla' },
      occurredAt,
    );
    const commands$ = saga.login(of(event));
    const emitted: unknown[] = [];
    await new Promise<void>((resolve) => {
      commands$.subscribe({
        next: (cmd) => emitted.push(cmd),
        complete: () => resolve(),
      });
    });
    expect(emitted.length).toBe(2);
  });
});
