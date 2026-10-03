import { NotificationService } from '../../../../../src/module/infrastructure/services/external/notification.service.js';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    service = new NotificationService();
  });

  it('sendEmail() returns true', async () => {
    const result = await service.sendEmail({
      recipientId: 'u1',
      template: 'order_confirmed',
      to: 'c@example.com',
    });
    expect(result).toBe(true);
  });

  it('sendSms() returns true', async () => {
    const result = await service.sendSms({
      recipientId: 'u1',
      template: 'order_shipped',
      phone: '01700000000',
    });
    expect(result).toBe(true);
  });

  it('sendPush() returns true', async () => {
    const result = await service.sendPush({
      recipientId: 'u1',
      template: 'order_delivered',
    });
    expect(result).toBe(true);
  });
});
