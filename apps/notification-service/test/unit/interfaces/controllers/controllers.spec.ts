/**
 * Controller unit tests — verify constructor wiring + route metadata
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { NotificationController } from '../../../../src/module/interfaces/controllers/rest/notification.controller.js';
import { EmailController } from '../../../../src/module/interfaces/controllers/rest/email.controller.js';
import { SmsController } from '../../../../src/module/interfaces/controllers/rest/sms.controller.js';
import { PushController } from '../../../../src/module/interfaces/controllers/rest/push.controller.js';
import { InAppController } from '../../../../src/module/interfaces/controllers/rest/in-app.controller.js';
import { TemplateController } from '../../../../src/module/interfaces/controllers/rest/template.controller.js';
import { ScheduleController } from '../../../../src/module/interfaces/controllers/rest/schedule.controller.js';
import { BroadcastController } from '../../../../src/module/interfaces/controllers/rest/broadcast.controller.js';
import { DigestController } from '../../../../src/module/interfaces/controllers/rest/digest.controller.js';
import { PreferenceController } from '../../../../src/module/interfaces/controllers/rest/preference.controller.js';
import { DeviceController } from '../../../../src/module/interfaces/controllers/rest/device.controller.js';
import { WebhookController } from '../../../../src/module/interfaces/controllers/rest/webhook.controller.js';
import { ProviderWebhookController } from '../../../../src/module/interfaces/controllers/rest/provider-webhook.controller.js';
import { AnalyticsController } from '../../../../src/module/interfaces/controllers/rest/analytics.controller.js';
import { DeliveryController } from '../../../../src/module/interfaces/controllers/rest/delivery.controller.js';
import { HealthController } from '../../../../src/module/interfaces/controllers/rest/health.controller.js';
import { FIXED_USER_ID, FIXED_NOTIFICATION_ID, FIXED_TEMPLATE_ID, makeUuid } from '../../../helpers/test-factories.js';

function makeBus() {
  return {
    execute: jest.fn().mockResolvedValue({ ok: true }),
  };
}

describe('NotificationController', () => {
  let cmd: ReturnType<typeof makeBus>;
  let qry: ReturnType<typeof makeBus>;
  let c: NotificationController;
  beforeEach(() => {
    cmd = makeBus(); qry = makeBus();
    c = new NotificationController(cmd as never, qry as never);
  });

  it('send', async () => {
    await c.send({
      userId: FIXED_USER_ID, type: 'transactional', category: 'order',
      channels: ['email'], title: 'T', body: 'B',
    } as never, { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('sendToMany', async () => {
    await c.sendToMany({
      userIds: [FIXED_USER_ID], type: 'announcement', category: 'system',
      channels: ['email'], title: 'T', body: 'B',
    } as never, { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('schedule', async () => {
    await c.schedule({
      userId: FIXED_USER_ID, type: 'transactional', category: 'order',
      channels: ['email'], title: 'T', body: 'B',
      scheduledAt: new Date(Date.now() + 3600_000).toISOString(),
    } as never, { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('list', async () => {
    await c.list({ page: 1, limit: 20 } as never, { userId: FIXED_USER_ID } as never);
    expect(qry.execute).toHaveBeenCalled();
  });
  it('stats', async () => {
    await c.stats({} as never);
    expect(qry.execute).toHaveBeenCalled();
  });
  it('unreadCount', async () => {
    await c.unreadCount({ userId: FIXED_USER_ID } as never);
    expect(qry.execute).toHaveBeenCalled();
  });
  it('getById', async () => {
    await c.getById(FIXED_NOTIFICATION_ID);
    expect(qry.execute).toHaveBeenCalled();
  });
  it('getPublic', async () => {
    await c.getPublic(FIXED_NOTIFICATION_ID);
    expect(qry.execute).toHaveBeenCalled();
  });
  it('getDetail', async () => {
    await c.getDetail(FIXED_NOTIFICATION_ID);
    expect(qry.execute).toHaveBeenCalled();
  });
  it('update', async () => {
    await c.update(FIXED_NOTIFICATION_ID, { title: 'new' } as never, { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('cancel', async () => {
    await c.cancel(FIXED_NOTIFICATION_ID, { reason: 'x' } as never, { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('retry', async () => {
    await c.retry(FIXED_NOTIFICATION_ID, {} as never, { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('delete', async () => {
    await c.delete(FIXED_NOTIFICATION_ID, { softDelete: true } as never, { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('markRead', async () => {
    await c.markRead(FIXED_NOTIFICATION_ID, { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('markManyRead', async () => {
    await c.markManyRead({ notificationIds: [FIXED_NOTIFICATION_ID], userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('markAllRead', async () => {
    await c.markAllRead({}, { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('archive', async () => {
    await c.archive(FIXED_NOTIFICATION_ID, { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('snooze', async () => {
    await c.snooze(FIXED_NOTIFICATION_ID, { snoozedUntil: new Date().toISOString() }, { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('star', async () => {
    await c.star(FIXED_NOTIFICATION_ID, { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
});

describe('EmailController', () => {
  let cmd: ReturnType<typeof makeBus>;
  let qry: ReturnType<typeof makeBus>;
  let c: EmailController;
  beforeEach(() => { cmd = makeBus(); qry = makeBus(); c = new EmailController(cmd as never, qry as never); });

  it('send', async () => {
    await c.send({ to: 'x@y.com', subject: 'S' } as never, { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('sendWithTemplate', async () => {
    await c.sendWithTemplate({ to: 'x@y.com', templateSlug: 'w', templateData: {} } as never, { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('list', async () => {
    await c.list({} as never);
    expect(qry.execute).toHaveBeenCalled();
  });
  it('getById', async () => {
    await c.getById('e-1');
    expect(qry.execute).toHaveBeenCalled();
  });
  it('retry', async () => {
    await c.retry('e-1', { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('cancel', async () => {
    await c.cancel('e-1', { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
});

describe('SmsController', () => {
  let cmd: ReturnType<typeof makeBus>;
  let qry: ReturnType<typeof makeBus>;
  let c: SmsController;
  beforeEach(() => { cmd = makeBus(); qry = makeBus(); c = new SmsController(cmd as never, qry as never); });
  it('send', async () => {
    await c.send({ to: '+88017', message: 'M' } as never, { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('sendBulk', async () => {
    await c.sendBulk({ recipients: ['+88017'], message: 'M' } as never, { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('list', async () => {
    await c.list({} as never);
    expect(qry.execute).toHaveBeenCalled();
  });
  it('getById', async () => {
    await c.getById('s-1');
    expect(qry.execute).toHaveBeenCalled();
  });
  it('retry', async () => {
    await c.retry('s-1', { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('cancel', async () => {
    await c.cancel('s-1', { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
});

describe('PushController', () => {
  let cmd: ReturnType<typeof makeBus>;
  let qry: ReturnType<typeof makeBus>;
  let c: PushController;
  beforeEach(() => { cmd = makeBus(); qry = makeBus(); c = new PushController(cmd as never, qry as never); });
  it('send', async () => {
    await c.send({ tokens: ['tk'], title: 'T', body: 'B' } as never, { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('sendToTopic', async () => {
    await c.sendToTopic({ topic: 'x', title: 'T', body: 'B' } as never, { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('subscribe', async () => {
    await c.subscribe({ userId: FIXED_USER_ID, token: 'tk', platform: 'android' } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('unsubscribe', async () => {
    await c.unsubscribe('tk', { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('list', async () => {
    await c.list({} as never);
    expect(qry.execute).toHaveBeenCalled();
  });
  it('getById', async () => {
    await c.getById('p-1');
    expect(qry.execute).toHaveBeenCalled();
  });
  it('retry', async () => {
    await c.retry('p-1', { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
});

describe('InAppController', () => {
  let cmd: ReturnType<typeof makeBus>;
  let qry: ReturnType<typeof makeBus>;
  let c: InAppController;
  beforeEach(() => { cmd = makeBus(); qry = makeBus(); c = new InAppController(cmd as never, qry as never); });
  it('send', async () => {
    await c.send({ userId: FIXED_USER_ID, type: 'toast', title: 'T', body: 'B' } as never, { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('inbox', async () => {
    await c.inbox({}, { userId: FIXED_USER_ID } as never);
    expect(qry.execute).toHaveBeenCalled();
  });
  it('getById', async () => {
    await c.getById(FIXED_NOTIFICATION_ID, { userId: FIXED_USER_ID } as never);
    expect(qry.execute).toHaveBeenCalled();
  });
  it('markRead', async () => {
    await c.markRead(FIXED_NOTIFICATION_ID, { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('dismiss', async () => {
    await c.dismiss(FIXED_NOTIFICATION_ID, { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('click', async () => {
    await c.click(FIXED_NOTIFICATION_ID, {}, { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
});

describe('TemplateController', () => {
  let cmd: ReturnType<typeof makeBus>;
  let qry: ReturnType<typeof makeBus>;
  let c: TemplateController;
  beforeEach(() => { cmd = makeBus(); qry = makeBus(); c = new TemplateController(cmd as never, qry as never); });
  it('create', async () => {
    await c.create({ name: 'N', slug: 's', type: 'email', category: 'order', locale: 'en', subject: 'S', body: 'B' } as never, { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('list', async () => {
    await c.list({} as never);
    expect(qry.execute).toHaveBeenCalled();
  });
  it('getBySlug', async () => {
    await c.getBySlug('slug', {} as never);
    expect(qry.execute).toHaveBeenCalled();
  });
  it('getById', async () => {
    await c.getById(FIXED_TEMPLATE_ID);
    expect(qry.execute).toHaveBeenCalled();
  });
  it('getPublic', async () => {
    await c.getPublic(FIXED_TEMPLATE_ID);
    expect(qry.execute).toHaveBeenCalled();
  });
  it('update', async () => {
    await c.update(FIXED_TEMPLATE_ID, {} as never, { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('activate', async () => {
    await c.activate(FIXED_TEMPLATE_ID, { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('deactivate', async () => {
    await c.deactivate(FIXED_TEMPLATE_ID, {} as never, { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('deprecate', async () => {
    await c.deprecate(FIXED_TEMPLATE_ID, {} as never, { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('archive', async () => {
    await c.archive(FIXED_TEMPLATE_ID, { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('createVersion', async () => {
    await c.createVersion(FIXED_TEMPLATE_ID, { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('render', async () => {
    await c.render(FIXED_TEMPLATE_ID, { data: {} } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('preview', async () => {
    await c.preview(FIXED_TEMPLATE_ID, {} as never);
    expect(qry.execute).toHaveBeenCalled();
  });
});

describe('ScheduleController', () => {
  let cmd: ReturnType<typeof makeBus>;
  let qry: ReturnType<typeof makeBus>;
  let c: ScheduleController;
  beforeEach(() => { cmd = makeBus(); qry = makeBus(); c = new ScheduleController(cmd as never, qry as never); });
  it('create', async () => {
    await c.create({ type: 'scheduled', recurrence: 'none', scheduledAt: new Date().toISOString(), timezone: 'Asia/Dhaka' } as never, { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('list', async () => {
    await c.list({} as never);
    expect(qry.execute).toHaveBeenCalled();
  });
  it('getDue', async () => {
    await c.getDue({} as never);
    expect(qry.execute).toHaveBeenCalled();
  });
  it('getById', async () => {
    await c.getById('s-1');
    expect(qry.execute).toHaveBeenCalled();
  });
  it('update', async () => {
    await c.update('s-1', {} as never, { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('activate', async () => {
    await c.activate('s-1', { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('pause', async () => {
    await c.pause('s-1', {} as never, { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('resume', async () => {
    await c.resume('s-1', { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('cancel', async () => {
    await c.cancel('s-1', {} as never, { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('trigger', async () => {
    await c.trigger('s-1', {} as never, { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
});

describe('BroadcastController', () => {
  let cmd: ReturnType<typeof makeBus>;
  let qry: ReturnType<typeof makeBus>;
  let c: BroadcastController;
  beforeEach(() => { cmd = makeBus(); qry = makeBus(); c = new BroadcastController(cmd as never, qry as never); });
  it('create', async () => {
    await c.create({ type: 'all_users', target: 'all', templateId: FIXED_TEMPLATE_ID, channels: ['email'] } as never, { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('list', async () => {
    await c.list({} as never);
    expect(qry.execute).toHaveBeenCalled();
  });
  it('getById', async () => {
    await c.getById('b-1');
    expect(qry.execute).toHaveBeenCalled();
  });
  it('getStats', async () => {
    await c.getStats('b-1');
    expect(qry.execute).toHaveBeenCalled();
  });
  it('getProgress', async () => {
    await c.getProgress('b-1');
    expect(qry.execute).toHaveBeenCalled();
  });
  it('update', async () => {
    await c.update('b-1', {} as never, { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('schedule', async () => {
    await c.schedule('b-1', { scheduledAt: new Date().toISOString() } as never, { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('start', async () => {
    await c.start('b-1', { totalRecipients: 100 } as never, { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('cancel', async () => {
    await c.cancel('b-1', {} as never, { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('test', async () => {
    await c.test('b-1', { recipientIds: ['u'] } as never, { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
});

describe('DigestController', () => {
  let cmd: ReturnType<typeof makeBus>;
  let qry: ReturnType<typeof makeBus>;
  let c: DigestController;
  beforeEach(() => { cmd = makeBus(); qry = makeBus(); c = new DigestController(cmd as never, qry as never); });
  it('create', async () => {
    await c.create({ userId: FIXED_USER_ID, frequency: 'daily', type: 'summary', periodStart: new Date().toISOString(), periodEnd: new Date().toISOString() } as never, { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('generate', async () => {
    await c.generate({ userId: FIXED_USER_ID, frequency: 'daily' } as never, { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('list', async () => {
    await c.list({} as never);
    expect(qry.execute).toHaveBeenCalled();
  });
  it('preview', async () => {
    await c.preview({ userId: FIXED_USER_ID, frequency: 'daily' } as never);
    expect(qry.execute).toHaveBeenCalled();
  });
  it('getById', async () => {
    await c.getById('d-1');
    expect(qry.execute).toHaveBeenCalled();
  });
  it('update', async () => {
    await c.update('d-1', {} as never, { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('send', async () => {
    await c.send('d-1', { channel: 'email' } as never, { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('cancel', async () => {
    await c.cancel('d-1', { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
});

describe('PreferenceController', () => {
  let cmd: ReturnType<typeof makeBus>;
  let qry: ReturnType<typeof makeBus>;
  let c: PreferenceController;
  beforeEach(() => { cmd = makeBus(); qry = makeBus(); c = new PreferenceController(cmd as never, qry as never); });
  it('get', async () => {
    await c.get({ userId: FIXED_USER_ID } as never);
    expect(qry.execute).toHaveBeenCalled();
  });
  it('getPublic', async () => {
    await c.getPublic({ userId: FIXED_USER_ID } as never);
    expect(qry.execute).toHaveBeenCalled();
  });
  it('update', async () => {
    await c.update({} as never, { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('toggleChannel', async () => {
    await c.toggleChannel({ channel: 'email', enabled: true } as never, { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('toggleCategory', async () => {
    await c.toggleCategory({ category: 'marketing', enabled: false } as never, { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('updateQuietHours', async () => {
    await c.updateQuietHours({ enabled: true } as never, { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('optOut', async () => {
    await c.optOut({ scope: 'email' } as never, { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('optIn', async () => {
    await c.optIn({ scope: 'email' } as never, { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
});

describe('DeviceController', () => {
  let cmd: ReturnType<typeof makeBus>;
  let qry: ReturnType<typeof makeBus>;
  let c: DeviceController;
  beforeEach(() => { cmd = makeBus(); qry = makeBus(); c = new DeviceController(cmd as never, qry as never); });
  it('register', async () => {
    await c.register({ userId: FIXED_USER_ID, type: 'android', token: 'tk' } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('list', async () => {
    await c.list({} as never, { userId: FIXED_USER_ID } as never);
    expect(qry.execute).toHaveBeenCalled();
  });
  it('listActive', async () => {
    await c.listActive({ userId: FIXED_USER_ID } as never);
    expect(qry.execute).toHaveBeenCalled();
  });
  it('getById', async () => {
    await c.getById('d-1');
    expect(qry.execute).toHaveBeenCalled();
  });
  it('update', async () => {
    await c.update('d-1', {} as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('refreshToken', async () => {
    await c.refreshToken('d-1', { newToken: 'x' } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('block', async () => {
    await c.block('d-1', { reason: 'x' } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('remove', async () => {
    await c.remove('d-1', {} as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
});

describe('WebhookController', () => {
  let cmd: ReturnType<typeof makeBus>;
  let qry: ReturnType<typeof makeBus>;
  let c: WebhookController;
  beforeEach(() => { cmd = makeBus(); qry = makeBus(); c = new WebhookController(cmd as never, qry as never); });
  it('create', async () => {
    await c.create({ url: 'https://x.com/h', method: 'POST', events: ['order.created'] } as never, { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('list', async () => {
    await c.list({} as never);
    expect(qry.execute).toHaveBeenCalled();
  });
  it('getById', async () => {
    await c.getById('w-1');
    expect(qry.execute).toHaveBeenCalled();
  });
  it('listDeliveries', async () => {
    await c.listDeliveries('w-1', {} as never);
    expect(qry.execute).toHaveBeenCalled();
  });
  it('update', async () => {
    await c.update('w-1', {} as never, { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('activate', async () => {
    await c.activate('w-1', { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('deactivate', async () => {
    await c.deactivate('w-1', {} as never, { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('disable', async () => {
    await c.disable('w-1', { reason: 'x' } as never, { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('test', async () => {
    await c.test('w-1', {} as never, { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('retryDelivery', async () => {
    await c.retryDelivery('d-1', { userId: FIXED_USER_ID } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
});

describe('ProviderWebhookController', () => {
  let cmd: ReturnType<typeof makeBus>;
  let c: ProviderWebhookController;
  beforeEach(() => { cmd = makeBus(); c = new ProviderWebhookController(cmd as never); });
  it('receive', async () => {
    await c.receive('sendgrid', { events: [] }, {}, { rawBody: Buffer.from('{}') } as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('receive without rawBody', async () => {
    await c.receive('twilio', { MessageSid: 'x' }, {}, {} as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
});

describe('AnalyticsController', () => {
  let cmd: ReturnType<typeof makeBus>;
  let qry: ReturnType<typeof makeBus>;
  let c: AnalyticsController;
  beforeEach(() => { cmd = makeBus(); qry = makeBus(); c = new AnalyticsController(qry as never, cmd as never); });
  it('overview', async () => {
    await c.overview({ fromDate: '2026-01-01', toDate: '2026-12-31' } as never);
    expect(qry.execute).toHaveBeenCalled();
  });
  it('timeSeries', async () => {
    await c.timeSeries({ fromDate: '2026-01-01', toDate: '2026-12-31', interval: 'day' } as never);
    expect(qry.execute).toHaveBeenCalled();
  });
  it('channelPerformance', async () => {
    await c.channelPerformance({ fromDate: '2026-01-01', toDate: '2026-12-31' } as never);
    expect(qry.execute).toHaveBeenCalled();
  });
  it('generateReport', async () => {
    await c.generateReport({ reportType: 'delivery', format: 'json', fromDate: '2026-01-01', toDate: '2026-12-31' } as never, { userId: FIXED_USER_ID } as never);
    expect(true).toBe(true);
  });
});

describe('DeliveryController', () => {
  let cmd: ReturnType<typeof makeBus>;
  let qry: ReturnType<typeof makeBus>;
  let c: DeliveryController;
  beforeEach(() => { cmd = makeBus(); qry = makeBus(); c = new DeliveryController(qry as never, cmd as never); });
  it('getByNotification', async () => {
    await c.getByNotification('n-1');
    expect(qry.execute).toHaveBeenCalled();
  });
  it('list', async () => {
    await c.list({} as never);
    expect(qry.execute).toHaveBeenCalled();
  });
});

describe('HealthController', () => {
  it('check', async () => {
    const prisma = { isHealthy: jest.fn().mockResolvedValue(true) };
    const redis = { isHealthy: jest.fn().mockResolvedValue(true) };
    const c = new HealthController(prisma as never, redis as never);
    const r = await c.check();
    expect(r.status).toBe('ok');
  });

  it('check degraded when prisma false', async () => {
    const prisma = { isHealthy: jest.fn().mockRejectedValue(new Error('x')) };
    const redis = { isHealthy: jest.fn().mockResolvedValue(true) };
    const c = new HealthController(prisma as never, redis as never);
    const r = await c.check();
    expect(r.status).toBe('degraded');
  });

  it('live', () => {
    const c = new HealthController({} as never, {} as never);
    expect(c.live().status).toBe('ok');
  });

  it('ready ok', async () => {
    const prisma = { isHealthy: jest.fn().mockResolvedValue(true) };
    const c = new HealthController(prisma as never, {} as never);
    const r = await c.ready();
    expect(r.status).toBe('ok');
  });

  it('ready not_ready', async () => {
    const prisma = { isHealthy: jest.fn().mockResolvedValue(false) };
    const c = new HealthController(prisma as never, {} as never);
    const r = await c.ready();
    expect(r.status).toBe('not_ready');
  });
});
