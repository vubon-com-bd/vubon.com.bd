/**
 * AuthRegisterSaga — Unit Tests
 * @module auth-service/application/sagas
 */
import { of } from 'rxjs';
import { AuthRegisterSaga } from './auth-register.saga';
import { UserCreatedEvent } from '../../domain/events/user.events';
import { UserEmailVO } from '../../domain/value-objects/primitives/user-email.vo';

describe('AuthRegisterSaga', () => {
  let saga: AuthRegisterSaga;
  beforeEach(() => { saga = new AuthRegisterSaga(); });

  it('should have a name', () => expect(saga.name).toBe('AuthRegisterSaga'));
  it('should have register() method', () => expect(typeof saga.register).toBe('function'));

  it('execute() and compensate() resolve', async () => {
    await expect(saga.execute({})).resolves.toBeUndefined();
    await expect(saga.compensate()).resolves.toBeUndefined();
  });

  it('register() emits 2 commands on UserCreatedEvent', async () => {
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
    expect(emitted.length).toBe(2);
  });
});
