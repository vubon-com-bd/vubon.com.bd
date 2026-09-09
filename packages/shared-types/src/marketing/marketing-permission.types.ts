import { PermissionObject } from '../common/permission.types';
import { MARKETING_PERMISSION } from '@vubon/shared-constants/src/marketing/marketing-permission.constants';

export interface MarketingPermission extends PermissionObject {
  type: keyof typeof MARKETING_PERMISSION | string;
  category: 'marketing';
  module: string;
  action: string; // Use string to accommodate all marketing actions
}

export type MarketingPermissionKey = keyof typeof MARKETING_PERMISSION;
