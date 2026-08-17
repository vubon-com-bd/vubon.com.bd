// ============================================
// ইন-অ্যাপ নোটিফিকেশন সংক্রান্ত মৌলিক কনস্ট্যান্টসমূহ
// ============================================

// ============================================
// ১. ইন-অ্যাপ নোটিফিকেশন মৌলিক কনফিগারেশন
// ============================================

/**
 * সর্বোচ্চ মেসেজ সাইজ (বাইটে)
 * @default 1024 (১KB)
 */
export const IN_APP_MAX_MESSAGE_SIZE = 1024;

/**
 * সর্বোচ্চ ইন-অ্যাপ টাইটেল দৈর্ঘ্য
 * @default 50
 */
export const IN_APP_MAX_TITLE_LENGTH = 50;

/**
 * সর্বোচ্চ ইন-অ্যাপ বডি দৈর্ঘ্য
 * @default 200
 */
export const IN_APP_MAX_BODY_LENGTH = 200;

/**
 * ডিফল্ট ডিসপ্লে সময় (মিলিসেকেন্ডে)
 * @default 5000 (৫ সেকেন্ড)
 */
export const IN_APP_DEFAULT_DISPLAY_TIME = 5000;

/**
 * সর্বোচ্চ ডিসপ্লে সময় (মিলিসেকেন্ডে)
 * @default 30000 (৩০ সেকেন্ড)
 */
export const IN_APP_MAX_DISPLAY_TIME = 30000;

/**
 * ন্যূনতম ডিসপ্লে সময় (মিলিসেকেন্ডে)
 * @default 2000 (২ সেকেন্ড)
 */
export const IN_APP_MIN_DISPLAY_TIME = 2000;

/**
 * ডিফল্ট অ্যানিমেশন সময় (মিলিসেকেন্ডে)
 * @default 300
 */
export const IN_APP_DEFAULT_ANIMATION_DURATION = 300;

/**
 * ডিফল্ট ডিসমিস সময় (মিলিসেকেন্ডে)
 * @default 3000 (৩ সেকেন্ড)
 */
export const IN_APP_DEFAULT_DISMISS_TIME = 3000;

/**
 * ইন-অ্যাপ নোটিফিকেশন টাইমআউট (মিলিসেকেন্ডে)
 * @default 10000 (১০ সেকেন্ড)
 */
export const IN_APP_TIMEOUT = 10000;

/**
 * ইন-অ্যাপ নোটিফিকেশন ব্যাচ সাইজ
 * @default 50
 */
export const IN_APP_BATCH_SIZE = 50;

/**
 * ইন-অ্যাপ নোটিফিকেশন কিউ ম্যাক্স সাইজ
 * @default 100
 */
export const IN_APP_QUEUE_MAX_SIZE = 100;

// ============================================
// ২. ইন-অ্যাপ পজিশন
// ============================================

/**
 * ইন-অ্যাপ পজিশন টাইপ
 */
export type InAppPosition =
  | typeof IN_APP_POSITION_TOP
  | typeof IN_APP_POSITION_BOTTOM
  | typeof IN_APP_POSITION_TOP_LEFT
  | typeof IN_APP_POSITION_TOP_RIGHT
  | typeof IN_APP_POSITION_BOTTOM_LEFT
  | typeof IN_APP_POSITION_BOTTOM_RIGHT
  | typeof IN_APP_POSITION_CENTER;

/**
 * টপ পজিশন
 * @description উপরের দিকে
 */
export const IN_APP_POSITION_TOP = 'TOP';

/**
 * বটম পজিশন
 * @description নিচের দিকে
 */
export const IN_APP_POSITION_BOTTOM = 'BOTTOM';

/**
 * টপ-লেফট পজিশন
 */
export const IN_APP_POSITION_TOP_LEFT = 'TOP_LEFT';

/**
 * টপ-রাইট পজিশন
 */
export const IN_APP_POSITION_TOP_RIGHT = 'TOP_RIGHT';

/**
 * বটম-লেফট পজিশন
 */
export const IN_APP_POSITION_BOTTOM_LEFT = 'BOTTOM_LEFT';

