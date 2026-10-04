// Note: Cannot import from higher layer (layer isolation) — hardcode + comment
export const LOGISTICS_PERMISSION = {
  SHIPMENT_VIEW: 'logistics:shipment:view',
  SHIPMENT_CREATE: 'logistics:shipment:create',
  SHIPMENT_UPDATE: 'logistics:shipment:update',
  SHIPMENT_DELETE: 'logistics:shipment:delete',
  SHIPMENT_CANCEL: 'logistics:shipment:cancel',
  SHIPMENT_DISPATCH: 'logistics:shipment:dispatch',

  DELIVERY_VIEW: 'logistics:delivery:view',
  DELIVERY_MANAGE: 'logistics:delivery:manage',
  DELIVERY_ASSIGN: 'logistics:delivery:assign',
  DELIVERY_UPDATE: 'logistics:delivery:update',
  DELIVERY_COMPLETE: 'logistics:delivery:complete',
  DELIVERY_FAIL: 'logistics:delivery:fail',

  COURIER_VIEW: 'logistics:courier:view',
  COURIER_MANAGE: 'logistics:courier:manage',
  COURIER_INTEGRATE: 'logistics:courier:integrate',

  TRACKING_VIEW: 'logistics:tracking:view',
  TRACKING_MANAGE: 'logistics:tracking:manage',

  WAREHOUSE_VIEW: 'logistics:warehouse:view',
  WAREHOUSE_MANAGE: 'logistics:warehouse:manage',
  WAREHOUSE_STOCK: 'logistics:warehouse:stock',

  FULFILLMENT_VIEW: 'logistics:fulfillment:view',
  FULFILLMENT_MANAGE: 'logistics:fulfillment:manage',
  FULFILLMENT_PROCESS: 'logistics:fulfillment:process',

  DISPATCH_VIEW: 'logistics:dispatch:view',
  DISPATCH_MANAGE: 'logistics:dispatch:manage',
  DISPATCH_BULK: 'logistics:dispatch:bulk',

  VEHICLE_VIEW: 'logistics:vehicle:view',
  VEHICLE_MANAGE: 'logistics:vehicle:manage',
  VEHICLE_ASSIGN: 'logistics:vehicle:assign',

  DRIVER_VIEW: 'logistics:driver:view',
  DRIVER_MANAGE: 'logistics:driver:manage',
  DRIVER_ASSIGN: 'logistics:driver:assign',

  ROUTE_VIEW: 'logistics:route:view',
  ROUTE_MANAGE: 'logistics:route:manage',
  ROUTE_OPTIMIZE: 'logistics:route:optimize',

  ZONE_VIEW: 'logistics:zone:view',
  ZONE_MANAGE: 'logistics:zone:manage',

  SHIPPING_METHOD_VIEW: 'logistics:shipping_method:view',
  SHIPPING_METHOD_MANAGE: 'logistics:shipping_method:manage',

  PACKAGING_VIEW: 'logistics:packaging:view',
  PACKAGING_MANAGE: 'logistics:packaging:manage',

  RETURN_SHIPMENT_VIEW: 'logistics:return_shipment:view',
  RETURN_SHIPMENT_MANAGE: 'logistics:return_shipment:manage',
  RETURN_SHIPMENT_APPROVE: 'logistics:return_shipment:approve',

  INSURANCE_VIEW: 'logistics:insurance:view',
  INSURANCE_MANAGE: 'logistics:insurance:manage',
  INSURANCE_CLAIM: 'logistics:insurance:claim',

  ANALYTICS_VIEW: 'logistics:analytics:view',
  ANALYTICS_EXPORT: 'logistics:analytics:export',

  ADMIN_VIEW: 'admin:view',
  ADMIN_MANAGE: 'admin:manage',
} as const;

export type LogisticsPermissionType =
  (typeof LOGISTICS_PERMISSION)[keyof typeof LOGISTICS_PERMISSION];
