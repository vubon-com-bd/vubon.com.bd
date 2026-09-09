import { BaseEntity } from '../common/base.types';
import { ROUTE } from '@vubon/shared-constants/src/logistics/route.constants';
import { Zone } from './zone.types';

export interface RouteStop {
  stopId: string;
  address: string;
  latitude: number;
  longitude: number;
  order: number;
  estimatedArrival: Date;
  estimatedDeparture: Date;
  actualArrival?: Date;
  actualDeparture?: Date;
}

export interface RoutePoint {
  latitude: number;
  longitude: number;
  address: string;
}

export interface RouteMetadata {
  trafficCondition: string;
  roadCondition: string;
  weatherCondition: string;
  notes?: string;
}

export interface Route extends BaseEntity {
  routeId: string;
  name: string;
  code: string;
  status: keyof typeof ROUTE.STATUS | string;
  type: keyof typeof ROUTE.TYPES | string;
  zone: Zone;
  stops: RouteStop[];
  totalStops: number;
  totalDistance: number;
  totalDuration: number;
  optimization: keyof typeof ROUTE.ROUTE_OPTIMIZATION | string;
  isActive: boolean;
  isOptimized: boolean;
  isUnderMaintenance: boolean;
  startPoint: RoutePoint;
  endPoint: RoutePoint;
  waypoints: RoutePoint[];
  metadata: RouteMetadata;
}
