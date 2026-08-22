/**
 * Admin Type Constants
 * Admin account type definitions
 */

export const ADMIN_TYPE = {
  SYSTEM: 'system',
  USER: 'user',
  VENDOR: 'vendor',
  PARTNER: 'partner',
  CONSULTANT: 'consultant',
  CONTRACTOR: 'contractor',
  INTERN: 'intern',
  TEMPORARY: 'temporary',
  PERMANENT: 'permanent',
  EXTERNAL: 'external',
  INTERNAL: 'internal',
} as const;

export type AdminTypeType = (typeof ADMIN_TYPE)[keyof typeof ADMIN_TYPE];

export const ADMIN_TYPE_LABELS: Record<AdminTypeType, string> = {
  [ADMIN_TYPE.SYSTEM]: 'System Administrator',
  [ADMIN_TYPE.USER]: 'User Administrator',
  [ADMIN_TYPE.VENDOR]: 'Vendor Administrator',
  [ADMIN_TYPE.PARTNER]: 'Partner Administrator',
  [ADMIN_TYPE.CONSULTANT]: 'Consultant',
  [ADMIN_TYPE.CONTRACTOR]: 'Contractor',
  [ADMIN_TYPE.INTERN]: 'Intern',
  [ADMIN_TYPE.TEMPORARY]: 'Temporary Staff',
  [ADMIN_TYPE.PERMANENT]: 'Permanent Staff',
  [ADMIN_TYPE.EXTERNAL]: 'External User',
  [ADMIN_TYPE.INTERNAL]: 'Internal User',
};

export type AdminTypeLabel = (typeof ADMIN_TYPE_LABELS)[keyof typeof ADMIN_TYPE_LABELS];

export const ADMIN_TYPE_DESCRIPTIONS: Record<AdminTypeType, string> = {
  [ADMIN_TYPE.SYSTEM]: 'System-level administrator with full access',
  [ADMIN_TYPE.USER]: 'User management administrator',
  [ADMIN_TYPE.VENDOR]: 'Vendor management administrator',
  [ADMIN_TYPE.PARTNER]: 'Partner management administrator',
  [ADMIN_TYPE.CONSULTANT]: 'External consultant with limited access',
  [ADMIN_TYPE.CONTRACTOR]: 'Contractor with temporary access',
  [ADMIN_TYPE.INTERN]: 'Intern with supervised access',
  [ADMIN_TYPE.TEMPORARY]: 'Temporary staff with time-limited access',
  [ADMIN_TYPE.PERMANENT]: 'Permanent staff with full access',
  [ADMIN_TYPE.EXTERNAL]: 'External user with restricted access',
  [ADMIN_TYPE.INTERNAL]: 'Internal user with standard access',
};

export type AdminTypeDescription =
  (typeof ADMIN_TYPE_DESCRIPTIONS)[keyof typeof ADMIN_TYPE_DESCRIPTIONS];

export const ADMIN_TYPE_REQUIREMENTS: Record<
  AdminTypeType,
  {
    minAge: number;
    requiredDocuments: string[];
    trainingRequired: boolean;
    certificationRequired: boolean;
  }
