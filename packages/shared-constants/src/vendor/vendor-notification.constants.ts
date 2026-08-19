/**
 * ভেন্ডার নোটিফিকেশন সিস্টেমের কনস্ট্যান্টসমূহ
 */

/**
 * নোটিফিকেশন টাইপ অবজেক্ট
 */
export const NotificationType = {
  APPROVAL: 'APPROVAL',
  REJECTION: 'REJECTION',
  PAYOUT: 'PAYOUT',
  SUSPENSION: 'SUSPENSION',
  VERIFICATION: 'VERIFICATION',
  DOCUMENT: 'DOCUMENT',
  TICKET: 'TICKET',
  SUBSCRIPTION: 'SUBSCRIPTION',
  PROMOTION: 'PROMOTION',
  SYSTEM: 'SYSTEM',
} as const;

/**
 * নোটিফিকেশন টাইপ - ইউনিয়ন টাইপ
 */
export type NotificationTypeValue = (typeof NotificationType)[keyof typeof NotificationType];

/**
 * নোটিফিকেশন চ্যানেল অবজেক্ট
 */
export const NotificationChannel = {
  EMAIL: 'EMAIL',
  SMS: 'SMS',
  PUSH: 'PUSH',
  IN_APP: 'IN_APP',
  WHATSAPP: 'WHATSAPP',
} as const;

/**
 * নোটিফিকেশন চ্যানেল - ইউনিয়ন টাইপ
 */
export type NotificationChannelValue =
  (typeof NotificationChannel)[keyof typeof NotificationChannel];

/**
 * নোটিফিকেশন প্রায়রিটি
 */
export const NotificationPriority = {
  HIGH: 'HIGH',
  MEDIUM: 'MEDIUM',
  LOW: 'LOW',
} as const;

/**
 * নোটিফিকেশন প্রায়রিটি - ইউনিয়ন টাইপ
 */
export type NotificationPriorityValue =
  (typeof NotificationPriority)[keyof typeof NotificationPriority];

/**
 * নোটিফিকেশন স্ট্যাটাস
 */
export const NotificationStatus = {
  PENDING: 'PENDING',
  SENT: 'SENT',
  READ: 'READ',
  ARCHIVED: 'ARCHIVED',
  DELETED: 'DELETED',
} as const;

/**
 * নোটিফিকেশন স্ট্যাটাস - ইউনিয়ন টাইপ
 */
export type NotificationStatusValue = (typeof NotificationStatus)[keyof typeof NotificationStatus];

/**
 * নোটিফিকেশন মেয়াদ (দিন)
 */
export const NotificationExpiryDays = 30;

/**
 * নোটিফিকেশন রিট্রাই সর্বোচ্চ সংখ্যা
 */
export const MaxNotificationRetry = 3;

/**
 * নোটিফিকেশন টাইপ লেবেলসমূহ
 */
export const NotificationTypeLabels: Record<NotificationTypeValue, { en: string; bn: string }> = {
  [NotificationType.APPROVAL]: {
    en: 'Approval',
    bn: 'অনুমোদন',
  },
  [NotificationType.REJECTION]: {
    en: 'Rejection',
    bn: 'বাতিল',
  },
  [NotificationType.PAYOUT]: {
    en: 'Payout',
    bn: 'পেআউট',
  },
  [NotificationType.SUSPENSION]: {
    en: 'Suspension',
    bn: 'স্থগিত',
  },
  [NotificationType.VERIFICATION]: {
    en: 'Verification',
    bn: 'যাচাই',
  },
  [NotificationType.DOCUMENT]: {
    en: 'Document',
    bn: 'ডকুমেন্ট',
  },
  [NotificationType.TICKET]: {
    en: 'Ticket',
    bn: 'টিকেট',
  },
  [NotificationType.SUBSCRIPTION]: {
    en: 'Subscription',
    bn: 'সাবস্ক্রিপশন',
  },
  [NotificationType.PROMOTION]: {
    en: 'Promotion',
    bn: 'প্রমোশন',
  },
  [NotificationType.SYSTEM]: {
    en: 'System',
    bn: 'সিস্টেম',
  },
};

