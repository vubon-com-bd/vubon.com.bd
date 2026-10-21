/**
 * @PaymentOwner() — marks route requiring owner check
 * @module payment-service/interfaces/decorators
 */
import { SetMetadata } from '@nestjs/common';

export const PAYMENT_OWNER_META_KEY = 'payment_owner_required';

export const PaymentOwner = (): MethodDecorator & ClassDecorator =>
  SetMetadata(PAYMENT_OWNER_META_KEY, true);
