import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { OrderNotificationService } from '@infrastructure/services/external/order-notification.service';

describe('OrderNotificationService', () => {
  let service: OrderNotificationService;
  let mockEmail: { send: jest.Mock };
  let mockSms: { send: jest.Mock };
  let mockPush: { send: jest.Mock };

  beforeEach(() => {
    mockEmail = { send: jest.fn().mockResolvedValue({ success: true }) };
    mockSms = { send: jest.fn().mockResolvedValue({ success: true }) };
    mockPush = { send: jest.fn().mockResolvedValue({ success: true }) };
    service = new OrderNotificationService(
      mockEmail as never,
      mockSms as never,
      mockPush as never,
    );
  });

  it('notifyCustomer sends push notification', async () => {
    const result = await service.notifyCustomer({
      userId: 'user-1',
      orderId: 'order-1',
      template: 'order_created',
      data: { orderNumber: 'ORD-1' },
    });
    expect(result).toBe(true);
    expect(mockPush.send).toHaveBeenCalledWith(
      expect.objectContaining({
        deviceToken: 'user:user-1',
        title: 'Order created',
      }),
    );
  });

  it('notifyCustomer handles unknown template', async () => {
    await service.notifyCustomer({
      userId: 'user-1',
      orderId: 'order-1',
      template: 'unknown_template',
    });
    const call = mockPush.send.mock.calls[0][0] as { title: string };
    expect(call.title).toContain('unknown_template');
  });

  it('notifyCustomer returns false on push failure', async () => {
    mockPush.send.mockRejectedValue(new Error('fail'));
    const result = await service.notifyCustomer({
      userId: 'user-1',
      orderId: 'order-1',
      template: 'order_confirmed',
    });
    expect(result).toBe(false);
  });

  it('notifyAdmin sends email', async () => {
    const result = await service.notifyAdmin({
      userId: 'admin-1',
      orderId: 'order-1',
      template: 'order_shipped',
    });
    expect(result).toBe(true);
    expect(mockEmail.send).toHaveBeenCalledWith(
      expect.objectContaining({
        to: expect.stringContaining('admin+admin-1@vubon.com.bd'),
      }),
    );
  });

  it('notifyAdmin returns false on email failure', async () => {
    mockEmail.send.mockRejectedValue(new Error('fail'));
    const result = await service.notifyAdmin({
      userId: 'admin-1',
      orderId: 'order-1',
      template: 'order_shipped',
    });
    expect(result).toBe(false);
  });

  it('handles order_delivered template', async () => {
    await service.notifyCustomer({
      userId: 'u',
      orderId: 'o',
      template: 'order_delivered',
    });
    const call = mockPush.send.mock.calls[0][0] as { title: string };
    expect(call.title).toBe('Order delivered');
  });
});
