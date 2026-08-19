// External libraries
// No external imports needed

// Shared packages
// No shared package imports needed

// Project files
// No project file imports needed

export enum DeliveryStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  IN_TRANSIT = 'IN_TRANSIT',
  OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
  DELIVERED = 'DELIVERED',
  FAILED = 'FAILED',
  RETURNED = 'RETURNED',
  CANCELLED = 'CANCELLED',
}

export const DELIVERY_STATUS_META = {
  [DeliveryStatus.PENDING]: {
    label: 'পেন্ডিং',
    color: '#FFA500',
    description: 'ডেলিভারি প্রক্রিয়া শুরু হয়নি',
    trackingStatus: 'অর্ডার গ্রহণ করা হয়েছে',
    completionCondition: 'অর্ডার প্রসেসিং শুরু',
  },
  [DeliveryStatus.PROCESSING]: {
    label: 'প্রক্রিয়াধীন',
    color: '#3498DB',
    description: 'ডেলিভারির জন্য প্রস্তুত করা হচ্ছে',
    trackingStatus: 'প্যাকেজিং চলছে',
    completionCondition: 'প্যাকেজিং সম্পন্ন',
  },
  [DeliveryStatus.SHIPPED]: {
    label: 'শিপড',
    color: '#9B59B6',
    description: 'পণ্য পাঠানো হয়েছে',
    trackingStatus: 'কুরিয়ারে দেওয়া হয়েছে',
    completionCondition: 'কুরিয়ার থেকে সংগ্রহ',
  },
  [DeliveryStatus.IN_TRANSIT]: {
    label: 'ট্রানজিটে',
    color: '#F39C12',
    description: 'পণ্য পরিবহনে রয়েছে',
    trackingStatus: 'পরিবহনে রয়েছে',
    completionCondition: 'গন্তব্যে পৌঁছানো',
  },
  [DeliveryStatus.OUT_FOR_DELIVERY]: {
    label: 'ডেলিভারির জন্য প্রস্তুত',
    color: '#E67E22',
    description: 'ডেলিভারি ম্যান পণ্য নিয়ে রওনা হয়েছেন',
    trackingStatus: 'ডেলিভারি ম্যান রওনা হয়েছেন',
    completionCondition: 'ডেলিভারি সম্পন্ন',
  },
  [DeliveryStatus.DELIVERED]: {
    label: 'ডেলিভারি সম্পন্ন',
    color: '#2ECC71',
    description: 'পণ্য সফলভাবে ডেলিভারি হয়েছে',
    trackingStatus: 'ডেলিভারি সম্পন্ন হয়েছে',
    completionCondition: 'ডেলিভারি কনফার্ম',
  },
  [DeliveryStatus.FAILED]: {
    label: 'ব্যর্থ',
    color: '#E74C3C',
    description: 'ডেলিভারি প্রচেষ্টা ব্যর্থ হয়েছে',
    trackingStatus: 'ডেলিভারি ব্যর্থ',
    completionCondition: 'পুনরায় চেষ্টা',
  },
  [DeliveryStatus.RETURNED]: {
    label: 'রিটার্নেড',
    color: '#95A5A6',
    description: 'পণ্য ফেরত পাঠানো হয়েছে',
    trackingStatus: 'ফেরত পাঠানো হয়েছে',
    completionCondition: 'ফেরত প্রক্রিয়াকরণ',
  },
  [DeliveryStatus.CANCELLED]: {
    label: 'বাতিল',
    color: '#E74C3C',
    description: 'ডেলিভারি বাতিল করা হয়েছে',
    trackingStatus: 'ডেলিভারি বাতিল',
    completionCondition: 'বাতিলকৃত',
  },
} as const;

export type DeliveryStatusMeta = typeof DELIVERY_STATUS_META;

export const ALLOWED_DELIVERY_STATUS_TRANSITIONS: Record<
  DeliveryStatus,
  readonly DeliveryStatus[]
