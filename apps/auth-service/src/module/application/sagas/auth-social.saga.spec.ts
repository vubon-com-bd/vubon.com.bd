/**
 * AuthSocialSaga — Unit Tests
 * @module auth-service/application/sagas
 */
import { AuthSocialSaga } from './auth-social.saga';
import { of } from 'rxjs';

describe('AuthSocialSaga', () => {
  let saga: AuthSocialSaga;

  beforeEach(() => {
    saga = new AuthSocialSaga();
  });

  it('should have a name', () => {
    expect(saga.name).toBe('AuthSocialSaga');
  });

  it('should have socialLinked() subscription method', () => {
    expect(typeof saga.socialLinked).toBe('function');
  });

  it('should have execute() and compensate()', () => {
    expect(typeof saga.execute).toBe('function');
    expect(typeof saga.compensate).toBe('function');
  });

  it('execute() and compensate() resolve', async () => {
    await expect(saga.execute({})).resolves.toBeUndefined();
    await expect(saga.compensate()).resolves.toBeUndefined();
  });

  it('socialLinked() emits analytics command on SocialLinkedEvent', async () => {
    const { SocialLinkedEvent } = await import('../../domain/events/auth-social.events');
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
    expect((emitted[0] as { type: string }).type).toBe('saga.update-analytics');
  });
});
