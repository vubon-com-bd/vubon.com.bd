/**
 * VendorOnboardingModule — document, verification, approval, suspension
 * @module vendor-service/modules/vendor-onboarding
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

// ─── Controllers ───
import { VendorDocumentController } from '../../interfaces/controllers/rest/vendor-document.controller.js';
import { VendorVerificationController } from '../../interfaces/controllers/rest/vendor-verification.controller.js';
import { VendorApprovalController } from '../../interfaces/controllers/rest/vendor-approval.controller.js';
import { VendorSuspensionController } from '../../interfaces/controllers/rest/vendor-suspension.controller.js';

// ─── Services ───
import { VendorDocumentService } from '../../application/services/impl/vendor-document.service.js';
import { VendorVerificationService } from '../../application/services/impl/vendor-verification.service.js';
import { VendorApprovalService } from '../../application/services/impl/vendor-approval.service.js';
import { VendorSuspensionService } from '../../application/services/impl/vendor-suspension.service.js';

// ─── Service tokens ───
import { VENDOR_DOCUMENT_SERVICE } from '../../application/services/interfaces/vendor-document.service.interface.js';
import { VENDOR_VERIFICATION_SERVICE } from '../../application/services/interfaces/vendor-verification.service.interface.js';
import { VENDOR_APPROVAL_SERVICE } from '../../application/services/interfaces/vendor-approval.service.interface.js';
import { VENDOR_SUSPENSION_SERVICE } from '../../application/services/interfaces/vendor-suspension.service.interface.js';

// ─── Guards (reuse) ───
import { VendorOwnerGuard } from '../../interfaces/guards/vendor-owner.guard.js';

// ─── Document handlers ───
import {
  UploadVendorDocumentHandler,
  VerifyVendorDocumentHandler,
  RejectVendorDocumentHandler,
} from '../../application/commands/document/index.js';
import {
  GetVendorDocumentHandler,
  ListVendorDocumentsHandler,
  ListPublicDocumentsHandler,
} from '../../application/queries/document/index.js';

// ─── Verification handlers ───
import {
  SubmitVerificationHandler,
  ApproveVerificationHandler,
} from '../../application/commands/verification/index.js';
import { GetVendorVerificationHandler } from '../../application/queries/verification/index.js';

// ─── Approval handlers ───
import {
  ApproveVendorApprovalHandler,
  RejectVendorApprovalHandler,
  ResubmitApprovalHandler,
} from '../../application/commands/approval/index.js';
import { GetVendorApprovalHandler } from '../../application/queries/approval/index.js';

// ─── Suspension queries (direct import — not in vendor barrel) ───
import { GetSuspensionHandler } from '../../application/queries/vendor/get-suspension.handler.js';
import { GetActiveSuspensionHandler } from '../../application/queries/vendor/get-active-suspension.handler.js';
import { ListSuspensionsHandler } from '../../application/queries/vendor/list-suspensions.handler.js';

const SERVICES = [
  VendorDocumentService,
  VendorVerificationService,
  VendorApprovalService,
  VendorSuspensionService,
  { provide: VENDOR_DOCUMENT_SERVICE, useExisting: VendorDocumentService },
  { provide: VENDOR_VERIFICATION_SERVICE, useExisting: VendorVerificationService },
  { provide: VENDOR_APPROVAL_SERVICE, useExisting: VendorApprovalService },
  { provide: VENDOR_SUSPENSION_SERVICE, useExisting: VendorSuspensionService },
];

const COMMAND_HANDLERS = [
  // document
  UploadVendorDocumentHandler,
  VerifyVendorDocumentHandler,
  RejectVendorDocumentHandler,
  // verification
  SubmitVerificationHandler,
  ApproveVerificationHandler,
  // approval
  ApproveVendorApprovalHandler,
  RejectVendorApprovalHandler,
  ResubmitApprovalHandler,
];

const QUERY_HANDLERS = [
  // document
  GetVendorDocumentHandler,
  ListVendorDocumentsHandler,
  ListPublicDocumentsHandler,
  // verification
  GetVendorVerificationHandler,
  // approval
  GetVendorApprovalHandler,
  // suspension
  GetSuspensionHandler,
  GetActiveSuspensionHandler,
  ListSuspensionsHandler,
];

@Module({
  imports: [CqrsModule],
  controllers: [
    VendorDocumentController,
    VendorVerificationController,
    VendorApprovalController,
    VendorSuspensionController,
  ],
  providers: [
    ...SERVICES,
    ...COMMAND_HANDLERS,
    ...QUERY_HANDLERS,
    VendorOwnerGuard,
  ],
  exports: [
    VendorDocumentService,
    VENDOR_DOCUMENT_SERVICE,
    VendorVerificationService,
    VENDOR_VERIFICATION_SERVICE,
    VendorApprovalService,
    VENDOR_APPROVAL_SERVICE,
    VendorSuspensionService,
    VENDOR_SUSPENSION_SERVICE,
  ],
})
export class VendorOnboardingModule {}
