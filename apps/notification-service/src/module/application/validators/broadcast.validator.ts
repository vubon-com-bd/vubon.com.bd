/**
 * BroadcastValidator — Zod schema-based validation
 * @module notification-service/application/validators
 */
import { ZodError } from 'zod';
import { NotificationBroadcastSchema } from '@vubon/shared-schemas/platform/notification';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';

function zodToAppError(err: ZodError, scope: string): ApplicationValidationError {
  const first = err.issues[0];
  const path = first?.path?.join('.') ?? '';
  return new ApplicationValidationError(
    `[${scope}] ${first?.message ?? 'Invalid input'}`,
    path || undefined,
    err.issues.map((i) => ({
      field: i.path.join('.'),
      message: i.message,
    })),
  );
}

export class BroadcastValidator {
  static validateBroadcast(input: unknown) {
    try {
      return NotificationBroadcastSchema.parse(input);
    } catch (e) {
      if (e instanceof ZodError) throw zodToAppError(e, 'Broadcast');
      throw e;
    }
  }

  static validateChannels(channels: unknown): readonly string[] {
    if (!Array.isArray(channels) || channels.length === 0) {
      throw new ApplicationValidationError(
        'Broadcast requires at least one channel',
        'channels',
      );
    }
    if (channels.length > 10) {
      throw new ApplicationValidationError(
        'Broadcast channels cannot exceed 10',
        'channels',
      );
    }
    return channels as readonly string[];
  }
}
