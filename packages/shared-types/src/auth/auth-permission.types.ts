/**
 * Auth Permission Types
 * প্রমাণীকরণ পারমিশন সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../common/base.entity';
import { AUTH_PERMISSION } from '@vubon/shared-constants';

export interface AuthPermission extends BaseEntity {
  name: string;
  description?: string;
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete' | 'manage' | 'execute';
  scope?: 'global' | 'organization' | 'team' | 'user';
  roles: string[];
  conditions?: Record<string, unknown>;
  enabled: boolean;
  metadata?: Record<string, unknown>;
}

export interface AuthPermissionCheck {
  userId: string;
  permission: string;
  resourceId?: string;
  organizationId?: string;
  teamId?: string;
}

export interface AuthPermissionResult {
  granted: boolean;
  reason?: string;
  role?: string;
  scope?: string;
}

export type AuthPermissionType = keyof typeof AUTH_PERMISSION;