/**
 * বটম-রাইট পজিশন
 */
export const IN_APP_POSITION_BOTTOM_RIGHT = 'BOTTOM_RIGHT';

/**
 * সেন্টার পজিশন
 */
export const IN_APP_POSITION_CENTER = 'CENTER';

// ============================================
// ৩. ইন-অ্যাপ অ্যানিমেশন টাইপ
// ============================================

/**
 * ইন-অ্যাপ অ্যানিমেশন টাইপ
 */
export type InAppAnimation =
  | typeof IN_APP_ANIMATION_SLIDE
  | typeof IN_APP_ANIMATION_FADE
  | typeof IN_APP_ANIMATION_BOUNCE
  | typeof IN_APP_ANIMATION_ZOOM
  | typeof IN_APP_ANIMATION_ROTATE
  | typeof IN_APP_ANIMATION_FLIP
  | typeof IN_APP_ANIMATION_NONE;

/**
 * স্লাইড অ্যানিমেশন
 */
export const IN_APP_ANIMATION_SLIDE = 'SLIDE';

/**
 * ফেড অ্যানিমেশন
 */
export const IN_APP_ANIMATION_FADE = 'FADE';

/**
 * বাউন্স অ্যানিমেশন
 */
export const IN_APP_ANIMATION_BOUNCE = 'BOUNCE';

/**
 * জুম অ্যানিমেশন
 */
export const IN_APP_ANIMATION_ZOOM = 'ZOOM';

/**
 * রোটেট অ্যানিমেশন
 */
export const IN_APP_ANIMATION_ROTATE = 'ROTATE';

/**
 * ফ্লিপ অ্যানিমেশন
 */
export const IN_APP_ANIMATION_FLIP = 'FLIP';

/**
 * নো অ্যানিমেশন
 */
export const IN_APP_ANIMATION_NONE = 'NONE';

// ============================================
// ৪. ইন-অ্যাপ ইন্টারঅ্যাকশন টাইপ
// ============================================

/**
 * ইন-অ্যাপ ইন্টারঅ্যাকশন টাইপ
 */
export type InAppInteraction =
  | typeof IN_APP_INTERACTION_CLICK
  | typeof IN_APP_INTERACTION_TAP
  | typeof IN_APP_INTERACTION_SWIPE
  | typeof IN_APP_INTERACTION_LONG_PRESS
  | typeof IN_APP_INTERACTION_DRAG
  | typeof IN_APP_INTERACTION_DISMISS
  | typeof IN_APP_INTERACTION_NONE;

/**
 * ক্লিক ইন্টারঅ্যাকশন
 */
export const IN_APP_INTERACTION_CLICK = 'CLICK';

/**
 * ট্যাপ ইন্টারঅ্যাকশন
 */
export const IN_APP_INTERACTION_TAP = 'TAP';

/**
 * সুইপ ইন্টারঅ্যাকশন
 */
export const IN_APP_INTERACTION_SWIPE = 'SWIPE';

/**
 * লং প্রেস ইন্টারঅ্যাকশন
 */
export const IN_APP_INTERACTION_LONG_PRESS = 'LONG_PRESS';

/**
 * ড্র্যাগ ইন্টারঅ্যাকশন
 */
export const IN_APP_INTERACTION_DRAG = 'DRAG';

/**
 * ডিসমিস ইন্টারঅ্যাকশন
 */
export const IN_APP_INTERACTION_DISMISS = 'DISMISS';

/**
 * নো ইন্টারঅ্যাকশন
 */
export const IN_APP_INTERACTION_NONE = 'NONE';

// ============================================
// ৫. ইন-অ্যাপ স্টাইলিং অপশন
// ============================================

/**
 * ইন-অ্যাপ থিম টাইপ
 */
export type InAppTheme =
  typeof IN_APP_THEME_LIGHT | typeof IN_APP_THEME_DARK | typeof IN_APP_THEME_SYSTEM;

/**
 * লাইট থিম
 */
export const IN_APP_THEME_LIGHT = 'LIGHT';

