/**
 * Admin Team Types
 * Type definitions for admin teams based on shared-constants
 * @module AdminTeamTypes
 */

import {
  BaseEntity,
  Timestamp,
  Metadata,
  ID,
  FullName,
  Email,
} from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants admin team
// ============================================================
import {
  // Core Team Constants
  ADMIN_TEAM,
  ADMIN_TEAM_LABELS,
  ADMIN_TEAM_DESCRIPTIONS,
  ADMIN_TEAM_MEMBERS,
  ADMIN_TEAM_SKILLS,
  ADMIN_ENGINEERING_TEAMS,
  ADMIN_DATA_TEAMS,
  ADMIN_INFRASTRUCTURE_TEAMS,
  // Core Team Types
  AdminTeamType,
  AdminTeamLabel,
  AdminTeamDescription,
  AdminTeamMembers,
  AdminTeamSkills,
  // Core Team Functions
  getAdminTeamLabel,
  getAdminTeamDescription,
  getAdminTeamMembers,
  getAdminTeamSkills,
  isAdminEngineeringTeam,
  isAdminDataTeam,
  isAdminInfrastructureTeam,
  getAdminTeams,
  getAdminTeamSkillsList,
} from '@vubon/shared-constants';

// ============================================================
// Admin Team Extended Types
// ============================================================

/**
 * Admin team with additional metadata
 */
export interface AdminTeamExtended extends BaseEntity, Timestamp {
  id: ID;
  type: AdminTeamType;
  label: AdminTeamLabel;
  description: AdminTeamDescription;
  members: AdminTeamMembers;
  skills: AdminTeamSkills;
  isEngineering: boolean;
  isData: boolean;
  isInfrastructure: boolean;
  leadAdminId?: ID;
  memberIds: ID[];
  memberCount: number;
  metadata?: Metadata;
}

/**
 * Admin team member
 */
export interface AdminTeamMember extends BaseEntity, Timestamp {
  id: ID;
  adminId: ID;
  teamType: AdminTeamType;
  role: 'lead' | 'member' | 'observer';
  joinedAt: Date;
  leftAt?: Date;
  isActive: boolean;
  permissions: string[];
  metadata?: Metadata;
}

/**
 * Admin team filter
 */
export interface AdminTeamFilter {
  types?: AdminTeamType[];
  labels?: AdminTeamLabel[];
  isEngineering?: boolean;
  isData?: boolean;
  isInfrastructure?: boolean;
  hasMember?: ID;
  hasSkill?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  searchTerm?: string;
}

/**
 * Admin team statistics
 */
export interface AdminTeamStatistics {
  totalTeams: number;
  engineeringTeams: number;
  dataTeams: number;
  infrastructureTeams: number;
  totalMembers: number;
  averageMembersPerTeam: number;
  mostSkilledTeam: AdminTeamType;
  largestTeam: AdminTeamType;
  byType: Record<AdminTeamType, number>;
  byMemberCount: Record<AdminTeamType, number>;
  bySkill: Record<string, number>;
  teamDistribution: {
    type: AdminTeamType;
    count: number;
    members: number;
  }[];
}

/**
 * Admin team summary
 */
export interface AdminTeamSummary {
  total: number;
  engineering: number;
  data: number;
  infrastructure: number;
  totalMembers: number;
  averageMembers: number;
  teams: {
    type: AdminTeamType;
    label: string;
    memberCount: number;
    skills: string[];
  }[];
  topSkills: {
    skill: string;
    count: number;
  }[];
}

/**
 * Admin team configuration
 */
export interface AdminTeamConfiguration {
  enabled: boolean;
  maxMembersPerTeam: number;
  requireLead: boolean;
  allowMultipleRoles: boolean;
  autoAssignSkills: boolean;
  notificationOnJoin: boolean;
  notificationOnLeave: boolean;
  notificationOnRoleChange: boolean;
  teamCreationRequiresApproval: boolean;
}

/**
 * Admin team history
 */
export interface AdminTeamHistory extends BaseEntity, Timestamp {
  id: ID;
  teamType: AdminTeamType;
  adminId: ID;
  action:
    | 'create'
    | 'update'
    | 'delete'
    | 'join'
    | 'leave'
    | 'role_change'
    | 'skill_add'
    | 'skill_remove';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Admin team skill matrix
 */
export interface AdminTeamSkillMatrix {
  teamType: AdminTeamType;
  skills: AdminTeamSkills;
  memberCount: number;
  skillLevels: Record<string, 'basic' | 'intermediate' | 'advanced' | 'expert'>;
  missingSkills: string[];
  recommendedSkills: string[];
}

/**
 * Admin team member assignment
 */
export interface AdminTeamMemberAssignment extends BaseEntity, Timestamp {
  id: ID;
  adminId: ID;
  teamType: AdminTeamType;
  assignedBy: ID;
  assignedAt: Date;
  expiresAt?: Date;
  role: 'lead' | 'member' | 'observer';
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * Admin team report
 */
export interface AdminTeamReport extends BaseEntity, Timestamp {
  id: ID;
  generatedBy: ID;
  period: {
    start: Date;
    end: Date;
  };
  summary: AdminTeamSummary;
  statistics: AdminTeamStatistics;
  teamDetails: AdminTeamExtended[];
  recommendations?: string[];
  format: 'json' | 'csv' | 'pdf';
  metadata?: Metadata;
}

/**
 * Admin team export
 */
export interface AdminTeamExport extends BaseEntity, Timestamp {
  id: ID;
  adminId: ID;
  format: 'json' | 'csv' | 'pdf';
  filter: AdminTeamFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Core Constants
  ADMIN_TEAM,
  ADMIN_TEAM_LABELS,
  ADMIN_TEAM_DESCRIPTIONS,
  ADMIN_TEAM_MEMBERS,
  ADMIN_TEAM_SKILLS,
  ADMIN_ENGINEERING_TEAMS,
  ADMIN_DATA_TEAMS,
  ADMIN_INFRASTRUCTURE_TEAMS,
  // Core Types
  AdminTeamType,
  AdminTeamLabel,
  AdminTeamDescription,
  AdminTeamMembers,
  AdminTeamSkills,
  // Core Functions
  getAdminTeamLabel,
  getAdminTeamDescription,
  getAdminTeamMembers,
  getAdminTeamSkills,
  isAdminEngineeringTeam,
  isAdminDataTeam,
  isAdminInfrastructureTeam,
  getAdminTeams,
  getAdminTeamSkillsList,
};
