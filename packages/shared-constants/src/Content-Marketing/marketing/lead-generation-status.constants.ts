/**
 * লিড জেনারেশন এর স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * লিড জেনারেশন এর সব স্ট্যাটাস
 */
export const LEAD_GEN_STATUSES = ['active', 'paused', 'completed'] as const;

/**
 * প্রতিটি স্ট্যাটাসের জন্য কালার কোড
 */
export const LEAD_GEN_STATUS_COLORS = {
  active: 'green',
  paused: 'yellow',
  completed: 'blue',
} as const satisfies Record<(typeof LEAD_GEN_STATUSES)[number], string>;

/**
 * প্রতিটি স্ট্যাটাসের জন্য লেবেল (বাংলা এবং ইংরেজি)
 */
export const LEAD_GEN_STATUS_LABELS = {
  active: {
    en: 'Active',
    bn: 'সক্রিয়',
  },
  paused: {
    en: 'Paused',
    bn: 'বিরাম দেওয়া',
  },
  completed: {
    en: 'Completed',
    bn: 'সম্পন্ন',
  },
} as const satisfies Record<(typeof LEAD_GEN_STATUSES)[number], { en: string; bn: string }>;

/**
 * লিড জেনারেশন স্ট্যাটাস টাইপ
 */
export type LeadGenStatus = (typeof LEAD_GEN_STATUSES)[number];

/**
 * ভাষা টাইপ
 */
export type Language = 'en' | 'bn';

/**
 * নির্দিষ্ট স্ট্যাটাসের জন্য কালার পাওয়ার ফাংশন
 */
export function getLeadGenStatusColor(status: LeadGenStatus): string {
  return LEAD_GEN_STATUS_COLORS[status];
}

/**
 * নির্দিষ্ট স্ট্যাটাসের জন্য লেবেল পাওয়ার ফাংশন
 */
export function getLeadGenStatusLabel(status: LeadGenStatus, lang: Language = 'en'): string {
  return LEAD_GEN_STATUS_LABELS[status][lang];
}

/**
 * সব লিড জেনারেশন স্ট্যাটাসের তালিকা পাওয়ার ফাংশন
 */
export function getAllLeadGenStatuses(): readonly LeadGenStatus[] {
  return LEAD_GEN_STATUSES;
}

/**
 * লিড জেনারেশন স্ট্যাটাস বৈধ কিনা চেক করার ফাংশন
 */
export function isValidLeadGenStatus(status: string): status is LeadGenStatus {
  return LEAD_GEN_STATUSES.includes(status as LeadGenStatus);
}

/**
 * স্ট্যাটাস সক্রিয় কিনা চেক করার ফাংশন
 */
export function isActiveLeadGenStatus(status: LeadGenStatus): boolean {
  return status === 'active';
}

/**
 * স্ট্যাটাস বিরাম দেওয়া কিনা চেক করার ফাংশন
 */
export function isPausedLeadGenStatus(status: LeadGenStatus): boolean {
  return status === 'paused';
}

/**
 * স্ট্যাটাস সম্পন্ন কিনা চেক করার ফাংশন
 */
export function isCompletedLeadGenStatus(status: LeadGenStatus): boolean {
  return status === 'completed';
}

/**
 * স্ট্যাটাস টার্মিনাল (কমপ্লিটেড) কিনা চেক করার ফাংশন
 */
export function isTerminalLeadGenStatus(status: LeadGenStatus): boolean {
  return status === 'completed';
}

/**
 * স্ট্যাটাস অ্যাক্টিভ গ্রুপ (অ্যাক্টিভ বা পজড) কিনা চেক করার ফাংশন
 */
export function isActiveLeadGenStatusGroup(status: LeadGenStatus): boolean {
  return status === 'active' || status === 'paused';
}

/**
 * স্ট্যাটাস ট্রানজিশন অনুমোদিত কিনা চেক করার ফাংশন
 */
export function canLeadGenTransitionTo(
  currentStatus: LeadGenStatus,
  newStatus: LeadGenStatus
): boolean {
  const transitions: Record<LeadGenStatus, LeadGenStatus[]> = {
    active: ['paused', 'completed'],
    paused: ['active', 'completed'],
    completed: [],
  };
  return transitions[currentStatus].includes(newStatus);
}

/**
 * ডিফল্ট লিড জেনারেশন স্ট্যাটাস পাওয়ার ফাংশন
 */
export function getDefaultLeadGenStatus(): LeadGenStatus {
  return 'active';
}

/**
 * স্ট্যাটাসের আইকন পাওয়ার ফাংশন
 */
export function getLeadGenStatusIcon(status: LeadGenStatus): string {
  const icons: Record<LeadGenStatus, string> = {
    active: '▶️',
    paused: '⏸️',
    completed: '✅',
  };
  return icons[status];
}
