import {
  GetUserKycStatusHandler,
  GetKycStatusQueryHandler,
} from '../../../application/queries/index.js';

export const USER_KYC_QUERY_HANDLERS = [
  GetUserKycStatusHandler,
  GetKycStatusQueryHandler,
] as const;
