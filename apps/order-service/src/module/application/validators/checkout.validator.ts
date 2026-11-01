/**
 * CheckoutValidator — Zod schema-based validation
 * @module order-service/application/validators
 */
import {
  StartCheckoutRequestSchema,
  SelectAddressRequestSchema,
  SelectShippingRequestSchema,
  ConfirmOrderRequestSchema,
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

export class CheckoutValidator {
  static validateStart(input: unknown) {
    try {
      return StartCheckoutRequestSchema.parse(input);
    } catch (e) {
      if (isZodError(e)) throw zodToAppError(e, 'Checkout.start');
      throw e;
    }
  }

  static validateSelectAddress(input: unknown) {
    try {
      return SelectAddressRequestSchema.parse(input);
    } catch (e) {
      if (isZodError(e)) throw zodToAppError(e, 'Checkout.selectAddress');
      throw e;
    }
  }

  static validateSelectShipping(input: unknown) {
    try {
      return SelectShippingRequestSchema.parse(input);
    } catch (e) {
      if (isZodError(e)) throw zodToAppError(e, 'Checkout.selectShipping');
      throw e;
    }
  }

  static validateConfirm(input: unknown) {
    try {
      return ConfirmOrderRequestSchema.parse(input);
    } catch (e) {
      if (isZodError(e)) throw zodToAppError(e, 'Checkout.confirm');
      throw e;
    }
  }
}
