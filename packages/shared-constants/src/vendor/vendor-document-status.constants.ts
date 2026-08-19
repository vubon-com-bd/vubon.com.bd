/**
 * ডকুমেন্ট স্ট্যাটাস সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * ডকুমেন্ট স্ট্যাটাস অবজেক্ট
 */
export const DocumentStatus = {
  UPLOADED: 'UPLOADED',
  PENDING_VERIFICATION: 'PENDING_VERIFICATION',
  VERIFIED: 'VERIFIED',
  REJECTED: 'REJECTED',
  EXPIRED: 'EXPIRED',
  DELETED: 'DELETED',
  ARCHIVED: 'ARCHIVED',
} as const;

/**
 * ডকুমেন্ট স্ট্যাটাস - ইউনিয়ন টাইপ
 */
export type DocumentStatusValue = (typeof DocumentStatus)[keyof typeof DocumentStatus];

/**
 * ডকুমেন্ট স্ট্যাটাস লেবেলসমূহ
 */
export const DocumentStatusLabels: Record<DocumentStatusValue, { en: string; bn: string }> = {
  [DocumentStatus.UPLOADED]: {
    en: 'Uploaded',
    bn: 'আপলোড হয়েছে',
  },
  [DocumentStatus.PENDING_VERIFICATION]: {
    en: 'Pending Verification',
    bn: 'যাচাই অপেক্ষমাণ',
  },
  [DocumentStatus.VERIFIED]: {
    en: 'Verified',
    bn: 'যাচাইকৃত',
  },
  [DocumentStatus.REJECTED]: {
    en: 'Rejected',
    bn: 'বাতিল',
  },
  [DocumentStatus.EXPIRED]: {
    en: 'Expired',
    bn: 'মেয়াদোত্তীর্ণ',
  },
  [DocumentStatus.DELETED]: {
    en: 'Deleted',
    bn: 'মুছে ফেলা হয়েছে',
  },
  [DocumentStatus.ARCHIVED]: {
    en: 'Archived',
    bn: 'আর্কাইভ',
  },
};

/**
 * ডকুমেন্ট স্ট্যাটাস রঙ কোডসমূহ (Tailwind CSS ক্লাস)
 */
export const DocumentStatusColors: Record<DocumentStatusValue, string> = {
  [DocumentStatus.UPLOADED]: 'bg-blue-100 text-blue-800 border-blue-300',
  [DocumentStatus.PENDING_VERIFICATION]: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  [DocumentStatus.VERIFIED]: 'bg-green-100 text-green-800 border-green-300',
  [DocumentStatus.REJECTED]: 'bg-red-100 text-red-800 border-red-300',
  [DocumentStatus.EXPIRED]: 'bg-gray-100 text-gray-800 border-gray-300',
  [DocumentStatus.DELETED]: 'bg-black-100 text-black-800 border-black-300',
  [DocumentStatus.ARCHIVED]: 'bg-purple-100 text-purple-800 border-purple-300',
};

/**
 * ডকুমেন্ট স্ট্যাটাস ট্রানজিশন রুলস
 * কোন স্ট্যাটাস থেকে কোন স্ট্যাটাসে যাওয়া যায়
 */
export const DocumentStatusTransitions: Record<DocumentStatusValue, DocumentStatusValue[]> = {
  [DocumentStatus.UPLOADED]: [DocumentStatus.PENDING_VERIFICATION, DocumentStatus.DELETED],
  [DocumentStatus.PENDING_VERIFICATION]: [
    DocumentStatus.VERIFIED,
    DocumentStatus.REJECTED,
    DocumentStatus.EXPIRED,
  ],
  [DocumentStatus.VERIFIED]: [DocumentStatus.EXPIRED, DocumentStatus.ARCHIVED],
  [DocumentStatus.REJECTED]: [DocumentStatus.UPLOADED, DocumentStatus.DELETED],
  [DocumentStatus.EXPIRED]: [DocumentStatus.UPLOADED, DocumentStatus.ARCHIVED],
  [DocumentStatus.DELETED]: [],
  [DocumentStatus.ARCHIVED]: [DocumentStatus.DELETED],
};

/**
 * ডকুমেন্ট যাচাই চেষ্টার সর্বোচ্চ সংখ্যা
 */
export const DOCUMENT_VERIFICATION_ATTEMPTS_LIMIT = 3;

/**
 * ডকুমেন্ট সক্রিয় স্ট্যাটাসসমূহ
 */
export const ACTIVE_DOCUMENT_STATUSES: DocumentStatusValue[] = [
  DocumentStatus.UPLOADED,
  DocumentStatus.PENDING_VERIFICATION,
  DocumentStatus.VERIFIED,
] as const;

/**
 * ডকুমেন্ট নিষ্ক্রিয় স্ট্যাটাসসমূহ
 */
export const INACTIVE_DOCUMENT_STATUSES: DocumentStatusValue[] = [
  DocumentStatus.REJECTED,
  DocumentStatus.EXPIRED,
  DocumentStatus.DELETED,
  DocumentStatus.ARCHIVED,
] as const;

/**
 * ডকুমেন্ট যাচাইকৃত স্ট্যাটাসসমূহ
 */
export const VERIFIED_DOCUMENT_STATUSES: DocumentStatusValue[] = [DocumentStatus.VERIFIED] as const;

/**
 * ডকুমেন্ট স্ট্যাটাস বিবরণসমূহ
 */
export const DocumentStatusDescriptions: Record<DocumentStatusValue, string> = {
  [DocumentStatus.UPLOADED]: 'Document has been uploaded successfully',
  [DocumentStatus.PENDING_VERIFICATION]: 'Document is pending for verification',
  [DocumentStatus.VERIFIED]: 'Document has been verified and approved',
  [DocumentStatus.REJECTED]: 'Document has been rejected',
  [DocumentStatus.EXPIRED]: 'Document has expired',
  [DocumentStatus.DELETED]: 'Document has been deleted',
  [DocumentStatus.ARCHIVED]: 'Document has been archived',
};

/**
 * ডকুমেন্ট অটো-আর্কাইভ সময় (দিন)
 */
export const DocumentAutoArchiveDays = 30;

/**
 * ডকুমেন্ট রি-আপলোড সময় (দিন)
 */
export const DocumentReuploadDays = 7;
