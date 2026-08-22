/**
 * Admin Level Constants
 * Admin level and seniority definitions
 */

export const ADMIN_LEVEL = {
  LEVEL_1: 1,
  LEVEL_2: 2,
  LEVEL_3: 3,
  LEVEL_4: 4,
  LEVEL_5: 5,
  LEVEL_6: 6,
  LEVEL_7: 7,
  LEVEL_8: 8,
  LEVEL_9: 9,
  LEVEL_10: 10,
  LEVEL_11: 11,
  LEVEL_12: 12,
  LEVEL_13: 13,
  LEVEL_14: 14,
  LEVEL_15: 15,
} as const;

export type AdminLevelType = (typeof ADMIN_LEVEL)[keyof typeof ADMIN_LEVEL];

export const ADMIN_LEVEL_NAMES: Record<AdminLevelType, string> = {
  [ADMIN_LEVEL.LEVEL_1]: 'Junior Trainee',
  [ADMIN_LEVEL.LEVEL_2]: 'Trainee',
  [ADMIN_LEVEL.LEVEL_3]: 'Junior Associate',
  [ADMIN_LEVEL.LEVEL_4]: 'Associate',
  [ADMIN_LEVEL.LEVEL_5]: 'Senior Associate',
  [ADMIN_LEVEL.LEVEL_6]: 'Junior Executive',
  [ADMIN_LEVEL.LEVEL_7]: 'Executive',
  [ADMIN_LEVEL.LEVEL_8]: 'Senior Executive',
  [ADMIN_LEVEL.LEVEL_9]: 'Assistant Manager',
  [ADMIN_LEVEL.LEVEL_10]: 'Deputy Manager',
  [ADMIN_LEVEL.LEVEL_11]: 'Manager',
  [ADMIN_LEVEL.LEVEL_12]: 'Senior Manager',
  [ADMIN_LEVEL.LEVEL_13]: 'Assistant Director',
  [ADMIN_LEVEL.LEVEL_14]: 'Deputy Director',
  [ADMIN_LEVEL.LEVEL_15]: 'Director',
};

export type AdminLevelName = (typeof ADMIN_LEVEL_NAMES)[keyof typeof ADMIN_LEVEL_NAMES];

export const ADMIN_LEVEL_REQUIREMENTS: Record<
  AdminLevelType,
  {
    minExperience: number;
    minEducation: string;
    trainingRequired: boolean;
  }
> = {
  [ADMIN_LEVEL.LEVEL_1]: {
    minExperience: 0,
    minEducation: 'high_school',
    trainingRequired: true,
  },
  [ADMIN_LEVEL.LEVEL_2]: {
    minExperience: 0,
    minEducation: 'high_school',
    trainingRequired: true,
  },
  [ADMIN_LEVEL.LEVEL_3]: {
    minExperience: 0,
    minEducation: 'bachelor',
    trainingRequired: true,
  },
  [ADMIN_LEVEL.LEVEL_4]: {
    minExperience: 1,
    minEducation: 'bachelor',
    trainingRequired: true,
  },
  [ADMIN_LEVEL.LEVEL_5]: {
    minExperience: 2,
    minEducation: 'bachelor',
    trainingRequired: false,
  },
  [ADMIN_LEVEL.LEVEL_6]: {
    minExperience: 2,
    minEducation: 'bachelor',
    trainingRequired: false,
  },
  [ADMIN_LEVEL.LEVEL_7]: {
    minExperience: 3,
    minEducation: 'bachelor',
    trainingRequired: false,
  },
  [ADMIN_LEVEL.LEVEL_8]: {
    minExperience: 4,
    minEducation: 'bachelor',
    trainingRequired: false,
  },
  [ADMIN_LEVEL.LEVEL_9]: {
    minExperience: 4,
    minEducation: 'bachelor',
    trainingRequired: false,
  },
  [ADMIN_LEVEL.LEVEL_10]: {
    minExperience: 5,
    minEducation: 'bachelor',
    trainingRequired: false,
  },
  [ADMIN_LEVEL.LEVEL_11]: {
    minExperience: 6,
    minEducation: 'master',
    trainingRequired: false,
  },
  [ADMIN_LEVEL.LEVEL_12]: {
    minExperience: 8,
    minEducation: 'master',
    trainingRequired: false,
  },
  [ADMIN_LEVEL.LEVEL_13]: {
    minExperience: 10,
    minEducation: 'master',
    trainingRequired: false,
  },
  [ADMIN_LEVEL.LEVEL_14]: {
    minExperience: 12,
    minEducation: 'master',
    trainingRequired: false,
  },
  [ADMIN_LEVEL.LEVEL_15]: {
    minExperience: 15,
    minEducation: 'master',
    trainingRequired: false,
  },
};

