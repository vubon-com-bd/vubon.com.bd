/**
 * VendorPayoutModule — payout + settlement + invoice
 * @module vendor-service/modules/vendor-payout
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

// ─── Controllers ───
import { VendorPayoutController } from '../../interfaces/controllers/rest/vendor-payout.controller.js';
import { VendorSettlementController } from '../../interfaces/controllers/rest/vendor-settlement.controller.js';
import { VendorInvoiceController } from '../../interfaces/controllers/rest/vendor-invoice.controller.js';

// ─── Services ───
import { VendorPayoutService } from '../../application/services/impl/vendor-payout.service.js';
import { VendorSettlementService } from '../../application/services/impl/vendor-settlement.service.js';
import { VendorInvoiceService } from '../../application/services/impl/vendor-invoice.service.js';

import { VENDOR_PAYOUT_SERVICE } from '../../application/services/interfaces/vendor-payout.service.interface.js';
import { VENDOR_SETTLEMENT_SERVICE } from '../../application/services/interfaces/vendor-settlement.service.interface.js';
import { VENDOR_INVOICE_SERVICE } from '../../application/services/interfaces/vendor-invoice.service.interface.js';

// ─── Guards ───
import { VendorOwnerGuard } from '../../interfaces/guards/vendor-owner.guard.js';

// ─── Payout command handlers ───
import {
  ConfigurePayoutHandler,
  RequestPayoutHandler,
  ApprovePayoutHandler,
  RejectPayoutHandler,
  ProcessPayoutHandler,
  MarkPayoutPaidHandler,
  FailPayoutHandler,
  CancelPayoutHandler,
  CreateSettlementHandler,
  CompleteSettlementHandler,
} from '../../application/commands/payout/index.js';

// ─── Invoice command handlers ───
import {
  CreateInvoiceHandler,
  SendInvoiceHandler,
  MarkInvoicePaidHandler,
} from '../../application/commands/commission/index.js';

// ─── Payout query handlers ───
import {
  GetPayoutHandler,
  ListPayoutsByVendorHandler,
  GetPayoutSummaryHandler,
} from '../../application/queries/payout/index.js';

// ─── Settlement query handlers ───
import {
  GetSettlementHandler,
  ListSettlementsByVendorHandler,
} from '../../application/queries/settlement/index.js';

// ─── Invoice query handlers ───
import {
  GetInvoiceHandler,
  ListInvoicesByVendorHandler,
} from '../../application/queries/invoice/index.js';

const SERVICES = [
  VendorPayoutService,
  VendorSettlementService,
  VendorInvoiceService,
  { provide: VENDOR_PAYOUT_SERVICE, useExisting: VendorPayoutService },
  { provide: VENDOR_SETTLEMENT_SERVICE, useExisting: VendorSettlementService },
  { provide: VENDOR_INVOICE_SERVICE, useExisting: VendorInvoiceService },
];

const COMMAND_HANDLERS = [
  // payout
  ConfigurePayoutHandler,
  RequestPayoutHandler,
  ApprovePayoutHandler,
  RejectPayoutHandler,
  ProcessPayoutHandler,
  MarkPayoutPaidHandler,
  FailPayoutHandler,
  CancelPayoutHandler,
  // settlement
  CreateSettlementHandler,
  CompleteSettlementHandler,
  // invoice
  CreateInvoiceHandler,
  SendInvoiceHandler,
  MarkInvoicePaidHandler,
];

const QUERY_HANDLERS = [
  // payout
  GetPayoutHandler,
  ListPayoutsByVendorHandler,
  GetPayoutSummaryHandler,
  // settlement
  GetSettlementHandler,
  ListSettlementsByVendorHandler,
  // invoice
  GetInvoiceHandler,
  ListInvoicesByVendorHandler,
];

@Module({
  imports: [CqrsModule],
  controllers: [
    VendorPayoutController,
    VendorSettlementController,
    VendorInvoiceController,
  ],
  providers: [
    ...SERVICES,
    ...COMMAND_HANDLERS,
    ...QUERY_HANDLERS,
    VendorOwnerGuard,
  ],
  exports: [
    VendorPayoutService,
    VENDOR_PAYOUT_SERVICE,
    VendorSettlementService,
    VENDOR_SETTLEMENT_SERVICE,
    VendorInvoiceService,
    VENDOR_INVOICE_SERVICE,
  ],
})
export class VendorPayoutModule {}
