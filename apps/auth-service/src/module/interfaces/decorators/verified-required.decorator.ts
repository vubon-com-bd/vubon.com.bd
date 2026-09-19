import { SetMetadata } from '@nestjs/common';
import { VERIFIED_REQUIRED_KEY } from '../guards/verified.guard';

export const VerifiedRequired = (): MethodDecorator & ClassDecorator =>
  SetMetadata(VERIFIED_REQUIRED_KEY, true);
