/**
 * @MfaRequired — marks a route as requiring verified MFA
 * @module auth-service/interfaces/decorators
 */
import { SetMetadata } from '@nestjs/common';

export const MFA_REQUIRED_KEY = 'auth:mfaRequired';

export const MfaRequired = () => SetMetadata(MFA_REQUIRED_KEY, true);
