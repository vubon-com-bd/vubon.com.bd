/**
 * CartAnalyticsService — Unit Tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { CartAnalyticsService } from '@infrastructure/services/external/cart-analytics.service.js';
import { TEST_IDS } from '@fixtures/index';

describe('CartAnalyticsService', () => {
  let service: CartAnalyticsService;
  let queue: { enqueueEvent: jest.Mock };

  beforeEach(() => {
    queue = { enqueueEvent: jest.fn(async () => 'job-id') };
    service = new CartAnalyticsService(queue as never);
  });

  // ═══════════════ track ═══════════════

  describe('track()', () => {
    it('should enqueue analytics event', async () => {
      await service.track('custom.event', TEST_IDS.CART_ID, { foo: 'bar' });
      expect(queue.enqueueEvent).toHaveBeenCalledWith({
        eventName: 'custom.event',
        aggregateId: TEST_IDS.CART_ID,
        data: { foo: 'bar' },
      });
    });

    it('should default data to empty', async () => {
      await service.track('custom.event', TEST_IDS.CART_ID);
      expect(queue.enqueueEvent).toHaveBeenCalledWith({
        eventName: 'custom.event',
        aggregateId: TEST_IDS.CART_ID,
        data: {},
      });
    });

    it('should not throw on failure', async () => {
      queue.enqueueEvent.mockRejectedValue(new Error('Queue down'));
      await expect(service.track('custom.event', TEST_IDS.CART_ID)).resolves.toBeUndefined();
    });
  });

  // ═══════════════ specific event helpers ═══════════════

  describe('trackCartCreated()', () => {
    it('should track cart.created event', async () => {
      await service.trackCartCreated(TEST_IDS.CART_ID, 'user');
      expect(queue.enqueueEvent).toHaveBeenCalledWith({
        eventName: 'cart.created',
        aggregateId: TEST_IDS.CART_ID,
        data: { type: 'user' },
      });
    });
  });

  describe('trackItemAdded()', () => {
    it('should track cart.item.added event', async () => {
      await service.trackItemAdded(TEST_IDS.CART_ID, TEST_IDS.PRODUCT_ID, 2);
      expect(queue.enqueueEvent).toHaveBeenCalledWith({
        eventName: 'cart.item.added',
        aggregateId: TEST_IDS.CART_ID,
        data: { productId: TEST_IDS.PRODUCT_ID, quantity: 2 },
      });
    });
  });

  describe('trackCheckout()', () => {
    it('should track cart.checkout event', async () => {
      await service.trackCheckout(TEST_IDS.CART_ID, 'ORDER-123', 500);
      expect(queue.enqueueEvent).toHaveBeenCalledWith({
        eventName: 'cart.checkout',
        aggregateId: TEST_IDS.CART_ID,
        data: { orderId: 'ORDER-123', total: 500 },
      });
    });
  });

  describe('trackAbandoned()', () => {
    it('should track cart.abandoned event', async () => {
      await service.trackAbandoned(TEST_IDS.CART_ID, 3, 500);
      expect(queue.enqueueEvent).toHaveBeenCalledWith({
        eventName: 'cart.abandoned',
        aggregateId: TEST_IDS.CART_ID,
        data: { itemCount: 3, cartValue: 500 },
      });
    });
  });

  describe('trackRecovered()', () => {
    it('should track cart.recovered event', async () => {
      await service.trackRecovered(TEST_IDS.ABANDONED_CART_ID, 'ORDER-456');
      expect(queue.enqueueEvent).toHaveBeenCalledWith({
        eventName: 'cart.recovered',
        aggregateId: TEST_IDS.ABANDONED_CART_ID,
        data: { orderId: 'ORDER-456' },
      });
    });
  });
});
