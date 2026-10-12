/**
 * VendorCoreModule — vendor aggregate root feature wiring
 * @module vendor-service/modules/vendor-core
 *
 * Wires:
 *  - VendorController + VendorPublicController
 *  - VendorService, VendorProfileService, VendorSlugService, VendorSearchService
 *  - Vendor commands & handlers (register/update/lifecycle/approval)
 *  - Vendor queries & handlers (get/list/search/stats/slug)
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

// ─── Controllers ───
import { VendorController } from '../../interfaces/controllers/rest/vendor.controller.js';
import { VendorPublicController } from '../../interfaces/controllers/rest/vendor-public.controller.js';

// ─── Services (impl) ───
import { VendorService } from '../../application/services/impl/vendor.service.js';
import { VendorProfileService } from '../../application/services/impl/vendor-profile.service.js';
import { VendorSlugService } from '../../application/services/impl/vendor-slug.service.js';
import { VendorSearchService } from '../../application/services/impl/vendor-search.service.js';

// ─── Service tokens ───
import { VENDOR_SERVICE } from '../../application/services/interfaces/vendor.service.interface.js';
import { VENDOR_PROFILE_SERVICE } from '../../application/services/interfaces/vendor-profile.service.interface.js';
import { VENDOR_SLUG_SERVICE } from '../../application/services/interfaces/vendor-slug.service.interface.js';
import { VENDOR_SEARCH_SERVICE } from '../../application/services/interfaces/vendor-search.service.interface.js';

// ─── Guards ───
import { VendorOwnerGuard } from '../../interfaces/guards/vendor-owner.guard.js';
import { VendorStatusGuard } from '../../interfaces/guards/vendor-status.guard.js';
import { VendorTierGuard } from '../../interfaces/guards/vendor-tier.guard.js';

// ─── Command handlers ───
import {
  RegisterVendorHandler,
  UpdateVendorHandler,
  UpdateVendorProfileHandler,
  UpdateVendorBusinessHandler,
  ApproveVendorHandler,
  RejectVendorHandler,
  DeleteVendorHandler,
} from '../../application/commands/vendor/index.js';
import {
  ActivateVendorHandler,
  DeactivateVendorHandler,
  SuspendVendorHandler,
  ReinstateVendorHandler,
} from '../../application/commands/lifecycle/index.js';

// ─── Query handlers ───
import {
  GetVendorHandler,
  GetVendorPublicHandler,
  GetVendorBySlugHandler,
  GetVendorSummaryHandler,
  ListVendorsHandler,
  GetVendorStatsHandler,
  SearchVendorsHandler,
  FindTopRatedVendorsHandler,
  FindFeaturedVendorsHandler,
  CheckVendorSlugHandler,
  SuggestVendorSlugHandler,
} from '../../application/queries/vendor/index.js';

const COMMAND_HANDLERS = [
  RegisterVendorHandler,
  UpdateVendorHandler,
  UpdateVendorProfileHandler,
  UpdateVendorBusinessHandler,
  ApproveVendorHandler,
  RejectVendorHandler,
  DeleteVendorHandler,
  ActivateVendorHandler,
  DeactivateVendorHandler,
  SuspendVendorHandler,
  ReinstateVendorHandler,
];

const QUERY_HANDLERS = [
  GetVendorHandler,
  GetVendorPublicHandler,
  GetVendorBySlugHandler,
  GetVendorSummaryHandler,
  ListVendorsHandler,
  GetVendorStatsHandler,
  SearchVendorsHandler,
  FindTopRatedVendorsHandler,
  FindFeaturedVendorsHandler,
  CheckVendorSlugHandler,
  SuggestVendorSlugHandler,
];

const SERVICES = [
  VendorService,
  VendorProfileService,
  VendorSlugService,
  VendorSearchService,
  { provide: VENDOR_SERVICE, useExisting: VendorService },
  { provide: VENDOR_PROFILE_SERVICE, useExisting: VendorProfileService },
  { provide: VENDOR_SLUG_SERVICE, useExisting: VendorSlugService },
  { provide: VENDOR_SEARCH_SERVICE, useExisting: VendorSearchService },
];

@Module({
  imports: [CqrsModule],
  controllers: [VendorController, VendorPublicController],
  providers: [
    ...SERVICES,
    ...COMMAND_HANDLERS,
    ...QUERY_HANDLERS,
    VendorOwnerGuard,
    VendorStatusGuard,
    VendorTierGuard,
  ],
  exports: [
    VendorService,
    VENDOR_SERVICE,
    VendorProfileService,
    VENDOR_PROFILE_SERVICE,
    VendorSlugService,
    VENDOR_SLUG_SERVICE,
    VendorSearchService,
    VENDOR_SEARCH_SERVICE,
  ],
})
export class VendorCoreModule {}
