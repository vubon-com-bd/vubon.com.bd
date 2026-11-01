import { QuietHoursSaga } from '@application/sagas/quiet-hours.saga.js';
import { NotificationCreatedEvent } from '@domain/events/notification.events.js';
import { CleanupExpiredCommand } from '@application/sagas/commands/cleanup-expired.command.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';
import { DATES } from '@domain-fixtures/dates.fixture.js';
import { of, firstValueFrom } from 'rxjs';
import { jest } from '@jest/globals';

describe('QuietHoursSaga', () => {
  it('emits CleanupExpiredCommand on created', async () => {
    const saga = new QuietHoursSaga({ execute: jest.fn() } as never);
    const ev = new NotificationCreatedEvent({
      aggregateId: IDS.notificationId,
      payload: {
        notificationId: IDS.notificationId, userId: IDS.userId,
        type: 'transactional', category: 'system', channel: 'email',
        priority: 'normal', createdAt: DATES.now,
      },
    });
    const cmd = await firstValueFrom(saga.onCreated(of(ev)));
    expect(cmd).toBeInstanceOf(CleanupExpiredCommand);
  });
});
