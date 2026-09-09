import { BaseEntity } from '../common/base.types';
import { DRIVER } from '@vubon/shared-constants/src/logistics/driver.constants';
import { User } from '../user/user.types';
import { Vehicle } from './vehicle.types';

export interface DriverMetadata {
  emergencyContactName: string;
  emergencyContactPhone: string;
  bloodGroup: string;
  allergies: string[];
  medicalConditions: string[];
  documents: string[];
}

export interface Driver extends BaseEntity {
  driverId: string;
  userId?: string;
  user?: User;
  status: keyof typeof DRIVER.STATUS | string;
  type: keyof typeof DRIVER.TYPES | string;
  licenseType: keyof typeof DRIVER.LICENSE_TYPES | string;
  licenseNumber: string;
  licenseExpiry: Date;
  name: string;
  phone: string;
  email: string;
  address: string;
  vehicle: Vehicle;
  rating: number;
  totalDeliveries: number;
  successfulDeliveries: number;
  failedDeliveries: number;
  isActive: boolean;
  isAvailable: boolean;
  isOnDuty: boolean;
  shiftStart: string;
  shiftEnd: string;
  breakStart: string;
  breakEnd: string;
  maxShiftHours: number;
  breakIntervalHours: number;
  maxDeliveriesPerShift: number;
  metadata: DriverMetadata;
}
