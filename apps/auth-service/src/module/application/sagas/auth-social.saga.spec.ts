/**
 * AuthSocialSaga — Unit Tests
 * @module auth-service/application/sagas
 */
import { of } from 'rxjs';
import { AuthSocialSaga } from './auth-social.saga';
import { SocialLinkedEvent } from '../../domain/events/auth-social.events';

describe('AuthSocialSaga', () => {
  let saga: AuthSocialSaga;
  beforeEach(() => { saga = new AuthSocialSaga(); });

  it('should have a name', () => expect(saga.name).toBe('AuthSocialSaga'));
  it('should have socialLinked() method', () => expect(typeof saga.socialLinked).toBe('function'));

  it('execute() and compensate() resolve', async () => {
    await expect(saga.execute({})).resolves.toBeUndefined();
    await expect(saga.compensate()).resolves.toBeUndefined();
  });

  it('socialLinked() emits 1 command', async () => {
    const occurredAt = new Date().toISOString() as never;
    const event = new SocialLinkedEvent(
      'soc-1',
      { userId: 'user-1' as never, provider: 'google', providerUserId: 'g-123' },
      occurredAt,
    );
    const commands$ = saga.socialLinked(of(event));
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
