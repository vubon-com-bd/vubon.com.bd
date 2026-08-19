/**
 * ইনভয়েসের স্ট্যাটাস সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * ইনভয়েস স্ট্যাটাস অবজেক্ট
 */
export const InvoiceStatus = {
  DRAFT: 'DRAFT',
  ISSUED: 'ISSUED',
  SENT: 'SENT',
  VIEWED: 'VIEWED',
  PAID: 'PAID',
  PARTIALLY_PAID: 'PARTIALLY_PAID',
  OVERDUE: 'OVERDUE',
  CANCELLED: 'CANCELLED',
  VOID: 'VOID',
  ADJUSTED: 'ADJUSTED',
} as const;

/**
 * ইনভয়েস স্ট্যাটাস - ইউনিয়ন টাইপ
 */
export type InvoiceStatusValue = (typeof InvoiceStatus)[keyof typeof InvoiceStatus];

/**
 * ইনভয়েস স্ট্যাটাস লেবেলসমূহ
 */
export const InvoiceStatusLabels: Record<InvoiceStatusValue, { en: string; bn: string }> = {
  [InvoiceStatus.DRAFT]: {
    en: 'Draft',
    bn: 'খসড়া',
  },
  [InvoiceStatus.ISSUED]: {
    en: 'Issued',
    bn: 'ইস্যু করা হয়েছে',
  },
  [InvoiceStatus.SENT]: {
    en: 'Sent',
    bn: 'প্রেরিত',
  },
  [InvoiceStatus.VIEWED]: {
    en: 'Viewed',
    bn: 'দেখা হয়েছে',
  },
  [InvoiceStatus.PAID]: {
    en: 'Paid',
    bn: 'পরিশোধিত',
  },
  [InvoiceStatus.PARTIALLY_PAID]: {
    en: 'Partially Paid',
    bn: 'আংশিক পরিশোধিত',
  },
  [InvoiceStatus.OVERDUE]: {
    en: 'Overdue',
    bn: 'মেয়াদ উত্তীর্ণ',
  },
  [InvoiceStatus.CANCELLED]: {
    en: 'Cancelled',
    bn: 'বাতিল',
  },
  [InvoiceStatus.VOID]: {
    en: 'Void',
    bn: 'বাতিলকৃত',
  },
  [InvoiceStatus.ADJUSTED]: {
    en: 'Adjusted',
    bn: 'সমন্বয় করা হয়েছে',
  },
};

/**
 * ইনভয়েস স্ট্যাটাস রঙ কোডসমূহ
 */
export const InvoiceStatusColors: Record<InvoiceStatusValue, string> = {
  [InvoiceStatus.DRAFT]: 'bg-gray-100 text-gray-800 border-gray-300',
  [InvoiceStatus.ISSUED]: 'bg-blue-100 text-blue-800 border-blue-300',
  [InvoiceStatus.SENT]: 'bg-indigo-100 text-indigo-800 border-indigo-300',
  [InvoiceStatus.VIEWED]: 'bg-purple-100 text-purple-800 border-purple-300',
  [InvoiceStatus.PAID]: 'bg-green-100 text-green-800 border-green-300',
  [InvoiceStatus.PARTIALLY_PAID]: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  [InvoiceStatus.OVERDUE]: 'bg-red-100 text-red-800 border-red-300',
  [InvoiceStatus.CANCELLED]: 'bg-gray-200 text-gray-900 border-gray-400',
  [InvoiceStatus.VOID]: 'bg-gray-300 text-gray-900 border-gray-500',
  [InvoiceStatus.ADJUSTED]: 'bg-orange-100 text-orange-800 border-orange-300',
};

/**
 * ইনভয়েস স্ট্যাটাস ট্রানজিশন রুলস
 */
