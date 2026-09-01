/**
 * Admin Level Constants
 * Admin seniority levels and experience-based classifications
 */

/**
 * Admin experience levels
 */
export const ADMIN_LEVEL = {
  /** Entry-level admin - 0-2 years experience */
  JUNIOR: 'junior',
  /** Mid-level admin - 2-5 years experience */
  SENIOR: 'senior',
  /** Advanced admin - 5-8 years experience */
  EXPERT: 'expert',
  /** Lead admin - 8-10 years experience */
  LEAD: 'lead',
  /** Manager admin - 10+ years experience */
  MANAGER: 'manager',
  /** Director admin - 12+ years experience */
  DIRECTOR: 'director',
  /** VP admin - 15+ years experience */
  VICE_PRESIDENT: 'vice_president',
  /** C-level admin - 20+ years experience */
  C_LEVEL: 'c_level',
  /** Executive admin - 25+ years experience */
  EXECUTIVE: 'executive',
} as const;

export type AdminLevel = (typeof ADMIN_LEVEL)[keyof typeof ADMIN_LEVEL];

/**
 * Admin level experience requirements (in years)
 */
export const ADMIN_LEVEL_EXPERIENCE: Record<AdminLevel, number> = {
  [ADMIN_LEVEL.JUNIOR]: 0,
  [ADMIN_LEVEL.SENIOR]: 2,
  [ADMIN_LEVEL.EXPERT]: 5,
  [ADMIN_LEVEL.LEAD]: 8,
  [ADMIN_LEVEL.MANAGER]: 10,
  [ADMIN_LEVEL.DIRECTOR]: 12,
  [ADMIN_LEVEL.VICE_PRESIDENT]: 15,
  [ADMIN_LEVEL.C_LEVEL]: 20,
  [ADMIN_LEVEL.EXECUTIVE]: 25,
};

/**
 * Admin level hierarchy (higher number = higher level)
 */
export const ADMIN_LEVEL_HIERARCHY: Record<AdminLevel, number> = {
  [ADMIN_LEVEL.JUNIOR]: 10,
  [ADMIN_LEVEL.SENIOR]: 20,
  [ADMIN_LEVEL.EXPERT]: 30,
  [ADMIN_LEVEL.LEAD]: 40,
  [ADMIN_LEVEL.MANAGER]: 50,
  [ADMIN_LEVEL.DIRECTOR]: 60,
  [ADMIN_LEVEL.VICE_PRESIDENT]: 70,
  [ADMIN_LEVEL.C_LEVEL]: 80,
  [ADMIN_LEVEL.EXECUTIVE]: 90,
};

/**
 * Admin level labels
 */
export const ADMIN_LEVEL_LABEL: Record<AdminLevel, string> = {
  [ADMIN_LEVEL.JUNIOR]: 'Junior Admin',
  [ADMIN_LEVEL.SENIOR]: 'Senior Admin',
  [ADMIN_LEVEL.EXPERT]: 'Expert Admin',
  [ADMIN_LEVEL.LEAD]: 'Lead Admin',
  [ADMIN_LEVEL.MANAGER]: 'Admin Manager',
  [ADMIN_LEVEL.DIRECTOR]: 'Admin Director',
  [ADMIN_LEVEL.VICE_PRESIDENT]: 'VP of Administration',
  [ADMIN_LEVEL.C_LEVEL]: 'C-Level Admin',
  [ADMIN_LEVEL.EXECUTIVE]: 'Executive Admin',
};

/**
 * Admin level colors
 */
export const ADMIN_LEVEL_COLOR: Record<AdminLevel, string> = {
  [ADMIN_LEVEL.JUNIOR]: '#6C757D',
  [ADMIN_LEVEL.SENIOR]: '#007BFF',
  [ADMIN_LEVEL.EXPERT]: '#17A2B8',
  [ADMIN_LEVEL.LEAD]: '#28A745',
  [ADMIN_LEVEL.MANAGER]: '#FFC107',
  [ADMIN_LEVEL.DIRECTOR]: '#FD7E14',
  [ADMIN_LEVEL.VICE_PRESIDENT]: '#DC3545',
  [ADMIN_LEVEL.C_LEVEL]: '#6F42C1',
  [ADMIN_LEVEL.EXECUTIVE]: '#343A40',
};

