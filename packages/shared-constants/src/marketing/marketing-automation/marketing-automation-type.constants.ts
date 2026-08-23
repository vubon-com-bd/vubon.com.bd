/**
 * Marketing Automation Type Constants
 * Type definitions and classifications for marketing automation
 */

export const MARKETINGAUTOMATION_TYPE = {
  // Automation Categories
  CATEGORIES: {
    MARKETING: 'marketing',
    SALES: 'sales',
    SERVICE: 'service',
    OPERATIONAL: 'operational',
    TRANSACTIONAL: 'transactional',
  } as const,

  // Automation Sub-Types
  SUB_TYPES: {
    // Marketing
    EMAIL_CAMPAIGN: 'email_campaign',
    SMS_CAMPAIGN: 'sms_campaign',
    SOCIAL_POSTING: 'social_posting',
    CONTENT_DISTRIBUTION: 'content_distribution',
    LEAD_NURTURING: 'lead_nurturing',
    DORMANT_USER: 'dormant_user',

    // Sales
    LEAD_SCORING: 'lead_scoring',
    FOLLOW_UP: 'follow_up',
    QUOTE_GENERATION: 'quote_generation',
    ORDER_PROCESSING: 'order_processing',

    // Service
    TICKET_ROUTING: 'ticket_routing',
    AUTO_RESPONSE: 'auto_response',
    CUSTOMER_ONBOARDING: 'customer_onboarding',
    FEEDBACK_COLLECTION: 'feedback_collection',

    // Operational
    REPORT_GENERATION: 'report_generation',
    DATA_SYNC: 'data_sync',
    BACKUP: 'backup',
    CLEANUP: 'cleanup',

    // Transactional
    ORDER_CONFIRMATION: 'order_confirmation',
    SHIPPING_UPDATE: 'shipping_update',
    PAYMENT_REMINDER: 'payment_reminder',
    INVOICE_GENERATION: 'invoice_generation',
  } as const,

  // Automation Complexity
  COMPLEXITY: {
    SIMPLE: 'simple',
    MODERATE: 'moderate',
    COMPLEX: 'complex',
    VERY_COMPLEX: 'very_complex',
  } as const,

  // Automation Scope
  SCOPE: {
    GLOBAL: 'global',
    REGIONAL: 'regional',
    LOCAL: 'local',
    DEPARTMENT: 'department',
    TEAM: 'team',
    INDIVIDUAL: 'individual',
  } as const,

  // Automation Integration Types
  INTEGRATIONS: {
    CRM: 'crm',
    ERP: 'erp',
    CMS: 'cms',
    EMAIL: 'email',
    SMS: 'sms',
    SOCIAL: 'social',
    ANALYTICS: 'analytics',
    PAYMENT: 'payment',
    SHIPPING: 'shipping',
    CUSTOM: 'custom',
  } as const,
} as const;

// Automation Categories
export type MarketingAutomationCategoryType =
  (typeof MARKETINGAUTOMATION_TYPE.CATEGORIES)[keyof typeof MARKETINGAUTOMATION_TYPE.CATEGORIES];

// Automation Sub-Types
export type MarketingAutomationSubType =
  (typeof MARKETINGAUTOMATION_TYPE.SUB_TYPES)[keyof typeof MARKETINGAUTOMATION_TYPE.SUB_TYPES];

// Automation Complexity
export type MarketingAutomationComplexity =
  (typeof MARKETINGAUTOMATION_TYPE.COMPLEXITY)[keyof typeof MARKETINGAUTOMATION_TYPE.COMPLEXITY];

// Automation Scope
export type MarketingAutomationScope =
  (typeof MARKETINGAUTOMATION_TYPE.SCOPE)[keyof typeof MARKETINGAUTOMATION_TYPE.SCOPE];

// Automation Integration Types
export type MarketingAutomationIntegration =
  (typeof MARKETINGAUTOMATION_TYPE.INTEGRATIONS)[keyof typeof MARKETINGAUTOMATION_TYPE.INTEGRATIONS];