/**
 * ডার্ক থিম
 */
export const IN_APP_THEME_DARK = 'DARK';

/**
 * সিস্টেম থিম
 */
export const IN_APP_THEME_SYSTEM = 'SYSTEM';

// ============================================
// ৬. ইন-অ্যাপ টাইপ
// ============================================

/**
 * ইন-অ্যাপ নোটিফিকেশন টাইপ
 */
export type InAppType =
  | typeof IN_APP_TYPE_TOAST
  | typeof IN_APP_TYPE_SNACKBAR
  | typeof IN_APP_TYPE_ALERT
  | typeof IN_APP_TYPE_MODAL
  | typeof IN_APP_TYPE_BANNER
  | typeof IN_APP_TYPE_BADGE
  | typeof IN_APP_TYPE_POPUP;

/**
 * টোস্ট টাইপ
 * @description ক্ষণস্থায়ী বার্তা
 */
export const IN_APP_TYPE_TOAST = 'TOAST';

/**
 * স্ন্যাকবার টাইপ
 * @description অ্যাকশন সহ বার্তা
 */
export const IN_APP_TYPE_SNACKBAR = 'SNACKBAR';

/**
 * অ্যালার্ট টাইপ
 * @description সতর্কতা বার্তা
 */
export const IN_APP_TYPE_ALERT = 'ALERT';

/**
 * মডাল টাইপ
 * @description পূর্ণ পর্দার বার্তা
 */
export const IN_APP_TYPE_MODAL = 'MODAL';

/**
 * ব্যানার টাইপ
 * @description শীর্ষ বা নিচের ব্যানার
 */
export const IN_APP_TYPE_BANNER = 'BANNER';

/**
 * ব্যাজ টাইপ
 * @description ছোট আইকন বা সংখ্যা
 */
export const IN_APP_TYPE_BADGE = 'BADGE';

/**
 * পপআপ টাইপ
 * @description পপ-আপ বার্তা
 */
export const IN_APP_TYPE_POPUP = 'POPUP';

// ============================================
// ৭. ইন-অ্যাপ কনফিগারেশন
// ============================================

/**
 * ইন-অ্যাপ কনফিগারেশন ইন্টারফেস
 */
export interface InAppConfig {
  /** সর্বোচ্চ মেসেজ সাইজ */
  maxMessageSize: number;
  /** সর্বোচ্চ টাইটেল দৈর্ঘ্য */
  maxTitleLength: number;
  /** সর্বোচ্চ বডি দৈর্ঘ্য */
  maxBodyLength: number;
  /** ডিফল্ট ডিসপ্লে সময় */
  defaultDisplayTime: number;
  /** সর্বোচ্চ ডিসপ্লে সময় */
  maxDisplayTime: number;
  /** ন্যূনতম ডিসপ্লে সময় */
  minDisplayTime: number;
  /** ডিফল্ট অ্যানিমেশন সময় */
  defaultAnimationDuration: number;
  /** ডিফল্ট ডিসমিস সময় */
  defaultDismissTime: number;
  /** টাইমআউট */
  timeout: number;
  /** ব্যাচ সাইজ */
  batchSize: number;
  /** কিউ ম্যাক্স সাইজ */
  queueMaxSize: number;
}

/**
 * ডিফল্ট ইন-অ্যাপ কনফিগারেশন
 */
export const IN_APP_DEFAULT_CONFIG: InAppConfig = {
  maxMessageSize: IN_APP_MAX_MESSAGE_SIZE,
  maxTitleLength: IN_APP_MAX_TITLE_LENGTH,
  maxBodyLength: IN_APP_MAX_BODY_LENGTH,
  defaultDisplayTime: IN_APP_DEFAULT_DISPLAY_TIME,
  maxDisplayTime: IN_APP_MAX_DISPLAY_TIME,
  minDisplayTime: IN_APP_MIN_DISPLAY_TIME,
  defaultAnimationDuration: IN_APP_DEFAULT_ANIMATION_DURATION,
  defaultDismissTime: IN_APP_DEFAULT_DISMISS_TIME,
  timeout: IN_APP_TIMEOUT,
  batchSize: IN_APP_BATCH_SIZE,
  queueMaxSize: IN_APP_QUEUE_MAX_SIZE,
};

