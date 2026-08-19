/**
 * টিকেটের স্ট্যাটাস সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * টিকেট স্ট্যাটাস অবজেক্ট (বিস্তারিত)
 */
export const TicketStatusExtended = {
  NEW: 'NEW',
  ASSIGNED: 'ASSIGNED',
  IN_PROGRESS: 'IN_PROGRESS',
  AWAITING_RESPONSE: 'AWAITING_RESPONSE',
  AWAITING_CUSTOMER: 'AWAITING_CUSTOMER',
  RESOLVED: 'RESOLVED',
  CLOSED: 'CLOSED',
  REOPENED: 'REOPENED',
  ESCALATED: 'ESCALATED',
} as const;

/**
 * টিকেট স্ট্যাটাস (বিস্তারিত) - ইউনিয়ন টাইপ
 */
export type TicketStatusExtendedValue =
  (typeof TicketStatusExtended)[keyof typeof TicketStatusExtended];

/**
 * টিকেট স্ট্যাটাস লেবেলসমূহ
 */
export const TicketStatusExtendedLabels: Record<
  TicketStatusExtendedValue,
  { en: string; bn: string }
> = {
  [TicketStatusExtended.NEW]: {
    en: 'New',
    bn: 'নতুন',
  },
  [TicketStatusExtended.ASSIGNED]: {
    en: 'Assigned',
    bn: 'বরাদ্দ',
  },
  [TicketStatusExtended.IN_PROGRESS]: {
    en: 'In Progress',
    bn: 'প্রক্রিয়াধীন',
  },
  [TicketStatusExtended.AWAITING_RESPONSE]: {
    en: 'Awaiting Response',
    bn: 'উত্তরের অপেক্ষায়',
  },
  [TicketStatusExtended.AWAITING_CUSTOMER]: {
    en: 'Awaiting Customer',
    bn: 'গ্রাহকের অপেক্ষায়',
  },
  [TicketStatusExtended.RESOLVED]: {
    en: 'Resolved',
    bn: 'সমাধান হয়েছে',
  },
  [TicketStatusExtended.CLOSED]: {
    en: 'Closed',
    bn: 'বন্ধ',
  },
  [TicketStatusExtended.REOPENED]: {
    en: 'Reopened',
    bn: 'পুনরায় খোলা',
  },
  [TicketStatusExtended.ESCALATED]: {
    en: 'Escalated',
    bn: 'উর্ধ্বতন কর্তৃপক্ষে',
  },
};

/**
 * টিকেট স্ট্যাটাস রঙ কোডসমূহ
 */
export const TicketStatusExtendedColors: Record<TicketStatusExtendedValue, string> = {
  [TicketStatusExtended.NEW]: 'bg-blue-100 text-blue-800 border-blue-300',
  [TicketStatusExtended.ASSIGNED]: 'bg-indigo-100 text-indigo-800 border-indigo-300',
  [TicketStatusExtended.IN_PROGRESS]: 'bg-purple-100 text-purple-800 border-purple-300',
  [TicketStatusExtended.AWAITING_RESPONSE]: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  [TicketStatusExtended.AWAITING_CUSTOMER]: 'bg-orange-100 text-orange-800 border-orange-300',
  [TicketStatusExtended.RESOLVED]: 'bg-green-100 text-green-800 border-green-300',
  [TicketStatusExtended.CLOSED]: 'bg-gray-100 text-gray-800 border-gray-300',
  [TicketStatusExtended.REOPENED]: 'bg-red-100 text-red-800 border-red-300',
  [TicketStatusExtended.ESCALATED]: 'bg-rose-100 text-rose-800 border-rose-300',
};

/**
 * অনুমোদিত স্ট্যাটাস ট্রানজিশন
 */
export const TicketStatusTransitions: Record<
  TicketStatusExtendedValue,
  TicketStatusExtendedValue[]
