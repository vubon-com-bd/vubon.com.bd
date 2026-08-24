/**
 * Admin Department Constants
 * Admin department and division definitions
 */

export const ADMIN_DEPARTMENT = {
  IT: 'it',
  HR: 'hr',
  FINANCE: 'finance',
  MARKETING: 'marketing',
  SALES: 'sales',
  SUPPORT: 'support',
  OPERATIONS: 'operations',
  LOGISTICS: 'logistics',
  PRODUCT: 'product',
  CONTENT: 'content',
  LEGAL: 'legal',
  COMPLIANCE: 'compliance',
  SECURITY: 'security',
  DATA: 'data',
  ANALYTICS: 'analytics',
  RESEARCH: 'research',
  DEVELOPMENT: 'development',
  DESIGN: 'design',
  PROCUREMENT: 'procurement',
  QUALITY: 'quality',
  TRAINING: 'training',
  COMMUNICATION: 'communication',
  ADMINISTRATION: 'administration',
} as const;

export type AdminDepartmentType = (typeof ADMIN_DEPARTMENT)[keyof typeof ADMIN_DEPARTMENT];

export const ADMIN_DEPARTMENT_LABELS: Record<AdminDepartmentType, string> = {
  [ADMIN_DEPARTMENT.IT]: 'Information Technology',
  [ADMIN_DEPARTMENT.HR]: 'Human Resources',
  [ADMIN_DEPARTMENT.FINANCE]: 'Finance',
  [ADMIN_DEPARTMENT.MARKETING]: 'Marketing',
  [ADMIN_DEPARTMENT.SALES]: 'Sales',
  [ADMIN_DEPARTMENT.SUPPORT]: 'Customer Support',
  [ADMIN_DEPARTMENT.OPERATIONS]: 'Operations',
  [ADMIN_DEPARTMENT.LOGISTICS]: 'Logistics',
  [ADMIN_DEPARTMENT.PRODUCT]: 'Product Management',
  [ADMIN_DEPARTMENT.CONTENT]: 'Content Management',
  [ADMIN_DEPARTMENT.LEGAL]: 'Legal',
  [ADMIN_DEPARTMENT.COMPLIANCE]: 'Compliance',
  [ADMIN_DEPARTMENT.SECURITY]: 'Security',
  [ADMIN_DEPARTMENT.DATA]: 'Data Management',
  [ADMIN_DEPARTMENT.ANALYTICS]: 'Analytics',
  [ADMIN_DEPARTMENT.RESEARCH]: 'Research & Development',
  [ADMIN_DEPARTMENT.DEVELOPMENT]: 'Development',
  [ADMIN_DEPARTMENT.DESIGN]: 'Design',
  [ADMIN_DEPARTMENT.PROCUREMENT]: 'Procurement',
  [ADMIN_DEPARTMENT.QUALITY]: 'Quality Assurance',
  [ADMIN_DEPARTMENT.TRAINING]: 'Training & Development',
  [ADMIN_DEPARTMENT.COMMUNICATION]: 'Communication',
  [ADMIN_DEPARTMENT.ADMINISTRATION]: 'Administration',
};

export type AdminDepartmentLabel =
  (typeof ADMIN_DEPARTMENT_LABELS)[keyof typeof ADMIN_DEPARTMENT_LABELS];

