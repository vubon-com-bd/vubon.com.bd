/**
 * Warehouse Configuration
 * গুদাম কনফিগারেশন
 */
export interface WarehouseConfig {
  enabled: boolean;
  locations: {
    name: string;
    code: string;
    address: string;
    zones: string[];
    capacity: number;
  }[];
  inventory: {
    autoSync: boolean;
    syncInterval: number;
    lowStockThreshold: number;
  };
  fulfillment: {
    autoAssign: boolean;
    priority: 'distance' | 'capacity' | 'cost';
  };
  receiving: {
    enabled: boolean;
    verificationRequired: boolean;
    qualityCheck: boolean;
  };
  shipping: {
    defaultWarehouse: string;
    fallbackWarehouse: string;
  };
}

export const createWarehouseConfig = (): WarehouseConfig => ({
  enabled: true,
  locations: [
    {
      name: 'Dhaka Warehouse',
      code: 'DHA-01',
      address: 'Dhaka, Bangladesh',
      zones: ['dhaka', 'narayanganj', 'gazipur'],
      capacity: 10000,
    },
    {
      name: 'Chittagong Warehouse',
      code: 'CTG-01',
      address: 'Chittagong, Bangladesh',
      zones: ['chittagong', 'cox-bazar'],
      capacity: 8000,
    },
  ],
  inventory: {
    autoSync: true,
    syncInterval: 60 * 1000, // 1 minute
    lowStockThreshold: 10,
  },
  fulfillment: {
    autoAssign: true,
    priority: 'distance',
  },
  receiving: {
    enabled: true,
    verificationRequired: true,
    qualityCheck: true,
  },
  shipping: {
    defaultWarehouse: 'DHA-01',
    fallbackWarehouse: 'CTG-01',
  },
});
