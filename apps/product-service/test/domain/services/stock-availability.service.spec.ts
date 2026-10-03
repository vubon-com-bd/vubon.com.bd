/**
 * StockAvailabilityService — unit tests
 */
import { StockAvailabilityService } from '../../../src/module/domain/services/stock-availability.service.js';
import { buildInventory } from '../../fixtures.js';
import { InventoryQuantityVO } from '../../../src/module/domain/value-objects/primitives/inventory-quantity.vo.js';

describe('StockAvailabilityService', () => {
  let service: StockAvailabilityService;

  beforeEach(() => {
    service = new StockAvailabilityService();
  });

  describe('summarize()', () => {
    it('should return empty summary for no inventory', () => {
      const summary = service.summarize([]);
      expect(summary.totalAvailable).toBe(0);
      expect(summary.lines.length).toBe(0);
      expect(summary.allOutOfStock).toBe(true);
    });

    it('should sum available across inventory rows', () => {
      const summary = service.summarize([
        buildInventory({ quantity: InventoryQuantityVO.create(50) }),
        buildInventory({ quantity: InventoryQuantityVO.create(30) }),
      ]);
      expect(summary.totalAvailable).toBe(80);
    });

    it('should subtract reserved from quantity', () => {
      const summary = service.summarize([
        buildInventory({
          quantity: InventoryQuantityVO.create(100),
          reserved: InventoryQuantityVO.create(40),
        }),
      ]);
      expect(summary.totalAvailable).toBe(60);
      expect(summary.totalReserved).toBe(40);
    });

    it('should flag allOutOfStock when every line is zero', () => {
      const summary = service.summarize([
        buildInventory({ quantity: InventoryQuantityVO.zero() }),
      ]);
      expect(summary.allOutOfStock).toBe(true);
    });

    it('should flag hasLowStock when any line low', () => {
      const summary = service.summarize([
        buildInventory({ quantity: InventoryQuantityVO.create(5) }),
      ]);
      expect(summary.hasLowStock).toBe(true);
    });
  });

  describe('canFulfillAll()', () => {
    it('should return true when all inventory can fulfill quantities', () => {
      const inv = buildInventory({ quantity: InventoryQuantityVO.create(100), sku: 'TEST-A' });
      expect(service.canFulfillAll([inv], { 'TEST-A': 10 })).toBe(true);
    });

    it('should return false when any line cannot fulfill', () => {
      const inv = buildInventory({ quantity: InventoryQuantityVO.create(5), sku: 'TEST-B' });
      expect(service.canFulfillAll([inv], { 'TEST-B': 10 })).toBe(false);
    });

    it('should return false when quantity map omits SKU (requested defaults to 0)', () => {
      const inv = buildInventory({ quantity: InventoryQuantityVO.create(100), sku: 'SKU-1' });
      // Service treats missing SKU as requested=0 → canFulfill(0) is false
      expect(service.canFulfillAll([inv], {})).toBe(false);
    });
  });
});
