import { PERMISSIONS as COMMON_PERMISSIONS } from '../common/permissions.constants';
import { ADMIN_PERMISSIONS } from '../admin/admin-permission.constants';
import { VENDOR_PERMISSION } from '../business/vendor/vendor-permission.constants';

export const LOGISTICS_PERMISSION = {
  ...COMMON_PERMISSIONS,
  ...ADMIN_PERMISSIONS,
  ...VENDOR_PERMISSION,

  // Shipment Management
  SHIPMENT_VIEW: 'shipment:view',
  SHIPMENT_CREATE: 'shipment:create',
  SHIPMENT_UPDATE: 'shipment:update',
  SHIPMENT_DELETE: 'shipment:delete',
  SHIPMENT_MANAGE: 'shipment:manage',

  // Delivery Management
  DELIVERY_VIEW: 'delivery:view',
  DELIVERY_ASSIGN: 'delivery:assign',
  DELIVERY_TRACK: 'delivery:track',
  DELIVERY_COMPLETE: 'delivery:complete',

  // Courier Management
  COURIER_VIEW: 'courier:view',
  COURIER_MANAGE: 'courier:manage',
  COURIER_ASSIGN: 'courier:assign',

  // Warehouse Management
  WAREHOUSE_VIEW: 'warehouse:view',
  WAREHOUSE_MANAGE: 'warehouse:manage',
  WAREHOUSE_INVENTORY: 'warehouse:inventory',

  // Fulfillment
  FULFILLMENT_VIEW: 'fulfillment:view',
  FULFILLMENT_PROCESS: 'fulfillment:process',
  FULFILLMENT_MANAGE: 'fulfillment:manage',

  // Dispatch
  DISPATCH_VIEW: 'dispatch:view',
  DISPATCH_CREATE: 'dispatch:create',
  DISPATCH_MANAGE: 'dispatch:manage',

  // Vehicle & Driver
  VEHICLE_VIEW: 'vehicle:view',
  VEHICLE_MANAGE: 'vehicle:manage',
  DRIVER_VIEW: 'driver:view',
  DRIVER_MANAGE: 'driver:manage',

  // Returns
  RETURN_SHIPMENT_VIEW: 'return_shipment:view',
  RETURN_SHIPMENT_PROCESS: 'return_shipment:process',
  RETURN_SHIPMENT_MANAGE: 'return_shipment:manage',

  // Analytics & Reports
  LOGISTICS_ANALYTICS_VIEW: 'logistics_analytics:view',
  LOGISTICS_REPORT_VIEW: 'logistics_report:view',
} as const;
