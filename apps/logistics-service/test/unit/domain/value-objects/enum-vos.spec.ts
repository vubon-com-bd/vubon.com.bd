/**
 * Data-driven tests for ALL enum-type VOs.
 */
import { describe, it, expect } from '@jest/globals';

import { ShipmentTypeVO } from '@domain/value-objects/primitives/shipment-type.vo.js';
import { ShipmentPriorityVO } from '@domain/value-objects/primitives/shipment-priority.vo.js';
import { CourierTypeVO } from '@domain/value-objects/primitives/courier-type.vo.js';
import { CourierNameVO } from '@domain/value-objects/primitives/courier-name.vo.js';
import { DeliveryTypeVO } from '@domain/value-objects/primitives/delivery-type.vo.js';
import { FulfillmentTypeVO } from '@domain/value-objects/primitives/fulfillment-type.vo.js';
import { FulfillmentPriorityVO } from '@domain/value-objects/primitives/fulfillment-priority.vo.js';
import { DispatchTypeVO } from '@domain/value-objects/primitives/dispatch-type.vo.js';
import { VehicleTypeVO } from '@domain/value-objects/primitives/vehicle-type.vo.js';
import { VehicleFuelTypeVO } from '@domain/value-objects/primitives/vehicle-fuel-type.vo.js';
import { DriverTypeVO } from '@domain/value-objects/primitives/driver-type.vo.js';
import { DriverLicenseTypeVO } from '@domain/value-objects/primitives/driver-license-type.vo.js';
import { RouteTypeVO } from '@domain/value-objects/primitives/route-type.vo.js';
import { RouteOptimizationVO } from '@domain/value-objects/primitives/route-optimization.vo.js';
import { ZoneTypeVO } from '@domain/value-objects/primitives/zone-type.vo.js';
import { ZonePricingTypeVO } from '@domain/value-objects/primitives/zone-pricing-type.vo.js';
import { ShippingMethodValueVO } from '@domain/value-objects/primitives/shipping-method-value.vo.js';
import { ShippingRateTypeVO } from '@domain/value-objects/primitives/shipping-rate-type.vo.js';
import { PackagingTypeVO } from '@domain/value-objects/primitives/packaging-type.vo.js';
import { PackagingMaterialVO } from '@domain/value-objects/primitives/packaging-material.vo.js';
import { ReturnShipmentTypeVO } from '@domain/value-objects/primitives/return-shipment-type.vo.js';
import { ReturnReasonVO } from '@domain/value-objects/primitives/return-reason.vo.js';
import { InsuranceTypeVO } from '@domain/value-objects/primitives/insurance-type.vo.js';
import { InsuranceCoverageVO } from '@domain/value-objects/primitives/insurance-coverage.vo.js';
import { TrackingEventVO } from '@domain/value-objects/primitives/tracking-event.vo.js';
import { TrackingSourceVO } from '@domain/value-objects/primitives/tracking-source.vo.js';

type EnumVO = {
  create: (raw: string) => { value: string };
  reconstitute: (raw: string) => { value: string };
};

