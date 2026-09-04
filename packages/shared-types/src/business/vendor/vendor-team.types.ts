/**
 * Vendor Team Types
 * ভেন্ডর টিম সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { Vendor } from './vendor.types';
import { VENDOR_TEAM } from '@vubon/shared-constants';
import { VendorTeamMember } from './vendor-team-member.types';

export interface VendorTeam extends BaseEntity {
  vendorId: string;
  vendor: Vendor;
  name: string;
  nameBangla?: string;
  description?: string;
  descriptionBangla?: string;
  status: (typeof VENDOR_TEAM.STATUS)[keyof typeof VENDOR_TEAM.STATUS];
  members: VendorTeamMember[];
  permissions: string[];
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface VendorTeamCreateInput {
  vendorId: string;
  name: string;
  nameBangla?: string;
  description?: string;
  descriptionBangla?: string;
  permissions?: string[];
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorTeamUpdateInput {
  name?: string;
  nameBangla?: string;
  description?: string;
  descriptionBangla?: string;
  status?: (typeof VENDOR_TEAM.STATUS)[keyof typeof VENDOR_TEAM.STATUS];
  permissions?: string[];
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorTeamResponse {
  vendorTeam: VendorTeam;
}
