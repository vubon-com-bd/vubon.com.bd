/**
 * ProductInventoryEntity — unit tests
 */
import { ProductInventoryEntity } from '../../../src/module/domain/entities/product-inventory.entity.js';
import { InventoryQuantityVO } from '../../../src/module/domain/value-objects/primitives/inventory-quantity.vo.js';
import { InventoryThresholdVO } from '../../../src/module/domain/value-objects/primitives/inventory-threshold.vo.js';
import { buildInventory } from '../../fixtures.js';
import { LATER } from '../../helpers.js';

describe('ProductInventoryEntity', () => {
  describe('available', () => {
    it('should equal quantity when nothing reserved', () => {
      const inv = buildInventory({ quantity: InventoryQuantityVO.create(100) });
      expect(inv.available).toBe(100);
    });

    it('should subtract reserved', () => {
      const inv = buildInventory({
        quantity: InventoryQuantityVO.create(100),
        reserved: InventoryQuantityVO.create(30),
      });
      expect(inv.available).toBe(70);
    });

    it('should never be negative', () => {
      const inv = buildInventory({ quantity: InventoryQuantityVO.create(0) });
      expect(inv.available).toBe(0);
    });
  });

  describe('getStatus()', () => {
    it('IN_STOCK for healthy stock', () => {
      const inv = buildInventory({
        quantity: InventoryQuantityVO.create(100),
        lowStockThreshold: InventoryThresholdVO.create(10),
      });
      expect(inv.getStatus()).toBe('in_stock');
    });

    it('LOW_STOCK for stock at or below threshold', () => {
      const inv = buildInventory({
        quantity: InventoryQuantityVO.create(10),
        lowStockThreshold: InventoryThresholdVO.create(10),
      });
      expect(inv.getStatus()).toBe('low_stock');
    });

    it('OUT_OF_STOCK when quantity is 0', () => {
      const inv = buildInventory({ quantity: InventoryQuantityVO.zero() });
      expect(inv.getStatus()).toBe('out_of_stock');
    });

    it('BACKORDER when quantity is 0 and allowBackorder', () => {
      const inv = buildInventory({
        quantity: InventoryQuantityVO.zero(),
        allowBackorder: true,
      });
      expect(inv.getStatus()).toBe('backorder');
    });
  });

  describe('canFulfill()', () => {
    it('returns true when enough stock', () => {
      const inv = buildInventory({ quantity: InventoryQuantityVO.create(50) });
      expect(inv.canFulfill(10)).toBe(true);
    });

    it('returns false when insufficient', () => {
      const inv = buildInventory({ quantity: InventoryQuantityVO.create(5) });
      expect(inv.canFulfill(10)).toBe(false);
    });

    it('returns false for zero/negative amount', () => {
      const inv = buildInventory();
      expect(inv.canFulfill(0)).toBe(false);
      expect(inv.canFulfill(-1)).toBe(false);
    });

    it('returns true when backorder allowed', () => {
      const inv = buildInventory({
        quantity: InventoryQuantityVO.zero(),
        allowBackorder: true,
      });
      expect(inv.canFulfill(10)).toBe(true);
    });
  });

  describe('reserve()', () => {
    it('should increase reserved amount', () => {
      const inv = buildInventory({ quantity: InventoryQuantityVO.create(100) });
      inv.reserve(20);
      expect(inv.reserved).toBe(20);
      expect(inv.available).toBe(80);
    });

    it('should reject when not enough stock', () => {
      const inv = buildInventory({ quantity: InventoryQuantityVO.create(5) });
      expect(() => inv.reserve(10)).toThrow(Error);
    });

    it('should reject zero/negative reserve', () => {
      const inv = buildInventory();
      expect(() => inv.reserve(0)).toThrow(Error);
      expect(() => inv.reserve(-1)).toThrow(Error);
    });
  });

  describe('release()', () => {
    it('should decrease reserved amount', () => {
      const inv = buildInventory({
        quantity: InventoryQuantityVO.create(100),
        reserved: InventoryQuantityVO.create(30),
      });
      inv.release(10);
      expect(inv.reserved).toBe(20);
    });

    it('should never go below 0', () => {
      const inv = buildInventory({
        quantity: InventoryQuantityVO.create(100),
        reserved: InventoryQuantityVO.create(5),
      });
      inv.release(100);
      expect(inv.reserved).toBe(0);
    });

    it('should reject non-positive amount', () => {
      const inv = buildInventory();
      expect(() => inv.release(0)).toThrow(Error);
    });
  });

  describe('addStock()', () => {
    it('should increase quantity and lastRestockedAt', () => {
      const inv = buildInventory({ quantity: InventoryQuantityVO.create(10) });
      inv.addStock(50, LATER);
      expect(inv.quantity).toBe(60);
      expect(inv.lastRestockedAt).toBe(LATER);
    });

    it('should reject non-positive amount', () => {
      const inv = buildInventory();
      expect(() => inv.addStock(0, LATER)).toThrow(Error);
    });
  });

  describe('removeStock()', () => {
    it('should reduce quantity', () => {
      const inv = buildInventory({ quantity: InventoryQuantityVO.create(50) });
      inv.removeStock(20);
      expect(inv.quantity).toBe(30);
    });

    it('should reject removal below 0', () => {
      const inv = buildInventory({ quantity: InventoryQuantityVO.create(10) });
      expect(() => inv.removeStock(20)).toThrow(Error);
    });

    it('should reject non-positive amount', () => {
      const inv = buildInventory();
      expect(() => inv.removeStock(-5)).toThrow(Error);
    });
  });

  describe('isLowStock / isOutOfStock / isCritical', () => {
    it('isLowStock when qty <= threshold', () => {
      const inv = buildInventory({
        quantity: InventoryQuantityVO.create(8),
        lowStockThreshold: InventoryThresholdVO.create(10),
      });
      expect(inv.isLowStock()).toBe(true);
    });

    it('isOutOfStock when qty is 0', () => {
      const inv = buildInventory({ quantity: InventoryQuantityVO.zero() });
      expect(inv.isOutOfStock()).toBe(true);
    });

    it('isCritical when qty <= critical threshold', () => {
      const inv = buildInventory({ quantity: InventoryQuantityVO.create(2) });
      expect(inv.isCritical()).toBe(true);
    });

    it('should throw when reserved exceeds quantity at construction', () => {
      expect(() =>
        ProductInventoryEntity.reconstitute({
          id: 'invt-x',
          createdAt: LATER,
          updatedAt: LATER,
          props: {
            productId: buildInventory().productId,
            sku: 'X-1',
            quantity: InventoryQuantityVO.create(10),
            reserved: InventoryQuantityVO.create(20),
            lowStockThreshold: InventoryThresholdVO.default(),
            trackQuantity: true,
            allowBackorder: false,
          },
        }),
      ).toThrow(Error);
    });
  });
});
