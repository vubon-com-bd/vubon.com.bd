import {
  SubmitKycHandler,
  VerifyKycHandler,
  RejectKycHandler,
  ReverifyKycHandler,
} from '../../../application/commands/index.js';

export const USER_KYC_COMMAND_HANDLERS = [
  SubmitKycHandler,
  VerifyKycHandler,
  RejectKycHandler,
  ReverifyKycHandler,
] as const;
