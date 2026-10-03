/**
 * StockAvailability Domain Service
 * @module product-service/domain/services
 *
 * Cross-variant stock availability calculations.
 */
import { ProductInventoryEntity } from '../entities/product-inventory.entity.js';
import { ProductVariantEntity } from '../entities/product-variant.entity.js';

export interface AvailabilityLine {
  readonly variantId?: string;
  readonly sku: string;
  readonly available: number;
  readonly outOfStock: boolean;
}

export interface AvailabilitySummary {
  readonly totalAvailable: number;
  readonly totalReserved: number;
  readonly lines: readonly AvailabilityLine[];
  readonly allOutOfStock: boolean;
  readonly hasLowStock: boolean;
}

export class StockAvailabilityService {
  summarize(
    inventory: readonly ProductInventoryEntity[],
    variants?: readonly ProductVariantEntity[],
  ): AvailabilitySummary {
    const lines: AvailabilityLine[] = inventory.map((inv) => ({
      variantId: inv.variantId?.value,
      sku: inv.sku,
      available: inv.available,
      outOfStock: inv.isOutOfStock(),
    }));

    // If variants exist but no inventory rows, mark all out of stock
    if (variants && variants.length > 0) {
      for (const v of variants) {
        if (!lines.some((l) => l.variantId === v.id)) {
          lines.push({
            variantId: v.id,
            sku: v.sku.value,
            available: 0,
            outOfStock: true,
          });
        }
      }
    }

    const totalAvailable = lines.reduce((sum, l) => sum + l.available, 0);
    const totalReserved = inventory.reduce((sum, inv) => sum + inv.reserved, 0);
    const allOutOfStock = lines.length === 0 || lines.every((l) => l.outOfStock);
    const hasLowStock = inventory.some((inv) => inv.isLowStock() && !inv.isOutOfStock());

    return { totalAvailable, totalReserved, lines, allOutOfStock, hasLowStock };
  }

  canFulfillAll(
    inventory: readonly ProductInventoryEntity[],
    quantities: Readonly<Record<string, number>>,
  ): boolean {
    return inventory.every((inv) => {
      const requested = quantities[inv.sku] ?? 0;
      return inv.canFulfill(requested);
    });
  }
}