const cases: [string, EnumVO, string][] = [
  ['ShipmentTypeVO', ShipmentTypeVO, 'standard'],
  ['ShipmentPriorityVO', ShipmentPriorityVO, 'normal'],
  ['CourierTypeVO', CourierTypeVO, 'local'],
  ['CourierNameVO', CourierNameVO, 'pathao'],
  ['DeliveryTypeVO', DeliveryTypeVO, 'standard'],
  ['FulfillmentTypeVO', FulfillmentTypeVO, 'standard'],
  ['FulfillmentPriorityVO', FulfillmentPriorityVO, 'normal'],
  ['DispatchTypeVO', DispatchTypeVO, 'single'],
  ['VehicleTypeVO', VehicleTypeVO, 'motorcycle'],
  ['VehicleFuelTypeVO', VehicleFuelTypeVO, 'petrol'],
  ['DriverTypeVO', DriverTypeVO, 'full_time'],
  ['DriverLicenseTypeVO', DriverLicenseTypeVO, 'light'],
  ['RouteTypeVO', RouteTypeVO, 'delivery'],
  ['RouteOptimizationVO', RouteOptimizationVO, 'balanced'],
  ['ZoneTypeVO', ZoneTypeVO, 'district'],
  ['ZonePricingTypeVO', ZonePricingTypeVO, 'flat'],
  ['ShippingMethodValueVO', ShippingMethodValueVO, 'standard'],
  ['ShippingRateTypeVO', ShippingRateTypeVO, 'flat'],
  ['PackagingTypeVO', PackagingTypeVO, 'box'],
  ['PackagingMaterialVO', PackagingMaterialVO, 'cardboard'],
  ['ReturnShipmentTypeVO', ReturnShipmentTypeVO, 'customer_return'],
  ['ReturnReasonVO', ReturnReasonVO, 'defective'],
  ['InsuranceTypeVO', InsuranceTypeVO, 'basic'],
  ['InsuranceCoverageVO', InsuranceCoverageVO, 'loss'],
  ['TrackingEventVO', TrackingEventVO, 'in_transit'],
  ['TrackingSourceVO', TrackingSourceVO, 'internal'],
];

describe.each(cases)('%s', (name, VO, valid) => {
  it('create(valid)', () => {
    expect(VO.create(valid).value).toBe(valid);
  });
  it('create(invalid) throws', () => {
    expect(() => VO.create('__not_allowed__')).toThrow();
  });
  it('reconstitute works', () => {
    expect(VO.reconstitute(valid).value).toBe(valid);
  });
});

