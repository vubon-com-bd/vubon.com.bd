/**
 * AI Feature Type Constants
 * Types and classifications for AI features
 */

export const AI_FEATURE_TYPE = {
  // Feature Domains
  DOMAINS: {
    ECOMMERCE: 'ecommerce',
    MARKETING: 'marketing',
    SALES: 'sales',
    SUPPORT: 'support',
    ANALYTICS: 'analytics',
    OPERATIONS: 'operations',
    FINANCE: 'finance',
    HR: 'hr',
    PRODUCT: 'product',
    CONTENT: 'content',
  } as const,

  // Feature Sub-Domains
  SUB_DOMAINS: {
    // E-commerce
    PRODUCT_RECOMMENDATION: 'product_recommendation',
    PERSONALIZED_SHOPPING: 'personalized_shopping',
    SMART_CATEGORIZATION: 'smart_categorization',
    PRICE_OPTIMIZATION: 'price_optimization',
    INVENTORY_MANAGEMENT: 'inventory_management',

    // Marketing
    CAMPAIGN_OPTIMIZATION: 'campaign_optimization',
    CUSTOMER_SEGMENTATION: 'customer_segmentation',
    SENTIMENT_ANALYSIS: 'sentiment_analysis',
    SOCIAL_MEDIA_ANALYTICS: 'social_media_analytics',
    EMAIL_PERSONALIZATION: 'email_personalization',

    // Sales
    LEAD_SCORING: 'lead_scoring',
    SALES_FORECASTING: 'sales_forecasting',
    DEAL_RECOMMENDATION: 'deal_recommendation',
    CROSS_SELLING: 'cross_selling',
    UP_SELLING: 'up_selling',

    // Support
    CHATBOT: 'chatbot',
    TICKET_CLASSIFICATION: 'ticket_classification',
    AUTOMATED_RESPONSE: 'automated_response',
    SENTIMENT_TRACKING: 'sentiment_tracking',

    // Analytics
    BEHAVIORAL_ANALYTICS: 'behavioral_analytics',
    PREDICTIVE_ANALYTICS: 'predictive_analytics',
    PRESCRIPTIVE_ANALYTICS: 'prescriptive_analytics',
    REAL_TIME_ANALYTICS: 'real_time_analytics',
  } as const,

  // Feature Complexity
  COMPLEXITY: {
    SIMPLE: 'simple',
    MODERATE: 'moderate',
    COMPLEX: 'complex',
    VERY_COMPLEX: 'very_complex',
  } as const,

  // Feature Maturity
  MATURITY: {
    EXPERIMENTAL: 'experimental',
    DEVELOPING: 'developing',
    MATURE: 'mature',
    STABLE: 'stable',
    LEGACY: 'legacy',
  } as const,

  // Feature Deployment
  DEPLOYMENT: {
    CLOUD: 'cloud',
    ON_PREMISE: 'on_premise',
    HYBRID: 'hybrid',
    EDGE: 'edge',
    FEDERATED: 'federated',
  } as const,

  // Feature Integration
  INTEGRATION: {
    STANDALONE: 'standalone',
    API: 'api',
    SDK: 'sdk',
    PLUGIN: 'plugin',
    EMBEDDED: 'embedded',
    NATIVE: 'native',
  } as const,
} as const;

export type AIFeatureDomain =
  (typeof AI_FEATURE_TYPE.DOMAINS)[keyof typeof AI_FEATURE_TYPE.DOMAINS];
export type AIFeatureSubDomain =
  (typeof AI_FEATURE_TYPE.SUB_DOMAINS)[keyof typeof AI_FEATURE_TYPE.SUB_DOMAINS];
export type AIFeatureComplexity =
  (typeof AI_FEATURE_TYPE.COMPLEXITY)[keyof typeof AI_FEATURE_TYPE.COMPLEXITY];
export type AIFeatureMaturity =
  (typeof AI_FEATURE_TYPE.MATURITY)[keyof typeof AI_FEATURE_TYPE.MATURITY];
export type AIFeatureDeployment =
  (typeof AI_FEATURE_TYPE.DEPLOYMENT)[keyof typeof AI_FEATURE_TYPE.DEPLOYMENT];
export type AIFeatureIntegration =
  (typeof AI_FEATURE_TYPE.INTEGRATION)[keyof typeof AI_FEATURE_TYPE.INTEGRATION];

