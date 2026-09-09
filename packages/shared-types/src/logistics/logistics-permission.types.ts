import { PermissionObject } from '../common/permission.types';
import { LOGISTICS_PERMISSION } from '@vubon/shared-constants/src/logistics/logistics-permission.constants';

export interface LogisticsPermission extends PermissionObject {
  type: keyof typeof LOGISTICS_PERMISSION | string;
  category: 'logistics';
  module: string;
  action: 'create' | 'read' | 'update' | 'delete' | 'manage';
}

export type LogisticsPermissionKey = keyof typeof LOGISTICS_PERMISSION;
