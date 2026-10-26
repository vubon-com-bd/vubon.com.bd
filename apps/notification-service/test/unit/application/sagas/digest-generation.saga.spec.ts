import { DigestGenerationSaga } from '@application/sagas/digest-generation.saga.js';
import { DigestGeneratedEvent, DigestSentEvent } from '@domain/events/digest.events.js';
import { UpdateAnalyticsCommand } from '@application/sagas/commands/update-analytics.command.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';
import { DATES } from '@domain-fixtures/dates.fixture.js';
import { of, firstValueFrom } from 'rxjs';
import { jest } from '@jest/globals';

describe('DigestGenerationSaga', () => {
  it('onGenerated emits analytics', async () => {
    const saga = new DigestGenerationSaga({ execute: jest.fn() } as never);
    const ev = new DigestGeneratedEvent({
      aggregateId: IDS.digestId,
      payload: { digestId: IDS.digestId, userId: IDS.userId, itemCount: 5, generatedAt: DATES.now },
    });
    const cmd = await firstValueFrom(saga.onGenerated(of(ev)));
    expect(cmd).toBeInstanceOf(UpdateAnalyticsCommand);
  });

  it('onSent emits analytics', async () => {
    const saga = new DigestGenerationSaga({ execute: jest.fn() } as never);
    const ev = new DigestSentEvent({
      aggregateId: IDS.digestId,
      payload: { digestId: IDS.digestId, userId: IDS.userId, itemCount: 5, sentAt: DATES.now },
    });
    const cmd = await firstValueFrom(saga.onSent(of(ev)));
    expect(cmd).toBeInstanceOf(UpdateAnalyticsCommand);
  });
});
