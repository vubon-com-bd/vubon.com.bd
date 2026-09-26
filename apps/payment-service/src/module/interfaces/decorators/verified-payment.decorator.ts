import { SetMetadata } from '@nestjs/common';

export const VERIFIED_PAYMENT_KEY = 'verifiedPayment';

export const VerifiedPayment = (): MethodDecorator & ClassDecorator =>
  SetMetadata(VERIFIED_PAYMENT_KEY, true);
