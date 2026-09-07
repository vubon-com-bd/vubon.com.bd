import { AUTH_MFA } from '@vubon/shared-constants';
import { AuthMfa } from './auth-mfa.types';

export interface Auth2FA extends AuthMfa {
  type: keyof typeof AUTH_MFA;
  phoneNumber?: string;
  emailAddress?: string;
  isPrimary: boolean;
  recoveryCodes: string[];
}
