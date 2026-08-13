/**
 * @fileoverview Analytics data collection mediums and channels
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Analytics data collection mediums
 */
export enum AnalyticsMedium {
  /** Organic traffic from search engines */
  ORGANIC = 'ORGANIC',
  /** Paid advertising traffic */
  PAID = 'PAID',
  /** Social media traffic */
  SOCIAL = 'SOCIAL',
  /** Email marketing traffic */
  EMAIL = 'EMAIL',
  /** Affiliate marketing traffic */
  AFFILIATE = 'AFFILIATE',
  /** Display advertising traffic */
  DISPLAY = 'DISPLAY',
  /** Video advertising traffic */
  VIDEO = 'VIDEO',
  /** Native advertising traffic */
  NATIVE = 'NATIVE',
  /** Referral traffic from other sites */
  REFERRAL = 'REFERRAL',
  /** Direct traffic (bookmarks, typed URLs) */
  DIRECT = 'DIRECT',
  /** Cost Per Click advertising */
  CPC = 'CPC',
  /** Cost Per Mille (thousand impressions) */
  CPM = 'CPM',
  /** Cost Per Acquisition */
  CPA = 'CPA',
  /** Click Through Rate */
  CTR = 'CTR',
  /** Search Engine Marketing */
  SEM = 'SEM',
  /** Search Engine Optimization */
  SEO = 'SEO',
  /** Content Marketing */
  CONTENT = 'CONTENT',
  /** Influencer Marketing */
  INFLUENCER = 'INFLUENCER',
  /** Podcast Advertising */
  PODCAST = 'PODCAST',
  /** Webinar Marketing */
  WEBINAR = 'WEBINAR',
  /** Event Marketing */
  EVENT = 'EVENT',
  /** Public Relations */
  PR = 'PR',
  /** SMS Marketing */
  SMS = 'SMS',
  /** Push Notifications */
  PUSH = 'PUSH',
  /** In-App Advertising */
  IN_APP = 'IN_APP',
  /** App Store Optimization */
  ASO = 'ASO',
  /** Partner Marketing */
  PARTNER = 'PARTNER',
  /** Co-Marketing */
  CO_MARKETING = 'CO_MARKETING',
  /** Account Based Marketing */
  ABM = 'ABM',
  /** Programmatic Advertising */
  PROGRAMMATIC = 'PROGRAMMATIC',
  /** Native App Install */
  NATIVE_APP = 'NATIVE_APP',
  /** Mobile Web */
  MOBILE_WEB = 'MOBILE_WEB',
  /** Desktop Web */
  DESKTOP_WEB = 'DESKTOP_WEB',
}

/**
 * Medium types classification
 */
export enum AnalyticsMediumType {
  /** Organic/Free traffic sources */
  ORGANIC = 'ORGANIC',
  /** Paid traffic sources */
  PAID = 'PAID',
  /** Owned media sources */
  OWNED = 'OWNED',
  /** Earned media sources */
  EARNED = 'EARNED',
  /** Direct sources */
  DIRECT = 'DIRECT',
  /** Referral sources */
  REFERRAL = 'REFERRAL',
}

/**
 * Medium type mapping
 */