> = {
  [ADMIN_TYPE.SYSTEM]: {
    minAge: 18,
    requiredDocuments: ['nid', 'passport', 'background_check'],
    trainingRequired: true,
    certificationRequired: true,
  },
  [ADMIN_TYPE.USER]: {
    minAge: 18,
    requiredDocuments: ['nid', 'background_check'],
    trainingRequired: true,
    certificationRequired: false,
  },
  [ADMIN_TYPE.VENDOR]: {
    minAge: 21,
    requiredDocuments: ['nid', 'tin', 'trade_license'],
    trainingRequired: true,
    certificationRequired: true,
  },
  [ADMIN_TYPE.PARTNER]: {
    minAge: 21,
    requiredDocuments: ['nid', 'tin', 'partnership_deed'],
    trainingRequired: true,
    certificationRequired: true,
  },
  [ADMIN_TYPE.CONSULTANT]: {
    minAge: 25,
    requiredDocuments: ['nid', 'cv', 'reference_letters'],
    trainingRequired: false,
    certificationRequired: true,
  },
  [ADMIN_TYPE.CONTRACTOR]: {
    minAge: 18,
    requiredDocuments: ['nid', 'contract_agreement'],
    trainingRequired: false,
    certificationRequired: false,
  },
  [ADMIN_TYPE.INTERN]: {
    minAge: 16,
    requiredDocuments: ['nid', 'student_id'],
    trainingRequired: true,
    certificationRequired: false,
  },
  [ADMIN_TYPE.TEMPORARY]: {
    minAge: 18,
    requiredDocuments: ['nid'],
    trainingRequired: true,
    certificationRequired: false,
  },
  [ADMIN_TYPE.PERMANENT]: {
    minAge: 18,
    requiredDocuments: ['nid', 'background_check'],
    trainingRequired: true,
    certificationRequired: false,
  },
  [ADMIN_TYPE.EXTERNAL]: {
    minAge: 18,
    requiredDocuments: ['nid', 'verification_letter'],
    trainingRequired: false,
    certificationRequired: false,
  },
  [ADMIN_TYPE.INTERNAL]: {
    minAge: 18,
    requiredDocuments: ['nid'],
    trainingRequired: true,
    certificationRequired: false,
  },
};

export type AdminTypeRequirement =
  (typeof ADMIN_TYPE_REQUIREMENTS)[keyof typeof ADMIN_TYPE_REQUIREMENTS];

export const INTERNAL_ADMIN_TYPES: AdminTypeType[] = [
  ADMIN_TYPE.SYSTEM,
  ADMIN_TYPE.USER,
  ADMIN_TYPE.VENDOR,
  ADMIN_TYPE.PARTNER,
  ADMIN_TYPE.PERMANENT,
  ADMIN_TYPE.INTERNAL,
];

export const EXTERNAL_ADMIN_TYPES: AdminTypeType[] = [
  ADMIN_TYPE.CONSULTANT,
  ADMIN_TYPE.CONTRACTOR,
  ADMIN_TYPE.INTERN,
  ADMIN_TYPE.TEMPORARY,
  ADMIN_TYPE.EXTERNAL,
];

export const EMPLOYMENT_ADMIN_TYPES: AdminTypeType[] = [
  ADMIN_TYPE.PERMANENT,
  ADMIN_TYPE.TEMPORARY,
  ADMIN_TYPE.CONTRACTOR,
  ADMIN_TYPE.INTERN,
];

export const MANAGEMENT_ADMIN_TYPES: AdminTypeType[] = [
  ADMIN_TYPE.SYSTEM,
  ADMIN_TYPE.USER,
  ADMIN_TYPE.VENDOR,
  ADMIN_TYPE.PARTNER,
];

export function getAdminTypeLabel(type: AdminTypeType): string {
  return ADMIN_TYPE_LABELS[type] || 'Unknown Type';
}

export function getAdminTypeDescription(type: AdminTypeType): string {
  return ADMIN_TYPE_DESCRIPTIONS[type] || 'No description available';
}

export function getAdminTypeRequirements(type: AdminTypeType): AdminTypeRequirement {
  return (
    ADMIN_TYPE_REQUIREMENTS[type] || {
      minAge: 18,
      requiredDocuments: ['nid'],
      trainingRequired: false,
      certificationRequired: false,
    }
  );
}

export function isInternalAdminType(type: AdminTypeType): boolean {
  return INTERNAL_ADMIN_TYPES.includes(type);
}

export function isExternalAdminType(type: AdminTypeType): boolean {
  return EXTERNAL_ADMIN_TYPES.includes(type);
}

export function isEmploymentAdminType(type: AdminTypeType): boolean {
  return EMPLOYMENT_ADMIN_TYPES.includes(type);
}

export function isManagementAdminType(type: AdminTypeType): boolean {
  return MANAGEMENT_ADMIN_TYPES.includes(type);
}

export function getAdminTypes(): AdminTypeType[] {
  return Object.values(ADMIN_TYPE);
}
