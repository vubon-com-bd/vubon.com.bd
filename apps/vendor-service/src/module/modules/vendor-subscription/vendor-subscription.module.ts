/**
 * VendorSubscriptionModule — subscription + commission
 * @module vendor-service/modules/vendor-subscription
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

// ─── Controllers ───
import { VendorSubscriptionController } from '../../interfaces/controllers/rest/vendor-subscription.controller.js';
import { VendorCommissionController } from '../../interfaces/controllers/rest/vendor-commission.controller.js';

// ─── Services ───
import { VendorSubscriptionService } from '../../application/services/impl/vendor-subscription.service.js';
import { VendorCommissionService } from '../../application/services/impl/vendor-commission.service.js';

import { VENDOR_SUBSCRIPTION_SERVICE } from '../../application/services/interfaces/vendor-subscription.service.interface.js';
import { VENDOR_COMMISSION_SERVICE } from '../../application/services/interfaces/vendor-commission.service.interface.js';

// ─── Guards ───
import { VendorOwnerGuard } from '../../interfaces/guards/vendor-owner.guard.js';

// ─── Subscription command handlers ───
import {
  CreateSubscriptionHandler,
  ChangeSubscriptionPlanHandler,
  CancelSubscriptionHandler,
  RenewSubscriptionHandler,
} from '../../application/commands/subscription/index.js';

// ─── Commission command handlers ───
import {
  ConfigureCommissionHandler,
  CalculateCommissionHandler,
} from '../../application/commands/commission/index.js';

// ─── Subscription query handlers ───
import {
  GetVendorSubscriptionHandler,
  GetVendorSubscriptionPublicHandler,
} from '../../application/queries/subscription/index.js';

// ─── Commission query handlers ───
import { GetActiveCommissionHandler } from '../../application/queries/commission/index.js';

const SERVICES = [
  VendorSubscriptionService,
  VendorCommissionService,
  { provide: VENDOR_SUBSCRIPTION_SERVICE, useExisting: VendorSubscriptionService },
  { provide: VENDOR_COMMISSION_SERVICE, useExisting: VendorCommissionService },
];

const COMMAND_HANDLERS = [
  // subscription
  CreateSubscriptionHandler,
  ChangeSubscriptionPlanHandler,
  CancelSubscriptionHandler,
  RenewSubscriptionHandler,
  // commission
  ConfigureCommissionHandler,
  CalculateCommissionHandler,
];

const QUERY_HANDLERS = [
  // subscription
  GetVendorSubscriptionHandler,
  GetVendorSubscriptionPublicHandler,
  // commission
  GetActiveCommissionHandler,
];

@Module({
  imports: [CqrsModule],
  controllers: [
    VendorSubscriptionController,
    VendorCommissionController,
  ],
  providers: [
    ...SERVICES,
    ...COMMAND_HANDLERS,
    ...QUERY_HANDLERS,
    VendorOwnerGuard,
  ],
  exports: [
    VendorSubscriptionService,
    VENDOR_SUBSCRIPTION_SERVICE,
    VendorCommissionService,
    VENDOR_COMMISSION_SERVICE,
  ],
})
export class VendorSubscriptionModule {}
