/**
 * Ticket Channel Constants
 * Communication channels for support tickets
 */

export const TICKET_CHANNEL = {
  // Channel Types
  TYPES: {
    EMAIL: 'email',
    PHONE: 'phone',
    CHAT: 'chat',
    SOCIAL: 'social',
    WHATSAPP: 'whatsapp',
    FACEBOOK: 'facebook',
    TWITTER: 'twitter',
    WEBSITE: 'website',
    APP: 'app',
    API: 'api',
  } as const,

  // Channel Categories
  CATEGORIES: {
    SYNC: 'sync',
    ASYNC: 'async',
    SOCIAL: 'social',
    DIGITAL: 'digital',
  } as const,

  // Channel Icons (for UI)
  ICONS: {
    EMAIL: '📧',
    PHONE: '📞',
    CHAT: '💬',
    SOCIAL: '🌐',
    WHATSAPP: '💚',
    FACEBOOK: '👍',
    TWITTER: '🐦',
    WEBSITE: '🌍',
    APP: '📱',
    API: '🔌',
  } as const,

  // Response Times (in minutes)
  RESPONSE_TIMES: {
    EMAIL: 120,
    PHONE: 5,
    CHAT: 1,
    SOCIAL: 60,
    WHATSAPP: 30,
    FACEBOOK: 60,
    TWITTER: 60,
    WEBSITE: 60,
    APP: 30,
    API: 10,
  } as const,
} as const;

// Channel Types
export type TicketChannelType = (typeof TICKET_CHANNEL.TYPES)[keyof typeof TICKET_CHANNEL.TYPES];

// Channel Categories
export type TicketChannelCategory =
  (typeof TICKET_CHANNEL.CATEGORIES)[keyof typeof TICKET_CHANNEL.CATEGORIES];

// Channel Icons
export type TicketChannelIcon = (typeof TICKET_CHANNEL.ICONS)[keyof typeof TICKET_CHANNEL.ICONS];

// Utility Functions
export function ticketChannelGetLabel(channel: TicketChannelType): string {
  const labels: Record<TicketChannelType, string> = {
    [TICKET_CHANNEL.TYPES.EMAIL]: 'Email',
    [TICKET_CHANNEL.TYPES.PHONE]: 'Phone',
    [TICKET_CHANNEL.TYPES.CHAT]: 'Live Chat',
    [TICKET_CHANNEL.TYPES.SOCIAL]: 'Social Media',
    [TICKET_CHANNEL.TYPES.WHATSAPP]: 'WhatsApp',
    [TICKET_CHANNEL.TYPES.FACEBOOK]: 'Facebook',
    [TICKET_CHANNEL.TYPES.TWITTER]: 'Twitter',
    [TICKET_CHANNEL.TYPES.WEBSITE]: 'Website',
    [TICKET_CHANNEL.TYPES.APP]: 'Mobile App',
    [TICKET_CHANNEL.TYPES.API]: 'API',
  };
  return labels[channel] || 'Unknown';
}

export function ticketChannelGetIcon(channel: TicketChannelType): TicketChannelIcon {
  const icons: Record<TicketChannelType, TicketChannelIcon> = {
    [TICKET_CHANNEL.TYPES.EMAIL]: TICKET_CHANNEL.ICONS.EMAIL,
    [TICKET_CHANNEL.TYPES.PHONE]: TICKET_CHANNEL.ICONS.PHONE,
    [TICKET_CHANNEL.TYPES.CHAT]: TICKET_CHANNEL.ICONS.CHAT,
    [TICKET_CHANNEL.TYPES.SOCIAL]: TICKET_CHANNEL.ICONS.SOCIAL,
    [TICKET_CHANNEL.TYPES.WHATSAPP]: TICKET_CHANNEL.ICONS.WHATSAPP,
    [TICKET_CHANNEL.TYPES.FACEBOOK]: TICKET_CHANNEL.ICONS.FACEBOOK,
    [TICKET_CHANNEL.TYPES.TWITTER]: TICKET_CHANNEL.ICONS.TWITTER,
    [TICKET_CHANNEL.TYPES.WEBSITE]: TICKET_CHANNEL.ICONS.WEBSITE,
    [TICKET_CHANNEL.TYPES.APP]: TICKET_CHANNEL.ICONS.APP,
    [TICKET_CHANNEL.TYPES.API]: TICKET_CHANNEL.ICONS.API,
  };
  return icons[channel] || '📌';
}

export function ticketChannelIsSync(channel: TicketChannelType): boolean {
  const syncChannels: TicketChannelType[] = [TICKET_CHANNEL.TYPES.PHONE, TICKET_CHANNEL.TYPES.CHAT];
  return syncChannels.includes(channel);
}

export function ticketChannelIsAsync(channel: TicketChannelType): boolean {
  return !ticketChannelIsSync(channel);
}

export function ticketChannelGetResponseTime(channel: TicketChannelType): number {
  const times: Record<TicketChannelType, number> = {
    [TICKET_CHANNEL.TYPES.EMAIL]: TICKET_CHANNEL.RESPONSE_TIMES.EMAIL,
    [TICKET_CHANNEL.TYPES.PHONE]: TICKET_CHANNEL.RESPONSE_TIMES.PHONE,
    [TICKET_CHANNEL.TYPES.CHAT]: TICKET_CHANNEL.RESPONSE_TIMES.CHAT,
    [TICKET_CHANNEL.TYPES.SOCIAL]: TICKET_CHANNEL.RESPONSE_TIMES.SOCIAL,
    [TICKET_CHANNEL.TYPES.WHATSAPP]: TICKET_CHANNEL.RESPONSE_TIMES.WHATSAPP,
    [TICKET_CHANNEL.TYPES.FACEBOOK]: TICKET_CHANNEL.RESPONSE_TIMES.FACEBOOK,
    [TICKET_CHANNEL.TYPES.TWITTER]: TICKET_CHANNEL.RESPONSE_TIMES.TWITTER,
    [TICKET_CHANNEL.TYPES.WEBSITE]: TICKET_CHANNEL.RESPONSE_TIMES.WEBSITE,
    [TICKET_CHANNEL.TYPES.APP]: TICKET_CHANNEL.RESPONSE_TIMES.APP,
    [TICKET_CHANNEL.TYPES.API]: TICKET_CHANNEL.RESPONSE_TIMES.API,
  };
  return times[channel] || 60;
}
