/**
 * Admin Settings Types
 * অ্যাডমিন সেটিংস সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../common';
import { ADMIN_SETTINGS } from '@vubon/shared-constants';

export interface AdminSettings extends BaseEntity {
  adminId: string;
  category: (typeof ADMIN_SETTINGS.CATEGORIES)[keyof typeof ADMIN_SETTINGS.CATEGORIES];
  key: string;
  value: unknown;
  type: (typeof ADMIN_SETTINGS.TYPES)[keyof typeof ADMIN_SETTINGS.TYPES];
  isPublic: boolean;
  isEncrypted: boolean;
  description?: string;
}

export interface AdminSettingsCreateInput {
  adminId: string;
  category: (typeof ADMIN_SETTINGS.CATEGORIES)[keyof typeof ADMIN_SETTINGS.CATEGORIES];
  key: string;
  value: unknown;
  type?: (typeof ADMIN_SETTINGS.TYPES)[keyof typeof ADMIN_SETTINGS.TYPES];
  isPublic?: boolean;
  isEncrypted?: boolean;
  description?: string;
}

// UpdateInput Partial ব্যবহার
export type AdminSettingsUpdateInput = Partial<AdminSettingsCreateInput>;

export interface AdminSettingsGroup {
  category: string;
  settings: AdminSettings[];
}
