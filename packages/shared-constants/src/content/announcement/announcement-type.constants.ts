/**
 * Announcement Type Constants
 * Types and classifications of announcements
 */

export const CONTENT_ANNOUNCEMENT_TYPE = {
  // Announcement Categories
  CATEGORIES: {
    SYSTEM: 'system',
    BUSINESS: 'business',
    MARKETING: 'marketing',
    OPERATIONAL: 'operational',
    SECURITY: 'security',
    FEATURE: 'feature',
    EVENT: 'event',
    PROMOTIONAL: 'promotional',
    INFORMATIONAL: 'informational',
    CUSTOM: 'custom',
  } as const,

  // Announcement Sub-Types
  SUB_TYPES: {
    // System
    MAINTENANCE: 'maintenance',
    UPGRADE: 'upgrade',
    OUTAGE: 'outage',
    PERFORMANCE: 'performance',

    // Business
    ANNOUNCEMENT: 'announcement',
    UPDATE: 'update',
    MILESTONE: 'milestone',
    ACHIEVEMENT: 'achievement',

    // Marketing
    PROMOTION: 'promotion',
    SALE: 'sale',
    OFFER: 'offer',
    CAMPAIGN: 'campaign',
    NEWSLETTER: 'newsletter',

    // Operational
    POLICY: 'policy',
    PROCEDURE: 'procedure',
    GUIDELINE: 'guideline',
    NOTICE: 'notice',

    // Security
    ALERT: 'alert',
    BREACH: 'breach',
    PATCH: 'patch',
    COMPLIANCE: 'compliance',

    // Feature
    NEW: 'new',
    IMPROVED: 'improved',
    DEPRECATED: 'deprecated',
    REMOVED: 'removed',

    // Event
    UPCOMING: 'upcoming',
    ONGOING: 'ongoing',
    COMPLETED: 'completed',
    HOLIDAY: 'holiday',
  } as const,

  // Announcement Formats
  FORMATS: {
    TEXT: 'text',
    HTML: 'html',
    MARKDOWN: 'markdown',
    RICH: 'rich',
    TEMPLATE: 'template',
    CUSTOM: 'custom',
  } as const,

  // Announcement Urgency
  URGENCY: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    URGENT: 'urgent',
    EMERGENCY: 'emergency',
  } as const,

  // Announcement Tone
  TONE: {
    FORMAL: 'formal',
    INFORMAL: 'informal',
    PROFESSIONAL: 'professional',
    FRIENDLY: 'friendly',
    URGENT: 'urgent',
    CASUAL: 'casual',
    CUSTOM: 'custom',
  } as const,
} as const;

// Announcement Categories
export type ContentAnnouncementTypeCategory =
  (typeof CONTENT_ANNOUNCEMENT_TYPE.CATEGORIES)[keyof typeof CONTENT_ANNOUNCEMENT_TYPE.CATEGORIES];

// Announcement Sub-Types
export type ContentAnnouncementTypeSubType =
  (typeof CONTENT_ANNOUNCEMENT_TYPE.SUB_TYPES)[keyof typeof CONTENT_ANNOUNCEMENT_TYPE.SUB_TYPES];

// Announcement Formats
export type ContentAnnouncementTypeFormat =
  (typeof CONTENT_ANNOUNCEMENT_TYPE.FORMATS)[keyof typeof CONTENT_ANNOUNCEMENT_TYPE.FORMATS];

// Announcement Urgency
export type ContentAnnouncementTypeUrgency =
  (typeof CONTENT_ANNOUNCEMENT_TYPE.URGENCY)[keyof typeof CONTENT_ANNOUNCEMENT_TYPE.URGENCY];

// Announcement Tone
export type ContentAnnouncementTypeTone =
  (typeof CONTENT_ANNOUNCEMENT_TYPE.TONE)[keyof typeof CONTENT_ANNOUNCEMENT_TYPE.TONE];

