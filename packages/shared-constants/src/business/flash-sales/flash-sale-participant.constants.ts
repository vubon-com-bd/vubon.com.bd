/**
 * Flash Sale Participant Constants
 * ফ্ল্যাশ সেল অংশগ্রহণকারী সম্পর্কিত কনস্ট্যান্টস
 */

import { STATUS } from '../../common';

export const PARTICIPANT = {
  // Participant status
  STATUS: {
    ACTIVE: STATUS.ACTIVE,
    INACTIVE: STATUS.INACTIVE,
    REGISTERED: 'registered',
    QUALIFIED: 'qualified',
    DISQUALIFIED: 'disqualified',
    CANCELLED: 'cancelled',
    DELETED: STATUS.DELETED,
  },

  // Participant types
  TYPES: {
    BUYER: 'buyer',
    SELLER: 'seller',
    BOTH: 'both',
  },

  // Participant roles
  ROLES: {
    REGULAR: 'regular',
    VIP: 'vip',
    PREMIUM: 'premium',
    GUEST: 'guest',
  },

  // Default values
  DEFAULTS: {
    MAX_PARTICIPANTS: 1000,
    MIN_PARTICIPANTS: 1,
    REGISTRATION_WINDOW: 3600, // 1 hour
  },
} as const;

export type ParticipantStatus = (typeof PARTICIPANT.STATUS)[keyof typeof PARTICIPANT.STATUS];
export type ParticipantType = (typeof PARTICIPANT.TYPES)[keyof typeof PARTICIPANT.TYPES];
export type ParticipantRole = (typeof PARTICIPANT.ROLES)[keyof typeof PARTICIPANT.ROLES];
