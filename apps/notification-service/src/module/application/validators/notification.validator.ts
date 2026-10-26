/**
 * NotificationValidator — Zod schema-based validation
 * @module notification-service/application/validators
 *
 * Uses shared-schemas as single source of truth।
 * ⚠️ Uses duck-typing check (not instanceof) — tolerant to multiple zod instances।
 */
import {
  SendNotificationRequestSchema,
  SendBulkNotificationRequestSchema,
  ResendNotificationRequestSchema,
  CancelNotificationRequestSchema,
} from '@vubon/shared-schemas/platform';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors';

interface ZodIssueLike {
  readonly path: (string | number)[];
  readonly message: string;
}

interface ZodErrorLike {
  readonly name?: string;
  readonly issues: readonly ZodIssueLike[];
}

function isZodError(e: unknown): e is ZodErrorLike {
  return (
    typeof e === 'object' &&
    e !== null &&
    Array.isArray((e as ZodErrorLike).issues) &&
    (e as { name?: string }).name === 'ZodError'
  );
}

function zodToAppError(err: ZodErrorLike, scope: string): ApplicationValidationError {
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

export class NotificationValidator {
  static validateSend(input: unknown) {
    try {
      return SendNotificationRequestSchema.parse(input);
    } catch (e) {
      if (isZodError(e)) throw zodToAppError(e, 'Notification.send');
      throw e;
    }
  }

  static validateSendBulk(input: unknown) {
    try {
      return SendBulkNotificationRequestSchema.parse(input);
    } catch (e) {
      if (isZodError(e)) throw zodToAppError(e, 'Notification.sendBulk');
      throw e;
    }
  }

  static validateResend(input: unknown) {
    try {
      return ResendNotificationRequestSchema.parse(input);
    } catch (e) {
      if (isZodError(e)) throw zodToAppError(e, 'Notification.resend');
      throw e;
    }
  }

  static validateCancel(input: unknown) {
    try {
      return CancelNotificationRequestSchema.parse(input);
    } catch (e) {
      if (isZodError(e)) throw zodToAppError(e, 'Notification.cancel');
      throw e;
    }
  }
}
