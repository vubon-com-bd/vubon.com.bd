import { StatusObject } from '../../common/status.types';
import { VENDOR_STATUS } from '@vubon/shared-constants/src/business/vendor/vendor-status.constants';

export interface VendorStatus extends StatusObject {
  type: keyof typeof VENDOR_STATUS | string;
  category: 'vendor';
  isPending: boolean;
  isActive: boolean;
  isSuspended: boolean;
  isBanned: boolean;
  isDeleted: boolean;
}

export type VendorStatusKey = keyof typeof VENDOR_STATUS;
