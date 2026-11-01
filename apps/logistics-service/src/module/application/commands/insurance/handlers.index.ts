import { CreateInsuranceHandler } from './create-insurance.handler.js';
import { ActivateInsuranceHandler } from './activate.handler.js';
import { ExpireInsuranceHandler } from './expire.handler.js';
import { CancelInsuranceHandler } from './cancel.handler.js';
import { SubmitClaimInsuranceHandler } from './submit-claim.handler.js';
import { ReviewClaimInsuranceHandler } from './review-claim.handler.js';
import { ApproveClaimInsuranceHandler } from './approve-claim.handler.js';
import { RejectClaimInsuranceHandler } from './reject-claim.handler.js';
import { PayClaimInsuranceHandler } from './pay-claim.handler.js';

export const INSURANCE_COMMAND_HANDLERS = [
  CreateInsuranceHandler,
  ActivateInsuranceHandler,
  ExpireInsuranceHandler,
  CancelInsuranceHandler,
  SubmitClaimInsuranceHandler,
  ReviewClaimInsuranceHandler,
  ApproveClaimInsuranceHandler,
  RejectClaimInsuranceHandler,
  PayClaimInsuranceHandler,
] as const;
