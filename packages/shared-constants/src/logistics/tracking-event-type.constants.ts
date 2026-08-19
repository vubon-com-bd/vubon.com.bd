/**
 * ট্র্যাকিং ইভেন্টের বিভিন্ন টাইপ সম্পর্কিত কনস্ট্যান্টসমূহ
 */

/**
 * ট্র্যাকিং ইভেন্ট টাইপ
 */
export const TRACKING_EVENT_TYPES = {
  ORDER_CREATED: 'order_created',
  PICKUP_SCHEDULED: 'pickup_scheduled',
  PICKED_UP: 'picked_up',
  IN_TRANSIT: 'in_transit',
  ARRIVED_AT_HUB: 'arrived_at_hub',
  DEPARTED_HUB: 'departed_hub',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERY_ATTEMPT: 'delivery_attempt',
  DELIVERED: 'delivered',
  RETURN_INITIATED: 'return_initiated',
  RETURNED: 'returned',
} as const;

/**
 * ট্র্যাকিং ইভেন্ট টাইপ টাইপ
 */
export type TrackingEventType = (typeof TRACKING_EVENT_TYPES)[keyof typeof TRACKING_EVENT_TYPES];

/**
 * ট্র্যাকিং ইভেন্ট টাইপের বিবরণ
 */
export const TRACKING_EVENT_TYPE_DESCRIPTIONS: Record<TrackingEventType, string> = {
  [TRACKING_EVENT_TYPES.ORDER_CREATED]: 'অর্ডার তৈরি করা হয়েছে',
  [TRACKING_EVENT_TYPES.PICKUP_SCHEDULED]: 'পিকআপ সময় নির্ধারণ করা হয়েছে',
  [TRACKING_EVENT_TYPES.PICKED_UP]: 'পিকআপ সম্পন্ন হয়েছে',
  [TRACKING_EVENT_TYPES.IN_TRANSIT]: 'ট্রানজিটে রয়েছে',
  [TRACKING_EVENT_TYPES.ARRIVED_AT_HUB]: 'হাব/ডিস্ট্রিবিউশন সেন্টারে পৌঁছেছে',
  [TRACKING_EVENT_TYPES.DEPARTED_HUB]: 'হাব/ডিস্ট্রিবিউশন সেন্টার থেকে বেরিয়েছে',
  [TRACKING_EVENT_TYPES.OUT_FOR_DELIVERY]: 'ডেলিভারির জন্য বেরিয়েছে',
  [TRACKING_EVENT_TYPES.DELIVERY_ATTEMPT]: 'ডেলিভারি প্রচেষ্টা করা হয়েছে',
  [TRACKING_EVENT_TYPES.DELIVERED]: 'ডেলিভারি সম্পন্ন হয়েছে',
  [TRACKING_EVENT_TYPES.RETURN_INITIATED]: 'রিটার্ন প্রক্রিয়া শুরু হয়েছে',
  [TRACKING_EVENT_TYPES.RETURNED]: 'রিটার্ন সম্পন্ন হয়েছে',
};

/**
 * ট্র্যাকিং ইভেন্ট টাইপের রং (UI এর জন্য)
 */
export const TRACKING_EVENT_TYPE_COLORS: Record<TrackingEventType, string> = {
  [TRACKING_EVENT_TYPES.ORDER_CREATED]: '#3498DB', // নীল
  [TRACKING_EVENT_TYPES.PICKUP_SCHEDULED]: '#9B59B6', // বেগুনি
  [TRACKING_EVENT_TYPES.PICKED_UP]: '#2ECC71', // সবুজ
  [TRACKING_EVENT_TYPES.IN_TRANSIT]: '#F39C12', // কমলা
  [TRACKING_EVENT_TYPES.ARRIVED_AT_HUB]: '#1ABC9C', // টিল
  [TRACKING_EVENT_TYPES.DEPARTED_HUB]: '#E67E22', // গাঢ় কমলা
  [TRACKING_EVENT_TYPES.OUT_FOR_DELIVERY]: '#E67E22', // গাঢ় কমলা
  [TRACKING_EVENT_TYPES.DELIVERY_ATTEMPT]: '#F1C40F', // সোনালী
  [TRACKING_EVENT_TYPES.DELIVERED]: '#27AE60', // গাঢ় সবুজ
  [TRACKING_EVENT_TYPES.RETURN_INITIATED]: '#E74C3C', // লাল
  [TRACKING_EVENT_TYPES.RETURNED]: '#95A5A6', // ধূসর
};

/**
 * ট্র্যাকিং ইভেন্ট টাইপের আইকন (UI এর জন্য)
 */
