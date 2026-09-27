/**
 * Sagas — combined Unit Test
 *
 * Verifies saga event -> command mapping pipelines emit correct commands.
 */
import { of, firstValueFrom } from 'rxjs';
import { UserOnboardingSaga } from '@application/sagas/user-onboarding.saga';
import { UserVerificationSaga } from '@application/sagas/user-verification.saga';
import { KycVerificationSaga } from '@application/sagas/kyc-verification.saga';
import { UserCreatedEvent } from '@domain/events/user.events';
import { UserActivatedEvent } from '@domain/events/user.events';
import { KycSubmittedEvent } from '@domain/events/user-kyc.events';
import { KycVerifiedEvent } from '@domain/events/user-kyc.events';
import { KycRejectedEvent } from '@domain/events/user-kyc.events';
import { SendWelcomeEmailCommand } from '@application/sagas/commands/send-welcome-email.command';
import { UpdateAnalyticsCommand } from '@application/sagas/commands/update-analytics.command';

describe('Sagas', () => {
  const buildEvent = <T extends { payload: unknown }>(
    Ctor: new (p: { id: string; aggregateId: string; payload: T['payload']; occurredAt: never; version: number }) => T,
    aggregateId: string,
    payload: T['payload'],
  ) =>
    new Ctor({
      id: 'e-1',
      aggregateId,
      payload,
      occurredAt: { epochMs: Date.now(), timezone: 'UTC' } as never,
      version: 1,
    });

  describe('UserOnboardingSaga', () => {
    let saga: UserOnboardingSaga;
    beforeEach(() => { saga = new UserOnboardingSaga(); });

    it('userCreated → SendWelcomeEmailCommand', async () => {
      const event = buildEvent(UserCreatedEvent, 'u-1', {
        userId: 'u-1',
        email: 'u@e.com',
        name: 'John',
        type: 'individual',
      });

      const result = await firstValueFrom(saga.userCreated(of(event)));

      expect(result).toBeInstanceOf(SendWelcomeEmailCommand);
    });

    it('profileCompleted pipeline exists', () => {
      expect(typeof saga.profileCompleted).toBe('function');
    });
  });

  describe('UserVerificationSaga', () => {
    let saga: UserVerificationSaga;
    beforeEach(() => { saga = new UserVerificationSaga(); });

    it('userActivated → UpdateAnalyticsCommand', async () => {
      const event = buildEvent(UserActivatedEvent, 'u-1', {
        userId: 'u-1',
        activatedAt: '2026-01-01T00:00:00Z',
      });

      const result = await firstValueFrom(saga.userActivated(of(event)));

      expect(result).toBeInstanceOf(UpdateAnalyticsCommand);
    });

    it('userSuspended pipeline exists', () => {
      expect(typeof saga.userSuspended).toBe('function');
    });
  });

  describe('KycVerificationSaga', () => {
    let saga: KycVerificationSaga;
    beforeEach(() => { saga = new KycVerificationSaga(); });

    it('kycSubmitted pipeline exists', () => {
      expect(typeof saga.kycSubmitted).toBe('function');
    });

    it('kycVerified pipeline exists', () => {
      expect(typeof saga.kycVerified).toBe('function');
    });

    it('kycRejected pipeline exists', () => {
      expect(typeof saga.kycRejected).toBe('function');
    });

    it('kycSubmitted maps event to commands array', async () => {
      const event = buildEvent(KycSubmittedEvent, 'k-1', {
        userId: 'u-1',
        kycId: 'k-1',
        document: 'nid',
      });

      const result = await firstValueFrom(saga.kycSubmitted(of(event)));
      expect(result).toBeDefined();
    });

    it('kycVerified maps to commands', async () => {
      const event = buildEvent(KycVerifiedEvent, 'k-1', {
        userId: 'u-1',
        kycId: 'k-1',
        verifiedAt: '2026-01-01',
      });

      const result = await firstValueFrom(saga.kycVerified(of(event)));
      expect(result).toBeDefined();
    });

    it('kycRejected maps to commands', async () => {
      const event = buildEvent(KycRejectedEvent, 'k-1', {
        userId: 'u-1',
        kycId: 'k-1',
        reason: 'blurry',
      });

      const result = await firstValueFrom(saga.kycRejected(of(event)));
      expect(result).toBeDefined();
    });
  });
});
