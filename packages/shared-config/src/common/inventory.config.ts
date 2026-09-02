/**
 * Inventory Configuration
 * ইনভেন্টরি কনফিগারেশন
 */
export interface InventoryConfig {
  autoUpdate: boolean;
  lowStockThreshold: number;
  criticalStockThreshold: number;
  maxStockThreshold: number;
  tracking: {
    enabled: boolean;
    trackSerialNumbers: boolean;
    trackBatchNumbers: boolean;
    trackExpiryDates: boolean;
  };
  notifications: {
    lowStock: boolean;
    criticalStock: boolean;
    expired: boolean;
    expiringSoon: boolean;
  };
  reserveStock: {
    enabled: boolean;
    timeout: number;
  };
}

export const createInventoryConfig = (): InventoryConfig => ({
  autoUpdate: true,
  lowStockThreshold: 10,
  criticalStockThreshold: 3,
  maxStockThreshold: 1000,
  tracking: {
    enabled: true,
    trackSerialNumbers: false,
    trackBatchNumbers: true,
    trackExpiryDates: true,
  },
  notifications: {
    lowStock: true,
    criticalStock: true,
    expired: true,
    expiringSoon: true,
  },
  reserveStock: {
    enabled: true,
    timeout: 15 * 60 * 1000, // 15 minutes
  },
});
