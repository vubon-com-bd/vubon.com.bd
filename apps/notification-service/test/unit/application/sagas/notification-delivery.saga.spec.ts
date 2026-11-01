import { NotificationDeliverySaga } from '@application/sagas/notification-delivery.saga.js';
import { NotificationCreatedEvent, NotificationSentEvent, NotificationDeliveredEvent } from '@domain/events/notification.events.js';
import { SendEmailCommand } from '@application/commands/email/send-email.command.js';
import { UpdateAnalyticsCommand } from '@application/sagas/commands/update-analytics.command.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';
import { DATES } from '@domain-fixtures/dates.fixture.js';
import { of, firstValueFrom } from 'rxjs';
import { jest } from '@jest/globals';

function makeSaga() {
  const bus = { execute: jest.fn().mockResolvedValue(undefined) };
  return { saga: new NotificationDeliverySaga(bus as never), bus };
}

describe('NotificationDeliverySaga', () => {
  it('onCreated emits SendEmailCommand + fires analytics', async () => {
    const { saga, bus } = makeService();
    const ev = new NotificationCreatedEvent({
      aggregateId: IDS.notificationId,
      payload: {
        notificationId: IDS.notificationId, userId: IDS.userId,
        type: 'transactional', category: 'system', channel: 'email',
        priority: 'normal', createdAt: DATES.now,
      },
    });
    const cmd = await firstValueFrom(saga.onCreated(of(ev)));
    expect(cmd).toBeInstanceOf(SendEmailCommand);
    expect(bus.execute).toHaveBeenCalled();
    // First call = analytics, second = email
    expect(bus.execute.mock.calls[0]![0]).toBeInstanceOf(UpdateAnalyticsCommand);
  });

  it('onSent emits UpdateAnalyticsCommand', async () => {
    const { saga, bus } = makeService();
    const ev = new NotificationSentEvent({
      aggregateId: IDS.notificationId,
      payload: { notificationId: IDS.notificationId, channel: 'email', providerName: 'sendgrid', sentAt: DATES.now },
    });
    const cmd = await firstValueFrom(saga.onSent(of(ev)));
    expect(cmd).toBeInstanceOf(UpdateAnalyticsCommand);
    expect(bus.execute).toHaveBeenCalled();
  });

  it('onDelivered emits UpdateAnalyticsCommand', async () => {
    const { saga } = makeService();
    const ev = new NotificationDeliveredEvent({
      aggregateId: IDS.notificationId,
      payload: { notificationId: IDS.notificationId, deliveredAt: DATES.now },
    });
    const cmd = await firstValueFrom(saga.onDelivered(of(ev)));
    expect(cmd).toBeInstanceOf(UpdateAnalyticsCommand);
  });
});

function makeService() {
  return makeSaga();
}
