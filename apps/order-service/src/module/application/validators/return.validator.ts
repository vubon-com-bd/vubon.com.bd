/**
 * ReturnValidator — Zod schema-based validation
 * @module order-service/application/validators
 */
import {
  RequestReturnRequestSchema,
  ApproveReturnRequestSchema,
  RejectReturnRequestSchema,
  CompleteReturnRequestSchema,
  RequestCancelRequestSchema,
  ApproveCancelRequestSchema,
  RejectCancelRequestSchema,
} from '@vubon/shared-schemas/business';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';

interface ZodLikeError {
  readonly issues: readonly {
    readonly path: readonly (string | number)[];
    readonly message: string;
  }[];
}

function isZodError(e: unknown): e is ZodLikeError {
  return (
    e !== null &&
    typeof e === 'object' &&
    'issues' in e &&
    Array.isArray((e as { issues: unknown }).issues)
  );
}

function zodToAppError(err: ZodLikeError, scope: string): ApplicationValidationError {
  const first = err.issues[0];
  const path = first?.path?.join('.') ?? '';
  return new ApplicationValidationError(
    `[${scope}] ${first?.message ?? 'Invalid input'}`,
    path || undefined,
    err.issues.map((i) => ({ field: i.path.join('.'), message: i.message })),
  );
}

export class ReturnValidator {
  static validateRequestReturn(input: unknown) {
    try {
      return RequestReturnRequestSchema.parse(input);
    } catch (e) {
      if (isZodError(e)) throw zodToAppError(e, 'Return.request');
      throw e;
    }
  }

  static validateApproveReturn(input: unknown) {
    try {
      return ApproveReturnRequestSchema.parse(input);
    } catch (e) {
      if (isZodError(e)) throw zodToAppError(e, 'Return.approve');
      throw e;
    }
  }

  static validateRejectReturn(input: unknown) {
    try {
      return RejectReturnRequestSchema.parse(input);
    } catch (e) {
      if (isZodError(e)) throw zodToAppError(e, 'Return.reject');
      throw e;
    }
  }

  static validateCompleteReturn(input: unknown) {
    try {
      return CompleteReturnRequestSchema.parse(input);
    } catch (e) {
      if (isZodError(e)) throw zodToAppError(e, 'Return.complete');
      throw e;
    }
  }

  static validateRequestCancel(input: unknown) {
    try {
      return RequestCancelRequestSchema.parse(input);
    } catch (e) {
      if (isZodError(e)) throw zodToAppError(e, 'Cancel.request');
      throw e;
    }
  }

  static validateApproveCancel(input: unknown) {
    try {
      return ApproveCancelRequestSchema.parse(input);
    } catch (e) {
      if (isZodError(e)) throw zodToAppError(e, 'Cancel.approve');
      throw e;
    }
  }

  static validateRejectCancel(input: unknown) {
    try {
      return RejectCancelRequestSchema.parse(input);
    } catch (e) {
      if (isZodError(e)) throw zodToAppError(e, 'Cancel.reject');
      throw e;
    }
  }
}
