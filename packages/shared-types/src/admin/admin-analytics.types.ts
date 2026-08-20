// 1. বাহ্যিক লাইব্রেরি
// (কোনটি প্রয়োজন নেই)

// 2. শেয়ার্ড প্যাকেজ
// (কোনটি প্রয়োজন নেই)

// 3. প্রকল্পের অন্য ফাইল
import type { AdminActivity, ActivityType, ActivityStatus } from './admin-activity.types';
import type { DeviceType } from './admin-device.types';

/**
 * লগইন স্ট্যাটিসটিক্স
 */
export interface LoginStats {
  /** দৈনিক লগইন সংখ্যা */
  daily: number;
  /** সাপ্তাহিক লগইন সংখ্যা */
  weekly: number;
  /** মাসিক লগইন সংখ্যা */
  monthly: number;
}

/**
 * সেশন স্ট্যাটিসটিক্স
 */
export interface SessionStats {
  /** সক্রিয় সেশন সংখ্যা */
  active: number;
  /** মেয়াদোত্তীর্ণ সেশন সংখ্যা */
  expired: number;
}

/**
 * অ্যাক্টিভিটি টাইমলাইন আইটেম
 */
export interface ActivityTimelineItem {
  /** তারিখ */
  date: string;
  /** অ্যাক্টিভিটি সংখ্যা */
  count: number;
}

/**
 * অ্যাডমিন অ্যানালিটিক্স ইন্টারফেস (ড্যাশবোর্ডের জন্য)
 */
export interface AdminAnalytics {
  /** মোট অ্যাডমিন সংখ্যা */
  totalAdmins: number;
  /** সক্রিয় অ্যাডমিন সংখ্যা */
  activeAdmins: number;
  /** পেন্ডিং অ্যাডমিন সংখ্যা */
  pendingAdmins: number;
  /** মোট রোল সংখ্যা */
  totalRoles: number;
  /** মোট পারমিশন সংখ্যা */
  totalPermissions: number;
  /** সাম্প্রতিক অ্যাক্টিভিটিসমূহ */
  recentActivities: AdminActivity[];
  /** লগইন স্ট্যাটিসটিক্স */
  loginStats: LoginStats;
  /** সেশন স্ট্যাটিসটিক্স */
  sessionStats: SessionStats;
  /** ডিভাইস অনুযায়ী পরিসংখ্যান */
  deviceStats: Record<DeviceType, number>;
  /** রোল অনুযায়ী বণ্টন */
  roleDistribution: Record<string, number>;
  /** অ্যাক্টিভিটি টাইমলাইন */
  activityTimeline: ActivityTimelineItem[];
}

/**
 * অ্যানালিটিক্স ফিল্টার টাইপ
 */
export interface AnalyticsFilter {
  /** তারিখের রেঞ্জ (শুরু) */
  startDate?: Date;
  /** তারিখের রেঞ্জ (শেষ) */
  endDate?: Date;
  /** অ্যাক্টিভিটি টাইপ দ্বারা ফিল্টার */
  activityType?: ActivityType;
  /** অ্যাক্টিভিটি স্ট্যাটাস দ্বারা ফিল্টার */
  activityStatus?: ActivityStatus;
  /** ডিভাইস টাইপ দ্বারা ফিল্টার */
  deviceType?: DeviceType;
  /** নির্দিষ্ট অ্যাডমিন আইডি দ্বারা ফিল্টার */
  adminId?: string;
}
