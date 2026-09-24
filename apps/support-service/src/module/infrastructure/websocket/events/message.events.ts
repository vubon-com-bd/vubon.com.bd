export const MESSAGE_EVENTS = {
  SEND: 'chat:message:send',
  RECEIVE: 'chat:message:receive',
  READ: 'chat:message:read',
} as const;

export type MessageEventType = (typeof MESSAGE_EVENTS)[keyof typeof MESSAGE_EVENTS];
