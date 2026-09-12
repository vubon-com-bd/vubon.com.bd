import { BaseEntity } from '../common/base.types';
import { ZONE } from '@vubon/shared-constants/src/logistics/zone.constants';
import { DIVISIONS } from '@vubon/shared-constants/src/common/divisions.constants';
import { DISTRICTS } from '@vubon/shared-constants/src/common/districts.constants';

export interface ZonePoint {
  latitude: number;
  longitude: number;
}

export interface ZoneBoundary {
  type: 'polygon' | 'circle';
  coordinates: ZonePoint[];
  radius?: number;
}

export interface ZoneMetadata {
  population: number;
  area: number;
  language: string;
  timezone: string;
  notes?: string;
}

export interface Zone extends BaseEntity {
  zoneId: string;
  name: string;
  code: string;
  status: keyof typeof ZONE.STATUS | string;
  type: keyof typeof ZONE.TYPES | string;
  priority: keyof typeof ZONE.ZONE_PRIORITY | string;
  division: keyof typeof DIVISIONS | string;
  districts: (keyof typeof DISTRICTS | string)[];
  coverageRadius: number;
  isActive: boolean;
  isUnderReview: boolean;
  centerPoint: ZonePoint;
  boundary: ZoneBoundary;
  metadata: ZoneMetadata;
}
