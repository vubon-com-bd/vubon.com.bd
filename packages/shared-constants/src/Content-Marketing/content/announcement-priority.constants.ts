/**
 * ঘোষণার গুরুত্ব সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * ঘোষণার প্রায়োরিটি লেভেলসমূহ
 */
export const ANNOUNCEMENT_PRIORITIES = ['low', 'medium', 'high', 'urgent'] as const;

/**
 * প্রতিটি প্রায়োরিটির লেভেল নম্বর
 */
export const ANNOUNCEMENT_PRIORITY_LEVELS = {
  low: 1,
  medium: 2,
  high: 3,
  urgent: 4,
} as const satisfies Record<(typeof ANNOUNCEMENT_PRIORITIES)[number], number>;

/**
 * প্রতিটি প্রায়োরিটির জন্য কালার
 */
export const ANNOUNCEMENT_PRIORITY_COLORS = {
  low: 'blue',
  medium: 'green',
  high: 'orange',
  urgent: 'red',
} as const satisfies Record<(typeof ANNOUNCEMENT_PRIORITIES)[number], string>;

/**
 * ঘোষণা প্রায়োরিটি টাইপ
 */
export type AnnouncementPriority = (typeof ANNOUNCEMENT_PRIORITIES)[number];

/**
 * প্রায়োরিটি লেভেল নম্বর পাওয়ার ফাংশন
 */
export function getAnnouncementPriorityLevel(priority: AnnouncementPriority): number {
  return ANNOUNCEMENT_PRIORITY_LEVELS[priority];
}

/**
 * প্রায়োরিটির কালার পাওয়ার ফাংশন
 */
export function getAnnouncementPriorityColor(priority: AnnouncementPriority): string {
  return ANNOUNCEMENT_PRIORITY_COLORS[priority];
}

/**
 * সব প্রায়োরিটির তালিকা পাওয়ার ফাংশন
 */
export function getAllAnnouncementPriorities(): readonly AnnouncementPriority[] {
  return ANNOUNCEMENT_PRIORITIES;
}

/**
 * প্রায়োরিটি বৈধ কিনা চেক করার ফাংশন
 */
export function isValidAnnouncementPriority(priority: string): priority is AnnouncementPriority {
  return ANNOUNCEMENT_PRIORITIES.includes(priority as AnnouncementPriority);
}

/**
 * প্রায়োরিটি উচ্চ কিনা চেক করার ফাংশন
 */
export function isHighPriority(priority: AnnouncementPriority): boolean {
  return priority === 'high' || priority === 'urgent';
}

/**
 * প্রায়োরিটি জরুরি কিনা চেক করার ফাংশন
 */
export function isUrgentPriority(priority: AnnouncementPriority): boolean {
  return priority === 'urgent';
}

/**
 * প্রায়োরিটির লেবেল পাওয়ার ফাংশন (বাংলা এবং ইংরেজি)
 */
export function getAnnouncementPriorityLabel(priority: AnnouncementPriority): {
  en: string;
  bn: string;
} {
  const labels: Record<AnnouncementPriority, { en: string; bn: string }> = {
    low: {
      en: 'Low',
      bn: 'নিম্ন',
    },
    medium: {
      en: 'Medium',
      bn: 'মাঝারি',
    },
    high: {
      en: 'High',
      bn: 'উচ্চ',
    },
    urgent: {
      en: 'Urgent',
      bn: 'জরুরি',
    },
  };
  return labels[priority];
}

/**
 * প্রায়োরিটি তুলনা করার ফাংশন
 */
export function compareAnnouncementPriority(
  a: AnnouncementPriority,
  b: AnnouncementPriority
): number {
  return ANNOUNCEMENT_PRIORITY_LEVELS[a] - ANNOUNCEMENT_PRIORITY_LEVELS[b];
}

/**
 * ডিফল্ট প্রায়োরিটি পাওয়ার ফাংশন
 */
export function getDefaultAnnouncementPriority(): AnnouncementPriority {
  return 'medium';
}

/**
 * প্রায়োরিটি থেকে আইকন পাওয়ার ফাংশন
 */
export function getAnnouncementPriorityIcon(priority: AnnouncementPriority): string {
  const icons: Record<AnnouncementPriority, string> = {
    low: '🔵',
    medium: '🟢',
    high: '🟠',
    urgent: '🔴',
  };
  return icons[priority];
}

/**
 * প্রায়োরিটির বিবরণ পাওয়ার ফাংশন
 */
export function getAnnouncementPriorityDescription(priority: AnnouncementPriority): {
  en: string;
  bn: string;
} {
  const descriptions: Record<AnnouncementPriority, { en: string; bn: string }> = {
    low: {
      en: 'Low priority announcement, minimal impact',
      bn: 'নিম্ন গুরুত্বের ঘোষণা, ন্যূনতম প্রভাব',
    },
    medium: {
      en: 'Medium priority announcement, moderate impact',
      bn: 'মাঝারি গুরুত্বের ঘোষণা, মধ্যম প্রভাব',
    },
    high: {
      en: 'High priority announcement, significant impact',
      bn: 'উচ্চ গুরুত্বের ঘোষণা, উল্লেখযোগ্য প্রভাব',
    },
    urgent: {
      en: 'Urgent priority announcement, critical impact',
      bn: 'জরুরি গুরুত্বের ঘোষণা, ক্রিটিক্যাল প্রভাব',
    },
  };
  return descriptions[priority];
}
