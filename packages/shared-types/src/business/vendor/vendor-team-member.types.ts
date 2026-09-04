/**
 * Vendor Team Member Types
 * ভেন্ডর টিম মেম্বার সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { User } from '../../common/user';
import { VendorTeam } from './vendor-team.types';

export interface VendorTeamMember extends BaseEntity {
  teamId: string;
  team: VendorTeam;
  userId: string;
  user: User;
  role: 'owner' | 'admin' | 'manager' | 'editor' | 'viewer' | 'accountant' | 'support';
  permissions: string[];
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  joinedAt: Date;
  leftAt?: Date;
  invitedBy: string;
  acceptedAt?: Date;
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface VendorTeamMemberCreateInput {
  teamId: string;
  userId: string;
  role: 'owner' | 'admin' | 'manager' | 'editor' | 'viewer' | 'accountant' | 'support';
  permissions?: string[];
  invitedBy: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorTeamMemberUpdateInput {
  role?: 'owner' | 'admin' | 'manager' | 'editor' | 'viewer' | 'accountant' | 'support';
  permissions?: string[];
  status?: 'active' | 'inactive' | 'pending' | 'suspended';
  acceptedAt?: Date;
  leftAt?: Date;
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorTeamMemberResponse {
  vendorTeamMember: VendorTeamMember;
}