export const ANALYTICS_MEDIUM_TYPE_MAP: Record<AnalyticsMedium, AnalyticsMediumType> = {
  [AnalyticsMedium.ORGANIC]: AnalyticsMediumType.ORGANIC,
  [AnalyticsMedium.PAID]: AnalyticsMediumType.PAID,
  [AnalyticsMedium.SOCIAL]: AnalyticsMediumType.EARNED,
  [AnalyticsMedium.EMAIL]: AnalyticsMediumType.OWNED,
  [AnalyticsMedium.AFFILIATE]: AnalyticsMediumType.PAID,
  [AnalyticsMedium.DISPLAY]: AnalyticsMediumType.PAID,
  [AnalyticsMedium.VIDEO]: AnalyticsMediumType.PAID,
  [AnalyticsMedium.NATIVE]: AnalyticsMediumType.PAID,
  [AnalyticsMedium.REFERRAL]: AnalyticsMediumType.REFERRAL,
  [AnalyticsMedium.DIRECT]: AnalyticsMediumType.DIRECT,
  [AnalyticsMedium.CPC]: AnalyticsMediumType.PAID,
  [AnalyticsMedium.CPM]: AnalyticsMediumType.PAID,
  [AnalyticsMedium.CPA]: AnalyticsMediumType.PAID,
  [AnalyticsMedium.CTR]: AnalyticsMediumType.PAID,
  [AnalyticsMedium.SEM]: AnalyticsMediumType.PAID,
  [AnalyticsMedium.SEO]: AnalyticsMediumType.ORGANIC,
  [AnalyticsMedium.CONTENT]: AnalyticsMediumType.OWNED,
  [AnalyticsMedium.INFLUENCER]: AnalyticsMediumType.EARNED,
  [AnalyticsMedium.PODCAST]: AnalyticsMediumType.PAID,
  [AnalyticsMedium.WEBINAR]: AnalyticsMediumType.OWNED,
  [AnalyticsMedium.EVENT]: AnalyticsMediumType.OWNED,
  [AnalyticsMedium.PR]: AnalyticsMediumType.EARNED,
  [AnalyticsMedium.SMS]: AnalyticsMediumType.OWNED,
  [AnalyticsMedium.PUSH]: AnalyticsMediumType.OWNED,
  [AnalyticsMedium.IN_APP]: AnalyticsMediumType.PAID,
  [AnalyticsMedium.ASO]: AnalyticsMediumType.ORGANIC,
  [AnalyticsMedium.PARTNER]: AnalyticsMediumType.REFERRAL,
  [AnalyticsMedium.CO_MARKETING]: AnalyticsMediumType.EARNED,
  [AnalyticsMedium.ABM]: AnalyticsMediumType.PAID,
  [AnalyticsMedium.PROGRAMMATIC]: AnalyticsMediumType.PAID,
  [AnalyticsMedium.NATIVE_APP]: AnalyticsMediumType.OWNED,
  [AnalyticsMedium.MOBILE_WEB]: AnalyticsMediumType.OWNED,
  [AnalyticsMedium.DESKTOP_WEB]: AnalyticsMediumType.OWNED,
};

/**
 * Medium configuration with labels and descriptions
 */
export const ANALYTICS_MEDIUM_CONFIG: Record<
  AnalyticsMedium,
  { label: string; description: string; icon?: string; color?: string }
