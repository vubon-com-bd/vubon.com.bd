/**
 * ঘোষণার ধরন সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * ঘোষণার ধরনসমূহ
 */
export const ANNOUNCEMENT_TYPES = [
  'general',
  'important',
  'emergency',
  'promotional',
  'maintenance',
] as const;

/**
 * প্রতিটি ঘোষণা টাইপের লেবেল (বাংলা এবং ইংরেজি)
 */
export const ANNOUNCEMENT_TYPE_LABELS = {
  general: {
    en: 'General',
    bn: 'সাধারণ',
  },
  important: {
    en: 'Important',
    bn: 'গুরুত্বপূর্ণ',
  },
  emergency: {
    en: 'Emergency',
    bn: 'জরুরি',
  },
  promotional: {
    en: 'Promotional',
    bn: 'প্রচারমূলক',
  },
  maintenance: {
    en: 'Maintenance',
    bn: 'রক্ষণাবেক্ষণ',
  },
} as const satisfies Record<(typeof ANNOUNCEMENT_TYPES)[number], { en: string; bn: string }>;

/**
 * প্রতিটি ঘোষণা টাইপের আইকন
 */
export const ANNOUNCEMENT_TYPE_ICONS = {
  general: '📢',
  important: '⚠️',
  emergency: '🚨',
  promotional: '🎯',
  maintenance: '🔧',
} as const satisfies Record<(typeof ANNOUNCEMENT_TYPES)[number], string>;

/**
 * ঘোষণা টাইপ টাইপ
 */
export type AnnouncementType = (typeof ANNOUNCEMENT_TYPES)[number];

/**
 * ভাষা টাইপ
 */
export type Language = 'en' | 'bn';

/**
 * নির্দিষ্ট ঘোষণা টাইপের লেবেল পাওয়ার ফাংশন
 */
export function getAnnouncementTypeLabel(type: AnnouncementType, lang: Language = 'en'): string {
  return ANNOUNCEMENT_TYPE_LABELS[type][lang];
}

/**
 * নির্দিষ্ট ঘোষণা টাইপের আইকন পাওয়ার ফাংশন
 */
export function getAnnouncementTypeIcon(type: AnnouncementType): string {
  return ANNOUNCEMENT_TYPE_ICONS[type];
}

/**
 * সব ঘোষণা টাইপের তালিকা পাওয়ার ফাংশন
 */
export function getAllAnnouncementTypes(): readonly AnnouncementType[] {
  return ANNOUNCEMENT_TYPES;
}

/**
 * ঘোষণা টাইপ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidAnnouncementType(type: string): type is AnnouncementType {
  return ANNOUNCEMENT_TYPES.includes(type as AnnouncementType);
}

/**
 * ঘোষণা টাইপ গুরুত্বপূর্ণ কিনা চেক করার ফাংশন
 */
export function isImportantAnnouncement(type: AnnouncementType): boolean {
  return type === 'important' || type === 'emergency';
}

/**
 * ঘোষণা টাইপ জরুরি কিনা চেক করার ফাংশন
 */
export function isEmergencyAnnouncement(type: AnnouncementType): boolean {
  return type === 'emergency';
}

/**
 * ঘোষণা টাইপ প্রচারমূলক কিনা চেক করার ফাংশন
 */
export function isPromotionalAnnouncement(type: AnnouncementType): boolean {
  return type === 'promotional';
}

/**
 * ঘোষণা টাইপ রক্ষণাবেক্ষণ কিনা চেক করার ফাংশন
 */
export function isMaintenanceAnnouncement(type: AnnouncementType): boolean {
  return type === 'maintenance';
}

/**
 * ঘোষণা টাইপের কালার পাওয়ার ফাংশন
 */
export function getAnnouncementTypeColor(type: AnnouncementType): string {
  const colors: Record<AnnouncementType, string> = {
    general: 'blue',
    important: 'orange',
    emergency: 'red',
    promotional: 'purple',
    maintenance: 'yellow',
  };
  return colors[type];
}

/**
 * ঘোষণা টাইপের প্রায়োরিটি লেভেল পাওয়ার ফাংশন
 */
export function getAnnouncementTypePriority(type: AnnouncementType): number {
  const priorities: Record<AnnouncementType, number> = {
    general: 1,
    important: 2,
    promotional: 2,
    maintenance: 3,
    emergency: 4,
  };
  return priorities[type];
}

/**
 * ডিফল্ট ঘোষণা টাইপ পাওয়ার ফাংশন
 */
export function getDefaultAnnouncementType(): AnnouncementType {
  return 'general';
}