// Utility Functions
export function contentAnnouncementTypeGetCategoryLabel(
  category: ContentAnnouncementTypeCategory
): string {
  const labels: Record<ContentAnnouncementTypeCategory, string> = {
    [CONTENT_ANNOUNCEMENT_TYPE.CATEGORIES.SYSTEM]: 'System Announcement',
    [CONTENT_ANNOUNCEMENT_TYPE.CATEGORIES.BUSINESS]: 'Business Announcement',
    [CONTENT_ANNOUNCEMENT_TYPE.CATEGORIES.MARKETING]: 'Marketing Announcement',
    [CONTENT_ANNOUNCEMENT_TYPE.CATEGORIES.OPERATIONAL]: 'Operational Announcement',
    [CONTENT_ANNOUNCEMENT_TYPE.CATEGORIES.SECURITY]: 'Security Announcement',
    [CONTENT_ANNOUNCEMENT_TYPE.CATEGORIES.FEATURE]: 'Feature Announcement',
    [CONTENT_ANNOUNCEMENT_TYPE.CATEGORIES.EVENT]: 'Event Announcement',
    [CONTENT_ANNOUNCEMENT_TYPE.CATEGORIES.PROMOTIONAL]: 'Promotional Announcement',
    [CONTENT_ANNOUNCEMENT_TYPE.CATEGORIES.INFORMATIONAL]: 'Informational Announcement',
    [CONTENT_ANNOUNCEMENT_TYPE.CATEGORIES.CUSTOM]: 'Custom Announcement',
  };
  return labels[category] || 'Unknown Category';
}

export function contentAnnouncementTypeGetSubTypeLabel(
  subType: ContentAnnouncementTypeSubType
): string {
  const labels: Record<ContentAnnouncementTypeSubType, string> = {
    // System
    [CONTENT_ANNOUNCEMENT_TYPE.SUB_TYPES.MAINTENANCE]: 'Maintenance',
    [CONTENT_ANNOUNCEMENT_TYPE.SUB_TYPES.UPGRADE]: 'Upgrade',
    [CONTENT_ANNOUNCEMENT_TYPE.SUB_TYPES.OUTAGE]: 'Outage',
    [CONTENT_ANNOUNCEMENT_TYPE.SUB_TYPES.PERFORMANCE]: 'Performance',

    // Business
    [CONTENT_ANNOUNCEMENT_TYPE.SUB_TYPES.ANNOUNCEMENT]: 'Announcement',
    [CONTENT_ANNOUNCEMENT_TYPE.SUB_TYPES.UPDATE]: 'Update',
    [CONTENT_ANNOUNCEMENT_TYPE.SUB_TYPES.MILESTONE]: 'Milestone',
    [CONTENT_ANNOUNCEMENT_TYPE.SUB_TYPES.ACHIEVEMENT]: 'Achievement',

    // Marketing
    [CONTENT_ANNOUNCEMENT_TYPE.SUB_TYPES.PROMOTION]: 'Promotion',
    [CONTENT_ANNOUNCEMENT_TYPE.SUB_TYPES.SALE]: 'Sale',
    [CONTENT_ANNOUNCEMENT_TYPE.SUB_TYPES.OFFER]: 'Offer',
    [CONTENT_ANNOUNCEMENT_TYPE.SUB_TYPES.CAMPAIGN]: 'Campaign',
    [CONTENT_ANNOUNCEMENT_TYPE.SUB_TYPES.NEWSLETTER]: 'Newsletter',

    // Operational
    [CONTENT_ANNOUNCEMENT_TYPE.SUB_TYPES.POLICY]: 'Policy',
    [CONTENT_ANNOUNCEMENT_TYPE.SUB_TYPES.PROCEDURE]: 'Procedure',
    [CONTENT_ANNOUNCEMENT_TYPE.SUB_TYPES.GUIDELINE]: 'Guideline',
    [CONTENT_ANNOUNCEMENT_TYPE.SUB_TYPES.NOTICE]: 'Notice',

    // Security
    [CONTENT_ANNOUNCEMENT_TYPE.SUB_TYPES.ALERT]: 'Alert',
    [CONTENT_ANNOUNCEMENT_TYPE.SUB_TYPES.BREACH]: 'Security Breach',
    [CONTENT_ANNOUNCEMENT_TYPE.SUB_TYPES.PATCH]: 'Security Patch',
    [CONTENT_ANNOUNCEMENT_TYPE.SUB_TYPES.COMPLIANCE]: 'Compliance',

    // Feature
    [CONTENT_ANNOUNCEMENT_TYPE.SUB_TYPES.NEW]: 'New Feature',
    [CONTENT_ANNOUNCEMENT_TYPE.SUB_TYPES.IMPROVED]: 'Improved Feature',
    [CONTENT_ANNOUNCEMENT_TYPE.SUB_TYPES.DEPRECATED]: 'Deprecated Feature',
    [CONTENT_ANNOUNCEMENT_TYPE.SUB_TYPES.REMOVED]: 'Removed Feature',

    // Event
    [CONTENT_ANNOUNCEMENT_TYPE.SUB_TYPES.UPCOMING]: 'Upcoming Event',
    [CONTENT_ANNOUNCEMENT_TYPE.SUB_TYPES.ONGOING]: 'Ongoing Event',
    [CONTENT_ANNOUNCEMENT_TYPE.SUB_TYPES.COMPLETED]: 'Completed Event',
    [CONTENT_ANNOUNCEMENT_TYPE.SUB_TYPES.HOLIDAY]: 'Holiday',
  };
  return labels[subType] || 'Unknown Sub-Type';
}

