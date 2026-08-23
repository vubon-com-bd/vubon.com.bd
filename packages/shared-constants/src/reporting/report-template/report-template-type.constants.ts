/**
 * Report Template Type Constants
 * Types and classifications of report templates
 */

export const REPORT_TEMPLATE_TYPE = {
  // Template Types
  TYPES: {
    // Standard Templates
    STANDARD: 'standard',
    EXECUTIVE: 'executive',
    ANALYTICAL: 'analytical',
    OPERATIONAL: 'operational',
    FINANCIAL: 'financial',

    // Specialized Templates
    SALES: 'sales',
    MARKETING: 'marketing',
    CUSTOMER: 'customer',
    PRODUCT: 'product',
    VENDOR: 'vendor',
    LOGISTICS: 'logistics',
    SUPPORT: 'support',
    HR: 'hr',

    // Format Templates
    DASHBOARD: 'dashboard',
    REPORT_CARD: 'report_card',
    SCORECARD: 'scorecard',
    SNAPSHOT: 'snapshot',
    TREND: 'trend',
    COMPARISON: 'comparison',

    // Custom Templates
    CUSTOM: 'custom',
    BLANK: 'blank',
  } as const,

  // Template Complexity Levels
  COMPLEXITY: {
    BASIC: 'basic',
    INTERMEDIATE: 'intermediate',
    ADVANCED: 'advanced',
    EXPERT: 'expert',
  } as const,

  // Template Usage
  USAGE: {
    INTERNAL: 'internal',
    EXTERNAL: 'external',
    CLIENT: 'client',
    VENDOR: 'vendor',
    PARTNER: 'partner',
    PUBLIC: 'public',
  } as const,

  // Template Audience
  AUDIENCE: {
    EXECUTIVES: 'executives',
    MANAGERS: 'managers',
    ANALYSTS: 'analysts',
    OPERATIONS: 'operations',
    SALES_TEAM: 'sales_team',
    MARKETING_TEAM: 'marketing_team',
    SUPPORT_TEAM: 'support_team',
    DEVELOPERS: 'developers',
    CLIENTS: 'clients',
    VENDORS: 'vendors',
    PUBLIC: 'public',
  } as const,

  // Template Purpose
  PURPOSE: {
    REPORTING: 'reporting',
    ANALYSIS: 'analysis',
    DECISION_MAKING: 'decision_making',
    PRESENTATION: 'presentation',
    DOCUMENTATION: 'documentation',
    COMMUNICATION: 'communication',
    COMPLIANCE: 'compliance',
    AUDIT: 'audit',
  } as const,

  // Template Industries
  INDUSTRIES: {
    ECOMMERCE: 'ecommerce',
    RETAIL: 'retail',
    FINANCE: 'finance',
    HEALTHCARE: 'healthcare',
    TECHNOLOGY: 'technology',
    EDUCATION: 'education',
    MANUFACTURING: 'manufacturing',
    LOGISTICS: 'logistics',
    CONSULTING: 'consulting',
    REAL_ESTATE: 'real_estate',
  } as const,

  // Template Languages
  LANGUAGES: {
    EN: 'en',
    BN: 'bn',
    HI: 'hi',
    AR: 'ar',
    ES: 'es',
    FR: 'fr',
    DE: 'de',
    ZH: 'zh',
    JA: 'ja',
    RU: 'ru',
  } as const,
} as const;

// Template Types
export type ReportTemplateTypeType =
  (typeof REPORT_TEMPLATE_TYPE.TYPES)[keyof typeof REPORT_TEMPLATE_TYPE.TYPES];

// Template Complexity
export type ReportTemplateComplexity =
  (typeof REPORT_TEMPLATE_TYPE.COMPLEXITY)[keyof typeof REPORT_TEMPLATE_TYPE.COMPLEXITY];

// Template Usage
export type ReportTemplateUsage =
  (typeof REPORT_TEMPLATE_TYPE.USAGE)[keyof typeof REPORT_TEMPLATE_TYPE.USAGE];

// Template Audience
export type ReportTemplateAudience =
  (typeof REPORT_TEMPLATE_TYPE.AUDIENCE)[keyof typeof REPORT_TEMPLATE_TYPE.AUDIENCE];

// Template Purpose
export type ReportTemplatePurpose =
  (typeof REPORT_TEMPLATE_TYPE.PURPOSE)[keyof typeof REPORT_TEMPLATE_TYPE.PURPOSE];

// Template Industries
export type ReportTemplateIndustry =
  (typeof REPORT_TEMPLATE_TYPE.INDUSTRIES)[keyof typeof REPORT_TEMPLATE_TYPE.INDUSTRIES];

// Template Languages
export type ReportTemplateLanguage =
  (typeof REPORT_TEMPLATE_TYPE.LANGUAGES)[keyof typeof REPORT_TEMPLATE_TYPE.LANGUAGES];

