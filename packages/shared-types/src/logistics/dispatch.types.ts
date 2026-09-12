import { BaseEntity } from '../common/base.types';
import { DISPATCH } from '@vubon/shared-constants/src/logistics/dispatch.constants';
import { Vehicle } from './vehicle.types';
import { Driver } from './driver.types';
import { Route } from './route.types';
import { Shipment } from './shipment.types';

export interface DispatchMetadata {
  isUrgent: boolean;
  isScheduled: boolean;
  temperatureControlled: boolean;
  requiresSignature: boolean;
  requiresPhoto: boolean;
}

export interface Dispatch extends BaseEntity {
  dispatchId: string;
  dispatchNumber: string;
  status: keyof typeof DISPATCH.STATUS | string;
  type: keyof typeof DISPATCH.DISPATCH_TYPES | string;
  priority: keyof typeof DISPATCH.DISPATCH_PRIORITY | string;
  vehicle: Vehicle;
  driver: Driver;
  route: Route;
  shipments: Shipment[];
  shipmentCount: number;
  totalItems: number;
  totalWeight: number;
  scheduledAt: Date;
  departedAt?: Date;
  arrivedAt?: Date;
  completedAt?: Date;
  isCompleted: boolean;
  isCancelled: boolean;
  notes?: string;
  metadata: DispatchMetadata;
}