// Utility Functions
export function marketingautomationGetCategoryLabel(
  category: MarketingAutomationCategoryType
): string {
  const labels: Record<MarketingAutomationCategoryType, string> = {
    [MARKETINGAUTOMATION_TYPE.CATEGORIES.MARKETING]: 'Marketing',
    [MARKETINGAUTOMATION_TYPE.CATEGORIES.SALES]: 'Sales',
    [MARKETINGAUTOMATION_TYPE.CATEGORIES.SERVICE]: 'Service',
    [MARKETINGAUTOMATION_TYPE.CATEGORIES.OPERATIONAL]: 'Operational',
    [MARKETINGAUTOMATION_TYPE.CATEGORIES.TRANSACTIONAL]: 'Transactional',
  };
  return labels[category] || 'Unknown Category';
}

export function marketingautomationGetSubTypeLabel(subType: MarketingAutomationSubType): string {
  const labels: Record<MarketingAutomationSubType, string> = {
    // Marketing
    [MARKETINGAUTOMATION_TYPE.SUB_TYPES.EMAIL_CAMPAIGN]: 'Email Campaign',
    [MARKETINGAUTOMATION_TYPE.SUB_TYPES.SMS_CAMPAIGN]: 'SMS Campaign',
    [MARKETINGAUTOMATION_TYPE.SUB_TYPES.SOCIAL_POSTING]: 'Social Posting',
    [MARKETINGAUTOMATION_TYPE.SUB_TYPES.CONTENT_DISTRIBUTION]: 'Content Distribution',
    [MARKETINGAUTOMATION_TYPE.SUB_TYPES.LEAD_NURTURING]: 'Lead Nurturing',
    [MARKETINGAUTOMATION_TYPE.SUB_TYPES.DORMANT_USER]: 'Dormant User',

    // Sales
    [MARKETINGAUTOMATION_TYPE.SUB_TYPES.LEAD_SCORING]: 'Lead Scoring',
    [MARKETINGAUTOMATION_TYPE.SUB_TYPES.FOLLOW_UP]: 'Follow Up',
    [MARKETINGAUTOMATION_TYPE.SUB_TYPES.QUOTE_GENERATION]: 'Quote Generation',
    [MARKETINGAUTOMATION_TYPE.SUB_TYPES.ORDER_PROCESSING]: 'Order Processing',

    // Service
    [MARKETINGAUTOMATION_TYPE.SUB_TYPES.TICKET_ROUTING]: 'Ticket Routing',
    [MARKETINGAUTOMATION_TYPE.SUB_TYPES.AUTO_RESPONSE]: 'Auto Response',
    [MARKETINGAUTOMATION_TYPE.SUB_TYPES.CUSTOMER_ONBOARDING]: 'Customer Onboarding',
    [MARKETINGAUTOMATION_TYPE.SUB_TYPES.FEEDBACK_COLLECTION]: 'Feedback Collection',

    // Operational
    [MARKETINGAUTOMATION_TYPE.SUB_TYPES.REPORT_GENERATION]: 'Report Generation',
    [MARKETINGAUTOMATION_TYPE.SUB_TYPES.DATA_SYNC]: 'Data Sync',
    [MARKETINGAUTOMATION_TYPE.SUB_TYPES.BACKUP]: 'Backup',
    [MARKETINGAUTOMATION_TYPE.SUB_TYPES.CLEANUP]: 'Cleanup',

    // Transactional
    [MARKETINGAUTOMATION_TYPE.SUB_TYPES.ORDER_CONFIRMATION]: 'Order Confirmation',
    [MARKETINGAUTOMATION_TYPE.SUB_TYPES.SHIPPING_UPDATE]: 'Shipping Update',
    [MARKETINGAUTOMATION_TYPE.SUB_TYPES.PAYMENT_REMINDER]: 'Payment Reminder',
    [MARKETINGAUTOMATION_TYPE.SUB_TYPES.INVOICE_GENERATION]: 'Invoice Generation',
  };
  return labels[subType] || 'Unknown Sub-Type';
}

