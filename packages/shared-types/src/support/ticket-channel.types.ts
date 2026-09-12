import { TypeObject } from '../common/types.types';
import { TICKET_CHANNEL } from '@vubon/shared-constants/src/support/ticket-channel.constants';

export interface TicketChannel extends TypeObject {
  type: keyof typeof TICKET_CHANNEL.TYPES | string;
  category: 'ticket_channel';
  priority: keyof typeof TICKET_CHANNEL.CHANNEL_PRIORITY | string;
  isEmail: boolean;
  isPhone: boolean;
  isChat: boolean;
  isWhatsApp: boolean;
  isMessenger: boolean;
  isSocial: boolean;
  isWeb: boolean;
  isMobile: boolean;
  isApi: boolean;
  isBot: boolean;
}

export type TicketChannelKey = keyof typeof TICKET_CHANNEL.TYPES;
