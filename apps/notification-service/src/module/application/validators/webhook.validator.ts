/**
 * WebhookValidator
 * @module notification-service/application/validators
 */
import {
  CreateWebhookRequestSchema,
  UpdateWebhookRequestSchema,
  TestWebhookRequestSchema,
} from '@vubon/shared-schemas/platform';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors';

interface ZodIssueLike { readonly path: (string | number)[]; readonly message: string; }
interface ZodErrorLike { readonly name?: string; readonly issues: readonly ZodIssueLike[]; }

function isZodError(e: unknown): e is ZodErrorLike {
  return typeof e === 'object' && e !== null && Array.isArray((e as ZodErrorLike).issues) && (e as { name?: string }).name === 'ZodError';
}

function zodToAppError(err: ZodErrorLike, scope: string): ApplicationValidationError {
  const first = err.issues[0];
  const path = first?.path?.join('.') ?? '';
  return new ApplicationValidationError(
    `[${scope}] ${first?.message ?? 'Invalid input'}`,
    path || undefined,
    err.issues.map((i) => ({ field: i.path.join('.'), message: i.message })),
  );
}

export class WebhookValidator {
  static validateCreate(input: unknown) {
    try { return CreateWebhookRequestSchema.parse(input); }
    catch (e) { if (isZodError(e)) throw zodToAppError(e, 'Webhook.create'); throw e; }
  }

  static validateUpdate(input: unknown) {
    try { return UpdateWebhookRequestSchema.parse(input); }
    catch (e) { if (isZodError(e)) throw zodToAppError(e, 'Webhook.update'); throw e; }
  }

  static validateTest(input: unknown) {
    try { return TestWebhookRequestSchema.parse(input); }
    catch (e) { if (isZodError(e)) throw zodToAppError(e, 'Webhook.test'); throw e; }
  }
}
