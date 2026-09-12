import { BaseEntity } from '../common/base.types';
import { PACKAGING } from '@vubon/shared-constants/src/logistics/packaging.constants';
import { Dimensions } from './shipment.types';

export interface Packaging extends BaseEntity {
  packagingId: string;
  type: keyof typeof PACKAGING.TYPES | string;
  material: keyof typeof PACKAGING.PACKAGING_MATERIALS | string;
  size: keyof typeof PACKAGING.PACKAGING_SIZES | string;
  dimensions: Dimensions;
  weight: number;
  maxWeight: number;
  cost: number;
  isReusable: boolean;
  isRecyclable: boolean;
  isBiodegradable: boolean;
  description?: string;
  image?: string;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
