/**
 * UserOnboardingSaga — deep coverage
 *
 * NOTE: mergeMap flatMap করে array কে আলাদা emission করে।
 * তাই firstValueFrom শুধু প্রথম command পায়।
 * আমরা toArray() দিয়ে সব emission collect করি।
 */
import { of, firstValueFrom, toArray } from 'rxjs';
import { UserOnboardingSaga } from '@application/sagas/user-onboarding.saga';
import { ProfileUpdatedEvent } from '@domain/events/user-profile.events';
import { SendProfileCompleteEmailCommand } from '@application/sagas/commands/send-profile-complete-email.command';
import { UpdateAnalyticsCommand } from '@application/sagas/commands/update-analytics.command';

describe('UserOnboardingSaga — deep', () => {
  let saga: UserOnboardingSaga;

  beforeEach(() => {
    saga = new UserOnboardingSaga();
  });

  const buildProfileEvent = (fields: readonly string[]) =>
    new ProfileUpdatedEvent({
      id: 'e-1',
      aggregateId: 'p-1',
      payload: { userId: 'u-1', changedFields: fields },
      occurredAt: { epochMs: Date.now(), timezone: 'UTC' } as never,
      version: 1,
    });

  it('emits UpdateAnalytics + SendProfileComplete when fields present', async () => {
    const commands = await firstValueFrom(
      saga.profileCompleted(of(buildProfileEvent(['bio', 'avatar']))).pipe(toArray())
    );
    expect(commands.length).toBe(2);
    expect(commands[0]).toBeInstanceOf(UpdateAnalyticsCommand);
    expect(commands[1]).toBeInstanceOf(SendProfileCompleteEmailCommand);
  });

  it('emits only analytics when no fields', async () => {
    const commands = await firstValueFrom(
      saga.profileCompleted(of(buildProfileEvent([]))).pipe(toArray())
    );
    expect(commands.length).toBe(1);
    expect(commands[0]).toBeInstanceOf(UpdateAnalyticsCommand);
  });

  it('profileCompleted emits at least one command', async () => {
    const commands = await firstValueFrom(
      saga.profileCompleted(of(buildProfileEvent(['name']))).pipe(toArray())
    );
    expect(commands.length).toBeGreaterThanOrEqual(1);
  });
});