export const ADMIN_DEPARTMENT_DESCRIPTIONS: Record<AdminDepartmentType, string> = {
  [ADMIN_DEPARTMENT.IT]: 'Technology infrastructure and systems management',
  [ADMIN_DEPARTMENT.HR]: 'Human resources, recruitment, and employee management',
  [ADMIN_DEPARTMENT.FINANCE]: 'Financial management, accounting, and budgeting',
  [ADMIN_DEPARTMENT.MARKETING]: 'Marketing strategy, campaigns, and brand management',
  [ADMIN_DEPARTMENT.SALES]: 'Sales operations, client management, and revenue',
  [ADMIN_DEPARTMENT.SUPPORT]: 'Customer service, support tickets, and satisfaction',
  [ADMIN_DEPARTMENT.OPERATIONS]: 'Business operations, process improvement, and efficiency',
  [ADMIN_DEPARTMENT.LOGISTICS]: 'Supply chain, shipping, and delivery management',
  [ADMIN_DEPARTMENT.PRODUCT]: 'Product strategy, roadmap, and development',
  [ADMIN_DEPARTMENT.CONTENT]: 'Content creation, curation, and management',
  [ADMIN_DEPARTMENT.LEGAL]: 'Legal affairs, contracts, and compliance',
  [ADMIN_DEPARTMENT.COMPLIANCE]: 'Regulatory compliance, audits, and policies',
  [ADMIN_DEPARTMENT.SECURITY]: 'Security management, threat detection, and prevention',
  [ADMIN_DEPARTMENT.DATA]: 'Data governance, quality, and management',
  [ADMIN_DEPARTMENT.ANALYTICS]: 'Data analytics, insights, and reporting',
  [ADMIN_DEPARTMENT.RESEARCH]: 'Research, innovation, and development',
  [ADMIN_DEPARTMENT.DEVELOPMENT]: 'Software development and engineering',
  [ADMIN_DEPARTMENT.DESIGN]: 'Design, UX, and creative services',
  [ADMIN_DEPARTMENT.PROCUREMENT]: 'Purchasing, vendor management, and sourcing',
  [ADMIN_DEPARTMENT.QUALITY]: 'Quality assurance, testing, and standards',
  [ADMIN_DEPARTMENT.TRAINING]: 'Training, development, and learning',
  [ADMIN_DEPARTMENT.COMMUNICATION]: 'Internal communication, PR, and outreach',
  [ADMIN_DEPARTMENT.ADMINISTRATION]: 'Administrative services and office management',
};

export type AdminDepartmentDescription =
  (typeof ADMIN_DEPARTMENT_DESCRIPTIONS)[keyof typeof ADMIN_DEPARTMENT_DESCRIPTIONS];

export const ADMIN_DEPARTMENT_HEAD_COUNT: Record<AdminDepartmentType, number> = {
  [ADMIN_DEPARTMENT.IT]: 50,
  [ADMIN_DEPARTMENT.HR]: 20,
  [ADMIN_DEPARTMENT.FINANCE]: 25,
  [ADMIN_DEPARTMENT.MARKETING]: 30,
  [ADMIN_DEPARTMENT.SALES]: 40,
  [ADMIN_DEPARTMENT.SUPPORT]: 35,
  [ADMIN_DEPARTMENT.OPERATIONS]: 45,
  [ADMIN_DEPARTMENT.LOGISTICS]: 30,
  [ADMIN_DEPARTMENT.PRODUCT]: 20,
  [ADMIN_DEPARTMENT.CONTENT]: 15,
  [ADMIN_DEPARTMENT.LEGAL]: 10,
  [ADMIN_DEPARTMENT.COMPLIANCE]: 12,
  [ADMIN_DEPARTMENT.SECURITY]: 15,
  [ADMIN_DEPARTMENT.DATA]: 18,
  [ADMIN_DEPARTMENT.ANALYTICS]: 12,
  [ADMIN_DEPARTMENT.RESEARCH]: 10,
  [ADMIN_DEPARTMENT.DEVELOPMENT]: 25,
  [ADMIN_DEPARTMENT.DESIGN]: 15,
  [ADMIN_DEPARTMENT.PROCUREMENT]: 8,
  [ADMIN_DEPARTMENT.QUALITY]: 10,
  [ADMIN_DEPARTMENT.TRAINING]: 8,
  [ADMIN_DEPARTMENT.COMMUNICATION]: 6,
  [ADMIN_DEPARTMENT.ADMINISTRATION]: 10,
};

export type AdminDepartmentHeadCount =
  (typeof ADMIN_DEPARTMENT_HEAD_COUNT)[keyof typeof ADMIN_DEPARTMENT_HEAD_COUNT];

