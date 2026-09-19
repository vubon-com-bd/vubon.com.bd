import { SetMetadata } from '@nestjs/common';
import { MFA_REQUIRED_KEY } from '../guards/mfa.guard';

export const MfaRequired = (): MethodDecorator & ClassDecorator =>
  SetMetadata(MFA_REQUIRED_KEY, true);
