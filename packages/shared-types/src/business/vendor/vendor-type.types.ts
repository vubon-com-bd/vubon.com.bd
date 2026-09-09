import { TypeObject } from '../../common/types.types';
import { VENDOR_TYPE } from '@vubon/shared-constants/src/business/vendor/vendor-type.constants';

export interface VendorType extends TypeObject {
  type: keyof typeof VENDOR_TYPE | string;
  category: 'vendor';
  isIndividual: boolean;
  isBusiness: boolean;
  isEnterprise: boolean;
  isPartnership: boolean;
  isCorporation: boolean;
}

export type VendorTypeKey = keyof typeof VENDOR_TYPE;