// Utility Functions
export function reportTemplateTypeGetTypeLabel(type: ReportTemplateTypeType): string {
  const labels: Record<ReportTemplateTypeType, string> = {
    [REPORT_TEMPLATE_TYPE.TYPES.STANDARD]: 'Standard Template',
    [REPORT_TEMPLATE_TYPE.TYPES.EXECUTIVE]: 'Executive Template',
    [REPORT_TEMPLATE_TYPE.TYPES.ANALYTICAL]: 'Analytical Template',
    [REPORT_TEMPLATE_TYPE.TYPES.OPERATIONAL]: 'Operational Template',
    [REPORT_TEMPLATE_TYPE.TYPES.FINANCIAL]: 'Financial Template',
    [REPORT_TEMPLATE_TYPE.TYPES.SALES]: 'Sales Template',
    [REPORT_TEMPLATE_TYPE.TYPES.MARKETING]: 'Marketing Template',
    [REPORT_TEMPLATE_TYPE.TYPES.CUSTOMER]: 'Customer Template',
    [REPORT_TEMPLATE_TYPE.TYPES.PRODUCT]: 'Product Template',
    [REPORT_TEMPLATE_TYPE.TYPES.VENDOR]: 'Vendor Template',
    [REPORT_TEMPLATE_TYPE.TYPES.LOGISTICS]: 'Logistics Template',
    [REPORT_TEMPLATE_TYPE.TYPES.SUPPORT]: 'Support Template',
    [REPORT_TEMPLATE_TYPE.TYPES.HR]: 'HR Template',
    [REPORT_TEMPLATE_TYPE.TYPES.DASHBOARD]: 'Dashboard Template',
    [REPORT_TEMPLATE_TYPE.TYPES.REPORT_CARD]: 'Report Card Template',
    [REPORT_TEMPLATE_TYPE.TYPES.SCORECARD]: 'Scorecard Template',
    [REPORT_TEMPLATE_TYPE.TYPES.SNAPSHOT]: 'Snapshot Template',
    [REPORT_TEMPLATE_TYPE.TYPES.TREND]: 'Trend Template',
    [REPORT_TEMPLATE_TYPE.TYPES.COMPARISON]: 'Comparison Template',
    [REPORT_TEMPLATE_TYPE.TYPES.CUSTOM]: 'Custom Template',
    [REPORT_TEMPLATE_TYPE.TYPES.BLANK]: 'Blank Template',
  };
  return labels[type] || 'Unknown Template Type';
}

export function reportTemplateTypeGetComplexityLabel(complexity: ReportTemplateComplexity): string {
  const labels: Record<ReportTemplateComplexity, string> = {
    [REPORT_TEMPLATE_TYPE.COMPLEXITY.BASIC]: 'Basic',
    [REPORT_TEMPLATE_TYPE.COMPLEXITY.INTERMEDIATE]: 'Intermediate',
    [REPORT_TEMPLATE_TYPE.COMPLEXITY.ADVANCED]: 'Advanced',
    [REPORT_TEMPLATE_TYPE.COMPLEXITY.EXPERT]: 'Expert',
  };
  return labels[complexity] || 'Unknown Complexity';
}

export function reportTemplateTypeGetUsageLabel(usage: ReportTemplateUsage): string {
  const labels: Record<ReportTemplateUsage, string> = {
    [REPORT_TEMPLATE_TYPE.USAGE.INTERNAL]: 'Internal Use',
    [REPORT_TEMPLATE_TYPE.USAGE.EXTERNAL]: 'External Use',
    [REPORT_TEMPLATE_TYPE.USAGE.CLIENT]: 'Client Use',
    [REPORT_TEMPLATE_TYPE.USAGE.VENDOR]: 'Vendor Use',
    [REPORT_TEMPLATE_TYPE.USAGE.PARTNER]: 'Partner Use',
    [REPORT_TEMPLATE_TYPE.USAGE.PUBLIC]: 'Public Use',
  };
  return labels[usage] || 'Unknown Usage';
}

export function reportTemplateTypeGetAudienceLabel(audience: ReportTemplateAudience): string {
  const labels: Record<ReportTemplateAudience, string> = {
    [REPORT_TEMPLATE_TYPE.AUDIENCE.EXECUTIVES]: 'Executives',
    [REPORT_TEMPLATE_TYPE.AUDIENCE.MANAGERS]: 'Managers',
    [REPORT_TEMPLATE_TYPE.AUDIENCE.ANALYSTS]: 'Analysts',
    [REPORT_TEMPLATE_TYPE.AUDIENCE.OPERATIONS]: 'Operations Team',
    [REPORT_TEMPLATE_TYPE.AUDIENCE.SALES_TEAM]: 'Sales Team',
    [REPORT_TEMPLATE_TYPE.AUDIENCE.MARKETING_TEAM]: 'Marketing Team',
    [REPORT_TEMPLATE_TYPE.AUDIENCE.SUPPORT_TEAM]: 'Support Team',
    [REPORT_TEMPLATE_TYPE.AUDIENCE.DEVELOPERS]: 'Developers',
    [REPORT_TEMPLATE_TYPE.AUDIENCE.CLIENTS]: 'Clients',
    [REPORT_TEMPLATE_TYPE.AUDIENCE.VENDORS]: 'Vendors',
    [REPORT_TEMPLATE_TYPE.AUDIENCE.PUBLIC]: 'Public',
  };
  return labels[audience] || 'Unknown Audience';
}

