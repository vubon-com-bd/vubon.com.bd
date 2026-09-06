/**
 * Flash Sale Participant Constants (EXTENDS common/status)
 * @module shared-constants/business/flash-sales/flash-sale-participant.constants
 */

import { STATUS } from '../../common/status.constants';

export const FLASH_SALE_PARTICIPANT = {
  // Base status from common
  STATUS: STATUS,

  // Participant specific
  MAX_PARTICIPANTS: 10000,
  PARTICIPANT_CACHE_TTL: 3600,
  PARTICIPANT_LIMIT_PER_USER: 1,

  // Participant status
  FLASH_SALE_PARTICIPANT_STATUS: {
    REGISTERED: 'registered',
    JOINED: 'joined',
    ACTIVE: 'active',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    WAITING: 'waiting',
    TIMED_OUT: 'timed_out',
    EXCLUDED: 'excluded',
  } as const,

  // Participant type
  FLASH_SALE_PARTICIPANT_TYPE: {
    INDIVIDUAL: 'individual',
    GROUP: 'group',
    CORPORATE: 'corporate',
    GUEST: 'guest',
    MEMBER: 'member',
    VIP: 'vip',
  } as const,

  // Participant role
  FLASH_SALE_PARTICIPANT_ROLE: {
    BUYER: 'buyer',
    OBSERVER: 'observer',
    ADMIN: 'admin',
    MODERATOR: 'moderator',
  } as const,
} as const;

export type FlashSaleParticipantStatus =
  (typeof FLASH_SALE_PARTICIPANT.FLASH_SALE_PARTICIPANT_STATUS)[keyof typeof FLASH_SALE_PARTICIPANT.FLASH_SALE_PARTICIPANT_STATUS];
export type FlashSaleParticipantType =
  (typeof FLASH_SALE_PARTICIPANT.FLASH_SALE_PARTICIPANT_TYPE)[keyof typeof FLASH_SALE_PARTICIPANT.FLASH_SALE_PARTICIPANT_TYPE];
export type FlashSaleParticipantRole =
  (typeof FLASH_SALE_PARTICIPANT.FLASH_SALE_PARTICIPANT_ROLE)[keyof typeof FLASH_SALE_PARTICIPANT.FLASH_SALE_PARTICIPANT_ROLE];
