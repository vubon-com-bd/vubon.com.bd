/**
 * User Constants
 * Core user-related constants for the e-commerce platform
 */

import { USER_STATUS } from './user-status.constants';
import { USER_TYPE } from './user-type.constants';
import { USER_ROLE } from './user-role.constants';

export const USER = {
  // Default values
  DEFAULTS: {
    STATUS: USER_STATUS.ACTIVE,
    TYPE: USER_TYPE.CUSTOMER,
    ROLE: USER_ROLE.CUSTOMER,
    CURRENCY: 'BDT',
    LANGUAGE: 'bn',
    TIMEZONE: 'Asia/Dhaka',
    COUNTRY: 'Bangladesh',
  },

  // User levels
  LEVELS: {
    BRONZE: 1,
    SILVER: 2,
    GOLD: 3,
    PLATINUM: 4,
    DIAMOND: 5,
  },

  // Points thresholds for each level
  LEVEL_THRESHOLDS: {
    [1]: 0, // Bronze
    [2]: 1000, // Silver
    [3]: 5000, // Gold
    [4]: 10000, // Platinum
    [5]: 50000, // Diamond
  },

  // User fields
  FIELDS: {
    ID: 'id',
    NAME: 'name',
    EMAIL: 'email',
    PHONE: 'phone',
    NID: 'nid',
    STATUS: 'status',
    TYPE: 'type',
    ROLE: 'role',
    PROFILE: 'profile',
    PREFERENCES: 'preferences',
    SETTINGS: 'settings',
    ADDRESSES: 'addresses',
    VERIFICATION: 'verification',
    KYC: 'kyc',
    ACTIVITY: 'activity',
    CREATED_AT: 'createdAt',
    UPDATED_AT: 'updatedAt',
  },

  // Verification status
  VERIFICATION: {
    PENDING: 'pending',
    VERIFIED: 'verified',
    REJECTED: 'rejected',
    EXPIRED: 'expired',
  },

  // Account status messages
  STATUS_MESSAGES: {
    [USER_STATUS.ACTIVE]: 'Account is active',
    [USER_STATUS.INACTIVE]: 'Account is inactive',
    [USER_STATUS.SUSPENDED]: 'Account is suspended',
    [USER_STATUS.BLOCKED]: 'Account is blocked',
    [USER_STATUS.PENDING]: 'Account is pending verification',
    [USER_STATUS.DELETED]: 'Account is deleted',
  },
} as const;

export type UserLevel = (typeof USER.LEVELS)[keyof typeof USER.LEVELS];
export type UserVerificationStatus = (typeof USER.VERIFICATION)[keyof typeof USER.VERIFICATION];

export function getUserLevel(points: number): UserLevel {
  const levels = Object.entries(USER.LEVEL_THRESHOLDS).sort((a, b) => Number(a[1]) - Number(b[1]));

  let currentLevel: UserLevel = USER.LEVELS.BRONZE;
  for (const [levelKey, threshold] of levels) {
    if (points >= Number(threshold)) {
      const levelNum = Number(levelKey) as UserLevel;
      if (levelNum >= currentLevel) {
        currentLevel = levelNum;
      }
    }
  }
  return currentLevel;
}

export function getNextLevelThreshold(points: number): number | null {
  const levels = Object.entries(USER.LEVEL_THRESHOLDS).sort((a, b) => Number(a[1]) - Number(b[1]));

  for (const [, threshold] of levels) {
    if (points < Number(threshold)) {
      return Number(threshold);
    }
  }
  return null;
}

export function getLevelName(level: UserLevel): string {
  const names: Record<UserLevel, string> = {
    [USER.LEVELS.BRONZE]: 'Bronze',
    [USER.LEVELS.SILVER]: 'Silver',
    [USER.LEVELS.GOLD]: 'Gold',
    [USER.LEVELS.PLATINUM]: 'Platinum',
    [USER.LEVELS.DIAMOND]: 'Diamond',
  };
  return names[level] || 'Bronze';
}

// Renamed to avoid conflict with common's getStatusMessage
export function getUserStatusMessage(status: string): string {
  return USER.STATUS_MESSAGES[status as keyof typeof USER.STATUS_MESSAGES] || 'Unknown status';
}

export function isActiveUser(status: string): boolean {
  return status === USER_STATUS.ACTIVE;
}

export function isEligibleForLevelUpgrade(points: number, currentLevel: UserLevel): boolean {
  const nextThreshold = getNextLevelThreshold(points);
  if (!nextThreshold) return false;
  return points >= nextThreshold && currentLevel < USER.LEVELS.DIAMOND;
}