> = {
  [AnalyticsMedium.ORGANIC]: {
    label: 'Organic',
    description: 'Traffic from search engine organic results',
    icon: 'Search',
    color: '#22C55E',
  },
  [AnalyticsMedium.PAID]: {
    label: 'Paid',
    description: 'Traffic from paid advertising campaigns',
    icon: 'DollarSign',
    color: '#EF4444',
  },
  [AnalyticsMedium.SOCIAL]: {
    label: 'Social',
    description: 'Traffic from social media platforms',
    icon: 'Share2',
    color: '#1DA1F2',
  },
  [AnalyticsMedium.EMAIL]: {
    label: 'Email',
    description: 'Traffic from email marketing campaigns',
    icon: 'Mail',
    color: '#EA580C',
  },
  [AnalyticsMedium.AFFILIATE]: {
    label: 'Affiliate',
    description: 'Traffic from affiliate marketing programs',
    icon: 'Link2',
    color: '#8B5CF6',
  },
  [AnalyticsMedium.DISPLAY]: {
    label: 'Display',
    description: 'Traffic from display/banner advertising',
    icon: 'Layout',
    color: '#3B82F6',
  },
  [AnalyticsMedium.VIDEO]: {
    label: 'Video',
    description: 'Traffic from video advertising',
    icon: 'Video',
    color: '#EC4899',
  },
  [AnalyticsMedium.NATIVE]: {
    label: 'Native',
    description: 'Traffic from native advertising',
    icon: 'FileText',
    color: '#F59E0B',
  },
  [AnalyticsMedium.REFERRAL]: {
    label: 'Referral',
    description: 'Traffic from referral websites',
    icon: 'ExternalLink',
    color: '#A855F7',
  },
  [AnalyticsMedium.DIRECT]: {
    label: 'Direct',
    description: 'Direct traffic from bookmarks or typed URLs',
    icon: 'ArrowRight',
    color: '#6B7280',
  },
  [AnalyticsMedium.CPC]: {
    label: 'CPC',
    description: 'Cost Per Click advertising',
    icon: 'MousePointer',
    color: '#EF4444',
  },
  [AnalyticsMedium.CPM]: {
    label: 'CPM',
    description: 'Cost Per Mille (thousand impressions)',
    icon: 'Eye',
    color: '#F59E0B',
  },
  [AnalyticsMedium.CPA]: {
    label: 'CPA',
    description: 'Cost Per Acquisition advertising',
    icon: 'Target',
    color: '#10B981',
  },
  [AnalyticsMedium.CTR]: {
    label: 'CTR',
    description: 'Click Through Rate metrics',
    icon: 'TrendingUp',
    color: '#3B82F6',
  },
  [AnalyticsMedium.SEM]: {
    label: 'SEM',
    description: 'Search Engine Marketing',
    icon: 'Globe',
    color: '#4285F4',
  },
  [AnalyticsMedium.SEO]: {
    label: 'SEO',
    description: 'Search Engine Optimization',
    icon: 'TrendingUp',
    color: '#22C55E',
  },
  [AnalyticsMedium.CONTENT]: {
    label: 'Content',
    description: 'Content marketing traffic',
    icon: 'FileText',
    color: '#8B5CF6',
  },
  [AnalyticsMedium.INFLUENCER]: {
    label: 'Influencer',
    description: 'Traffic from influencer marketing',
    icon: 'Star',
    color: '#F472B6',
  },
  [AnalyticsMedium.PODCAST]: {
    label: 'Podcast',
    description: 'Traffic from podcast advertising',
    icon: 'Mic',
    color: '#6366F1',
  },
  [AnalyticsMedium.WEBINAR]: {
    label: 'Webinar',
    description: 'Traffic from webinar marketing',
    icon: 'Video',
    color: '#EC4899',
  },
  [AnalyticsMedium.EVENT]: {
    label: 'Event',
    description: 'Traffic from event marketing',
    icon: 'Calendar',
    color: '#F59E0B',
  },
  [AnalyticsMedium.PR]: {
    label: 'PR',
    description: 'Public Relations traffic',
    icon: 'Megaphone',
    color: '#6B7280',
  },
  [AnalyticsMedium.SMS]: {
    label: 'SMS',
    description: 'Traffic from SMS marketing',
    icon: 'MessageCircle',
    color: '#10B981',
  },
  [AnalyticsMedium.PUSH]: {
    label: 'Push',
    description: 'Traffic from push notifications',
    icon: 'Bell',
    color: '#F472B6',
  },
  [AnalyticsMedium.IN_APP]: {
    label: 'In-App',
    description: 'Traffic from in-app advertising',
    icon: 'Smartphone',
    color: '#8B5CF6',
  },
  [AnalyticsMedium.ASO]: {
    label: 'ASO',
    description: 'App Store Optimization',
    icon: 'AppStore',
    color: '#3B82F6',
  },
  [AnalyticsMedium.PARTNER]: {
    label: 'Partner',
    description: 'Traffic from partner marketing',
    icon: 'Users',
    color: '#6366F1',
  },
  [AnalyticsMedium.CO_MARKETING]: {
    label: 'Co-Marketing',
    description: 'Traffic from co-marketing initiatives',
    icon: 'Handshake',
    color: '#10B981',
  },
  [AnalyticsMedium.ABM]: {
    label: 'ABM',
    description: 'Account Based Marketing',
    icon: 'Building',
    color: '#6B7280',
  },
  [AnalyticsMedium.PROGRAMMATIC]: {
    label: 'Programmatic',
    description: 'Programmatic advertising traffic',
    icon: 'Code',
    color: '#8B5CF6',
  },
  [AnalyticsMedium.NATIVE_APP]: {
    label: 'Native App',
    description: 'Native mobile application traffic',
    icon: 'Smartphone',
    color: '#10B981',
  },
  [AnalyticsMedium.MOBILE_WEB]: {
    label: 'Mobile Web',
    description: 'Mobile website traffic',
    icon: 'Globe',
    color: '#3B82F6',
  },
  [AnalyticsMedium.DESKTOP_WEB]: {
    label: 'Desktop Web',
    description: 'Desktop website traffic',
    icon: 'Monitor',
    color: '#6B7280',
  },
};