// ============================================
// ৮. ইন-অ্যাপ পজিশন লেবেল
// ============================================

/**
 * ইন-অ্যাপ পজিশন লেবেল
 */
export const IN_APP_POSITION_LABELS: Record<InAppPosition, string> = {
  [IN_APP_POSITION_TOP]: 'শীর্ষ',
  [IN_APP_POSITION_BOTTOM]: 'নিচ',
  [IN_APP_POSITION_TOP_LEFT]: 'শীর্ষ-বাম',
  [IN_APP_POSITION_TOP_RIGHT]: 'শীর্ষ-ডান',
  [IN_APP_POSITION_BOTTOM_LEFT]: 'নিচ-বাম',
  [IN_APP_POSITION_BOTTOM_RIGHT]: 'নিচ-ডান',
  [IN_APP_POSITION_CENTER]: 'কেন্দ্র',
};

// ============================================
// ৯. ইন-অ্যাপ অ্যানিমেশন লেবেল
// ============================================

/**
 * ইন-অ্যাপ অ্যানিমেশন লেবেল
 */
export const IN_APP_ANIMATION_LABELS: Record<InAppAnimation, string> = {
  [IN_APP_ANIMATION_SLIDE]: 'স্লাইড',
  [IN_APP_ANIMATION_FADE]: 'ফেড',
  [IN_APP_ANIMATION_BOUNCE]: 'বাউন্স',
  [IN_APP_ANIMATION_ZOOM]: 'জুম',
  [IN_APP_ANIMATION_ROTATE]: 'রোটেট',
  [IN_APP_ANIMATION_FLIP]: 'ফ্লিপ',
  [IN_APP_ANIMATION_NONE]: 'কোনোটিই নয়',
};

// ============================================
// ১০. ইন-অ্যাপ ইন্টারঅ্যাকশন লেবেল
// ============================================

/**
 * ইন-অ্যাপ ইন্টারঅ্যাকশন লেবেল
 */
export const IN_APP_INTERACTION_LABELS: Record<InAppInteraction, string> = {
  [IN_APP_INTERACTION_CLICK]: 'ক্লিক',
  [IN_APP_INTERACTION_TAP]: 'ট্যাপ',
  [IN_APP_INTERACTION_SWIPE]: 'সুইপ',
  [IN_APP_INTERACTION_LONG_PRESS]: 'দীর্ঘ টিপুন',
  [IN_APP_INTERACTION_DRAG]: 'ড্র্যাগ',
  [IN_APP_INTERACTION_DISMISS]: 'বাদ দিন',
  [IN_APP_INTERACTION_NONE]: 'কোনোটিই নয়',
};

// ============================================
// ১১. ইন-অ্যাপ টাইপ লেবেল
// ============================================

/**
 * ইন-অ্যাপ টাইপ লেবেল
 */
export const IN_APP_TYPE_LABELS: Record<InAppType, string> = {
  [IN_APP_TYPE_TOAST]: 'টোস্ট',
  [IN_APP_TYPE_SNACKBAR]: 'স্ন্যাকবার',
  [IN_APP_TYPE_ALERT]: 'সতর্কতা',
  [IN_APP_TYPE_MODAL]: 'মডাল',
  [IN_APP_TYPE_BANNER]: 'ব্যানার',
  [IN_APP_TYPE_BADGE]: 'ব্যাজ',
  [IN_APP_TYPE_POPUP]: 'পপআপ',
};

// ============================================
// ১২. ইন-অ্যাপ থিম লেবেল
// ============================================

/**
 * ইন-অ্যাপ থিম লেবেল
 */
export const IN_APP_THEME_LABELS: Record<InAppTheme, string> = {
  [IN_APP_THEME_LIGHT]: 'হালকা',
  [IN_APP_THEME_DARK]: 'গাঢ়',
  [IN_APP_THEME_SYSTEM]: 'সিস্টেম',
};
