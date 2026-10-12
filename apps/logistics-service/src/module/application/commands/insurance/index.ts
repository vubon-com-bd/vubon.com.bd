// commands/insurance/index.ts
export * from './purchase-insurance.command.js'; export * from './purchase-insurance.handler.js';
export * from './activate-insurance.command.js'; export * from './activate-insurance.handler.js';
export * from './expire-insurance.command.js'; export * from './expire-insurance.handler.js';
export * from './cancel-insurance.command.js'; export * from './cancel-insurance.handler.js';
export * from './file-insurance-claim.command.js'; export * from './file-insurance-claim.handler.js';
export * from './start-claim-review.command.js'; export * from './start-claim-review.handler.js';
export * from './approve-claim.command.js'; export * from './approve-claim.handler.js';
export * from './reject-claim.command.js'; export * from './reject-claim.handler.js';
export * from './pay-claim.command.js'; export * from './pay-claim.handler.js';
export * from './appeal-claim.command.js'; export * from './appeal-claim.handler.js';

import { PurchaseInsuranceHandler } from './purchase-insurance.handler.js';
import { ActivateInsuranceHandler } from './activate-insurance.handler.js';
import { ExpireInsuranceHandler } from './expire-insurance.handler.js';
import { CancelInsuranceHandler } from './cancel-insurance.handler.js';
import { FileInsuranceClaimHandler } from './file-insurance-claim.handler.js';
import { StartClaimReviewHandler } from './start-claim-review.handler.js';
import { ApproveClaimHandler } from './approve-claim.handler.js';
import { RejectClaimHandler } from './reject-claim.handler.js';
import { PayClaimHandler } from './pay-claim.handler.js';
import { AppealClaimHandler } from './appeal-claim.handler.js';

export const INSURANCE_COMMAND_HANDLERS = [
  PurchaseInsuranceHandler, ActivateInsuranceHandler, ExpireInsuranceHandler, CancelInsuranceHandler,
  FileInsuranceClaimHandler, StartClaimReviewHandler, ApproveClaimHandler, RejectClaimHandler,
  PayClaimHandler, AppealClaimHandler,
] as const;
