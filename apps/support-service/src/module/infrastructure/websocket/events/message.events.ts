/**
 * WebSocket event names
 * @module support-service/infrastructure/websocket/events
 */
export const WS_EVENT = Object.freeze({
  // chat
  JOIN_CHAT: 'chat:join',
  JOINED_CHAT: 'chat:joined',
  LEAVE_CHAT: 'chat:leave',
  LEFT_CHAT: 'chat:left',
  CHAT_MESSAGE: 'chat:message',
  MESSAGE_READ: 'chat:message_read',

  // typing
  TYPING_START: 'typing:start',
  TYPING_STOP: 'typing:stop',
  TYPING: 'typing',

  // presence
  AGENT_ONLINE: 'agent:online',
  AGENT_OFFLINE: 'agent:offline',
  USER_ONLINE: 'user:online',
  USER_OFFLINE: 'user:offline',

  // ticket
  TICKET_UPDATED: 'ticket:updated',
  TICKET_ASSIGNED: 'ticket:assigned',
  TICKET_ESCALATED: 'ticket:escalated',
} as const);

export type WsEvent = (typeof WS_EVENT)[keyof typeof WS_EVENT];
