/**
 * CartNotificationService — Unit Tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { CartNotificationService } from '@infrastructure/services/external/cart-notification.service.js';
import { TEST_IDS } from '@fixtures/index';

describe('CartNotificationService', () => {
  let service: CartNotificationService;
  let email: { sendAbandonedCartReminder: jest.Mock; sendPriceDropAlert: jest.Mock; sendBackInStockAlert: jest.Mock };
  let sms: { sendAbandonedCartReminder: jest.Mock; sendPriceDropAlert: jest.Mock };
  let push: { sendAbandonedCartReminder: jest.Mock; sendPriceDropAlert: jest.Mock; sendBackInStockAlert: jest.Mock };

  beforeEach(() => {
    email = {
      sendAbandonedCartReminder: jest.fn(async () => true),
      sendPriceDropAlert: jest.fn(async () => true),
      sendBackInStockAlert: jest.fn(async () => true),
    };
    sms = {
      sendAbandonedCartReminder: jest.fn(async () => true),
      sendPriceDropAlert: jest.fn(async () => true),
    };
    push = {
      sendAbandonedCartReminder: jest.fn(async () => true),
      sendPriceDropAlert: jest.fn(async () => true),
      sendBackInStockAlert: jest.fn(async () => true),
    };
    service = new CartNotificationService(email as never, sms as never, push as never);
  });

  // ═══════════════ ABANDONED CART ═══════════════

  describe('notifyAbandonedCart()', () => {
    const basePayload = {
      abandonedCartId: TEST_IDS.ABANDONED_CART_ID,
      userId: TEST_IDS.USER_ID,
      itemCount: 3,
      cartValue: 500,
      currency: 'BDT',
      reminderNumber: 1,
      ctaUrl: 'https://vubon.com.bd/cart',
    };

    it('should send email when email provided', async () => {
      const result = await service.notifyAbandonedCart({
        ...basePayload,
        email: 'customer@example.com',
      });
      expect(result.email).toBe(true);
      expect(email.sendAbandonedCartReminder).toHaveBeenCalled();
    });

    it('should NOT send email when email missing', async () => {
      const result = await service.notifyAbandonedCart({
        ...basePayload,
      });
      expect(result.email).toBe(false);
      expect(email.sendAbandonedCartReminder).not.toHaveBeenCalled();
    });

    it('should send SMS when phone provided and reminderNumber <= 2', async () => {
      const result = await service.notifyAbandonedCart({
        ...basePayload,
        phone: '+8801700000000',
        reminderNumber: 1,
      });
      expect(result.sms).toBe(true);
      expect(sms.sendAbandonedCartReminder).toHaveBeenCalled();
    });

    it('should NOT send SMS after reminder #2', async () => {
      const result = await service.notifyAbandonedCart({
        ...basePayload,
        phone: '+8801700000000',
        reminderNumber: 3,
      });
      expect(result.sms).toBe(false);
      expect(sms.sendAbandonedCartReminder).not.toHaveBeenCalled();
    });

    it('should send push when deviceToken provided', async () => {
      const result = await service.notifyAbandonedCart({
        ...basePayload,
        deviceToken: 'device-token-12345',
      });
      expect(result.push).toBe(true);
      expect(push.sendAbandonedCartReminder).toHaveBeenCalled();
    });

    it('should send all channels when all data provided', async () => {
      const result = await service.notifyAbandonedCart({
        ...basePayload,
        email: 'customer@example.com',
        phone: '+8801700000000',
        deviceToken: 'device-token-12345',
        reminderNumber: 1,
      });
      expect(result).toEqual({ email: true, sms: true, push: true });
    });

    it('should handle email failure gracefully', async () => {
      email.sendAbandonedCartReminder.mockResolvedValue(false);
      const result = await service.notifyAbandonedCart({
        ...basePayload,
        email: 'customer@example.com',
      });
      expect(result.email).toBe(false);
    });
  });

  // ═══════════════ PRICE DROP ═══════════════

  describe('notifyPriceDrop()', () => {
    it('should send email when email provided', async () => {
      await service.notifyPriceDrop({
        userId: TEST_IDS.USER_ID,
        email: 'customer@example.com',
        productCount: 2,
        savingsAmount: 100,
        currency: 'BDT',
        ctaUrl: 'https://vubon.com.bd/cart',
      });
      expect(email.sendPriceDropAlert).toHaveBeenCalled();
    });

    it('should send push when deviceToken provided', async () => {
      await service.notifyPriceDrop({
        userId: TEST_IDS.USER_ID,
        deviceToken: 'device-token-12345',
        productCount: 2,
        savingsAmount: 100,
        currency: 'BDT',
        ctaUrl: 'https://vubon.com.bd/cart',
      });
      expect(push.sendPriceDropAlert).toHaveBeenCalled();
    });

    it('should do nothing when no contact info', async () => {
      await service.notifyPriceDrop({
        userId: TEST_IDS.USER_ID,
        productCount: 2,
        savingsAmount: 100,
        currency: 'BDT',
        ctaUrl: 'https://vubon.com.bd/cart',
      });
      expect(email.sendPriceDropAlert).not.toHaveBeenCalled();
      expect(push.sendPriceDropAlert).not.toHaveBeenCalled();
    });
  });

  // ═══════════════ BACK IN STOCK ═══════════════

  describe('notifyBackInStock()', () => {
    it('should send email when email provided', async () => {
      await service.notifyBackInStock({
        email: 'customer@example.com',
        productId: TEST_IDS.PRODUCT_ID,
        productName: 'Widget',
        ctaUrl: 'https://vubon.com.bd/product',
      });
      expect(email.sendBackInStockAlert).toHaveBeenCalled();
    });

    it('should send push when deviceToken provided', async () => {
      await service.notifyBackInStock({
        deviceToken: 'device-token-12345',
        productId: TEST_IDS.PRODUCT_ID,
        productName: 'Widget',
        ctaUrl: 'https://vubon.com.bd/product',
      });
      expect(push.sendBackInStockAlert).toHaveBeenCalled();
    });
  });
});