export function reportTemplateTypeGetPurposeLabel(purpose: ReportTemplatePurpose): string {
  const labels: Record<ReportTemplatePurpose, string> = {
    [REPORT_TEMPLATE_TYPE.PURPOSE.REPORTING]: 'Reporting',
    [REPORT_TEMPLATE_TYPE.PURPOSE.ANALYSIS]: 'Analysis',
    [REPORT_TEMPLATE_TYPE.PURPOSE.DECISION_MAKING]: 'Decision Making',
    [REPORT_TEMPLATE_TYPE.PURPOSE.PRESENTATION]: 'Presentation',
    [REPORT_TEMPLATE_TYPE.PURPOSE.DOCUMENTATION]: 'Documentation',
    [REPORT_TEMPLATE_TYPE.PURPOSE.COMMUNICATION]: 'Communication',
    [REPORT_TEMPLATE_TYPE.PURPOSE.COMPLIANCE]: 'Compliance',
    [REPORT_TEMPLATE_TYPE.PURPOSE.AUDIT]: 'Audit',
  };
  return labels[purpose] || 'Unknown Purpose';
}

export function reportTemplateTypeGetIndustryLabel(industry: ReportTemplateIndustry): string {
  const labels: Record<ReportTemplateIndustry, string> = {
    [REPORT_TEMPLATE_TYPE.INDUSTRIES.ECOMMERCE]: 'E-commerce',
    [REPORT_TEMPLATE_TYPE.INDUSTRIES.RETAIL]: 'Retail',
    [REPORT_TEMPLATE_TYPE.INDUSTRIES.FINANCE]: 'Finance',
    [REPORT_TEMPLATE_TYPE.INDUSTRIES.HEALTHCARE]: 'Healthcare',
    [REPORT_TEMPLATE_TYPE.INDUSTRIES.TECHNOLOGY]: 'Technology',
    [REPORT_TEMPLATE_TYPE.INDUSTRIES.EDUCATION]: 'Education',
    [REPORT_TEMPLATE_TYPE.INDUSTRIES.MANUFACTURING]: 'Manufacturing',
    [REPORT_TEMPLATE_TYPE.INDUSTRIES.LOGISTICS]: 'Logistics',
    [REPORT_TEMPLATE_TYPE.INDUSTRIES.CONSULTING]: 'Consulting',
    [REPORT_TEMPLATE_TYPE.INDUSTRIES.REAL_ESTATE]: 'Real Estate',
  };
  return labels[industry] || 'Unknown Industry';
}

export function reportTemplateTypeGetLanguageLabel(language: ReportTemplateLanguage): string {
  const labels: Record<ReportTemplateLanguage, string> = {
    [REPORT_TEMPLATE_TYPE.LANGUAGES.EN]: 'English',
    [REPORT_TEMPLATE_TYPE.LANGUAGES.BN]: 'Bengali',
    [REPORT_TEMPLATE_TYPE.LANGUAGES.HI]: 'Hindi',
    [REPORT_TEMPLATE_TYPE.LANGUAGES.AR]: 'Arabic',
    [REPORT_TEMPLATE_TYPE.LANGUAGES.ES]: 'Spanish',
    [REPORT_TEMPLATE_TYPE.LANGUAGES.FR]: 'French',
    [REPORT_TEMPLATE_TYPE.LANGUAGES.DE]: 'German',
    [REPORT_TEMPLATE_TYPE.LANGUAGES.ZH]: 'Chinese',
    [REPORT_TEMPLATE_TYPE.LANGUAGES.JA]: 'Japanese',
    [REPORT_TEMPLATE_TYPE.LANGUAGES.RU]: 'Russian',
  };
  return labels[language] || 'Unknown Language';
}

export function reportTemplateTypeIsValidType(type: string): type is ReportTemplateTypeType {
  return Object.values(REPORT_TEMPLATE_TYPE.TYPES).includes(type as ReportTemplateTypeType);
}

export function reportTemplateTypeIsValidComplexity(
  complexity: string
): complexity is ReportTemplateComplexity {
  return Object.values(REPORT_TEMPLATE_TYPE.COMPLEXITY).includes(
    complexity as ReportTemplateComplexity
  );
}
