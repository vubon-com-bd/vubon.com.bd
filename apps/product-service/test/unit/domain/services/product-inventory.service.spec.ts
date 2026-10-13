/**
 * ProductInventoryService (Domain) — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { ProductInventoryService } from '../../../../src/module/domain/services/product-inventory.service.js';

describe('ProductInventoryService (Domain)', () => {
  describe('checkAvailability()', () => {
    it('returns available = quantity - reserved', () => {
      const r = ProductInventoryService.checkAvailability({ quantity: 100, reserved: 20 });
      expect(r.available).toBe(80);
      expect(r.canFulfill).toBe(true);
      expect(r.isOutOfStock).toBe(false);
    });

    it('out of stock when available = 0', () => {
      const r = ProductInventoryService.checkAvailability({ quantity: 10, reserved: 10 });
      expect(r.available).toBe(0);
      expect(r.isOutOfStock).toBe(true);
    });

    it('isLow when available <= 10', () => {
      const r = ProductInventoryService.checkAvailability({ quantity: 20, reserved: 15 });
      expect(r.isLow).toBe(true);
    });

    it('isCritical when available <= 3', () => {
      const r = ProductInventoryService.checkAvailability({ quantity: 10, reserved: 8 });
      expect(r.isCritical).toBe(true);
    });

    it('throws for negative input', () => {
      expect(() =>
        ProductInventoryService.checkAvailability({ quantity: -1, reserved: 0 }),
      ).toThrow();
    });
  });

  describe('planReservation()', () => {
    it('full reservation when available >= requested', () => {
      const r = ProductInventoryService.planReservation({
        quantity: 100,
        reserved: 0,
        requested: 10,
      });
      expect(r.accepted).toBe(10);
      expect(r.reason).toBe('full');
    });

    it('partial when available < requested + no backorder', () => {
      const r = ProductInventoryService.planReservation({
        quantity: 5,
        reserved: 0,
        requested: 10,
      });
      expect(r.accepted).toBe(5);
      expect(r.backordered).toBe(0);
      expect(r.reason).toBe('partial');
    });

    it('backorder when allowed', () => {
      const r = ProductInventoryService.planReservation({
        quantity: 5,
        reserved: 0,
        requested: 10,
        allowBackorder: true,
      });
      expect(r.accepted).toBe(5);
      expect(r.backordered).toBe(5);
      expect(r.reason).toBe('backorder');
    });

    it('none when 0 available and no backorder', () => {
      const r = ProductInventoryService.planReservation({
        quantity: 5,
        reserved: 5,
        requested: 10,
      });
      expect(r.accepted).toBe(0);
      expect(r.reason).toBe('none');
    });

    it('throws for zero requested', () => {
      expect(() =>
        ProductInventoryService.planReservation({
          quantity: 10,
          reserved: 0,
          requested: 0,
        }),
      ).toThrow();
    });
  });

  describe('evaluateRestock()', () => {
    it('suggests restock when stock below reorder point', () => {
      const r = ProductInventoryService.evaluateRestock({
        quantity: 10,
        averageDailySales: 5,
        leadTimeDays: 3,
        lowStockThreshold: 20,
      });
      expect(r.shouldRestock).toBe(true);
      expect(r.suggestedQuantity).toBeGreaterThan(0);
    });

    it('no restock when stock high', () => {
      const r = ProductInventoryService.evaluateRestock({
        quantity: 500,
        averageDailySales: 5,
        leadTimeDays: 3,
        lowStockThreshold: 20,
      });
      expect(r.shouldRestock).toBe(false);
    });

    it('critical urgency when days left <= 2', () => {
      const r = ProductInventoryService.evaluateRestock({
        quantity: 5,
        averageDailySales: 5,
        leadTimeDays: 3,
        lowStockThreshold: 20,
      });
      expect(r.urgency).toBe('critical');
    });
  });

  describe('alert helpers', () => {
    it('shouldAlertLowStock when crossing threshold', () => {
      expect(ProductInventoryService.shouldAlertLowStock(20, 8, 10)).toBe(true);
    });

    it('shouldAlertOutOfStock when hits 0', () => {
      expect(ProductInventoryService.shouldAlertOutOfStock(5, 0)).toBe(true);
    });

    it('shouldAlertBackInStock when returns from 0', () => {
      expect(ProductInventoryService.shouldAlertBackInStock(0, 5)).toBe(true);
    });
  });
});
