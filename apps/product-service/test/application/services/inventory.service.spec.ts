/**
 * InventoryService — unit tests
 */
import { jest } from '@jest/globals';
import { InventoryService } from '../../../src/module/application/services/impl/inventory.service.js';
import {
  InventoryNotFoundApplicationError,
} from '../../../src/module/application/errors/inventory.errors.js';
import {
  createMockInventoryRepository,
  type MockedInventoryRepository,
} from '../../mocks/repositories.js';
import { buildInventory } from '../../fixtures.js';
import {
  InventoryQuantityVO,
} from '../../../src/module/domain/value-objects/primitives/inventory-quantity.vo.js';
import { INVENTORY_ID, PRODUCT_ID, LATER } from '../../helpers.js';

describe('InventoryService', () => {
  let service: InventoryService;
  let repo: MockedInventoryRepository;

  beforeEach(() => {
    repo = createMockInventoryRepository();
    repo.save.mockImplementation(async (e) => e);
    service = new InventoryService(repo);
  });

  describe('update()', () => {
    it('should add stock when delta > 0', async () => {
      const inv = buildInventory({ quantity: InventoryQuantityVO.create(10) });
      repo.findById.mockResolvedValueOnce(inv);

      const result = await service.update(
        { inventoryId: INVENTORY_ID, delta: 5, reason: 'restock', adjustedBy: 'admin' } as never,
        'admin',
      );

      expect(result.quantity).toBe(15);
      expect(repo.save).toHaveBeenCalled();
    });

    it('should remove stock when delta < 0', async () => {
      const inv = buildInventory({ quantity: InventoryQuantityVO.create(20) });
      repo.findById.mockResolvedValueOnce(inv);

      const result = await service.update(
        { inventoryId: INVENTORY_ID, delta: -5, reason: 'sale', adjustedBy: 'admin' } as never,
        'admin',
      );

      expect(result.quantity).toBe(15);
    });

    it('should throw InventoryNotFound for missing id', async () => {
      repo.findById.mockResolvedValueOnce(null);
      await expect(
        service.update(
          { inventoryId: 'missing', delta: 1, reason: 'x', adjustedBy: 'a' } as never,
          'a',
        ),
      ).rejects.toThrow(InventoryNotFoundApplicationError);
    });
  });

  describe('adjust()', () => {
    it('should adjust inventory', async () => {
      const inv = buildInventory({ quantity: InventoryQuantityVO.create(10) });
      repo.findById.mockResolvedValueOnce(inv);

      const result = await service.adjust({
        inventoryId: INVENTORY_ID,
        delta: 3,
        reason: 'adjustment',
        adjustedBy: 'admin',
      });
      expect(result.quantity).toBe(13);
    });
  });

  describe('reserve()', () => {
    it('should reserve stock', async () => {
      const inv = buildInventory({ quantity: InventoryQuantityVO.create(50) });
      repo.findById.mockResolvedValueOnce(inv);

      const result = await service.reserve({
        inventoryId: INVENTORY_ID,
        amount: 10,
        reference: 'ORDER-1',
      });
      expect(result.reserved).toBe(10);
    });

    it('should throw when insufficient stock', async () => {
      const inv = buildInventory({ quantity: InventoryQuantityVO.create(2) });
      repo.findById.mockResolvedValueOnce(inv);

      await expect(
        service.reserve({ inventoryId: INVENTORY_ID, amount: 10, reference: 'X' }),
      ).rejects.toThrow();
    });
  });

  describe('release()', () => {
    it('should release reserved amount', async () => {
      const inv = buildInventory({
        quantity: InventoryQuantityVO.create(50),
        reserved: InventoryQuantityVO.create(20),
      });
      repo.findById.mockResolvedValueOnce(inv);

      const result = await service.release({
        inventoryId: INVENTORY_ID,
        amount: 5,
        reason: 'cancel',
      });
      expect(result.reserved).toBe(15);
    });
  });

  describe('listByProduct()', () => {
    it('should return mapped list', async () => {
      repo.findByProductId.mockResolvedValueOnce([buildInventory()]);
      const result = await service.listByProduct(PRODUCT_ID);
      expect(result.length).toBe(1);
    });
  });

  describe('listLowStock()', () => {
    it('should return only low stock', async () => {
      repo.findLowStock.mockResolvedValueOnce([
        buildInventory({ quantity: InventoryQuantityVO.create(2) }),
      ]);
      const result = await service.listLowStock();
      expect(result.length).toBe(1);
    });
  });

  void LATER;
});
