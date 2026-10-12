/**
 * VendorOperationalModule — shipping, warranty, return policy, settings, stats, report
 * @module vendor-service/modules/vendor-operational
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

// ─── Controllers ───
import { VendorShippingController } from '../../interfaces/controllers/rest/vendor-shipping.controller.js';
import { VendorWarrantyController } from '../../interfaces/controllers/rest/vendor-warranty.controller.js';
import { VendorReturnPolicyController } from '../../interfaces/controllers/rest/vendor-return-policy.controller.js';
import { VendorSettingsController } from '../../interfaces/controllers/rest/vendor-settings.controller.js';
import { VendorStatsController } from '../../interfaces/controllers/rest/vendor-stats.controller.js';
import { VendorReportController } from '../../interfaces/controllers/rest/vendor-report.controller.js';

// ─── Services ───
import { VendorShippingService } from '../../application/services/impl/vendor-shipping.service.js';
import { VendorWarrantyService } from '../../application/services/impl/vendor-warranty.service.js';
import { VendorReturnPolicyService } from '../../application/services/impl/vendor-return-policy.service.js';
import { VendorSettingsService } from '../../application/services/impl/vendor-settings.service.js';
import { VendorStatsService } from '../../application/services/impl/vendor-stats.service.js';
import { VendorReportService } from '../../application/services/impl/vendor-report.service.js';

import { VENDOR_SHIPPING_SERVICE } from '../../application/services/interfaces/vendor-shipping.service.interface.js';
import { VENDOR_WARRANTY_SERVICE } from '../../application/services/interfaces/vendor-warranty.service.interface.js';
import { VENDOR_RETURN_POLICY_SERVICE } from '../../application/services/interfaces/vendor-return-policy.service.interface.js';
import { VENDOR_SETTINGS_SERVICE } from '../../application/services/interfaces/vendor-settings.service.interface.js';
import { VENDOR_STATS_SERVICE } from '../../application/services/interfaces/vendor-stats.service.interface.js';
import { VENDOR_REPORT_SERVICE } from '../../application/services/interfaces/vendor-report.service.interface.js';

// ─── Guards ───
import { VendorOwnerGuard } from '../../interfaces/guards/vendor-owner.guard.js';

// ─── Shipping command handlers ───
import {
  InitializeShippingHandler,
  AddShippingRateHandler,
  RemoveShippingRateHandler,
  SetFreeShippingThresholdHandler,
} from '../../application/commands/shipping/index.js';

// ─── Warranty command handlers ───
import {
  InitializeWarrantyHandler,
  UpdateWarrantyTypeHandler,
  UpdateWarrantyPeriodHandler,
  AddWarrantyExclusionHandler,
  RemoveWarrantyExclusionHandler,
} from '../../application/commands/warranty/index.js';

// ─── Return policy command handlers ───
import {
  InitializeReturnPolicyHandler,
  UpdateReturnTypeHandler,
  UpdateReturnWindowHandler,
  AddReturnExclusionHandler,
} from '../../application/commands/return-policy/index.js';

// ─── Settings command handlers ───
import {
  InitializeVendorSettingsHandler,
  SetVacationModeHandler,
  SetAutoAcceptOrdersHandler,
  SetAutoPayoutHandler,
  UpdateNotificationsHandler,
  UpdateLocaleHandler,
} from '../../application/commands/settings/index.js';

// ─── Stats command handlers ───
import {
  InitializeStatsPeriodHandler,
  RecordOrderStatsHandler,
} from '../../application/commands/stats/index.js';

// ─── Report command handlers ───
import {
  RequestReportHandler,
  MarkReportReadyHandler,
  MarkReportFailedHandler,
} from '../../application/commands/report/index.js';

// ─── Shipping query handlers ───
import {
  GetVendorShippingHandler,
  CalculateShippingHandler,
} from '../../application/queries/shipping/index.js';

// ─── Warranty query handlers ───
import { GetVendorWarrantyHandler } from '../../application/queries/warranty/index.js';

// ─── Return policy query handlers ───
import {
  GetVendorReturnPolicyHandler,
  CheckReturnEligibilityHandler,
} from '../../application/queries/return-policy/index.js';

// ─── Settings query handlers ───
import { GetVendorSettingsHandler } from '../../application/queries/settings/index.js';

// ─── Stats query handlers ───
import { GetLatestVendorStatsHandler } from '../../application/queries/stats/index.js';

// ─── Report query handlers ───
import {
  GetVendorReportHandler,
  ListVendorReportsHandler,
} from '../../application/queries/report/index.js';

const SERVICES = [
  VendorShippingService,
  VendorWarrantyService,
  VendorReturnPolicyService,
  VendorSettingsService,
  VendorStatsService,
  VendorReportService,
  { provide: VENDOR_SHIPPING_SERVICE, useExisting: VendorShippingService },
  { provide: VENDOR_WARRANTY_SERVICE, useExisting: VendorWarrantyService },
  { provide: VENDOR_RETURN_POLICY_SERVICE, useExisting: VendorReturnPolicyService },
  { provide: VENDOR_SETTINGS_SERVICE, useExisting: VendorSettingsService },
  { provide: VENDOR_STATS_SERVICE, useExisting: VendorStatsService },
  { provide: VENDOR_REPORT_SERVICE, useExisting: VendorReportService },
];

const COMMAND_HANDLERS = [
  // shipping
  InitializeShippingHandler,
  AddShippingRateHandler,
  RemoveShippingRateHandler,
  SetFreeShippingThresholdHandler,
  // warranty
  InitializeWarrantyHandler,
  UpdateWarrantyTypeHandler,
  UpdateWarrantyPeriodHandler,
  AddWarrantyExclusionHandler,
  RemoveWarrantyExclusionHandler,
  // return policy
  InitializeReturnPolicyHandler,
  UpdateReturnTypeHandler,
  UpdateReturnWindowHandler,
  AddReturnExclusionHandler,
  // settings
  InitializeVendorSettingsHandler,
  SetVacationModeHandler,
  SetAutoAcceptOrdersHandler,
  SetAutoPayoutHandler,
  UpdateNotificationsHandler,
  UpdateLocaleHandler,
  // stats
  InitializeStatsPeriodHandler,
  RecordOrderStatsHandler,
  // report
  RequestReportHandler,
  MarkReportReadyHandler,
  MarkReportFailedHandler,
];

const QUERY_HANDLERS = [
  // shipping
  GetVendorShippingHandler,
  CalculateShippingHandler,
  // warranty
  GetVendorWarrantyHandler,
  // return policy
  GetVendorReturnPolicyHandler,
  CheckReturnEligibilityHandler,
  // settings
  GetVendorSettingsHandler,
  // stats
  GetLatestVendorStatsHandler,
  // report
  GetVendorReportHandler,
  ListVendorReportsHandler,
];

@Module({
  imports: [CqrsModule],
  controllers: [
    VendorShippingController,
    VendorWarrantyController,
    VendorReturnPolicyController,
    VendorSettingsController,
    VendorStatsController,
    VendorReportController,
  ],
  providers: [
    ...SERVICES,
    ...COMMAND_HANDLERS,
    ...QUERY_HANDLERS,
    VendorOwnerGuard,
  ],
  exports: [
    VendorShippingService,
    VENDOR_SHIPPING_SERVICE,
    VendorWarrantyService,
    VENDOR_WARRANTY_SERVICE,
    VendorReturnPolicyService,
    VENDOR_RETURN_POLICY_SERVICE,
    VendorSettingsService,
    VENDOR_SETTINGS_SERVICE,
    VendorStatsService,
    VENDOR_STATS_SERVICE,
    VendorReportService,
    VENDOR_REPORT_SERVICE,
  ],
})
export class VendorOperationalModule {}
