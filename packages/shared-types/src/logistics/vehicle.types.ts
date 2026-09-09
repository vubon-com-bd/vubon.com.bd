import { BaseEntity } from '../common/base.types';
import { VEHICLE } from '@vubon/shared-constants/src/logistics/vehicle.constants';
import { Dimensions } from './shipment.types';

export interface VehicleMetadata {
  gpsTrackerId?: string;
  simCardNumber?: string;
  colorHex: string;
  photoUrl?: string;
  documents: string[];
}

export interface Vehicle extends BaseEntity {
  vehicleId: string;
  registrationNumber: string;
  status: keyof typeof VEHICLE.STATUS | string;
  type: keyof typeof VEHICLE.TYPES | string;
  brand: string;
  model: string;
  year: number;
  color: string;
  capacity: number;
  weightLimit: number;
  dimensions: Dimensions;
  fuelType: keyof typeof VEHICLE.FUEL_TYPES | string;
  fuelEfficiency: number;
  insuranceExpiry: Date;
  registrationExpiry: Date;
  licensePlate: string;
  isActive: boolean;
  isAvailable: boolean;
  isOnRoute: boolean;
  lastMaintenanceDate?: Date;
  nextMaintenanceDate?: Date;
  metadata: VehicleMetadata;
}
