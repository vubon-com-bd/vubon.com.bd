import type { ZodTypeAny, z } from 'zod';
import { ValidationError } from '../errors/validation-error';

/** Validate response using a Zod schema; throws ValidationError on failure. */
export function validateResponse<T extends ZodTypeAny>(schema: T, raw: unknown): z.infer<T> {
  const result = schema.safeParse(raw);
  if (!result.success) {
    throw new ValidationError('Response validation failed', result.error.issues);
  }
  return result.data;
}
