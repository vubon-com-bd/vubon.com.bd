/**
 * Cart Redis Keys
 * @module cart-service/infrastructure/persistence/redis/keys
 */
const NS = 'cart';

export const CartKeys = {
  byId: (id: string): string => `${NS}:by-id:${id}`,
  byUser: (userId: string): string => `${NS}:by-user:${userId}`,
  bySession: (sessionId: string): string => `${NS}:by-session:${sessionId}`,
  activeByUser: (userId: string): string => `${NS}:active-by-user:${userId}`,
  byStatus: (status: string): string => `${NS}:by-status:${status}`,
  byIdempotencyKey: (key: string): string => `${NS}:by-idem:${key}`,
  totals: (id: string): string => `${NS}:totals:${id}`,
  summary: (id: string): string => `${NS}:summary:${id}`,
  allIds: (): string => `${NS}:all-ids`,
  allUsersIds: (): string => `${NS}:all-users-ids`,
} as const;
