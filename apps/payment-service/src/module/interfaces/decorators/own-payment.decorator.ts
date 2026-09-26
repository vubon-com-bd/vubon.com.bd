import { SetMetadata } from '@nestjs/common';

export const OWN_PAYMENT_KEY = 'ownPayment';

export const OwnPayment = (): MethodDecorator & ClassDecorator =>
  SetMetadata(OWN_PAYMENT_KEY, true);
