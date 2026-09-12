/**
 * Admin API endpoint paths.
 * @module shared-api/endpoints/admin
 */

export const ADMIN_ENDPOINTS = {
  LIST: '/admins',
  CREATE: '/admins',
  GET: (adminId: string) => `/admins/${adminId}`,
  UPDATE: (adminId: string) => `/admins/${adminId}`,
  DELETE: (adminId: string) => `/admins/${adminId}`,
  ME: '/admins/me',
  PROFILE: (adminId: string) => `/admins/${adminId}/profile`,
  SETTINGS: (adminId: string) => `/admins/${adminId}/settings`,
  PREFERENCES: (adminId: string) => `/admins/${adminId}/preferences`,
  SESSION: (adminId: string) => `/admins/${adminId}/session`,
  DEVICES: (adminId: string) => `/admins/${adminId}/devices`,
  VERIFICATIONS: (adminId: string) => `/admins/${adminId}/verifications`,
  BIOMETRIC: (adminId: string) => `/admins/${adminId}/biometric`,
  TWO_FA: (adminId: string) => `/admins/${adminId}/2fa`,
  LOGS: (adminId: string) => `/admins/${adminId}/logs`,
  ACTIVITY: (adminId: string) => `/admins/${adminId}/activity`,
  AUDITS: (adminId: string) => `/admins/${adminId}/audits`,
  ANALYTICS: (adminId: string) => `/admins/${adminId}/analytics`,
  REPORTS: (adminId: string) => `/admins/${adminId}/reports`,
  NOTIFICATIONS: (adminId: string) => `/admins/${adminId}/notifications`,
  ROLES: (adminId: string) => `/admins/${adminId}/roles`,
  PERMISSIONS: (adminId: string) => `/admins/${adminId}/permissions`,
  LEVELS: '/admins/levels',
  DEPARTMENTS: '/admins/departments',
  DEPARTMENT: (departmentId: string) => `/admins/departments/${departmentId}`,
  TEAMS: '/admins/teams',
  TEAM: (teamId: string) => `/admins/teams/${teamId}`,
} as const;
