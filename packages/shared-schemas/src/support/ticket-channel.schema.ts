import { z } from 'zod';
import { TICKET_CHANNEL } from '@vubon/shared-constants/src/support/ticket-channel.constants';

const ticketChannelTypeKeys = Object.keys(TICKET_CHANNEL.TYPES) as [string, ...string[]];
const ticketChannelPriorityKeys = Object.keys(TICKET_CHANNEL.CHANNEL_PRIORITY) as [
  string,
  ...string[],
];

export const TicketChannelSchema = z.object({
  channel: z.enum(ticketChannelTypeKeys),
  category: z.literal('ticket_channel'),
  priority: z.enum(ticketChannelPriorityKeys),
  isEmail: z.boolean().default(false),
  isPhone: z.boolean().default(false),
  isChat: z.boolean().default(false),
  isWhatsApp: z.boolean().default(false),
  isMessenger: z.boolean().default(false),
  isSocial: z.boolean().default(false),
  isWeb: z.boolean().default(false),
  isMobile: z.boolean().default(false),
  isApi: z.boolean().default(false),
  isBot: z.boolean().default(false),
});

export const TicketChannelEnumSchema = z.enum(ticketChannelTypeKeys);