/**
 * Admin level permissions multiplier
 */
export const ADMIN_LEVEL_PERMISSION_MULTIPLIER: Record<AdminLevel, number> = {
  [ADMIN_LEVEL.JUNIOR]: 0.5,
  [ADMIN_LEVEL.SENIOR]: 0.75,
  [ADMIN_LEVEL.EXPERT]: 1.0,
  [ADMIN_LEVEL.LEAD]: 1.25,
  [ADMIN_LEVEL.MANAGER]: 1.5,
  [ADMIN_LEVEL.DIRECTOR]: 1.75,
  [ADMIN_LEVEL.VICE_PRESIDENT]: 2.0,
  [ADMIN_LEVEL.C_LEVEL]: 2.5,
  [ADMIN_LEVEL.EXECUTIVE]: 3.0,
};

/**
 * Admin level salary ranges (in BDT)
 */
export const ADMIN_LEVEL_SALARY_RANGE: Record<AdminLevel, { min: number; max: number }> = {
  [ADMIN_LEVEL.JUNIOR]: { min: 25000, max: 40000 },
  [ADMIN_LEVEL.SENIOR]: { min: 40000, max: 60000 },
  [ADMIN_LEVEL.EXPERT]: { min: 60000, max: 85000 },
  [ADMIN_LEVEL.LEAD]: { min: 85000, max: 120000 },
  [ADMIN_LEVEL.MANAGER]: { min: 120000, max: 180000 },
  [ADMIN_LEVEL.DIRECTOR]: { min: 180000, max: 250000 },
  [ADMIN_LEVEL.VICE_PRESIDENT]: { min: 250000, max: 400000 },
  [ADMIN_LEVEL.C_LEVEL]: { min: 400000, max: 700000 },
  [ADMIN_LEVEL.EXECUTIVE]: { min: 700000, max: 1000000 },
};

/**
 * Get admin level hierarchy number
 */
export function getAdminLevelHierarchy(level: AdminLevel): number {
  return ADMIN_LEVEL_HIERARCHY[level] || 0;
}

/**
 * Get admin level label
 */
export function getAdminLevelLabel(level: AdminLevel): string {
  return ADMIN_LEVEL_LABEL[level] || level;
}

/**
 * Get admin level color
 */
export function getAdminLevelColor(level: AdminLevel): string {
  return ADMIN_LEVEL_COLOR[level] || '#6C757D';
}

/**
 * Get admin level experience requirement
 */
export function getAdminLevelExperience(level: AdminLevel): number {
  return ADMIN_LEVEL_EXPERIENCE[level] || 0;
}

/**
 * Get admin level permission multiplier
 */
export function getAdminLevelPermissionMultiplier(level: AdminLevel): number {
  return ADMIN_LEVEL_PERMISSION_MULTIPLIER[level] || 0.5;
}

/**
 * Get admin level salary range
 */
export function getAdminLevelSalaryRange(level: AdminLevel): { min: number; max: number } {
  return ADMIN_LEVEL_SALARY_RANGE[level] || { min: 0, max: 0 };
}

/**
 * Get admin level based on experience
 */
export function getAdminLevelByExperience(years: number): AdminLevel {
  if (years >= 25) return ADMIN_LEVEL.EXECUTIVE;
  if (years >= 20) return ADMIN_LEVEL.C_LEVEL;
  if (years >= 15) return ADMIN_LEVEL.VICE_PRESIDENT;
  if (years >= 12) return ADMIN_LEVEL.DIRECTOR;
  if (years >= 10) return ADMIN_LEVEL.MANAGER;
  if (years >= 8) return ADMIN_LEVEL.LEAD;
  if (years >= 5) return ADMIN_LEVEL.EXPERT;
  if (years >= 2) return ADMIN_LEVEL.SENIOR;
  return ADMIN_LEVEL.JUNIOR;
}

/**
 * Check if level has higher authority than another level
 */
export function hasHigherLevelAuthority(level1: AdminLevel, level2: AdminLevel): boolean {
  const hierarchy1 = ADMIN_LEVEL_HIERARCHY[level1] || 0;
  const hierarchy2 = ADMIN_LEVEL_HIERARCHY[level2] || 0;
  return hierarchy1 > hierarchy2;
}

