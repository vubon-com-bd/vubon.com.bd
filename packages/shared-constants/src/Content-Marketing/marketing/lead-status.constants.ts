/**
 * লিডের স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * লিডের সব স্ট্যাটাস
 */
export const LEAD_STATUSES = ['new', 'contacted', 'qualified', 'converted', 'lost'] as const;

/**
 * প্রতিটি স্ট্যাটাসের জন্য কালার কোড
 */
export const LEAD_STATUS_COLORS = {
  new: 'blue',
  contacted: 'yellow',
  qualified: 'green',
  converted: 'purple',
  lost: 'red',
} as const satisfies Record<(typeof LEAD_STATUSES)[number], string>;

/**
 * প্রতিটি স্ট্যাটাসের জন্য লেবেল (বাংলা এবং ইংরেজি)
 */
export const LEAD_STATUS_LABELS = {
  new: {
    en: 'New',
    bn: 'নতুন',
  },
  contacted: {
    en: 'Contacted',
    bn: 'যোগাযোগ করা হয়েছে',
  },
  qualified: {
    en: 'Qualified',
    bn: 'যোগ্য',
  },
  converted: {
    en: 'Converted',
    bn: 'রূপান্তরিত',
  },
  lost: {
    en: 'Lost',
    bn: 'হারিয়ে গেছে',
  },
} as const satisfies Record<(typeof LEAD_STATUSES)[number], { en: string; bn: string }>;

/**
 * লিড স্ট্যাটাস টাইপ
 */
export type LeadStatus = (typeof LEAD_STATUSES)[number];

/**
 * ভাষা টাইপ
 */
export type Language = 'en' | 'bn';

/**
 * নির্দিষ্ট স্ট্যাটাসের জন্য কালার পাওয়ার ফাংশন
 */
export function getLeadStatusColor(status: LeadStatus): string {
  return LEAD_STATUS_COLORS[status];
}

/**
 * নির্দিষ্ট স্ট্যাটাসের জন্য লেবেল পাওয়ার ফাংশন
 */
export function getLeadStatusLabel(status: LeadStatus, lang: Language = 'en'): string {
  return LEAD_STATUS_LABELS[status][lang];
}

/**
 * সব লিড স্ট্যাটাসের তালিকা পাওয়ার ফাংশন
 */
export function getAllLeadStatuses(): readonly LeadStatus[] {
  return LEAD_STATUSES;
}

/**
 * লিড স্ট্যাটাস বৈধ কিনা চেক করার ফাংশন
 */
export function isValidLeadStatus(status: string): status is LeadStatus {
  return LEAD_STATUSES.includes(status as LeadStatus);
}

/**
 * স্ট্যাটাস নতুন কিনা চেক করার ফাংশন
 */
export function isNewLeadStatus(status: LeadStatus): boolean {
  return status === 'new';
}

/**
 * স্ট্যাটাস যোগাযোগ করা হয়েছে কিনা চেক করার ফাংশন
 */
export function isContactedLeadStatus(status: LeadStatus): boolean {
  return status === 'contacted';
}

/**
 * স্ট্যাটাস যোগ্য কিনা চেক করার ফাংশন
 */
export function isQualifiedLeadStatus(status: LeadStatus): boolean {
  return status === 'qualified';
}

/**
 * স্ট্যাটাস রূপান্তরিত কিনা চেক করার ফাংশন
 */
export function isConvertedLeadStatus(status: LeadStatus): boolean {
  return status === 'converted';
}

/**
 * স্ট্যাটাস হারিয়ে গেছে কিনা চেক করার ফাংশন
 */
export function isLostLeadStatus(status: LeadStatus): boolean {
  return status === 'lost';
}

/**
 * স্ট্যাটাস টার্মিনাল (কনভার্টেড বা লস্ট) কিনা চেক করার ফাংশন
 */
export function isTerminalLeadStatus(status: LeadStatus): boolean {
  return status === 'converted' || status === 'lost';
}

/**
 * স্ট্যাটাস অ্যাক্টিভ (নতুন, কন্ট্যাক্টেড, কোয়ালিফাইড) কিনা চেক করার ফাংশন
 */
export function isActiveLeadStatus(status: LeadStatus): boolean {
  return status === 'new' || status === 'contacted' || status === 'qualified';
}

/**
 * স্ট্যাটাস এডিটযোগ্য (টার্মিনাল ছাড়া) কিনা চেক করার ফাংশন
 */
export function isEditableLeadStatus(status: LeadStatus): boolean {
  return !isTerminalLeadStatus(status);
}

/**
 * স্ট্যাটাস ট্রানজিশন অনুমোদিত কিনা চেক করার ফাংশন
 */
export function canLeadTransitionTo(currentStatus: LeadStatus, newStatus: LeadStatus): boolean {
  const transitions: Record<LeadStatus, LeadStatus[]> = {
    new: ['contacted', 'lost'],
    contacted: ['qualified', 'lost'],
    qualified: ['converted', 'lost'],
    converted: [],
    lost: [],
  };
  return transitions[currentStatus].includes(newStatus);
}

/**
 * ডিফল্ট লিড স্ট্যাটাস পাওয়ার ফাংশন
 */
export function getDefaultLeadStatus(): LeadStatus {
  return 'new';
}

/**
 * স্ট্যাটাসের আইকন পাওয়ার ফাংশন
 */
export function getLeadStatusIcon(status: LeadStatus): string {
  const icons: Record<LeadStatus, string> = {
    new: '🆕',
    contacted: '📞',
    qualified: '✅',
    converted: '🎯',
    lost: '❌',
  };
  return icons[status];
}

/**
 * স্ট্যাটাসের পাইপলাইন স্টেজ নাম্বার পাওয়ার ফাংশন
 */
export function getLeadStageNumber(status: LeadStatus): number {
  const stages: Record<LeadStatus, number> = {
    new: 1,
    contacted: 2,
    qualified: 3,
    converted: 4,
    lost: 0,
  };
  return stages[status];
}

/**
 * স্ট্যাটাসের বিবরণ পাওয়ার ফাংশন
 */
export function getLeadStatusDescription(status: LeadStatus, lang: Language = 'en'): string {
  const descriptions: Record<LeadStatus, { en: string; bn: string }> = {
    new: {
      en: 'New lead that has not been contacted yet',
      bn: 'নতুন লিড যা এখনও যোগাযোগ করা হয়নি',
    },
    contacted: {
      en: 'Lead has been contacted and is in conversation',
      bn: 'লিডের সাথে যোগাযোগ করা হয়েছে এবং কথোপকথন চলছে',
    },
    qualified: {
      en: 'Lead has been qualified as a potential customer',
      bn: 'লিডকে সম্ভাব্য গ্রাহক হিসেবে যোগ্য করা হয়েছে',
    },
    converted: {
      en: 'Lead has been converted to a customer',
      bn: 'লিডকে গ্রাহকে রূপান্তরিত করা হয়েছে',
    },
    lost: {
      en: 'Lead has been lost or disqualified',
      bn: 'লিড হারিয়ে গেছে বা অযোগ্য হয়েছে',
    },
  };
  return descriptions[status][lang];
}