/**
 * Medium performance metrics
 */
export interface AnalyticsMediumMetrics {
  /** Click-through rate */
  ctr: number;
  /** Conversion rate */
  conversionRate: number;
  /** Cost per acquisition */
  cpa: number;
  /** Return on investment */
  roi: number;
  /** Average engagement time */
  avgEngagementTime: number;
}

/**
 * Default medium metrics
 */
export const ANALYTICS_MEDIUM_DEFAULT_METRICS: Record<
  AnalyticsMedium,
  Partial<AnalyticsMediumMetrics>
> = {
  [AnalyticsMedium.ORGANIC]: {
    ctr: 0.05,
    conversionRate: 0.03,
    cpa: 0,
    roi: 5,
    avgEngagementTime: 180,
  },
  [AnalyticsMedium.PAID]: {
    ctr: 0.02,
    conversionRate: 0.02,
    cpa: 25,
    roi: 2,
    avgEngagementTime: 90,
  },
  [AnalyticsMedium.SOCIAL]: {
    ctr: 0.01,
    conversionRate: 0.015,
    cpa: 30,
    roi: 1.5,
    avgEngagementTime: 120,
  },
  [AnalyticsMedium.EMAIL]: {
    ctr: 0.03,
    conversionRate: 0.04,
    cpa: 15,
    roi: 4,
    avgEngagementTime: 60,
  },
  [AnalyticsMedium.AFFILIATE]: {
    ctr: 0.025,
    conversionRate: 0.035,
    cpa: 20,
    roi: 3,
    avgEngagementTime: 150,
  },
  [AnalyticsMedium.DISPLAY]: {
    ctr: 0.005,
    conversionRate: 0.01,
    cpa: 35,
    roi: 1,
    avgEngagementTime: 45,
  },
  [AnalyticsMedium.VIDEO]: {
    ctr: 0.015,
    conversionRate: 0.025,
    cpa: 28,
    roi: 2.5,
    avgEngagementTime: 240,
  },
  [AnalyticsMedium.NATIVE]: {
    ctr: 0.02,
    conversionRate: 0.03,
    cpa: 22,
    roi: 3.5,
    avgEngagementTime: 200,
  },
  [AnalyticsMedium.REFERRAL]: {
    ctr: 0.04,
    conversionRate: 0.045,
    cpa: 10,
    roi: 6,
    avgEngagementTime: 160,
  },
  [AnalyticsMedium.DIRECT]: {
    ctr: 0.06,
    conversionRate: 0.05,
    cpa: 5,
    roi: 8,
    avgEngagementTime: 300,
  },
  [AnalyticsMedium.CPC]: {
    ctr: 0.02,
    conversionRate: 0.02,
    cpa: 25,
    roi: 2,
    avgEngagementTime: 90,
  },
  [AnalyticsMedium.CPM]: {
    ctr: 0.005,
    conversionRate: 0.01,
    cpa: 35,
    roi: 1,
    avgEngagementTime: 45,
  },
  [AnalyticsMedium.CPA]: {
    ctr: 0.03,
    conversionRate: 0.06,
    cpa: 15,
    roi: 4,
    avgEngagementTime: 120,
  },
  [AnalyticsMedium.CTR]: {
    ctr: 0.02,
    conversionRate: 0.02,
    cpa: 25,
    roi: 2,
    avgEngagementTime: 90,
  },
  [AnalyticsMedium.SEM]: {
    ctr: 0.025,
    conversionRate: 0.035,
    cpa: 20,
    roi: 3,
    avgEngagementTime: 100,
  },
  [AnalyticsMedium.SEO]: {
    ctr: 0.05,
    conversionRate: 0.03,
    cpa: 0,
    roi: 5,
    avgEngagementTime: 180,
  },
  [AnalyticsMedium.CONTENT]: {
    ctr: 0.04,
    conversionRate: 0.04,
    cpa: 18,
    roi: 4.5,
    avgEngagementTime: 250,
  },
  [AnalyticsMedium.INFLUENCER]: {
    ctr: 0.035,
    conversionRate: 0.04,
    cpa: 20,
    roi: 3.5,
    avgEngagementTime: 200,
  },
  [AnalyticsMedium.PODCAST]: {
    ctr: 0.01,
    conversionRate: 0.015,
    cpa: 30,
    roi: 1.5,
    avgEngagementTime: 300,
  },
  [AnalyticsMedium.WEBINAR]: {
    ctr: 0.06,
    conversionRate: 0.07,
    cpa: 12,
    roi: 6,
    avgEngagementTime: 360,
  },
  [AnalyticsMedium.EVENT]: {
    ctr: 0.07,
    conversionRate: 0.08,
    cpa: 10,
    roi: 7,
    avgEngagementTime: 400,
  },
  [AnalyticsMedium.PR]: {
    ctr: 0.05,
    conversionRate: 0.05,
    cpa: 15,
    roi: 5,
    avgEngagementTime: 180,
  },
  [AnalyticsMedium.SMS]: {
    ctr: 0.08,
    conversionRate: 0.09,
    cpa: 8,
    roi: 8,
    avgEngagementTime: 60,
  },
  [AnalyticsMedium.PUSH]: {
    ctr: 0.04,
    conversionRate: 0.045,
    cpa: 18,
    roi: 3,
    avgEngagementTime: 45,
  },
  [AnalyticsMedium.IN_APP]: {
    ctr: 0.025,
    conversionRate: 0.03,
    cpa: 22,
    roi: 2.5,
    avgEngagementTime: 150,
  },
  [AnalyticsMedium.ASO]: {
    ctr: 0.06,
    conversionRate: 0.04,
    cpa: 8,
    roi: 6,
    avgEngagementTime: 180,
  },
  [AnalyticsMedium.PARTNER]: {
    ctr: 0.04,
    conversionRate: 0.05,
    cpa: 15,
    roi: 4,
    avgEngagementTime: 160,
  },
  [AnalyticsMedium.CO_MARKETING]: {
    ctr: 0.045,
    conversionRate: 0.055,
    cpa: 12,
    roi: 5,
    avgEngagementTime: 200,
  },
  [AnalyticsMedium.ABM]: {
    ctr: 0.03,
    conversionRate: 0.04,
    cpa: 20,
    roi: 3,
    avgEngagementTime: 180,
  },
  [AnalyticsMedium.PROGRAMMATIC]: {
    ctr: 0.01,
    conversionRate: 0.015,
    cpa: 30,
    roi: 1.5,
    avgEngagementTime: 60,
  },
  [AnalyticsMedium.NATIVE_APP]: {
    ctr: 0.035,
    conversionRate: 0.04,
    cpa: 18,
    roi: 3.5,
    avgEngagementTime: 200,
  },
  [AnalyticsMedium.MOBILE_WEB]: {
    ctr: 0.03,
    conversionRate: 0.025,
    cpa: 22,
    roi: 2,
    avgEngagementTime: 120,
  },
  [AnalyticsMedium.DESKTOP_WEB]: {
    ctr: 0.04,
    conversionRate: 0.035,
    cpa: 15,
    roi: 3,
    avgEngagementTime: 240,
  },
};