export function getAiFeatureDomainLabel(domain: AIFeatureDomain): string {
  const labels: Record<AIFeatureDomain, string> = {
    [AI_FEATURE_TYPE.DOMAINS.ECOMMERCE]: 'E-commerce',
    [AI_FEATURE_TYPE.DOMAINS.MARKETING]: 'Marketing',
    [AI_FEATURE_TYPE.DOMAINS.SALES]: 'Sales',
    [AI_FEATURE_TYPE.DOMAINS.SUPPORT]: 'Support',
    [AI_FEATURE_TYPE.DOMAINS.ANALYTICS]: 'Analytics',
    [AI_FEATURE_TYPE.DOMAINS.OPERATIONS]: 'Operations',
    [AI_FEATURE_TYPE.DOMAINS.FINANCE]: 'Finance',
    [AI_FEATURE_TYPE.DOMAINS.HR]: 'HR',
    [AI_FEATURE_TYPE.DOMAINS.PRODUCT]: 'Product',
    [AI_FEATURE_TYPE.DOMAINS.CONTENT]: 'Content',
  };
  return labels[domain] || 'Unknown';
}

export function getAiFeatureSubDomainLabel(subDomain: AIFeatureSubDomain): string {
  const labels: Record<AIFeatureSubDomain, string> = {
    [AI_FEATURE_TYPE.SUB_DOMAINS.PRODUCT_RECOMMENDATION]: 'Product Recommendation',
    [AI_FEATURE_TYPE.SUB_DOMAINS.PERSONALIZED_SHOPPING]: 'Personalized Shopping',
    [AI_FEATURE_TYPE.SUB_DOMAINS.SMART_CATEGORIZATION]: 'Smart Categorization',
    [AI_FEATURE_TYPE.SUB_DOMAINS.PRICE_OPTIMIZATION]: 'Price Optimization',
    [AI_FEATURE_TYPE.SUB_DOMAINS.INVENTORY_MANAGEMENT]: 'Inventory Management',
    [AI_FEATURE_TYPE.SUB_DOMAINS.CAMPAIGN_OPTIMIZATION]: 'Campaign Optimization',
    [AI_FEATURE_TYPE.SUB_DOMAINS.CUSTOMER_SEGMENTATION]: 'Customer Segmentation',
    [AI_FEATURE_TYPE.SUB_DOMAINS.SENTIMENT_ANALYSIS]: 'Sentiment Analysis',
    [AI_FEATURE_TYPE.SUB_DOMAINS.SOCIAL_MEDIA_ANALYTICS]: 'Social Media Analytics',
    [AI_FEATURE_TYPE.SUB_DOMAINS.EMAIL_PERSONALIZATION]: 'Email Personalization',
    [AI_FEATURE_TYPE.SUB_DOMAINS.LEAD_SCORING]: 'Lead Scoring',
    [AI_FEATURE_TYPE.SUB_DOMAINS.SALES_FORECASTING]: 'Sales Forecasting',
    [AI_FEATURE_TYPE.SUB_DOMAINS.DEAL_RECOMMENDATION]: 'Deal Recommendation',
    [AI_FEATURE_TYPE.SUB_DOMAINS.CROSS_SELLING]: 'Cross Selling',
    [AI_FEATURE_TYPE.SUB_DOMAINS.UP_SELLING]: 'Up Selling',
    [AI_FEATURE_TYPE.SUB_DOMAINS.CHATBOT]: 'Chatbot',
    [AI_FEATURE_TYPE.SUB_DOMAINS.TICKET_CLASSIFICATION]: 'Ticket Classification',
    [AI_FEATURE_TYPE.SUB_DOMAINS.AUTOMATED_RESPONSE]: 'Automated Response',
    [AI_FEATURE_TYPE.SUB_DOMAINS.SENTIMENT_TRACKING]: 'Sentiment Tracking',
    [AI_FEATURE_TYPE.SUB_DOMAINS.BEHAVIORAL_ANALYTICS]: 'Behavioral Analytics',
    [AI_FEATURE_TYPE.SUB_DOMAINS.PREDICTIVE_ANALYTICS]: 'Predictive Analytics',
    [AI_FEATURE_TYPE.SUB_DOMAINS.PRESCRIPTIVE_ANALYTICS]: 'Prescriptive Analytics',
    [AI_FEATURE_TYPE.SUB_DOMAINS.REAL_TIME_ANALYTICS]: 'Real Time Analytics',
  };
  return labels[subDomain] || 'Unknown';
}

