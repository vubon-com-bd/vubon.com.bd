/**
 * Activity Tracker
 * ইউজার অ্যাক্টিভিটি ট্র্যাকার
 */

import { UserActivity, UserActivityCreateInput } from '@vubon/shared-types';
import { USER_ACTIVITY } from '@vubon/shared-constants';
import { formatDate } from '../common/formatter/date.formatter';

export const ActivityTracker = {
  /**
   * Create activity entry
   * অ্যাক্টিভিটি এন্ট্রি তৈরি করা
   */
  create: (data: UserActivityCreateInput): UserActivityCreateInput => {
    return {
      ...data,
      status: data.status || USER_ACTIVITY.STATUS.SUCCESS,
      importance: data.importance || USER_ACTIVITY.IMPORTANCE.LOW,
    };
  },

  /**
   * Track login activity
   * লগইন অ্যাক্টিভিটি ট্র্যাক করা
   */
  trackLogin: (userId: string, metadata?: Record<string, unknown>): UserActivityCreateInput => {
    return ActivityTracker.create({
      userId,
      type: USER_ACTIVITY.TYPES.LOGIN,
      description: 'User logged in',
      metadata,
    });
  },

  /**
   * Track logout activity
   * লগআউট অ্যাক্টিভিটি ট্র্যাক করা
   */
  trackLogout: (userId: string, metadata?: Record<string, unknown>): UserActivityCreateInput => {
    return ActivityTracker.create({
      userId,
      type: USER_ACTIVITY.TYPES.LOGOUT,
      description: 'User logged out',
      metadata,
    });
  },

  /**
   * Track profile update activity
   * প্রোফাইল আপডেট অ্যাক্টিভিটি ট্র্যাক করা
   */
  trackProfileUpdate: (
    userId: string,
    changes: string[],
    metadata?: Record<string, unknown>
  ): UserActivityCreateInput => {
    return ActivityTracker.create({
      userId,
      type: USER_ACTIVITY.TYPES.PROFILE_UPDATE,
      description: `Profile updated: ${changes.join(', ')}`,
      importance: USER_ACTIVITY.IMPORTANCE.MEDIUM,
      metadata,
    });
  },

  /**
   * Track password change activity
   * পাসওয়ার্ড পরিবর্তন অ্যাক্টিভিটি ট্র্যাক করা
   */
  trackPasswordChange: (
    userId: string,
    metadata?: Record<string, unknown>
  ): UserActivityCreateInput => {
    return ActivityTracker.create({
      userId,
      type: USER_ACTIVITY.TYPES.PASSWORD_CHANGE,
      description: 'Password changed',
      importance: USER_ACTIVITY.IMPORTANCE.HIGH,
      metadata,
    });
  },

  /**
   * Track verification activity
   * ভেরিফিকেশন অ্যাক্টিভিটি ট্র্যাক করা
   */
  trackVerification: (
    userId: string,
    method: string,
    status: string,
    metadata?: Record<string, unknown>
  ): UserActivityCreateInput => {
    return ActivityTracker.create({
      userId,
      type: USER_ACTIVITY.TYPES.VERIFICATION,
      description: `Verification ${status}: ${method}`,
      importance: USER_ACTIVITY.IMPORTANCE.HIGH,
      metadata: { method, status, ...metadata },
    });
  },

  /**
   * Get activity summary
   * অ্যাক্টিভিটি সেরসংক্ষেপ পাওয়া
   */
  getSummary: (
    activities: UserActivity[]
  ): {
    total: number;
    byType: Record<string, number>;
    byStatus: Record<string, number>;
    recentActivities: UserActivity[];
  } => {
    const byType: Record<string, number> = {};
    const byStatus: Record<string, number> = {};

    for (const activity of activities) {
      byType[activity.type] = (byType[activity.type] || 0) + 1;
      byStatus[activity.status] = (byStatus[activity.status] || 0) + 1;
    }

    const sorted = [...activities].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return {
      total: activities.length,
      byType,
      byStatus,
      recentActivities: sorted.slice(0, 10),
    };
  },

  /**
   * Format activity for display
   * অ্যাক্টিভিটি ডিসপ্লের জন্য ফরম্যাট করা
   */
  format: (activity: UserActivity): string => {
    const date = formatDate(activity.timestamp, 'DD-MM-YYYY HH:mm:ss');
    return `[${date}] ${activity.type} - ${activity.description || ''}`;
  },
};