/**
 * Medium status
 */
export enum AnalyticsMediumStatus {
  /** Active and collecting data */
  ACTIVE = 'ACTIVE',
  /** Inactive */
  INACTIVE = 'INACTIVE',
  /** Under maintenance */
  MAINTENANCE = 'MAINTENANCE',
  /** Deprecated */
  DEPRECATED = 'DEPRECATED',
}

/**
 * Default status for mediums
 */
export const ANALYTICS_MEDIUM_DEFAULT_STATUS: Record<AnalyticsMedium, AnalyticsMediumStatus> = {
  [AnalyticsMedium.ORGANIC]: AnalyticsMediumStatus.ACTIVE,
  [AnalyticsMedium.PAID]: AnalyticsMediumStatus.ACTIVE,
  [AnalyticsMedium.SOCIAL]: AnalyticsMediumStatus.ACTIVE,
  [AnalyticsMedium.EMAIL]: AnalyticsMediumStatus.ACTIVE,
  [AnalyticsMedium.AFFILIATE]: AnalyticsMediumStatus.ACTIVE,
  [AnalyticsMedium.DISPLAY]: AnalyticsMediumStatus.ACTIVE,
  [AnalyticsMedium.VIDEO]: AnalyticsMediumStatus.ACTIVE,
  [AnalyticsMedium.NATIVE]: AnalyticsMediumStatus.ACTIVE,
  [AnalyticsMedium.REFERRAL]: AnalyticsMediumStatus.ACTIVE,
  [AnalyticsMedium.DIRECT]: AnalyticsMediumStatus.ACTIVE,
  [AnalyticsMedium.CPC]: AnalyticsMediumStatus.ACTIVE,
  [AnalyticsMedium.CPM]: AnalyticsMediumStatus.ACTIVE,
  [AnalyticsMedium.CPA]: AnalyticsMediumStatus.ACTIVE,
  [AnalyticsMedium.CTR]: AnalyticsMediumStatus.ACTIVE,
  [AnalyticsMedium.SEM]: AnalyticsMediumStatus.ACTIVE,
  [AnalyticsMedium.SEO]: AnalyticsMediumStatus.ACTIVE,
  [AnalyticsMedium.CONTENT]: AnalyticsMediumStatus.ACTIVE,
  [AnalyticsMedium.INFLUENCER]: AnalyticsMediumStatus.ACTIVE,
  [AnalyticsMedium.PODCAST]: AnalyticsMediumStatus.ACTIVE,
  [AnalyticsMedium.WEBINAR]: AnalyticsMediumStatus.ACTIVE,
  [AnalyticsMedium.EVENT]: AnalyticsMediumStatus.ACTIVE,
  [AnalyticsMedium.PR]: AnalyticsMediumStatus.ACTIVE,
  [AnalyticsMedium.SMS]: AnalyticsMediumStatus.ACTIVE,
  [AnalyticsMedium.PUSH]: AnalyticsMediumStatus.ACTIVE,
  [AnalyticsMedium.IN_APP]: AnalyticsMediumStatus.ACTIVE,
  [AnalyticsMedium.ASO]: AnalyticsMediumStatus.ACTIVE,
  [AnalyticsMedium.PARTNER]: AnalyticsMediumStatus.ACTIVE,
  [AnalyticsMedium.CO_MARKETING]: AnalyticsMediumStatus.ACTIVE,
  [AnalyticsMedium.ABM]: AnalyticsMediumStatus.ACTIVE,
  [AnalyticsMedium.PROGRAMMATIC]: AnalyticsMediumStatus.ACTIVE,
  [AnalyticsMedium.NATIVE_APP]: AnalyticsMediumStatus.ACTIVE,
  [AnalyticsMedium.MOBILE_WEB]: AnalyticsMediumStatus.ACTIVE,
  [AnalyticsMedium.DESKTOP_WEB]: AnalyticsMediumStatus.ACTIVE,
};

