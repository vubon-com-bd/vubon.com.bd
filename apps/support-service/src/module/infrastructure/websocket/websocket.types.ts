export interface AuthenticatedSocketUser {
  readonly userId: string;
  readonly sessionId?: string;
  readonly roles?: readonly string[];
}

export interface ChatMessagePayload {
  readonly chatId: string;
  readonly content: string;
  readonly type?: string;
}

export interface TypingPayload {
  readonly chatId: string;
  readonly isTyping: boolean;
}

export interface PresencePayload {
  readonly userId: string;
  readonly status: 'online' | 'offline' | 'away' | 'busy';
}

export interface JoinRoomPayload {
  readonly room: string;
}
