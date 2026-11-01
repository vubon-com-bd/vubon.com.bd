/**
 * PaymentNotificationService — Unit Tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { PaymentNotificationService } from '@infrastructure/services/external/notification.service';
import { PaymentEmailService } from '@infrastructure/services/external/email.service';
import { PaymentSmsService } from '@infrastructure/services/external/sms.service';
import { PaymentPushService } from '@infrastructure/services/external/push.service';

function makeEmailMock() {
  return { send: jest.fn<() => Promise<boolean>>() };
}
function makeSmsMock() {
  return { send: jest.fn<() => Promise<boolean>>() };
}
function makePushMock() {
  return { send: jest.fn<() => Promise<boolean>>() };
}

describe('PaymentNotificationService', () => {
  let email: ReturnType<typeof makeEmailMock>;
  let sms: ReturnType<typeof makeSmsMock>;
  let push: ReturnType<typeof makePushMock>;
  let service: PaymentNotificationService;

  beforeEach(() => {
    email = makeEmailMock();
    sms = makeSmsMock();
    push = makePushMock();
    service = new PaymentNotificationService(
      email as unknown as PaymentEmailService,
      sms as unknown as PaymentSmsService,
      push as unknown as PaymentPushService,
    );
  });

  it('sends email + push by default (no email → skip email)', async () => {
    email.send.mockResolvedValue(true);
    push.send.mockResolvedValue(true);
    await service.notify({
      userId: 'usr-1',
      template: 'payment_success',
      data: { amount: 1000 },
    });
    expect(email.send).not.toHaveBeenCalled();
    expect(push.send).toHaveBeenCalled();
  });

  it('sends email when provided', async () => {
    email.send.mockResolvedValue(true);
    push.send.mockResolvedValue(true);
    await service.notify({
      userId: 'usr-1',
      email: 'a@example.com',
      template: 'payment_success',
      data: {},
    });
    expect(email.send).toHaveBeenCalledWith(
      expect.objectContaining({ to: 'a@example.com' }),
    );
    expect(push.send).toHaveBeenCalled();
  });

  it('sends SMS when phone provided and channel requested', async () => {
    email.send.mockResolvedValue(true);
    sms.send.mockResolvedValue(true);
    push.send.mockResolvedValue(true);
    await service.notify({
      userId: 'usr-1',
      email: 'a@example.com',
      phone: '+8801',
      template: 'payment_success',
      data: {},
      channels: ['email', 'sms', 'push'],
    });
    expect(email.send).toHaveBeenCalled();
    expect(sms.send).toHaveBeenCalledWith(
      expect.objectContaining({ to: '+8801' }),
    );
    expect(push.send).toHaveBeenCalled();
  });

  it('skips SMS when phone missing', async () => {
    push.send.mockResolvedValue(true);
    await service.notify({
      userId: 'usr-1',
      template: 'payment_success',
      data: {},
      channels: ['sms', 'push'],
    });
    expect(sms.send).not.toHaveBeenCalled();
    expect(push.send).toHaveBeenCalled();
  });

  it('skips email when email missing', async () => {
    push.send.mockResolvedValue(true);
    await service.notify({
      userId: 'usr-1',
      template: 'payment_success',
      data: {},
      channels: ['email', 'push'],
    });
    expect(email.send).not.toHaveBeenCalled();
  });

  it('handles partial failures without throwing', async () => {
    email.send.mockResolvedValue(false);
    push.send.mockResolvedValue(true);
    await expect(
      service.notify({
        userId: 'usr-1',
        email: 'a@example.com',
        template: 'payment_success',
        data: {},
      }),
    ).resolves.toBeUndefined();
    expect(email.send).toHaveBeenCalled();
    expect(push.send).toHaveBeenCalled();
  });

  it('handles rejected promise without throwing', async () => {
    email.send.mockRejectedValue(new Error('smtp fail'));
    push.send.mockResolvedValue(true);
    await expect(
      service.notify({
        userId: 'usr-1',
        email: 'a@example.com',
        template: 'payment_success',
        data: {},
      }),
    ).resolves.toBeUndefined();
  });

  it('respects explicit channels array', async () => {
    email.send.mockResolvedValue(true);
    sms.send.mockResolvedValue(true);
    push.send.mockResolvedValue(true);
    await service.notify({
      userId: 'usr-1',
      email: 'a@example.com',
      phone: '+8801',
      template: 'payment_success',
      data: {},
      channels: ['email'],
    });
    expect(email.send).toHaveBeenCalled();
    expect(sms.send).not.toHaveBeenCalled();
    expect(push.send).not.toHaveBeenCalled();
  });
});