/**
 * Get label for a medium
 */
export function getAnalyticsMediumLabel(medium: AnalyticsMedium): string {
  return ANALYTICS_MEDIUM_CONFIG[medium]?.label || medium;
}

/**
 * Get description for a medium
 */
export function getAnalyticsMediumDescription(medium: AnalyticsMedium): string {
  return ANALYTICS_MEDIUM_CONFIG[medium]?.description || '';
}

/**
 * Get medium type
 */
export function getAnalyticsMediumType(medium: AnalyticsMedium): AnalyticsMediumType {
  return ANALYTICS_MEDIUM_TYPE_MAP[medium];
}

/**
 * Get metrics for a medium
 */
export function getAnalyticsMediumMetrics(
  medium: AnalyticsMedium
): Partial<AnalyticsMediumMetrics> {
  return ANALYTICS_MEDIUM_DEFAULT_METRICS[medium] || {};
}

/**
 * Get status for a medium
 */
export function getAnalyticsMediumStatus(medium: AnalyticsMedium): AnalyticsMediumStatus {
  return ANALYTICS_MEDIUM_DEFAULT_STATUS[medium];
}

/**
 * Set status for a medium
 */
export function setAnalyticsMediumStatus(
  medium: AnalyticsMedium,
  status: AnalyticsMediumStatus
): void {
  ANALYTICS_MEDIUM_DEFAULT_STATUS[medium] = status;
}

