/**
 * Chat room naming helpers
 * @module support-service/infrastructure/websocket/rooms
 *
 * Rule: room isolation — one room per chat, one room per user, one room per agent
 */
export const CHAT_ROOM = Object.freeze({
  forChat: (chatId: string): string => `chat:${chatId}`,
  forUser: (userId: string): string => `user:${userId}`,
  forAgent: (agentId: string): string => `agent:${agentId}`,
  AGENTS: 'agents:all',
  ADMINS: 'admins:all',
} as const);
