import { WAREHOUSE } from '@vubon/shared-constants/src/logistics/warehouse.constants';

export const warehouseConfig = {
  maxStorageDays: WAREHOUSE.MAX_STORAGE_DAYS,
  minStorageTemp: WAREHOUSE.MIN_STORAGE_TEMP_C,
  maxStorageTemp: WAREHOUSE.MAX_STORAGE_TEMP_C,
  defaultCapacity: 1000,
  locations: {
    dhaka: { name: 'Dhaka Warehouse', address: 'Dhaka, Bangladesh' },
    chittagong: { name: 'Chittagong Warehouse', address: 'Chittagong, Bangladesh' },
  },
};
