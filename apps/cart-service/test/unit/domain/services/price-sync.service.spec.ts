/**
 * PriceSyncService unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { PriceSyncService } from '@domain/services/price-sync.service.js';
import { makeCartItem } from '../../../fixtures/index';
import { TEST_IDS, TEST_CURRENCY } from '../../../fixtures/index';

describe('PriceSyncService', () => {
  it('detects price changes', () => {
    const item = makeCartItem({ unitPrice: 100 });
    const result = PriceSyncService.detectChanges([item], [
      {
        productId: TEST_IDS.PRODUCT_ID,
        currentPrice: 150,
        currency: TEST_CURRENCY,
      },
    ]);
    expect(result.changed).toHaveLength(1);
    expect(result.changed[0].delta).toBe(50);
  });

  it('reports unchanged items', () => {
    const item = makeCartItem({ unitPrice: 100 });
    const result = PriceSyncService.detectChanges([item], [
      {
        productId: TEST_IDS.PRODUCT_ID,
        currentPrice: 100,
        currency: TEST_CURRENCY,
      },
    ]);
    expect(result.changed).toHaveLength(0);
    expect(result.unchanged).toBe(1);
  });

  it('reports missing snapshots', () => {
    const item = makeCartItem();
    const result = PriceSyncService.detectChanges([item], []);
    expect(result.missing).toContain(item.id);
  });
});
