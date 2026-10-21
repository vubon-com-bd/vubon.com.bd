/**
 * @VerifiedPayment() — marks route requiring verified (successful) payment
 * @module payment-service/interfaces/decorators
 */
import { SetMetadata } from '@nestjs/common';

export const VERIFIED_PAYMENT_META_KEY = 'verified_payment_required';

export const VerifiedPayment = (): MethodDecorator & ClassDecorator =>
  SetMetadata(VERIFIED_PAYMENT_META_KEY, true);
