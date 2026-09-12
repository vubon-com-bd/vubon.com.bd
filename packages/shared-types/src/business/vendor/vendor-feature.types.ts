import { BaseEntity } from '../../common/base.types';
import { VENDOR_FEATURE } from '@vubon/shared-constants/src/business/vendor/vendor-feature.constants';

export interface VendorFeature extends BaseEntity {
  featureId: string;
  type: keyof typeof VENDOR_FEATURE.TYPES | string;
  name: string;
  description?: string;
  status: keyof typeof VENDOR_FEATURE.FEATURE_STATUS | string;
  dependencies: string[];
  isActive: boolean;
  metadata: Record<string, unknown>;
}
