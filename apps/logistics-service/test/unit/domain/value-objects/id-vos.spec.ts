/**
 * Data-driven tests for ALL 18 ID VOs.
 */
import { describe, it, expect } from '@jest/globals';

import { ShipmentIdVO } from '@domain/value-objects/primitives/shipment-id.vo.js';
import { CourierIdVO } from '@domain/value-objects/primitives/courier-id.vo.js';
import { WarehouseIdVO } from '@domain/value-objects/primitives/warehouse-id.vo.js';
import { VehicleIdVO } from '@domain/value-objects/primitives/vehicle-id.vo.js';
import { DriverIdVO } from '@domain/value-objects/primitives/driver-id.vo.js';
import { ZoneIdVO } from '@domain/value-objects/primitives/zone-id.vo.js';
import { ShippingMethodIdVO } from '@domain/value-objects/primitives/shipping-method-id.vo.js';
import { PackagingIdVO } from '@domain/value-objects/primitives/packaging-id.vo.js';
import { DeliveryIdVO } from '@domain/value-objects/primitives/delivery-id.vo.js';
import { DeliveryAttemptIdVO } from '@domain/value-objects/primitives/delivery-attempt-id.vo.js';
import { TrackingIdVO } from '@domain/value-objects/primitives/tracking-id.vo.js';
import { RouteIdVO } from '@domain/value-objects/primitives/route-id.vo.js';
import { RouteStopIdVO } from '@domain/value-objects/primitives/route-stop-id.vo.js';
import { FulfillmentIdVO } from '@domain/value-objects/primitives/fulfillment-id.vo.js';
import { DispatchIdVO } from '@domain/value-objects/primitives/dispatch-id.vo.js';
import { ReturnShipmentIdVO } from '@domain/value-objects/primitives/return-shipment-id.vo.js';
import { InsuranceIdVO } from '@domain/value-objects/primitives/insurance-id.vo.js';
import { InsuranceClaimIdVO } from '@domain/value-objects/primitives/insurance-claim-id.vo.js';
import { OrderIdVO } from '@domain/value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo.js';
import { VendorIdVO } from '@domain/value-objects/primitives/vendor-id.vo.js';

type IdVO = {
  create: (raw: string) => { value: string };
  reconstitute: (raw: string) => { value: string };
};

const VALID_UUID = '550e8400-e29b-41d4-a716-446655440000';
const INVALID = ['', '   ', 'not-a-uuid', '550e8400', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', '550e8400-e29b-41d4-a716-44665544'];

const cases: [string, IdVO][] = [
  ['ShipmentIdVO', ShipmentIdVO],
  ['CourierIdVO', CourierIdVO],
  ['WarehouseIdVO', WarehouseIdVO],
  ['VehicleIdVO', VehicleIdVO],
  ['DriverIdVO', DriverIdVO],
  ['ZoneIdVO', ZoneIdVO],
  ['ShippingMethodIdVO', ShippingMethodIdVO],
  ['PackagingIdVO', PackagingIdVO],
  ['DeliveryIdVO', DeliveryIdVO],
  ['DeliveryAttemptIdVO', DeliveryAttemptIdVO],
  ['TrackingIdVO', TrackingIdVO],
  ['RouteIdVO', RouteIdVO],
  ['RouteStopIdVO', RouteStopIdVO],
  ['FulfillmentIdVO', FulfillmentIdVO],
  ['DispatchIdVO', DispatchIdVO],
  ['ReturnShipmentIdVO', ReturnShipmentIdVO],
  ['InsuranceIdVO', InsuranceIdVO],
  ['InsuranceClaimIdVO', InsuranceClaimIdVO],
  ['OrderIdVO', OrderIdVO],
  ['UserIdVO', UserIdVO],
  ['VendorIdVO', VendorIdVO],
];

describe.each(cases)('%s', (name, VO) => {
  it('create(valid UUID) works', () => {
    expect(VO.create(VALID_UUID).value).toBe(VALID_UUID);
  });
  it.each(INVALID)('create(%j) throws', (bad) => {
    expect(() => VO.create(bad)).toThrow();
  });
  it('reconstitute skips validation', () => {
    expect(VO.reconstitute('anything').value).toBe('anything');
  });
});
