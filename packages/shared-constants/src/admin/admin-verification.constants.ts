import { VERIFICATION as COMMON_VERIFICATION } from '../common/verification.constants';

export const ADMIN_VERIFICATION = {
  ...COMMON_VERIFICATION,
  IDENTITY: 'identity',
  BACKGROUND_CHECK: 'background_check',
} as const;
