import { BaseEntity } from '../common/base.types';
import { Address } from '../common/address.types';
import { WAREHOUSE } from '@vubon/shared-constants/src/logistics/warehouse.constants';
import { InventoryLocation } from './inventory-location.types';

export interface WarehouseHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export interface WarehouseMetadata {
  capacityUnit: string;
  temperatureControlled: boolean;
  minTemperature?: number;
  maxTemperature?: number;
  hasLoadingDock: boolean;
  hasForklift: boolean;
  hasPalletRacks: boolean;
  securityLevel: string;
}

export interface Warehouse extends BaseEntity {
  warehouseId: string;
  name: string;
  code: string;
  status: keyof typeof WAREHOUSE.STATUS | string;
  type: keyof typeof WAREHOUSE.TYPES | string;
  address: Address;
  vendorId?: string;
  capacity: number;
  usedCapacity: number;
  availableCapacity: number;
  locations: InventoryLocation[];
  locationCount: number;
  isActive: boolean;
  isDefault: boolean;
  managerName: string;
  managerPhone: string;
  managerEmail: string;
  operatingHours: WarehouseHours;
  metadata: WarehouseMetadata;
}