export function marketingautomationGetComplexityLabel(
  complexity: MarketingAutomationComplexity
): string {
  const labels: Record<MarketingAutomationComplexity, string> = {
    [MARKETINGAUTOMATION_TYPE.COMPLEXITY.SIMPLE]: 'Simple',
    [MARKETINGAUTOMATION_TYPE.COMPLEXITY.MODERATE]: 'Moderate',
    [MARKETINGAUTOMATION_TYPE.COMPLEXITY.COMPLEX]: 'Complex',
    [MARKETINGAUTOMATION_TYPE.COMPLEXITY.VERY_COMPLEX]: 'Very Complex',
  };
  return labels[complexity] || 'Unknown Complexity';
}

export function marketingautomationGetScopeLabel(scope: MarketingAutomationScope): string {
  const labels: Record<MarketingAutomationScope, string> = {
    [MARKETINGAUTOMATION_TYPE.SCOPE.GLOBAL]: 'Global',
    [MARKETINGAUTOMATION_TYPE.SCOPE.REGIONAL]: 'Regional',
    [MARKETINGAUTOMATION_TYPE.SCOPE.LOCAL]: 'Local',
    [MARKETINGAUTOMATION_TYPE.SCOPE.DEPARTMENT]: 'Department',
    [MARKETINGAUTOMATION_TYPE.SCOPE.TEAM]: 'Team',
    [MARKETINGAUTOMATION_TYPE.SCOPE.INDIVIDUAL]: 'Individual',
  };
  return labels[scope] || 'Unknown Scope';
}

export function marketingautomationGetIntegrationLabel(
  integration: MarketingAutomationIntegration
): string {
  const labels: Record<MarketingAutomationIntegration, string> = {
    [MARKETINGAUTOMATION_TYPE.INTEGRATIONS.CRM]: 'CRM',
    [MARKETINGAUTOMATION_TYPE.INTEGRATIONS.ERP]: 'ERP',
    [MARKETINGAUTOMATION_TYPE.INTEGRATIONS.CMS]: 'CMS',
    [MARKETINGAUTOMATION_TYPE.INTEGRATIONS.EMAIL]: 'Email',
    [MARKETINGAUTOMATION_TYPE.INTEGRATIONS.SMS]: 'SMS',
    [MARKETINGAUTOMATION_TYPE.INTEGRATIONS.SOCIAL]: 'Social Media',
    [MARKETINGAUTOMATION_TYPE.INTEGRATIONS.ANALYTICS]: 'Analytics',
    [MARKETINGAUTOMATION_TYPE.INTEGRATIONS.PAYMENT]: 'Payment',
    [MARKETINGAUTOMATION_TYPE.INTEGRATIONS.SHIPPING]: 'Shipping',
    [MARKETINGAUTOMATION_TYPE.INTEGRATIONS.CUSTOM]: 'Custom',
  };
  return labels[integration] || 'Unknown Integration';
}

export function marketingautomationIsMarketingCategory(
  category: MarketingAutomationCategoryType
): boolean {
  const marketingCategories: MarketingAutomationCategoryType[] = [
    MARKETINGAUTOMATION_TYPE.CATEGORIES.MARKETING,
    MARKETINGAUTOMATION_TYPE.CATEGORIES.TRANSACTIONAL,
  ];
  return marketingCategories.includes(category);
}

export function marketingautomationIsSalesCategory(
  category: MarketingAutomationCategoryType
): boolean {
  return category === MARKETINGAUTOMATION_TYPE.CATEGORIES.SALES;
}

export function marketingautomationIsServiceCategory(
  category: MarketingAutomationCategoryType
): boolean {
  return category === MARKETINGAUTOMATION_TYPE.CATEGORIES.SERVICE;
}

export function marketingautomationIsOperationalCategory(
  category: MarketingAutomationCategoryType
): boolean {
  return category === MARKETINGAUTOMATION_TYPE.CATEGORIES.OPERATIONAL;
}