export type AdminLevelRequirement =
  (typeof ADMIN_LEVEL_REQUIREMENTS)[keyof typeof ADMIN_LEVEL_REQUIREMENTS];

export const ADMIN_LEVEL_PERMISSIONS: Record<AdminLevelType, string[]> = {
  [ADMIN_LEVEL.LEVEL_1]: ['view_basic', 'read_only'],
  [ADMIN_LEVEL.LEVEL_2]: ['view_basic', 'view_limited'],
  [ADMIN_LEVEL.LEVEL_3]: ['view_all', 'create_basic'],
  [ADMIN_LEVEL.LEVEL_4]: ['view_all', 'create_all', 'edit_basic'],
  [ADMIN_LEVEL.LEVEL_5]: ['view_all', 'create_all', 'edit_all'],
  [ADMIN_LEVEL.LEVEL_6]: ['manage_basic', 'approve_basic'],
  [ADMIN_LEVEL.LEVEL_7]: ['manage_all', 'approve_limited'],
  [ADMIN_LEVEL.LEVEL_8]: ['manage_all', 'approve_all'],
  [ADMIN_LEVEL.LEVEL_9]: ['manage_team', 'supervise'],
  [ADMIN_LEVEL.LEVEL_10]: ['manage_department', 'strategic'],
  [ADMIN_LEVEL.LEVEL_11]: ['manage_division', 'decisions'],
  [ADMIN_LEVEL.LEVEL_12]: ['manage_region', 'policy_making'],
  [ADMIN_LEVEL.LEVEL_13]: ['manage_operations', 'executive'],
  [ADMIN_LEVEL.LEVEL_14]: ['manage_strategy', 'leadership'],
  [ADMIN_LEVEL.LEVEL_15]: ['full_authority', 'board_level'],
};

export type AdminLevelPermissions =
  (typeof ADMIN_LEVEL_PERMISSIONS)[keyof typeof ADMIN_LEVEL_PERMISSIONS];

export function getAdminLevelName(level: AdminLevelType): string {
  return ADMIN_LEVEL_NAMES[level] || 'Unknown Level';
}

export function getAdminLevelRequirements(level: AdminLevelType): AdminLevelRequirement {
  return (
    ADMIN_LEVEL_REQUIREMENTS[level] || {
      minExperience: 0,
      minEducation: 'high_school',
      trainingRequired: true,
    }
  );
}

export function getAdminLevelPermissions(level: AdminLevelType): string[] {
  return ADMIN_LEVEL_PERMISSIONS[level] || [];
}

export function isEntryLevel(level: AdminLevelType): boolean {
  return level <= ADMIN_LEVEL.LEVEL_4;
}

export function isMidLevel(level: AdminLevelType): boolean {
  return level >= ADMIN_LEVEL.LEVEL_5 && level <= ADMIN_LEVEL.LEVEL_8;
}

export function isSeniorLevel(level: AdminLevelType): boolean {
  return level >= ADMIN_LEVEL.LEVEL_9 && level <= ADMIN_LEVEL.LEVEL_11;
}

export function isExecutiveLevel(level: AdminLevelType): boolean {
  return level >= ADMIN_LEVEL.LEVEL_12 && level <= ADMIN_LEVEL.LEVEL_15;
}

export function getAdminLevelByExperience(experienceYears: number): AdminLevelType {
  if (experienceYears >= 15) return ADMIN_LEVEL.LEVEL_15;
  if (experienceYears >= 12) return ADMIN_LEVEL.LEVEL_14;
  if (experienceYears >= 10) return ADMIN_LEVEL.LEVEL_13;
  if (experienceYears >= 8) return ADMIN_LEVEL.LEVEL_12;
  if (experienceYears >= 6) return ADMIN_LEVEL.LEVEL_11;
  if (experienceYears >= 5) return ADMIN_LEVEL.LEVEL_10;
  if (experienceYears >= 4) return ADMIN_LEVEL.LEVEL_9;
  if (experienceYears >= 3) return ADMIN_LEVEL.LEVEL_8;
  if (experienceYears >= 2) return ADMIN_LEVEL.LEVEL_7;
  if (experienceYears >= 1) return ADMIN_LEVEL.LEVEL_6;
  return ADMIN_LEVEL.LEVEL_1;
}

export function getAdminLevels(): AdminLevelType[] {
  return Object.values(ADMIN_LEVEL);
}
