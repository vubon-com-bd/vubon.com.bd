import { SetMetadata } from '@nestjs/common';

export const MFA_REQUIRED_KEY = 'mfaRequired';

/** Mark a route as requiring MFA to be completed. */
export const MfaRequired = (methods: readonly string[] = []): MethodDecorator & ClassDecorator =>
  SetMetadata(MFA_REQUIRED_KEY, methods);
