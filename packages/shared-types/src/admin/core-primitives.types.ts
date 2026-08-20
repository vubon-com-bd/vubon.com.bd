// 1. বাহ্যিক লাইব্রেরি
// (কোনটি প্রয়োজন নেই)

// 2. শেয়ার্ড প্যাকেজ
import { admin } from '@vubon/shared-constants';

// 3. প্রকল্পের অন্য ফাইল
// (কোনটি প্রয়োজন নেই)

/**
 * অ্যাডমিন আইডি টাইপ
 * @description ADMIN_ID_PREFIX দিয়ে শুরু হবে
 */
export type AdminId = string & { __brand: 'AdminId' };

/**
 * অ্যাডমিন ইমেইল টাইপ
 * @description ADMIN_EMAIL_FORMAT অনুযায়ী ভ্যালিড হবে
 */
export type AdminEmail = string & { __brand: 'AdminEmail' };

/**
 * অ্যাডমিন ফোন টাইপ
 * @description ADMIN_PHONE_FORMAT অনুযায়ী ভ্যালিড হবে
 */
export type AdminPhone = string & { __brand: 'AdminPhone' };

/**
 * অ্যাডমিন নাম টাইপ
 * @description দৈর্ঘ্য ADMIN_NAME_MIN_LENGTH ও ADMIN_NAME_MAX_LENGTH এর মধ্যে
 */
export type AdminName = string & { __brand: 'AdminName' };

/**
 * অ্যাডমিন পাসওয়ার্ড টাইপ
 * @description দৈর্ঘ্য ADMIN_PASSWORD_MIN_LENGTH এর চেয়ে বেশি
 */
export type AdminPassword = string & { __brand: 'AdminPassword' };

/**
 * অ্যাডমিন টাইমস্ট্যাম্প টাইপ
 */
export type AdminTimestamp = Date | string;

/**
 * অ্যাডমিন স্ট্যাটাস টাইপ
 * @description ADMIN_STATUS থেকে মান নিবে
 */
export type AdminStatus = (typeof admin.ADMIN_STATUS)[keyof typeof admin.ADMIN_STATUS];

/**
 * অ্যাডমিন টাইপ টাইপ
 * @description ADMIN_TYPES থেকে মান নিবে
 */
export type AdminType = (typeof admin.ADMIN_TYPES)[keyof typeof admin.ADMIN_TYPES];

/**
 * অ্যাডমিন লেভেল টাইপ
 * @description ADMIN_LEVELS থেকে মান নিবে
 */
export type AdminLevel = (typeof admin.ADMIN_LEVELS)[keyof typeof admin.ADMIN_LEVELS];
