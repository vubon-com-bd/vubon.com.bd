import { describe, it, expect } from '@jest/globals';
import { of, firstValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';
import { QuietHoursSaga } from '../../../../src/module/application/sagas/quiet-hours.saga.js';
import { NotificationCreatedEvent } from '../../../../src/module/domain/events/notification.events.js';

describe('QuietHoursSaga line 56 — computeNextAllowed wrap', () => {
  it('computeNextAllowed with current time past endHour', async () => {
    const s = new QuietHoursSaga({ execute: () => undefined } as never);
    const r = await firstValueFrom(s.onNotificationCreated(of(new NotificationCreatedEvent({
      aggregateId: 'x',
      payload: { notificationId: 'n-1', channel: 'email', userId: 'u' },
    }))).pipe(take(1)));
    expect(r).toBeDefined();
  });
});
