/**
 * ReturnValidator
 */
import {
  RequestReturnRequestSchema,
  ApproveReturnRequestSchema,
  RejectReturnRequestSchema,
  CompleteReturnRequestSchema,
} from '@vubon/shared-schemas/business/order';
import { ZodError } from 'zod';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';

function zodToAppError(err: ZodError, scope: string): ApplicationValidationError {
  const first = err.issues[0];
  return new ApplicationValidationError(
    `[${scope}] ${first?.message ?? 'Invalid input'}`,
    first?.path?.join('.') || undefined,
    err.issues.map((i) => ({ field: i.path.join('.'), message: i.message })),
  );
}

export class ReturnValidator {
  static validateRequest(input: unknown) {
    try { return RequestReturnRequestSchema.parse(input); }
    catch (e) { if (e instanceof ZodError) throw zodToAppError(e, 'Return.request'); throw e; }
  }
  static validateApprove(input: unknown) {
    try { return ApproveReturnRequestSchema.parse(input); }
    catch (e) { if (e instanceof ZodError) throw zodToAppError(e, 'Return.approve'); throw e; }
  }
  static validateReject(input: unknown) {
    try { return RejectReturnRequestSchema.parse(input); }
    catch (e) { if (e instanceof ZodError) throw zodToAppError(e, 'Return.reject'); throw e; }
  }
  static validateComplete(input: unknown) {
    try { return CompleteReturnRequestSchema.parse(input); }
    catch (e) { if (e instanceof ZodError) throw zodToAppError(e, 'Return.complete'); throw e; }
  }
}
