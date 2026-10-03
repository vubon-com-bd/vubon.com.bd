import { OrderItemService } from '../../../../src/module/application/services/impl/order-item.service.js';
import {
  makeOrder,
  makeItem,
  makeMockOrderRepo,
  makeMockItemRepo,
  UUID_ORDER,
  UUID_ITEM,
  UUID_PRODUCT,
} from './_helpers.js';
import { OrderItemNotFoundApplicationError } from '../../../../src/module/application/errors/order-item.errors.js';
import { OrderNotFoundApplicationError } from '../../../../src/module/application/errors/order.errors.js';

describe('OrderItemService', () => {
  let itemRepo: ReturnType<typeof makeMockItemRepo>;
  let orderRepo: ReturnType<typeof makeMockOrderRepo>;
  let service: OrderItemService;

  beforeEach(() => {
    itemRepo = makeMockItemRepo();
    orderRepo = makeMockOrderRepo();
    service = new OrderItemService(itemRepo as never, orderRepo as never);
  });

  describe('add()', () => {
    it('adds item and saves order + item', async () => {
      orderRepo.findById.mockResolvedValue(makeOrder());
      const dto = {
        orderId: UUID_ORDER,
        productId: UUID_PRODUCT,
        sku: 'SKU-NEW',
        name: 'New',
        quantity: 2,
        unitPrice: 50,
      };
      const result = await service.add(dto as never);
      expect(result.sku).toBe('SKU-NEW');
      expect(orderRepo.save).toHaveBeenCalled();
      expect(itemRepo.save).toHaveBeenCalled();
    });

    it('throws when order missing', async () => {
      orderRepo.findById.mockResolvedValue(null);
      await expect(
        service.add({ orderId: 'x', productId: UUID_PRODUCT, sku: 's', name: 'n', quantity: 1, unitPrice: 1 } as never),
      ).rejects.toThrow(OrderNotFoundApplicationError);
    });
  });

  describe('update()', () => {
    it('changes quantity and saves', async () => {
      itemRepo.findById.mockResolvedValue(makeItem());
      const result = await service.update({
        orderId: UUID_ORDER,
        itemId: UUID_ITEM,
        quantity: 5,
      } as never);
      expect(itemRepo.save).toHaveBeenCalled();
      expect(result.id).toBe(UUID_ITEM);
    });

    it('throws when item missing', async () => {
      itemRepo.findById.mockResolvedValue(null);
      await expect(
        service.update({ orderId: UUID_ORDER, itemId: 'x', quantity: 1 } as never),
      ).rejects.toThrow(OrderItemNotFoundApplicationError);
    });
  });

  describe('remove()', () => {
    it('removes item and saves order', async () => {
      orderRepo.findById.mockResolvedValue(makeOrder());
      await service.remove({ orderId: UUID_ORDER, itemId: UUID_ITEM } as never);
      expect(orderRepo.save).toHaveBeenCalled();
      expect(itemRepo.delete).toHaveBeenCalledWith(UUID_ITEM);
    });

    it('throws when order missing', async () => {
      orderRepo.findById.mockResolvedValue(null);
      await expect(
        service.remove({ orderId: 'x', itemId: UUID_ITEM } as never),
      ).rejects.toThrow(OrderNotFoundApplicationError);
    });
  });

  describe('getById()', () => {
    it('returns item DTO', async () => {
      itemRepo.findById.mockResolvedValue(makeItem());
      const result = await service.getById(UUID_ITEM);
      expect(result.id).toBe(UUID_ITEM);
    });

    it('throws when missing', async () => {
      itemRepo.findById.mockResolvedValue(null);
      await expect(service.getById('x')).rejects.toThrow(OrderItemNotFoundApplicationError);
    });
  });

  describe('listByOrder()', () => {
    it('returns items of order', async () => {
      orderRepo.findById.mockResolvedValue(makeOrder());
      const result = await service.listByOrder(UUID_ORDER);
      expect(result.items).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('throws when order missing', async () => {
      orderRepo.findById.mockResolvedValue(null);
      await expect(service.listByOrder('x')).rejects.toThrow(OrderNotFoundApplicationError);
    });
  });
});
