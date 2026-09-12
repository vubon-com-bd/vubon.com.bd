import { PermissionObject } from '../../common/permission.types';
import { VENDOR_PERMISSION } from '@vubon/shared-constants/src/business/vendor/vendor-permission.constants';

export interface VendorPermission extends PermissionObject {
  type: keyof typeof VENDOR_PERMISSION | string;
  category: 'vendor';
  module: string;
  action: 'create' | 'read' | 'update' | 'delete' | 'manage';
}

export type VendorPermissionKey = keyof typeof VENDOR_PERMISSION;
