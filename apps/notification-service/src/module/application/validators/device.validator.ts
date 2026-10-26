/**
 * DeviceValidator
 * @module notification-service/application/validators
 */
import {
  RegisterNotificationDeviceRequestSchema,
  UpdateNotificationDeviceTokenRequestSchema,
  UnregisterNotificationDeviceRequestSchema,
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

export class DeviceValidator {
  static validateRegister(input: unknown) {
    try { return RegisterNotificationDeviceRequestSchema.parse(input); }
    catch (e) { if (isZodError(e)) throw zodToAppError(e, 'Device.register'); throw e; }
  }

  static validateUpdateToken(input: unknown) {
    try { return UpdateNotificationDeviceTokenRequestSchema.parse(input); }
    catch (e) { if (isZodError(e)) throw zodToAppError(e, 'Device.updateToken'); throw e; }
  }

  static validateUnregister(input: unknown) {
    try { return UnregisterNotificationDeviceRequestSchema.parse(input); }
    catch (e) { if (isZodError(e)) throw zodToAppError(e, 'Device.unregister'); throw e; }
  }
}
