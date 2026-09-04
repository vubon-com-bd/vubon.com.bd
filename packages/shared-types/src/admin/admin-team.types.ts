/**
 * Admin Team Types
 * অ্যাডমিন টিম সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../common';

export interface AdminTeam extends BaseEntity {
  name: string;
  description?: string;
  leadId: string;
  members: string[];
  department: string;
  status: 'active' | 'inactive' | 'pending';
  permissions: string[];
  metadata?: Record<string, unknown>;
}

export interface AdminTeamCreateInput {
  name: string;
  description?: string;
  leadId: string;
  members?: string[];
  department: string;
  permissions?: string[];
  metadata?: Record<string, unknown>;
}

export interface AdminTeamUpdateInput extends Partial<AdminTeamCreateInput> {
  status?: 'active' | 'inactive' | 'pending';
}

export interface AdminTeamMember {
  adminId: string;
  teamId: string;
  role: 'lead' | 'member' | 'observer';
  joinedAt: Date;
  leftAt?: Date;
}