export const ADMIN_DEPARTMENT_BUDGET: Record<AdminDepartmentType, number> = {
  [ADMIN_DEPARTMENT.IT]: 1000000,
  [ADMIN_DEPARTMENT.HR]: 500000,
  [ADMIN_DEPARTMENT.FINANCE]: 750000,
  [ADMIN_DEPARTMENT.MARKETING]: 1500000,
  [ADMIN_DEPARTMENT.SALES]: 1200000,
  [ADMIN_DEPARTMENT.SUPPORT]: 800000,
  [ADMIN_DEPARTMENT.OPERATIONS]: 900000,
  [ADMIN_DEPARTMENT.LOGISTICS]: 1100000,
  [ADMIN_DEPARTMENT.PRODUCT]: 1000000,
  [ADMIN_DEPARTMENT.CONTENT]: 600000,
  [ADMIN_DEPARTMENT.LEGAL]: 400000,
  [ADMIN_DEPARTMENT.COMPLIANCE]: 350000,
  [ADMIN_DEPARTMENT.SECURITY]: 700000,
  [ADMIN_DEPARTMENT.DATA]: 650000,
  [ADMIN_DEPARTMENT.ANALYTICS]: 450000,
  [ADMIN_DEPARTMENT.RESEARCH]: 800000,
  [ADMIN_DEPARTMENT.DEVELOPMENT]: 1200000,
  [ADMIN_DEPARTMENT.DESIGN]: 500000,
  [ADMIN_DEPARTMENT.PROCUREMENT]: 300000,
  [ADMIN_DEPARTMENT.QUALITY]: 400000,
  [ADMIN_DEPARTMENT.TRAINING]: 350000,
  [ADMIN_DEPARTMENT.COMMUNICATION]: 250000,
  [ADMIN_DEPARTMENT.ADMINISTRATION]: 300000,
};

export type AdminDepartmentBudget =
  (typeof ADMIN_DEPARTMENT_BUDGET)[keyof typeof ADMIN_DEPARTMENT_BUDGET];

export const ADMIN_TECH_DEPARTMENTS: AdminDepartmentType[] = [
  ADMIN_DEPARTMENT.IT,
  ADMIN_DEPARTMENT.DEVELOPMENT,
  ADMIN_DEPARTMENT.DATA,
  ADMIN_DEPARTMENT.ANALYTICS,
  ADMIN_DEPARTMENT.SECURITY,
];

export const ADMIN_BUSINESS_DEPARTMENTS: AdminDepartmentType[] = [
  ADMIN_DEPARTMENT.MARKETING,
  ADMIN_DEPARTMENT.SALES,
  ADMIN_DEPARTMENT.FINANCE,
  ADMIN_DEPARTMENT.OPERATIONS,
  ADMIN_DEPARTMENT.PROCUREMENT,
];

export const ADMIN_SUPPORT_DEPARTMENTS: AdminDepartmentType[] = [
  ADMIN_DEPARTMENT.SUPPORT,
  ADMIN_DEPARTMENT.HR,
  ADMIN_DEPARTMENT.ADMINISTRATION,
  ADMIN_DEPARTMENT.COMMUNICATION,
];

export function getAdminDepartmentLabel(department: AdminDepartmentType): string {
  return ADMIN_DEPARTMENT_LABELS[department] || 'Unknown Department';
}

export function getAdminDepartmentDescription(department: AdminDepartmentType): string {
  return ADMIN_DEPARTMENT_DESCRIPTIONS[department] || 'No description available';
}

export function getAdminDepartmentHeadCount(department: AdminDepartmentType): number {
  return ADMIN_DEPARTMENT_HEAD_COUNT[department] || 0;
}

export function getAdminDepartmentBudget(department: AdminDepartmentType): number {
  return ADMIN_DEPARTMENT_BUDGET[department] || 0;
}

export function isAdminTechDepartment(department: AdminDepartmentType): boolean {
  return ADMIN_TECH_DEPARTMENTS.includes(department);
}

export function isAdminBusinessDepartment(department: AdminDepartmentType): boolean {
  return ADMIN_BUSINESS_DEPARTMENTS.includes(department);
}

export function isAdminSupportDepartment(department: AdminDepartmentType): boolean {
  return ADMIN_SUPPORT_DEPARTMENTS.includes(department);
}

export function getAdminDepartments(): AdminDepartmentType[] {
  return Object.values(ADMIN_DEPARTMENT);
}
