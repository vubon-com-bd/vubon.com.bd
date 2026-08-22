/**
 * SEO Audit Type Constants
 * Types and classifications for SEO audits
 */

export const SEO_AUDIT_TYPE = {
  // Audit Categories
  CATEGORIES: {
    TECHNICAL: 'technical',
    CONTENT: 'content',
    STRUCTURAL: 'structural',
    STRATEGIC: 'strategic',
    OPERATIONAL: 'operational',
    COMPLIANCE: 'compliance',
    PERFORMANCE: 'performance',
  } as const,

  // Audit Methodologies
  METHODOLOGIES: {
    AUTOMATED: 'automated',
    MANUAL: 'manual',
    HYBRID: 'hybrid',
    AI_DRIVEN: 'ai_driven',
    DATA_DRIVEN: 'data_driven',
  } as const,

  // Audit Approaches
  APPROACHES: {
    COMPREHENSIVE: 'comprehensive',
    TARGETED: 'targeted',
    SPOT: 'spot',
    COMPARATIVE: 'comparative',
    DIAGNOSTIC: 'diagnostic',
    PREVENTIVE: 'preventive',
  } as const,

  // Audit Complexity
  COMPLEXITY: {
    BASIC: 'basic',
    INTERMEDIATE: 'intermediate',
    ADVANCED: 'advanced',
    EXPERT: 'expert',
  } as const,

  // Audit Deliverables
  DELIVERABLES: {
    REPORT: 'report',
    CHECKLIST: 'checklist',
    ACTION_PLAN: 'action_plan',
    RECOMMENDATIONS: 'recommendations',
    TRACKING: 'tracking',
    DASHBOARD: 'dashboard',
    PRESENTATION: 'presentation',
  } as const,

  // Audit Phase
  PHASES: {
    PLANNING: 'planning',
    DATA_COLLECTION: 'data_collection',
    ANALYSIS: 'analysis',
    REPORTING: 'reporting',
    PRESENTATION: 'presentation',
    IMPLEMENTATION: 'implementation',
    FOLLOW_UP: 'follow_up',
  } as const,

  // Audit Depth
  DEPTH: {
    OVERVIEW: 'overview',
    STANDARD: 'standard',
    IN_DEPTH: 'in_depth',
    FORENSIC: 'forensic',
  } as const,

  // Audit Focus
  FOCUS: {
    SITE_WIDE: 'site_wide',
    PAGE_LEVEL: 'page_level',
    SECTION_LEVEL: 'section_level',
    COMPETITOR: 'competitor',
    INDUSTRY: 'industry',
  } as const,
} as const;

// Audit Categories
export type SEOAuditTypeCategory =
  (typeof SEO_AUDIT_TYPE.CATEGORIES)[keyof typeof SEO_AUDIT_TYPE.CATEGORIES];

// Audit Methodologies
export type SEOAuditTypeMethodology =
  (typeof SEO_AUDIT_TYPE.METHODOLOGIES)[keyof typeof SEO_AUDIT_TYPE.METHODOLOGIES];

// Audit Approaches
export type SEOAuditTypeApproach =
  (typeof SEO_AUDIT_TYPE.APPROACHES)[keyof typeof SEO_AUDIT_TYPE.APPROACHES];

// Audit Complexity
export type SEOAuditTypeComplexity =
  (typeof SEO_AUDIT_TYPE.COMPLEXITY)[keyof typeof SEO_AUDIT_TYPE.COMPLEXITY];

// Audit Deliverables
export type SEOAuditTypeDeliverable =
  (typeof SEO_AUDIT_TYPE.DELIVERABLES)[keyof typeof SEO_AUDIT_TYPE.DELIVERABLES];

// Audit Phases
export type SEOAuditTypePhase = (typeof SEO_AUDIT_TYPE.PHASES)[keyof typeof SEO_AUDIT_TYPE.PHASES];

// Audit Depth
export type SEOAuditTypeDepth = (typeof SEO_AUDIT_TYPE.DEPTH)[keyof typeof SEO_AUDIT_TYPE.DEPTH];

// Audit Focus
export type SEOAuditTypeFocus = (typeof SEO_AUDIT_TYPE.FOCUS)[keyof typeof SEO_AUDIT_TYPE.FOCUS];

// Utility Functions
export function getSEOAuditCategoryTypeLabel(category: SEOAuditTypeCategory): string {
  const labels: Record<SEOAuditTypeCategory, string> = {
    [SEO_AUDIT_TYPE.CATEGORIES.TECHNICAL]: 'Technical Audit',
    [SEO_AUDIT_TYPE.CATEGORIES.CONTENT]: 'Content Audit',
    [SEO_AUDIT_TYPE.CATEGORIES.STRUCTURAL]: 'Structural Audit',
    [SEO_AUDIT_TYPE.CATEGORIES.STRATEGIC]: 'Strategic Audit',
    [SEO_AUDIT_TYPE.CATEGORIES.OPERATIONAL]: 'Operational Audit',
    [SEO_AUDIT_TYPE.CATEGORIES.COMPLIANCE]: 'Compliance Audit',
    [SEO_AUDIT_TYPE.CATEGORIES.PERFORMANCE]: 'Performance Audit',
  };
  return labels[category] || 'Unknown Category';
}