/**
 * নোটিফিকেশন চ্যানেল লেবেলসমূহ
 */
export const NotificationChannelLabels: Record<
  NotificationChannelValue,
  { en: string; bn: string }
> = {
  [NotificationChannel.EMAIL]: {
    en: 'Email',
    bn: 'ইমেইল',
  },
  [NotificationChannel.SMS]: {
    en: 'SMS',
    bn: 'এসএমএস',
  },
  [NotificationChannel.PUSH]: {
    en: 'Push',
    bn: 'পুশ',
  },
  [NotificationChannel.IN_APP]: {
    en: 'In-App',
    bn: 'অ্যাপে',
  },
  [NotificationChannel.WHATSAPP]: {
    en: 'WhatsApp',
    bn: 'হোয়াটসঅ্যাপ',
  },
};

/**
 * নোটিফিকেশন প্রায়রিটি লেবেলসমূহ
 */
export const NotificationPriorityLabels: Record<
  NotificationPriorityValue,
  { en: string; bn: string }
> = {
  [NotificationPriority.HIGH]: {
    en: 'High',
    bn: 'উচ্চ',
  },
  [NotificationPriority.MEDIUM]: {
    en: 'Medium',
    bn: 'মধ্যম',
  },
  [NotificationPriority.LOW]: {
    en: 'Low',
    bn: 'নিম্ন',
  },
};

/**
 * নোটিফিকেশন প্রায়রিটি রঙ কোডসমূহ
 */
export const NotificationPriorityColors: Record<NotificationPriorityValue, string> = {
  [NotificationPriority.HIGH]: 'bg-red-100 text-red-800 border-red-300',
  [NotificationPriority.MEDIUM]: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  [NotificationPriority.LOW]: 'bg-blue-100 text-blue-800 border-blue-300',
};

/**
 * নোটিফিকেশন স্ট্যাটাস লেবেলসমূহ
 */
export const NotificationStatusLabels: Record<NotificationStatusValue, { en: string; bn: string }> =
  {
    [NotificationStatus.PENDING]: {
      en: 'Pending',
      bn: 'অপেক্ষমাণ',
    },
    [NotificationStatus.SENT]: {
      en: 'Sent',
      bn: 'প্রেরিত',
    },
    [NotificationStatus.READ]: {
      en: 'Read',
      bn: 'পঠিত',
    },
    [NotificationStatus.ARCHIVED]: {
      en: 'Archived',
      bn: 'আর্কাইভ',
    },
    [NotificationStatus.DELETED]: {
      en: 'Deleted',
      bn: 'মুছে ফেলা',
    },
  };

/**
 * নোটিফিকেশন স্ট্যাটাস রঙ কোডসমূহ
 */
export const NotificationStatusColors: Record<NotificationStatusValue, string> = {
  [NotificationStatus.PENDING]: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  [NotificationStatus.SENT]: 'bg-blue-100 text-blue-800 border-blue-300',
  [NotificationStatus.READ]: 'bg-green-100 text-green-800 border-green-300',
  [NotificationStatus.ARCHIVED]: 'bg-gray-100 text-gray-800 border-gray-300',
  [NotificationStatus.DELETED]: 'bg-red-100 text-red-800 border-red-300',
};

/**
 * নোটিফিকেশন ডেলিভারি টাইমআউট (সেকেন্ড)
 */
export const NotificationDeliveryTimeout = 30;

/**
 * নোটিফিকেশন ব্যাচ সাইজ
 */
export const NotificationBatchSize = 100;

/**
 * নোটিফিকেশন রেট লিমিট (প্রতি সেকেন্ড)
 */
export const NotificationRateLimit = 10;
