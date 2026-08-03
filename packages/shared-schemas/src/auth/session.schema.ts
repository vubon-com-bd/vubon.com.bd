import { z } from 'zod';

/**
 * Schema for validating session ID requests
 */
export const SessionIdSchema = z.object({
  /**
   * Session ID - must be a valid UUID
   */
  sessionId: z
    .string({
      required_error: 'Session ID is required',
      invalid_type_error: 'Session ID must be a string',
    })
    .uuid('Invalid session ID format. Must be a valid UUID'),
});

/**
 * Schema for validating revoke all sessions requests
 */
export const RevokeAllSessionsSchema = z.object({
  /**
   * Whether to exclude current session - optional, defaults to false
   * If true, only revokes other sessions, keeping the current one active
   */
  exceptCurrent: z.boolean().optional().default(false),
});

/**
 * Type inference for session schemas
 */
export type SessionIdSchemaType = z.infer<typeof SessionIdSchema>;
export type RevokeAllSessionsSchemaType = z.infer<typeof RevokeAllSessionsSchema>;

/**
 * Validates session ID data and returns typed result
 */
export function validateSessionId(data: unknown): SessionIdSchemaType {
  return SessionIdSchema.parse(data);
}

/**
 * Safely validates session ID data without throwing
 */
export function safeValidateSessionId(data: unknown): {
  success: boolean;
  data?: SessionIdSchemaType;
  error?: z.ZodError;
} {
  const result = SessionIdSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

/**
 * Validates revoke all sessions data and returns typed result
 */
export function validateRevokeAllSessions(data: unknown): RevokeAllSessionsSchemaType {
  return RevokeAllSessionsSchema.parse(data);
}

/**
 * Safely validates revoke all sessions data without throwing
 */
export function safeValidateRevokeAllSessions(data: unknown): {
  success: boolean;
  data?: RevokeAllSessionsSchemaType;
  error?: z.ZodError;
} {
  const result = RevokeAllSessionsSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}
