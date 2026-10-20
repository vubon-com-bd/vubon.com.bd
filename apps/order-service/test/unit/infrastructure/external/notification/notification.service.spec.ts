import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { NotificationService } from '@infrastructure/external/notification/notification.service';

describe('NotificationService', () => {
  let service: NotificationService;
  let mockEmail: { send: jest.Mock };
  let mockSms: { send: jest.Mock };
  let mockPush: { send: jest.Mock };

  beforeEach(() => {
    mockEmail = { send: jest.fn().mockResolvedValue({ success: true }) };
    mockSms = { send: jest.fn().mockResolvedValue({ success: true }) };
    mockPush = { send: jest.fn().mockResolvedValue({ success: true }) };
    service = new NotificationService(
      mockEmail as never,
      mockSms as never,
      mockPush as never,
    );
  });

  it('sends push by default', async () => {
    const result = await service.send({
      userId: 'user-1',
      title: 'Order',
      body: 'Confirmed',
    });
    expect(result.push).toBe(true);
    expect(mockPush.send).toHaveBeenCalled();
    expect(mockEmail.send).not.toHaveBeenCalled();
    expect(mockSms.send).not.toHaveBeenCalled();
  });

  it('sends all channels when specified', async () => {
    const result = await service.send({
      userId: 'user-1',
      title: 'Order',
      body: 'Confirmed',
      channels: ['email', 'sms', 'push'],
    });
    expect(result.email).toBe(true);
    expect(result.sms).toBe(true);
    expect(result.push).toBe(true);
    expect(mockEmail.send).toHaveBeenCalled();
    expect(mockSms.send).toHaveBeenCalled();
    expect(mockPush.send).toHaveBeenCalled();
  });

  it('handles push failure gracefully', async () => {
    mockPush.send.mockRejectedValue(new Error('push failed'));
    const result = await service.send({
      userId: 'user-1',
      title: 'Order',
      body: 'Confirmed',
      channels: ['push'],
    });
    expect(result.push).toBeUndefined();
  });

  it('continues with other channels when one fails', async () => {
    mockSms.send.mockRejectedValue(new Error('sms failed'));
    const result = await service.send({
      userId: 'user-1',
      title: 'Order',
      body: 'Confirmed',
      channels: ['email', 'sms', 'push'],
    });
    expect(result.email).toBe(true);
    expect(result.sms).toBeUndefined();
    expect(result.push).toBe(true);
  });

  it('passes metadata to push data', async () => {
    await service.send({
      userId: 'user-1',
      title: 'T',
      body: 'B',
      channels: ['push'],
      metadata: { orderId: 'order-1' },
    });
    const call = mockPush.send.mock.calls[0][0] as { data: { orderId: string } };
    expect(call.data.orderId).toBe('order-1');
  });
});
