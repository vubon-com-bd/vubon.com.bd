import { BroadcastProcessingSaga } from '@application/sagas/broadcast-processing.saga.js';
import { BroadcastStartedEvent, BroadcastCompletedEvent } from '@domain/events/broadcast.events.js';
import { SendNotificationCommand } from '@application/commands/notification/send-notification.command.js';
import { UpdateAnalyticsCommand } from '@application/sagas/commands/update-analytics.command.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';
import { DATES } from '@domain-fixtures/dates.fixture.js';
import { of, firstValueFrom } from 'rxjs';
import { jest } from '@jest/globals';

describe('BroadcastProcessingSaga', () => {
  it('onStarted fires analytics + SendNotificationCommand', async () => {
    const bus = { execute: jest.fn().mockResolvedValue(undefined) };
    const saga = new BroadcastProcessingSaga(bus as never);
    const ev = new BroadcastStartedEvent({
      aggregateId: IDS.broadcastId,
      payload: { broadcastId: IDS.broadcastId, startedAt: DATES.now, recipientCount: 1000 },
    });
    const cmd = await firstValueFrom(saga.onStarted(of(ev)));
    expect(cmd).toBeInstanceOf(SendNotificationCommand);
    expect(bus.execute.mock.calls[0]![0]).toBeInstanceOf(UpdateAnalyticsCommand);
  });

  it('onCompleted emits UpdateAnalyticsCommand', async () => {
    const saga = new BroadcastProcessingSaga({ execute: jest.fn() } as never);
    const ev = new BroadcastCompletedEvent({
      aggregateId: IDS.broadcastId,
      payload: {
        broadcastId: IDS.broadcastId, completedAt: DATES.now,
        recipientCount: 100, sentCount: 90, failedCount: 10,
      },
    });
    const cmd = await firstValueFrom(saga.onCompleted(of(ev)));
    expect(cmd).toBeInstanceOf(UpdateAnalyticsCommand);
  });
});
