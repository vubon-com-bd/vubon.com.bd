export const TYPING_EVENTS = {
  START: 'chat:typing:start',
  STOP: 'chat:typing:stop',
} as const;

export type TypingEventType = (typeof TYPING_EVENTS)[keyof typeof TYPING_EVENTS];