// Specific predicate spot-checks
describe('enum VO predicates (spot checks)', () => {
  it('ShipmentTypeVO', () => {
    expect(ShipmentTypeVO.standard().isStandard()).toBe(true);
    expect(ShipmentTypeVO.express().isExpress()).toBe(true);
    expect(ShipmentTypeVO.express().requiresPriorityHandling()).toBe(true);
    expect(ShipmentTypeVO.sameDay().defaultDeliveryDays).toBe(0);
    expect(ShipmentTypeVO.standard().defaultDeliveryDays).toBe(3);
  });
  it('ShipmentPriorityVO', () => {
    expect(ShipmentPriorityVO.urgent().isUrgent()).toBe(true);
    expect(ShipmentPriorityVO.high().isElevated()).toBe(true);
    expect(ShipmentPriorityVO.normal().isElevated()).toBe(false);
    expect(ShipmentPriorityVO.urgent().rank).toBe(3);
  });
  it('CourierTypeVO', () => {
    expect(CourierTypeVO.inHouse().isOwnFleet()).toBe(true);
    expect(CourierTypeVO.international().supportsCrossBorder()).toBe(true);
  });
  it('CourierNameVO', () => {
    expect(CourierNameVO.dhl().isInternational()).toBe(true);
    expect(CourierNameVO.pathao().isLocalBD()).toBe(true);
    expect(CourierNameVO.pathao().isOnDemand()).toBe(true);
    expect(CourierNameVO.saParibahan().isFreight()).toBe(true);
    expect(CourierNameVO.steadfast().isLocalBD()).toBe(true);
  });
  it('FulfillmentTypeVO', () => {
    expect(FulfillmentTypeVO.express().isFastTrack()).toBe(true);
    expect(FulfillmentTypeVO.backorder().isDeferred()).toBe(true);
    expect(FulfillmentTypeVO.dropship().isVendorFulfilled()).toBe(true);
  });
  it('VehicleTypeVO', () => {
    expect(VehicleTypeVO.motorcycle().isTwoWheeler()).toBe(true);
    expect(VehicleTypeVO.truckLarge().isTruck()).toBe(true);
    expect(VehicleTypeVO.refrigerated().supportsColdChain()).toBe(true);
    expect(VehicleTypeVO.container().isHeavyDuty()).toBe(true);
  });
  it('DriverLicenseTypeVO', () => {
    expect(DriverLicenseTypeVO.heavy().canDriveHeavy()).toBe(true);
    expect(DriverLicenseTypeVO.professional().isCommercial()).toBe(true);
    expect(DriverLicenseTypeVO.motorcycle().rank).toBe(1);
    expect(DriverLicenseTypeVO.professional().rank).toBe(5);
  });
  it('RouteOptimizationVO', () => {
    expect(RouteOptimizationVO.lowestCost().isCostFocused()).toBe(true);
    expect(RouteOptimizationVO.fastestTime().isTimeFocused()).toBe(true);
    expect(RouteOptimizationVO.capacityAware().requiresCapacityData()).toBe(true);
  });
  it('ZoneTypeVO', () => {
    expect(ZoneTypeVO.district().isAdministrative()).toBe(true);
    expect(ZoneTypeVO.customPolygon().requiresPolygon()).toBe(true);
    expect(ZoneTypeVO.national().isParentScope()).toBe(true);
  });
  it('InsuranceTypeVO', () => {
    expect(InsuranceTypeVO.premium().isHighTier()).toBe(true);
    expect(InsuranceTypeVO.basic().premiumPercent).toBe(0.5);
    expect(InsuranceTypeVO.fullCoverage().premiumPercent).toBe(3);
  });
  it('InsuranceCoverageVO', () => {
    expect(InsuranceCoverageVO.loss().isPhysical()).toBe(true);
    expect(InsuranceCoverageVO.delay().isFinancial()).toBe(true);
    expect(InsuranceCoverageVO.theft().isFullValue()).toBe(true);
    expect(InsuranceCoverageVO.naturalDisaster().isForceMajeure()).toBe(true);
  });
  it('ReturnReasonVO', () => {
    expect(ReturnReasonVO.defective().requiresPhotos()).toBe(true);
    expect(ReturnReasonVO.changedMind().isRestockable()).toBe(true);
    expect(ReturnReasonVO.wrongItem().isSellerFault()).toBe(true);
    expect(ReturnReasonVO.defective().isFreeReturn()).toBe(true);
  });
  it('ReturnShipmentTypeVO', () => {
    expect(ReturnShipmentTypeVO.wrongItem().isOurFault()).toBe(true);
    expect(ReturnShipmentTypeVO.rto().isCustomerRefused()).toBe(true);
    expect(ReturnShipmentTypeVO.exchange().isSwap()).toBe(true);
    expect(ReturnShipmentTypeVO.customerReturn().requiresRefund()).toBe(true);
  });
  it('TrackingEventVO (terminal/notify/rank)', () => {
    expect(TrackingEventVO.delivered().isTerminal()).toBe(true);
    expect(TrackingEventVO.delivered().isDelivered()).toBe(true);
    expect(TrackingEventVO.pickedUp().shouldNotifyCustomer()).toBe(true);
    expect(TrackingEventVO.delivered().priorityRank).toBeGreaterThan(TrackingEventVO.pickedUp().priorityRank);
  });
  it('TrackingSourceVO', () => {
    expect(TrackingSourceVO.courierApi().isExternal()).toBe(true);
    expect(TrackingSourceVO.internal().isTrusted()).toBe(true);
    expect(TrackingSourceVO.manual().isExternal()).toBe(false);
  });
  it('PackagingMaterialVO', () => {
    expect(PackagingMaterialVO.biodegradable().isEcoFriendly()).toBe(true);
    expect(PackagingMaterialVO.cardboard().isRecyclable()).toBe(true);
    expect(PackagingMaterialVO.wood().isHeavyDuty()).toBe(true);
  });
  it('PackagingTypeVO', () => {
    expect(PackagingTypeVO.bubbleWrap().isFragileFriendly()).toBe(true);
    expect(PackagingTypeVO.envelope().isFlat()).toBe(true);
    expect(PackagingTypeVO.pallet().isBulkTransport()).toBe(true);
  });
});
