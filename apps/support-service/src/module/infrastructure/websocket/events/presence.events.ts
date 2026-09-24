export const PRESENCE_EVENTS = {
  ONLINE: 'presence:online',
  OFFLINE: 'presence:offline',
  UPDATE: 'presence:update',
} as const;

export type PresenceEventType = (typeof PRESENCE_EVENTS)[keyof typeof PRESENCE_EVENTS];