/**
 * Get level options for dropdown
 */
export function getAdminLevelOptions(): Array<{
  value: AdminLevel;
  label: string;
}> {
  return (Object.values(ADMIN_LEVEL) as AdminLevel[]).map((level) => ({
    value: level,
    label: ADMIN_LEVEL_LABEL[level] || level,
  }));
}

/**
 * Get recommended level based on role
 * Note: ADMIN_ROLES is imported dynamically to avoid circular dependency
 */
export function getRecommendedLevelForRole(role: string): AdminLevel {
  const roleLevelMap: Record<string, AdminLevel> = {
    super_admin: ADMIN_LEVEL.EXECUTIVE,
    admin: ADMIN_LEVEL.DIRECTOR,
    manager: ADMIN_LEVEL.MANAGER,
    moderator: ADMIN_LEVEL.SENIOR,
    editor: ADMIN_LEVEL.SENIOR,
    viewer: ADMIN_LEVEL.JUNIOR,
    support_agent: ADMIN_LEVEL.JUNIOR,
    developer: ADMIN_LEVEL.EXPERT,
    devops: ADMIN_LEVEL.EXPERT,
    security_admin: ADMIN_LEVEL.LEAD,
    compliance_officer: ADMIN_LEVEL.MANAGER,
    auditor: ADMIN_LEVEL.SENIOR,
    analyst: ADMIN_LEVEL.SENIOR,
    accountant: ADMIN_LEVEL.SENIOR,
    hr_admin: ADMIN_LEVEL.MANAGER,
    vendor_manager: ADMIN_LEVEL.MANAGER,
    product_manager: ADMIN_LEVEL.MANAGER,
    order_manager: ADMIN_LEVEL.MANAGER,
    payment_manager: ADMIN_LEVEL.MANAGER,
  };
  return roleLevelMap[role] || ADMIN_LEVEL.JUNIOR;
}

/**
 * Check if level meets minimum requirement
 */
export function meetsMinimumLevel(currentLevel: AdminLevel, requiredLevel: AdminLevel): boolean {
  const current = ADMIN_LEVEL_HIERARCHY[currentLevel] || 0;
  const required = ADMIN_LEVEL_HIERARCHY[requiredLevel] || 0;
  return current >= required;
}

/**
 * Get all levels below a given level
 */
export function getLevelsBelow(level: AdminLevel): AdminLevel[] {
  const hierarchy = ADMIN_LEVEL_HIERARCHY[level] || 0;
  return (Object.values(ADMIN_LEVEL) as AdminLevel[]).filter(
    (l) => (ADMIN_LEVEL_HIERARCHY[l] || 0) < hierarchy
  );
}

/**
 * Get all levels above a given level
 */
export function getLevelsAbove(level: AdminLevel): AdminLevel[] {
  const hierarchy = ADMIN_LEVEL_HIERARCHY[level] || 0;
  return (Object.values(ADMIN_LEVEL) as AdminLevel[]).filter(
    (l) => (ADMIN_LEVEL_HIERARCHY[l] || 0) > hierarchy
  );
}

/**
 * Get next level
 */
export function getNextLevel(level: AdminLevel): AdminLevel | null {
  const levels = Object.values(ADMIN_LEVEL) as AdminLevel[];
  const sorted = levels.sort(
    (a, b) => (ADMIN_LEVEL_HIERARCHY[a] || 0) - (ADMIN_LEVEL_HIERARCHY[b] || 0)
  );
  const index = sorted.indexOf(level);
  if (index === -1 || index === sorted.length - 1) {
    return null;
  }
  return sorted[index + 1];
}

/**
 * Get previous level
 */
export function getPreviousLevel(level: AdminLevel): AdminLevel | null {
  const levels = Object.values(ADMIN_LEVEL) as AdminLevel[];
  const sorted = levels.sort(
    (a, b) => (ADMIN_LEVEL_HIERARCHY[a] || 0) - (ADMIN_LEVEL_HIERARCHY[b] || 0)
  );
  const index = sorted.indexOf(level);
  if (index <= 0) {
    return null;
  }
  return sorted[index - 1];
}
