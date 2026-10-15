/**
 * StockCheckService unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { StockCheckService } from '@domain/services/stock-check.service.js';
import { makeCartItem } from '../../../fixtures/index';
import { TEST_IDS } from '../../../fixtures/index';

describe('StockCheckService', () => {
  it('all available when sufficient stock', () => {
    const item = makeCartItem({ quantity: 2 });
    const result = StockCheckService.check([item], [
      {
        productId: TEST_IDS.PRODUCT_ID,
        available: 10,
        isAvailable: true,
      },
    ]);
    expect(result.allAvailable).toBe(true);
  });

  it('reports insufficient stock', () => {
    const item = makeCartItem({ quantity: 5 });
    const result = StockCheckService.check([item], [
      {
        productId: TEST_IDS.PRODUCT_ID,
        available: 2,
        isAvailable: true,
      },
    ]);
    expect(result.allAvailable).toBe(false);
    expect(result.insufficient).toContain(item.id);
  });

  it('reports unavailable', () => {
    const item = makeCartItem();
    const result = StockCheckService.check([item], [
      {
        productId: TEST_IDS.PRODUCT_ID,
        available: 0,
        isAvailable: false,
      },
    ]);
    expect(result.unavailable).toContain(item.id);
  });
});
