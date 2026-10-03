import { ShippingProviderService } from '../../../../../src/module/infrastructure/services/external/shipping-provider.service.js';

describe('ShippingProviderService', () => {
  let service: ShippingProviderService;

  beforeEach(() => {
    service = new ShippingProviderService();
  });

  it('createShipment() returns shipment + tracking', async () => {
    const result = await service.createShipment('order-1');
    expect(result.success).toBe(true);
    expect(result.shipmentId).toBeTruthy();
    expect(result.trackingNumber).toMatch(/^TRK-/);
  });

  it('createShipment() accepts courierId', async () => {
    const result = await service.createShipment('order-1', 'courier-x');
    expect(result.success).toBe(true);
  });

  it('cancelShipment() returns true', async () => {
    expect(await service.cancelShipment('shp-1')).toBe(true);
  });

  it('trackShipment() returns status', async () => {
    const result = await service.trackShipment('TRK-AAAA1111');
    expect(result.status).toBe('in_transit');
  });
});