export const TRACKING_EVENT_TYPE_ICONS: Record<TrackingEventType, string> = {
  [TRACKING_EVENT_TYPES.ORDER_CREATED]: 'shopping-cart',
  [TRACKING_EVENT_TYPES.PICKUP_SCHEDULED]: 'calendar',
  [TRACKING_EVENT_TYPES.PICKED_UP]: 'package',
  [TRACKING_EVENT_TYPES.IN_TRANSIT]: 'truck',
  [TRACKING_EVENT_TYPES.ARRIVED_AT_HUB]: 'home',
  [TRACKING_EVENT_TYPES.DEPARTED_HUB]: 'rocket',
  [TRACKING_EVENT_TYPES.OUT_FOR_DELIVERY]: 'delivery',
  [TRACKING_EVENT_TYPES.DELIVERY_ATTEMPT]: 'phone',
  [TRACKING_EVENT_TYPES.DELIVERED]: 'check-circle',
  [TRACKING_EVENT_TYPES.RETURN_INITIATED]: 'rotate-left',
  [TRACKING_EVENT_TYPES.RETURNED]: 'undo',
};

/**
 * ট্র্যাকিং ইভেন্ট টাইপ গ্রুপ
 */
export const TRACKING_EVENT_TYPE_GROUPS = {
  ALL: Object.values(TRACKING_EVENT_TYPES),
  ORDER_LIFECYCLE: [
    TRACKING_EVENT_TYPES.ORDER_CREATED,
    TRACKING_EVENT_TYPES.PICKUP_SCHEDULED,
    TRACKING_EVENT_TYPES.PICKED_UP,
  ] as const,
  TRANSIT_LIFECYCLE: [
    TRACKING_EVENT_TYPES.IN_TRANSIT,
    TRACKING_EVENT_TYPES.ARRIVED_AT_HUB,
    TRACKING_EVENT_TYPES.DEPARTED_HUB,
  ] as const,
  DELIVERY_LIFECYCLE: [
    TRACKING_EVENT_TYPES.OUT_FOR_DELIVERY,
    TRACKING_EVENT_TYPES.DELIVERY_ATTEMPT,
    TRACKING_EVENT_TYPES.DELIVERED,
  ] as const,
  RETURN_LIFECYCLE: [TRACKING_EVENT_TYPES.RETURN_INITIATED, TRACKING_EVENT_TYPES.RETURNED] as const,
} as const;

/**
 * ট্র্যাকিং ইভেন্ট টাইপ গ্রুপ টাইপ
 */
export type TrackingEventTypeGroup = typeof TRACKING_EVENT_TYPE_GROUPS;

/**
 * ট্র্যাকিং ইভেন্ট টাইপ কনফিগারেশন
 */
export const TRACKING_EVENT_TYPE_CONFIG = {
  TYPES: TRACKING_EVENT_TYPES,
  DESCRIPTIONS: TRACKING_EVENT_TYPE_DESCRIPTIONS,
  COLORS: TRACKING_EVENT_TYPE_COLORS,
  ICONS: TRACKING_EVENT_TYPE_ICONS,
  GROUPS: TRACKING_EVENT_TYPE_GROUPS,
} as const;

/**
 * ট্র্যাকিং ইভেন্ট টাইপ কনফিগারেশন টাইপ
 */
export type TrackingEventTypeConfig = typeof TRACKING_EVENT_TYPE_CONFIG;

/**
 * চেক করে যে ইভেন্ট টাইপ অর্ডার লাইফসাইকেলের অংশ কিনা
 */
export function isOrderLifecycleEvent(type: TrackingEventType): boolean {
  return (TRACKING_EVENT_TYPE_GROUPS.ORDER_LIFECYCLE as readonly TrackingEventType[]).includes(
    type
  );
}

/**
 * চেক করে যে ইভেন্ট টাইপ ট্রানজিট লাইফসাইকেলের অংশ কিনা
 */
export function isTransitLifecycleEvent(type: TrackingEventType): boolean {
  return (TRACKING_EVENT_TYPE_GROUPS.TRANSIT_LIFECYCLE as readonly TrackingEventType[]).includes(
    type
  );
}

/**
 * চেক করে যে ইভেন্ট টাইপ ডেলিভারি লাইফসাইকেলের অংশ কিনা
 */
export function isDeliveryLifecycleEvent(type: TrackingEventType): boolean {
  return (TRACKING_EVENT_TYPE_GROUPS.DELIVERY_LIFECYCLE as readonly TrackingEventType[]).includes(
    type
  );
}

/**
 * চেক করে যে ইভেন্ট টাইপ রিটার্ন লাইফসাইকেলের অংশ কিনা
 */
export function isReturnLifecycleEvent(type: TrackingEventType): boolean {
  return (TRACKING_EVENT_TYPE_GROUPS.RETURN_LIFECYCLE as readonly TrackingEventType[]).includes(
    type
  );
}

/**
 * ট্র্যাকিং ইভেন্ট টাইপের বিবরণ পাওয়া
 */
export function getTrackingEventTypeDescription(type: TrackingEventType): string {
  return TRACKING_EVENT_TYPE_DESCRIPTIONS[type];
}

/**
 * ট্র্যাকিং ইভেন্ট টাইপের রং পাওয়া
 */
export function getTrackingEventTypeColor(type: TrackingEventType): string {
  return TRACKING_EVENT_TYPE_COLORS[type];
}

/**
 * ট্র্যাকিং ইভেন্ট টাইপের আইকন পাওয়া
 */
export function getTrackingEventTypeIcon(type: TrackingEventType): string {
  return TRACKING_EVENT_TYPE_ICONS[type];
}