export function getAiFeatureComplexityLabel(complexity: AIFeatureComplexity): string {
  const labels: Record<AIFeatureComplexity, string> = {
    [AI_FEATURE_TYPE.COMPLEXITY.SIMPLE]: 'Simple',
    [AI_FEATURE_TYPE.COMPLEXITY.MODERATE]: 'Moderate',
    [AI_FEATURE_TYPE.COMPLEXITY.COMPLEX]: 'Complex',
    [AI_FEATURE_TYPE.COMPLEXITY.VERY_COMPLEX]: 'Very Complex',
  };
  return labels[complexity] || 'Unknown';
}

export function getAiFeatureMaturityLabel(maturity: AIFeatureMaturity): string {
  const labels: Record<AIFeatureMaturity, string> = {
    [AI_FEATURE_TYPE.MATURITY.EXPERIMENTAL]: 'Experimental',
    [AI_FEATURE_TYPE.MATURITY.DEVELOPING]: 'Developing',
    [AI_FEATURE_TYPE.MATURITY.MATURE]: 'Mature',
    [AI_FEATURE_TYPE.MATURITY.STABLE]: 'Stable',
    [AI_FEATURE_TYPE.MATURITY.LEGACY]: 'Legacy',
  };
  return labels[maturity] || 'Unknown';
}

export function getAiFeatureDeploymentLabel(deployment: AIFeatureDeployment): string {
  const labels: Record<AIFeatureDeployment, string> = {
    [AI_FEATURE_TYPE.DEPLOYMENT.CLOUD]: 'Cloud',
    [AI_FEATURE_TYPE.DEPLOYMENT.ON_PREMISE]: 'On-Premise',
    [AI_FEATURE_TYPE.DEPLOYMENT.HYBRID]: 'Hybrid',
    [AI_FEATURE_TYPE.DEPLOYMENT.EDGE]: 'Edge',
    [AI_FEATURE_TYPE.DEPLOYMENT.FEDERATED]: 'Federated',
  };
  return labels[deployment] || 'Unknown';
}

export function getAiFeatureIntegrationLabel(integration: AIFeatureIntegration): string {
  const labels: Record<AIFeatureIntegration, string> = {
    [AI_FEATURE_TYPE.INTEGRATION.STANDALONE]: 'Standalone',
    [AI_FEATURE_TYPE.INTEGRATION.API]: 'API',
    [AI_FEATURE_TYPE.INTEGRATION.SDK]: 'SDK',
    [AI_FEATURE_TYPE.INTEGRATION.PLUGIN]: 'Plugin',
    [AI_FEATURE_TYPE.INTEGRATION.EMBEDDED]: 'Embedded',
    [AI_FEATURE_TYPE.INTEGRATION.NATIVE]: 'Native',
  };
  return labels[integration] || 'Unknown';
}

export function getAiFeatureComplexityScore(complexity: AIFeatureComplexity): number {
  const scores: Record<AIFeatureComplexity, number> = {
    [AI_FEATURE_TYPE.COMPLEXITY.SIMPLE]: 1,
    [AI_FEATURE_TYPE.COMPLEXITY.MODERATE]: 3,
    [AI_FEATURE_TYPE.COMPLEXITY.COMPLEX]: 5,
    [AI_FEATURE_TYPE.COMPLEXITY.VERY_COMPLEX]: 8,
  };
  return scores[complexity] || 1;
}

export function getAiFeatureMaturityScore(maturity: AIFeatureMaturity): number {
  const scores: Record<AIFeatureMaturity, number> = {
    [AI_FEATURE_TYPE.MATURITY.EXPERIMENTAL]: 1,
    [AI_FEATURE_TYPE.MATURITY.DEVELOPING]: 3,
    [AI_FEATURE_TYPE.MATURITY.MATURE]: 7,
    [AI_FEATURE_TYPE.MATURITY.STABLE]: 10,
    [AI_FEATURE_TYPE.MATURITY.LEGACY]: 6,
  };
  return scores[maturity] || 1;
}
