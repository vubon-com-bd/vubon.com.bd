import { UnsubscribeSaga } from '@application/sagas/unsubscribe.saga.js';
import { NotificationUnsubscribedEvent } from '@domain/events/action.events.js';
import { UpdateAnalyticsCommand } from '@application/sagas/commands/update-analytics.command.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';
import { DATES } from '@domain-fixtures/dates.fixture.js';
import { of, firstValueFrom } from 'rxjs';
import { jest } from '@jest/globals';

describe('UnsubscribeSaga', () => {
  it('emits analytics', async () => {
    const saga = new UnsubscribeSaga({ execute: jest.fn() } as never);
    const ev = new NotificationUnsubscribedEvent({
      aggregateId: IDS.notificationId,
      payload: {
        notificationId: IDS.notificationId, userId: IDS.userId,
        category: 'promotion', channel: 'email', unsubscribedAt: DATES.now,
      },
    });
    const cmd = await firstValueFrom(saga.onUnsubscribed(of(ev)));
    expect(cmd).toBeInstanceOf(UpdateAnalyticsCommand);
  });
});