/**
 * Check if medium is active
 */
export function isMediumActive(medium: AnalyticsMedium): boolean {
  return getAnalyticsMediumStatus(medium) === AnalyticsMediumStatus.ACTIVE;
}

/**
 * Get mediums by type
 */
export function getMediumsByType(type: AnalyticsMediumType): AnalyticsMedium[] {
  return Object.entries(ANALYTICS_MEDIUM_TYPE_MAP)
    .filter(([_, t]) => t === type)
    .map(([medium]) => medium as AnalyticsMedium);
}

/**
 * Get active mediums
 */
export function getActiveMediums(): AnalyticsMedium[] {
  return Object.values(AnalyticsMedium).filter((medium) => isMediumActive(medium));
}

/**
 * Medium priority for attribution
 */
export enum AnalyticsMediumPriority {
  /** First touch attribution */
  FIRST_TOUCH = 'FIRST_TOUCH',
  /** Last touch attribution */
  LAST_TOUCH = 'LAST_TOUCH',
  /** Linear attribution */
  LINEAR = 'LINEAR',
  /** Time decay attribution */
  TIME_DECAY = 'TIME_DECAY',
  /** Position based attribution */
  POSITION_BASED = 'POSITION_BASED',
}

/**
 * Get medium priority for attribution
 */
export function getMediumPriority(medium: AnalyticsMedium): AnalyticsMediumPriority {
  const type = getAnalyticsMediumType(medium);
  const isPaid = type === AnalyticsMediumType.PAID;

  if (isPaid) {
    return AnalyticsMediumPriority.LAST_TOUCH;
  }
  if (type === AnalyticsMediumType.ORGANIC) {
    return AnalyticsMediumPriority.FIRST_TOUCH;
  }
  if (type === AnalyticsMediumType.REFERRAL) {
    return AnalyticsMediumPriority.POSITION_BASED;
  }
  return AnalyticsMediumPriority.LINEAR;
}
