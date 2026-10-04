/**
 * @PaymentOwner() — metadata key to mark routes that require payment ownership
 * @module payment-service/interfaces/decorators
 */
import { SetMetadata } from '@nestjs/common';

export const PAYMENT_OWNER_METADATA_KEY = 'paymentOwner';

export const PaymentOwner = (): MethodDecorator & ClassDecorator =>
  SetMetadata(PAYMENT_OWNER_METADATA_KEY, true);
