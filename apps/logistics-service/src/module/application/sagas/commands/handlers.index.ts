import { NotifyCustomerHandler } from './notify-customer.handler.js';
import { NotifyVendorHandler } from './notify-vendor.handler.js';
import { ReserveInventoryHandler } from './reserve-inventory.handler.js';
import { ReleaseInventoryHandler } from './release-inventory.handler.js';
import { UpdateOrderStatusHandler } from './update-order-status.handler.js';
import { ProcessRefundHandler } from './process-refund.handler.js';
import { UpdateAnalyticsHandler } from './update-analytics.handler.js';
import { SendTrackingUpdateHandler } from './send-tracking-update.handler.js';

export const SAGA_COMMAND_HANDLERS = [
  NotifyCustomerHandler,
  NotifyVendorHandler,
  ReserveInventoryHandler,
  ReleaseInventoryHandler,
  UpdateOrderStatusHandler,
  ProcessRefundHandler,
  UpdateAnalyticsHandler,
  SendTrackingUpdateHandler,
] as const;