> = {
  [DeliveryStatus.PENDING]: [DeliveryStatus.PROCESSING, DeliveryStatus.CANCELLED],
  [DeliveryStatus.PROCESSING]: [
    DeliveryStatus.SHIPPED,
    DeliveryStatus.FAILED,
    DeliveryStatus.CANCELLED,
  ],
  [DeliveryStatus.SHIPPED]: [
    DeliveryStatus.IN_TRANSIT,
    DeliveryStatus.FAILED,
    DeliveryStatus.RETURNED,
    DeliveryStatus.CANCELLED,
  ],
  [DeliveryStatus.IN_TRANSIT]: [
    DeliveryStatus.OUT_FOR_DELIVERY,
    DeliveryStatus.FAILED,
    DeliveryStatus.CANCELLED,
  ],
  [DeliveryStatus.OUT_FOR_DELIVERY]: [
    DeliveryStatus.DELIVERED,
    DeliveryStatus.FAILED,
    DeliveryStatus.RETURNED,
    DeliveryStatus.CANCELLED,
  ],
  [DeliveryStatus.DELIVERED]: [],
  [DeliveryStatus.FAILED]: [
    DeliveryStatus.PROCESSING,
    DeliveryStatus.RETURNED,
    DeliveryStatus.CANCELLED,
  ],
  [DeliveryStatus.RETURNED]: [DeliveryStatus.CANCELLED],
  [DeliveryStatus.CANCELLED]: [],
} as const;

export type AllowedDeliveryStatusTransitions = typeof ALLOWED_DELIVERY_STATUS_TRANSITIONS;

export const TRACKING_STATUS_UPDATE_TIMES = {
  [DeliveryStatus.PENDING]: 0,
  [DeliveryStatus.PROCESSING]: 1,
  [DeliveryStatus.SHIPPED]: 2,
  [DeliveryStatus.IN_TRANSIT]: 4,
  [DeliveryStatus.OUT_FOR_DELIVERY]: 6,
  [DeliveryStatus.DELIVERED]: 8,
  [DeliveryStatus.FAILED]: 4,
  [DeliveryStatus.RETURNED]: 6,
  [DeliveryStatus.CANCELLED]: 1,
} as const;

export type TrackingStatusUpdateTimes = typeof TRACKING_STATUS_UPDATE_TIMES;

export const DELIVERY_COMPLETION_CONDITIONS: Record<DeliveryStatus, string> = {
  [DeliveryStatus.PENDING]: 'অর্ডার প্রসেসিং শুরু',
  [DeliveryStatus.PROCESSING]: 'প্যাকেজিং সম্পন্ন',
  [DeliveryStatus.SHIPPED]: 'কুরিয়ার থেকে সংগ্রহ',
  [DeliveryStatus.IN_TRANSIT]: 'গন্তব্যে পৌঁছানো',
  [DeliveryStatus.OUT_FOR_DELIVERY]: 'ডেলিভারি সম্পন্ন',
  [DeliveryStatus.DELIVERED]: 'ডেলিভারি কনফার্ম',
  [DeliveryStatus.FAILED]: 'পুনরায় চেষ্টা',
  [DeliveryStatus.RETURNED]: 'ফেরত প্রক্রিয়াকরণ',
  [DeliveryStatus.CANCELLED]: 'বাতিলকৃত',
} as const;

export type DeliveryCompletionConditions = typeof DELIVERY_COMPLETION_CONDITIONS;

export function getDeliveryStatusLabel(status: DeliveryStatus): string {
  return DELIVERY_STATUS_META[status].label;
}

export function getDeliveryStatusColor(status: DeliveryStatus): string {
  return DELIVERY_STATUS_META[status].color;
}

export function getDeliveryStatusDescription(status: DeliveryStatus): string {
  return DELIVERY_STATUS_META[status].description;
}

export function getTrackingStatus(status: DeliveryStatus): string {
  return DELIVERY_STATUS_META[status].trackingStatus;
}

export function getTrackingUpdateTime(status: DeliveryStatus): number {
  return TRACKING_STATUS_UPDATE_TIMES[status];
}

export function getCompletionCondition(status: DeliveryStatus): string {
  return DELIVERY_COMPLETION_CONDITIONS[status];
}

export function isDeliveryComplete(status: DeliveryStatus): boolean {
  return status === DeliveryStatus.DELIVERED;
}

export function isDeliveryFailed(status: DeliveryStatus): boolean {
  return (
    status === DeliveryStatus.FAILED ||
    status === DeliveryStatus.RETURNED ||
    status === DeliveryStatus.CANCELLED
  );
}

export function isDeliveryInProgress(status: DeliveryStatus): boolean {
  return (
    status !== DeliveryStatus.DELIVERED &&
    status !== DeliveryStatus.FAILED &&
    status !== DeliveryStatus.RETURNED &&
    status !== DeliveryStatus.CANCELLED
  );
}