export const InvoiceStatusTransitions: Record<InvoiceStatusValue, InvoiceStatusValue[]> = {
  [InvoiceStatus.DRAFT]: [InvoiceStatus.ISSUED, InvoiceStatus.CANCELLED, InvoiceStatus.VOID],
  [InvoiceStatus.ISSUED]: [InvoiceStatus.SENT, InvoiceStatus.CANCELLED, InvoiceStatus.VOID],
  [InvoiceStatus.SENT]: [InvoiceStatus.VIEWED, InvoiceStatus.OVERDUE, InvoiceStatus.CANCELLED],
  [InvoiceStatus.VIEWED]: [
    InvoiceStatus.PAID,
    InvoiceStatus.PARTIALLY_PAID,
    InvoiceStatus.OVERDUE,
    InvoiceStatus.CANCELLED,
  ],
  [InvoiceStatus.PAID]: [InvoiceStatus.ADJUSTED],
  [InvoiceStatus.PARTIALLY_PAID]: [
    InvoiceStatus.PAID,
    InvoiceStatus.OVERDUE,
    InvoiceStatus.CANCELLED,
  ],
  [InvoiceStatus.OVERDUE]: [
    InvoiceStatus.PAID,
    InvoiceStatus.PARTIALLY_PAID,
    InvoiceStatus.CANCELLED,
    InvoiceStatus.VOID,
  ],
  [InvoiceStatus.CANCELLED]: [],
  [InvoiceStatus.VOID]: [],
  [InvoiceStatus.ADJUSTED]: [InvoiceStatus.ISSUED, InvoiceStatus.CANCELLED],
};

/**
 * ইনভয়েস স্ট্যাটাস অ্যাকশনসমূহ
 */
export const InvoiceStatusActions: Record<InvoiceStatusValue, string[]> = {
  [InvoiceStatus.DRAFT]: ['edit', 'issue', 'cancel', 'void'],
  [InvoiceStatus.ISSUED]: ['send', 'cancel', 'void', 'view'],
  [InvoiceStatus.SENT]: ['view', 'cancel', 'track'],
  [InvoiceStatus.VIEWED]: ['view', 'remind', 'cancel'],
  [InvoiceStatus.PAID]: ['view', 'adjust', 'print'],
  [InvoiceStatus.PARTIALLY_PAID]: ['view', 'remind', 'cancel'],
  [InvoiceStatus.OVERDUE]: ['view', 'remind', 'cancel', 'void'],
  [InvoiceStatus.CANCELLED]: ['view', 'reissue'],
  [InvoiceStatus.VOID]: ['view'],
  [InvoiceStatus.ADJUSTED]: ['view', 'reissue'],
};

/**
 * ওভারডিউ থ্রেশহোল্ড (দিন)
 */
export const OverdueDaysThreshold = 30;

/**
 * পেমেন্ট রিমাইন্ডার দিনসমূহ
 */
export const PaymentReminderDays = [3, 7, 14, 21, 28] as const;

/**
 * ইনভয়েস অটো-আর্কাইভ সময় (দিন)
 */
export const InvoiceAutoArchiveDays = 365;

/**
 * সক্রিয় ইনভয়েস স্ট্যাটাসসমূহ
 */
export const ACTIVE_INVOICE_STATUSES: InvoiceStatusValue[] = [
  InvoiceStatus.DRAFT,
  InvoiceStatus.ISSUED,
  InvoiceStatus.SENT,
  InvoiceStatus.VIEWED,
] as const;

/**
 * পেমেন্ট সম্পন্ন স্ট্যাটাসসমূহ
 */
export const PAID_INVOICE_STATUSES: InvoiceStatusValue[] = [
  InvoiceStatus.PAID,
  InvoiceStatus.PARTIALLY_PAID,
] as const;

/**
 * বাতিল স্ট্যাটাসসমূহ
 */
export const CANCELLED_INVOICE_STATUSES: InvoiceStatusValue[] = [
  InvoiceStatus.CANCELLED,
  InvoiceStatus.VOID,
] as const;
