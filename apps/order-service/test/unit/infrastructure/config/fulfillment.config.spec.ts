import { FULFILLMENT_CONFIG } from '../../../../src/module/infrastructure/config/fulfillment.config.js';
import { ORDER_FULFILLMENT } from '@vubon/shared-constants/business/order';

describe('FULFILLMENT_CONFIG', () => {
  it('exposes MAX_ITEMS_PER_SHIPMENT', () => {
    expect(FULFILLMENT_CONFIG.MAX_ITEMS_PER_SHIPMENT).toBe(
      ORDER_FULFILLMENT.MAX_ITEMS_PER_SHIPMENT,
    );
  });

  it('frozen', () => {
    expect(Object.isFrozen(FULFILLMENT_CONFIG)).toBe(true);
  });
});