export function getSEOAuditMethodologyLabel(methodology: SEOAuditTypeMethodology): string {
  const labels: Record<SEOAuditTypeMethodology, string> = {
    [SEO_AUDIT_TYPE.METHODOLOGIES.AUTOMATED]: 'Automated',
    [SEO_AUDIT_TYPE.METHODOLOGIES.MANUAL]: 'Manual',
    [SEO_AUDIT_TYPE.METHODOLOGIES.HYBRID]: 'Hybrid',
    [SEO_AUDIT_TYPE.METHODOLOGIES.AI_DRIVEN]: 'AI-Driven',
    [SEO_AUDIT_TYPE.METHODOLOGIES.DATA_DRIVEN]: 'Data-Driven',
  };
  return labels[methodology] || 'Unknown Methodology';
}

export function getSEOAuditApproachLabel(approach: SEOAuditTypeApproach): string {
  const labels: Record<SEOAuditTypeApproach, string> = {
    [SEO_AUDIT_TYPE.APPROACHES.COMPREHENSIVE]: 'Comprehensive',
    [SEO_AUDIT_TYPE.APPROACHES.TARGETED]: 'Targeted',
    [SEO_AUDIT_TYPE.APPROACHES.SPOT]: 'Spot Check',
    [SEO_AUDIT_TYPE.APPROACHES.COMPARATIVE]: 'Comparative',
    [SEO_AUDIT_TYPE.APPROACHES.DIAGNOSTIC]: 'Diagnostic',
    [SEO_AUDIT_TYPE.APPROACHES.PREVENTIVE]: 'Preventive',
  };
  return labels[approach] || 'Unknown Approach';
}

export function getSEOAuditComplexityLabel(complexity: SEOAuditTypeComplexity): string {
  const labels: Record<SEOAuditTypeComplexity, string> = {
    [SEO_AUDIT_TYPE.COMPLEXITY.BASIC]: 'Basic',
    [SEO_AUDIT_TYPE.COMPLEXITY.INTERMEDIATE]: 'Intermediate',
    [SEO_AUDIT_TYPE.COMPLEXITY.ADVANCED]: 'Advanced',
    [SEO_AUDIT_TYPE.COMPLEXITY.EXPERT]: 'Expert',
  };
  return labels[complexity] || 'Unknown Complexity';
}

export function getSEOAuditDeliverableLabel(deliverable: SEOAuditTypeDeliverable): string {
  const labels: Record<SEOAuditTypeDeliverable, string> = {
    [SEO_AUDIT_TYPE.DELIVERABLES.REPORT]: 'Report',
    [SEO_AUDIT_TYPE.DELIVERABLES.CHECKLIST]: 'Checklist',
    [SEO_AUDIT_TYPE.DELIVERABLES.ACTION_PLAN]: 'Action Plan',
    [SEO_AUDIT_TYPE.DELIVERABLES.RECOMMENDATIONS]: 'Recommendations',
    [SEO_AUDIT_TYPE.DELIVERABLES.TRACKING]: 'Tracking Dashboard',
    [SEO_AUDIT_TYPE.DELIVERABLES.DASHBOARD]: 'Dashboard',
    [SEO_AUDIT_TYPE.DELIVERABLES.PRESENTATION]: 'Presentation',
  };
  return labels[deliverable] || 'Unknown Deliverable';
}

export function getSEOAuditPhaseLabel(phase: SEOAuditTypePhase): string {
  const labels: Record<SEOAuditTypePhase, string> = {
    [SEO_AUDIT_TYPE.PHASES.PLANNING]: 'Planning Phase',
    [SEO_AUDIT_TYPE.PHASES.DATA_COLLECTION]: 'Data Collection',
    [SEO_AUDIT_TYPE.PHASES.ANALYSIS]: 'Analysis Phase',
    [SEO_AUDIT_TYPE.PHASES.REPORTING]: 'Reporting Phase',
    [SEO_AUDIT_TYPE.PHASES.PRESENTATION]: 'Presentation Phase',
    [SEO_AUDIT_TYPE.PHASES.IMPLEMENTATION]: 'Implementation Phase',
    [SEO_AUDIT_TYPE.PHASES.FOLLOW_UP]: 'Follow-up Phase',
  };
  return labels[phase] || 'Unknown Phase';
}

export function getSEOAuditDepthLabel(depth: SEOAuditTypeDepth): string {
  const labels: Record<SEOAuditTypeDepth, string> = {
    [SEO_AUDIT_TYPE.DEPTH.OVERVIEW]: 'Overview',
    [SEO_AUDIT_TYPE.DEPTH.STANDARD]: 'Standard',
    [SEO_AUDIT_TYPE.DEPTH.IN_DEPTH]: 'In-Depth',
    [SEO_AUDIT_TYPE.DEPTH.FORENSIC]: 'Forensic',
  };
  return labels[depth] || 'Unknown Depth';
}

export function getSEOAuditFocusLabel(focus: SEOAuditTypeFocus): string {
  const labels: Record<SEOAuditTypeFocus, string> = {
    [SEO_AUDIT_TYPE.FOCUS.SITE_WIDE]: 'Site-Wide Focus',
    [SEO_AUDIT_TYPE.FOCUS.PAGE_LEVEL]: 'Page-Level Focus',
    [SEO_AUDIT_TYPE.FOCUS.SECTION_LEVEL]: 'Section-Level Focus',
    [SEO_AUDIT_TYPE.FOCUS.COMPETITOR]: 'Competitor Focus',
    [SEO_AUDIT_TYPE.FOCUS.INDUSTRY]: 'Industry Focus',
  };
  return labels[focus] || 'Unknown Focus';
}