export function contentAnnouncementTypeGetFormatLabel(
  format: ContentAnnouncementTypeFormat
): string {
  const labels: Record<ContentAnnouncementTypeFormat, string> = {
    [CONTENT_ANNOUNCEMENT_TYPE.FORMATS.TEXT]: 'Plain Text',
    [CONTENT_ANNOUNCEMENT_TYPE.FORMATS.HTML]: 'HTML',
    [CONTENT_ANNOUNCEMENT_TYPE.FORMATS.MARKDOWN]: 'Markdown',
    [CONTENT_ANNOUNCEMENT_TYPE.FORMATS.RICH]: 'Rich Text',
    [CONTENT_ANNOUNCEMENT_TYPE.FORMATS.TEMPLATE]: 'Template',
    [CONTENT_ANNOUNCEMENT_TYPE.FORMATS.CUSTOM]: 'Custom Format',
  };
  return labels[format] || 'Unknown Format';
}

export function contentAnnouncementTypeGetUrgencyLabel(
  urgency: ContentAnnouncementTypeUrgency
): string {
  const labels: Record<ContentAnnouncementTypeUrgency, string> = {
    [CONTENT_ANNOUNCEMENT_TYPE.URGENCY.LOW]: 'Low',
    [CONTENT_ANNOUNCEMENT_TYPE.URGENCY.MEDIUM]: 'Medium',
    [CONTENT_ANNOUNCEMENT_TYPE.URGENCY.HIGH]: 'High',
    [CONTENT_ANNOUNCEMENT_TYPE.URGENCY.URGENT]: 'Urgent',
    [CONTENT_ANNOUNCEMENT_TYPE.URGENCY.EMERGENCY]: 'Emergency',
  };
  return labels[urgency] || 'Unknown Urgency';
}

export function contentAnnouncementTypeGetToneLabel(tone: ContentAnnouncementTypeTone): string {
  const labels: Record<ContentAnnouncementTypeTone, string> = {
    [CONTENT_ANNOUNCEMENT_TYPE.TONE.FORMAL]: 'Formal',
    [CONTENT_ANNOUNCEMENT_TYPE.TONE.INFORMAL]: 'Informal',
    [CONTENT_ANNOUNCEMENT_TYPE.TONE.PROFESSIONAL]: 'Professional',
    [CONTENT_ANNOUNCEMENT_TYPE.TONE.FRIENDLY]: 'Friendly',
    [CONTENT_ANNOUNCEMENT_TYPE.TONE.URGENT]: 'Urgent',
    [CONTENT_ANNOUNCEMENT_TYPE.TONE.CASUAL]: 'Casual',
    [CONTENT_ANNOUNCEMENT_TYPE.TONE.CUSTOM]: 'Custom',
  };
  return labels[tone] || 'Unknown Tone';
}

export function contentAnnouncementTypeIsValidCategory(
  category: string
): category is ContentAnnouncementTypeCategory {
  return Object.values(CONTENT_ANNOUNCEMENT_TYPE.CATEGORIES).includes(
    category as ContentAnnouncementTypeCategory
  );
}

export function contentAnnouncementTypeIsValidFormat(
  format: string
): format is ContentAnnouncementTypeFormat {
  return Object.values(CONTENT_ANNOUNCEMENT_TYPE.FORMATS).includes(
    format as ContentAnnouncementTypeFormat
  );
}