> = {
  [TicketStatusExtended.NEW]: [
    TicketStatusExtended.ASSIGNED,
    TicketStatusExtended.IN_PROGRESS,
    TicketStatusExtended.CLOSED,
  ],
  [TicketStatusExtended.ASSIGNED]: [
    TicketStatusExtended.IN_PROGRESS,
    TicketStatusExtended.AWAITING_RESPONSE,
    TicketStatusExtended.ESCALATED,
  ],
  [TicketStatusExtended.IN_PROGRESS]: [
    TicketStatusExtended.AWAITING_CUSTOMER,
    TicketStatusExtended.AWAITING_RESPONSE,
    TicketStatusExtended.RESOLVED,
    TicketStatusExtended.ESCALATED,
  ],
  [TicketStatusExtended.AWAITING_RESPONSE]: [
    TicketStatusExtended.IN_PROGRESS,
    TicketStatusExtended.RESOLVED,
    TicketStatusExtended.ESCALATED,
  ],
  [TicketStatusExtended.AWAITING_CUSTOMER]: [
    TicketStatusExtended.IN_PROGRESS,
    TicketStatusExtended.RESOLVED,
    TicketStatusExtended.CLOSED,
  ],
  [TicketStatusExtended.RESOLVED]: [TicketStatusExtended.CLOSED, TicketStatusExtended.REOPENED],
  [TicketStatusExtended.CLOSED]: [TicketStatusExtended.REOPENED],
  [TicketStatusExtended.REOPENED]: [
    TicketStatusExtended.IN_PROGRESS,
    TicketStatusExtended.RESOLVED,
    TicketStatusExtended.ESCALATED,
  ],
  [TicketStatusExtended.ESCALATED]: [
    TicketStatusExtended.IN_PROGRESS,
    TicketStatusExtended.RESOLVED,
    TicketStatusExtended.CLOSED,
  ],
};

/**
 * প্রতিটি স্ট্যাটাসে উপলব্ধ অ্যাকশনসমূহ
 */
export const TicketStatusActions: Record<TicketStatusExtendedValue, string[]> = {
  [TicketStatusExtended.NEW]: ['assign', 'view', 'edit', 'delete'],
  [TicketStatusExtended.ASSIGNED]: ['view', 'start_work', 'escalate', 'add_note'],
  [TicketStatusExtended.IN_PROGRESS]: ['view', 'add_note', 'request_info', 'resolve', 'escalate'],
  [TicketStatusExtended.AWAITING_RESPONSE]: ['view', 'add_note', 'respond', 'escalate'],
  [TicketStatusExtended.AWAITING_CUSTOMER]: ['view', 'add_note', 'resolve', 'close'],
  [TicketStatusExtended.RESOLVED]: ['view', 'close', 'reopen'],
  [TicketStatusExtended.CLOSED]: ['view', 'reopen'],
  [TicketStatusExtended.REOPENED]: ['view', 'assign', 'start_work', 'resolve'],
  [TicketStatusExtended.ESCALATED]: ['view', 'add_note', 'resolve', 'close'],
};

/**
 * স্বয়ংক্রিয় ক্লোজার দিন
 */
export const AutoCloseDays = 5;

/**
 * স্বয়ংক্রিয় ক্লোজার সময় (ঘণ্টা)
 */
export const AutoCloseHours = 24;

/**
 * স্ট্যাটাস টাইমআউট (ঘণ্টা)
 */
export const StatusTimeoutHours: Record<TicketStatusExtendedValue, number | null> = {
  [TicketStatusExtended.NEW]: 2,
  [TicketStatusExtended.ASSIGNED]: 4,
  [TicketStatusExtended.IN_PROGRESS]: 8,
  [TicketStatusExtended.AWAITING_RESPONSE]: 12,
  [TicketStatusExtended.AWAITING_CUSTOMER]: 24,
  [TicketStatusExtended.RESOLVED]: 48,
  [TicketStatusExtended.CLOSED]: null,
  [TicketStatusExtended.REOPENED]: 2,
  [TicketStatusExtended.ESCALATED]: 6,
};

/**
 * সক্রিয় স্ট্যাটাসসমূহ
 */
export const ACTIVE_TICKET_STATUSES: TicketStatusExtendedValue[] = [
  TicketStatusExtended.NEW,
  TicketStatusExtended.ASSIGNED,
  TicketStatusExtended.IN_PROGRESS,
  TicketStatusExtended.AWAITING_RESPONSE,
  TicketStatusExtended.AWAITING_CUSTOMER,
] as const;

/**
 * সমাপ্ত স্ট্যাটাসসমূহ
 */
export const COMPLETED_TICKET_STATUSES: TicketStatusExtendedValue[] = [
  TicketStatusExtended.RESOLVED,
  TicketStatusExtended.CLOSED,
] as const;

/**
 * জরুরি স্ট্যাটাসসমূহ
 */
export const URGENT_TICKET_STATUSES: TicketStatusExtendedValue[] = [
  TicketStatusExtended.ESCALATED,
  TicketStatusExtended.REOPENED,
] as const;
