import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { ShippingService } from '@infrastructure/external/shipping/shipping.service';

describe('ShippingService', () => {
  let service: ShippingService;
  let originalFetch: typeof global.fetch;

  beforeEach(() => {
    originalFetch = global.fetch;
    service = new ShippingService();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('createShipment sends POST', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        trackingNumber: 'TRK-1',
        shipmentId: 'ship-1',
      }),
    } as Response);

    const result = await service.createShipment({
      orderId: 'order-1',
      courierId: 'courier-1',
      warehouseId: 'wh-1',
      recipientName: 'John',
      recipientPhone: '+8801700000000',
      recipientAddress: 'Dhaka',
      weightKg: 1.5,
    });

    expect(result.success).toBe(true);
    expect(result.trackingNumber).toBe('TRK-1');
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/shipments'),
      expect.objectContaining({ method: 'POST' }),
    );
  });

  it('createShipment handles error', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 400,
      json: async () => ({}),
    } as Response);

    const result = await service.createShipment({
      orderId: 'order-1',
      courierId: 'courier-1',
      warehouseId: 'wh-1',
      recipientName: 'John',
      recipientPhone: '+8801700000000',
      recipientAddress: 'Dhaka',
      weightKg: 1.5,
    });

    expect(result.success).toBe(false);
    expect(result.error).toContain('400');
  });

  it('cancelShipment sends POST', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true } as Response);
    const result = await service.cancelShipment('TRK-1');
    expect(result.success).toBe(true);
  });

  it('cancelShipment handles error', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 404,
    } as Response);
    const result = await service.cancelShipment('TRK-1');
    expect(result.success).toBe(false);
  });

  it('isHealthy returns true when 200', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true } as Response);
    expect(await service.isHealthy()).toBe(true);
  });

  it('isHealthy returns false on error', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('down'));
    expect(await service.isHealthy()).toBe(false);
  });
});
