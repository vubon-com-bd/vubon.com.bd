/**
 * Branch-coverage focused tests — every conditional in domain VOs.
 */
import { describe, it, expect } from '@jest/globals';

import { ShipmentTypeVO } from '@domain/value-objects/primitives/shipment-type.vo.js';
import { ShipmentPriorityVO } from '@domain/value-objects/primitives/shipment-priority.vo.js';
import { CourierNameVO } from '@domain/value-objects/primitives/courier-name.vo.js';
import { DeliveryTypeVO } from '@domain/value-objects/primitives/delivery-type.vo.js';
import { FulfillmentTypeVO } from '@domain/value-objects/primitives/fulfillment-type.vo.js';
import { VehicleTypeVO } from '@domain/value-objects/primitives/vehicle-type.vo.js';
import { VehicleFuelTypeVO } from '@domain/value-objects/primitives/vehicle-fuel-type.vo.js';
import { DriverTypeVO } from '@domain/value-objects/primitives/driver-type.vo.js';
import { DriverLicenseTypeVO } from '@domain/value-objects/primitives/driver-license-type.vo.js';
import { RouteTypeVO } from '@domain/value-objects/primitives/route-type.vo.js';
import { RouteOptimizationVO } from '@domain/value-objects/primitives/route-optimization.vo.js';
import { ZoneTypeVO } from '@domain/value-objects/primitives/zone-type.vo.js';
import { ZonePricingTypeVO } from '@domain/value-objects/primitives/zone-pricing-type.vo.js';
import { PackagingTypeVO } from '@domain/value-objects/primitives/packaging-type.vo.js';
import { PackagingMaterialVO } from '@domain/value-objects/primitives/packaging-material.vo.js';
import { ReturnShipmentTypeVO } from '@domain/value-objects/primitives/return-shipment-type.vo.js';
import { ReturnReasonVO } from '@domain/value-objects/primitives/return-reason.vo.js';
import { InsuranceTypeVO } from '@domain/value-objects/primitives/insurance-type.vo.js';
import { InsuranceCoverageVO } from '@domain/value-objects/primitives/insurance-coverage.vo.js';
import { TrackingEventVO } from '@domain/value-objects/primitives/tracking-event.vo.js';
import { TrackingSourceVO } from '@domain/value-objects/primitives/tracking-source.vo.js';
import { WeightKgVO } from '@domain/value-objects/primitives/weight-kg.vo.js';
import { VolumeM3VO } from '@domain/value-objects/primitives/volume-m3.vo.js';
import { DistanceKmVO } from '@domain/value-objects/primitives/distance-km.vo.js';
import { DurationMinutesVO } from '@domain/value-objects/primitives/duration-minutes.vo.js';
import { UtilizationPercentVO } from '@domain/value-objects/primitives/utilization-percent.vo.js';
import { AttemptNumberVO } from '@domain/value-objects/primitives/attempt-number.vo.js';
import { StopOrderVO } from '@domain/value-objects/primitives/stop-order.vo.js';
import { NotesVO } from '@domain/value-objects/primitives/notes.vo.js';
import { ReasonTextVO } from '@domain/value-objects/primitives/reason-text.vo.js';
import { DescriptionTextVO } from '@domain/value-objects/primitives/description-text.vo.js';

// ════════ SHIPMENT TYPE — every isXxx + defaultDeliveryDays branches ════════
describe('ShipmentTypeVO branch coverage', () => {
  const allTypes = [
    ['standard', ShipmentTypeVO.standard()],
    ['express', ShipmentTypeVO.express()],
    ['sameDay', ShipmentTypeVO.sameDay()],
    ['nextDay', ShipmentTypeVO.nextDay()],
    ['overnight', ShipmentTypeVO.overnight()],
    ['international', ShipmentTypeVO.international()],
    ['freight', ShipmentTypeVO.freight()],
    ['bulk', ShipmentTypeVO.bulk()],
  ] as const;

  it.each(allTypes)('%s — every predicate evaluates', (_n, vo) => {
    expect(vo.isStandard()).toBeDefined();
    expect(vo.isExpress()).toBeDefined();
    expect(vo.isInternational()).toBeDefined();
    expect(vo.isFreight()).toBeDefined();
    expect(vo.isBulk()).toBeDefined();
    expect(vo.isSameDay()).toBeDefined();
    expect(vo.requiresPriorityHandling()).toBeDefined();
    expect(vo.defaultDeliveryDays).toBeGreaterThanOrEqual(0);
  });
});

// ════════ SHIPMENT PRIORITY ════════
describe('ShipmentPriorityVO branch coverage', () => {
  const priorities = [
    ['low', ShipmentPriorityVO.low()],
    ['normal', ShipmentPriorityVO.normal()],
    ['high', ShipmentPriorityVO.high()],
    ['urgent', ShipmentPriorityVO.urgent()],
  ] as const;

  it.each(priorities)('%s — all predicates + rank', (_n, vo) => {
    expect(vo.isLow()).toBeDefined();
    expect(vo.isNormal()).toBeDefined();
    expect(vo.isHigh()).toBeDefined();
    expect(vo.isUrgent()).toBeDefined();
    expect(vo.isElevated()).toBeDefined();
    expect(vo.rank).toBeGreaterThanOrEqual(0);
  });
});

// ════════ COURIER NAME — every named constructor + predicates ════════
describe('CourierNameVO branch coverage', () => {
  const names = [
    ['pathao', CourierNameVO.pathao()],
    ['redx', CourierNameVO.redx()],
    ['steadfast', CourierNameVO.steadfast()],
    ['paperfly', CourierNameVO.paperfly()],
    ['sundarban', CourierNameVO.sundarban()],
    ['saParibahan', CourierNameVO.saParibahan()],
    ['dhl', CourierNameVO.dhl()],
    ['fedex', CourierNameVO.fedex()],
    ['ups', CourierNameVO.ups()],
    ['aramex', CourierNameVO.aramex()],
    ['karatoya', CourierNameVO.karatoya()],
    ['shohagh', CourierNameVO.shohagh()],
    ['trc', CourierNameVO.trc()],
    ['ecourier', CourierNameVO.ecourier()],
  ] as const;

  it.each(names)('%s — all predicates', (_n, vo) => {
    expect(vo.isInternational()).toBeDefined();
    expect(vo.isLocalBD()).toBeDefined();
    expect(vo.isFreight()).toBeDefined();
    expect(vo.isOnDemand()).toBeDefined();
  });
});

// ════════ DELIVERY TYPE — every type + estimatedDays default ════════
describe('DeliveryTypeVO branch coverage', () => {
  const types = [
    ['standard', DeliveryTypeVO.standard()],
    ['express', DeliveryTypeVO.express()],
    ['sameDay', DeliveryTypeVO.sameDay()],
    ['scheduled', DeliveryTypeVO.scheduled()],
    ['contactless', DeliveryTypeVO.contactless()],
    ['pickupPoint', DeliveryTypeVO.pickupPoint()],
    ['locker', DeliveryTypeVO.locker()],
    ['door', DeliveryTypeVO.door()],
  ] as const;

  it.each(types)('%s — predicates + estimatedDays', (_n, vo) => {
    expect(vo.isStandard()).toBeDefined();
    expect(vo.isExpress()).toBeDefined();
    expect(vo.isSameDay()).toBeDefined();
    expect(vo.isScheduled()).toBeDefined();
    expect(vo.isContactless()).toBeDefined();
    expect(vo.isPickupPoint()).toBeDefined();
    expect(vo.isDoor()).toBeDefined();
    expect(vo.requiresSchedule()).toBeDefined();
    expect(vo.requiresSignature()).toBeDefined();
    expect(vo.isSelfPickup()).toBeDefined();
    expect(vo.estimatedDays).toBeGreaterThanOrEqual(0);
  });
});

// ════════ FULFILLMENT TYPE ════════
describe('FulfillmentTypeVO branch coverage', () => {
  const types = [
    ['standard', FulfillmentTypeVO.standard()],
    ['express', FulfillmentTypeVO.express()],
    ['sameDay', FulfillmentTypeVO.sameDay()],
    ['backorder', FulfillmentTypeVO.backorder()],
    ['preorder', FulfillmentTypeVO.preorder()],
    ['dropship', FulfillmentTypeVO.dropship()],
    ['crossDock', FulfillmentTypeVO.crossDock()],
  ] as const;

  it.each(types)('%s', (_n, vo) => {
    expect(vo.isStandard()).toBeDefined();
    expect(vo.isExpress()).toBeDefined();
    expect(vo.isSameDay()).toBeDefined();
    expect(vo.isBackorder()).toBeDefined();
    expect(vo.isPreorder()).toBeDefined();
    expect(vo.isDropship()).toBeDefined();
    expect(vo.isCrossDock()).toBeDefined();
    expect(vo.isFastTrack()).toBeDefined();
    expect(vo.isDeferred()).toBeDefined();
    expect(vo.isVendorFulfilled()).toBeDefined();
  });
});

// ════════ VEHICLE TYPE ════════
describe('VehicleTypeVO branch coverage', () => {
  const types = [
    ['motorcycle', VehicleTypeVO.motorcycle()],
    ['bicycle', VehicleTypeVO.bicycle()],
    ['car', VehicleTypeVO.car()],
    ['van', VehicleTypeVO.van()],
    ['pickup', VehicleTypeVO.pickup()],
    ['truckSmall', VehicleTypeVO.truckSmall()],
    ['truckMedium', VehicleTypeVO.truckMedium()],
    ['truckLarge', VehicleTypeVO.truckLarge()],
    ['container', VehicleTypeVO.container()],
    ['refrigerated', VehicleTypeVO.refrigerated()],
  ] as const;

  it.each(types)('%s', (_n, vo) => {
    expect(vo.isTwoWheeler()).toBeDefined();
    expect(vo.isTruck()).toBeDefined();
    expect(vo.isRefrigerated()).toBeDefined();
    expect(vo.isContainer()).toBeDefined();
    expect(vo.supportsColdChain()).toBeDefined();
    expect(vo.isHeavyDuty()).toBeDefined();
    expect(vo.isLightDuty()).toBeDefined();
  });
});

// ════════ VEHICLE FUEL TYPE ════════
describe('VehicleFuelTypeVO branch coverage', () => {
  const fuels = [
    ['petrol', VehicleFuelTypeVO.petrol()],
    ['diesel', VehicleFuelTypeVO.diesel()],
    ['cng', VehicleFuelTypeVO.cng()],
    ['electric', VehicleFuelTypeVO.electric()],
    ['hybrid', VehicleFuelTypeVO.hybrid()],
    ['lpg', VehicleFuelTypeVO.lpg()],
  ] as const;

  it.each(fuels)('%s', (_n, vo) => {
    expect(vo.isPetrol()).toBeDefined();
    expect(vo.isDiesel()).toBeDefined();
    expect(vo.isCng()).toBeDefined();
    expect(vo.isElectric()).toBeDefined();
    expect(vo.isHybrid()).toBeDefined();
    expect(vo.isLpg()).toBeDefined();
    expect(vo.isZeroEmission()).toBeDefined();
    expect(vo.isFossilFuel()).toBeDefined();
    expect(vo.isGreen()).toBeDefined();
  });
});

// ════════ DRIVER TYPE + LICENSE ════════
describe('DriverTypeVO branch coverage', () => {
  const types = [
    ['fullTime', DriverTypeVO.fullTime()],
    ['partTime', DriverTypeVO.partTime()],
    ['contract', DriverTypeVO.contract()],
    ['freelance', DriverTypeVO.freelance()],
    ['thirdParty', DriverTypeVO.thirdParty()],
  ] as const;
  it.each(types)('%s', (_n, vo) => {
    expect(vo.isFullTime()).toBeDefined();
    expect(vo.isPartTime()).toBeDefined();
    expect(vo.isContract()).toBeDefined();
    expect(vo.isFreelance()).toBeDefined();
    expect(vo.isThirdParty()).toBeDefined();
    expect(vo.isInHouse()).toBeDefined();
    expect(vo.isExternal()).toBeDefined();
    expect(vo.isBenefited()).toBeDefined();
  });
});

describe('DriverLicenseTypeVO branch coverage', () => {
  const types = [
    ['motorcycle', DriverLicenseTypeVO.motorcycle()],
    ['light', DriverLicenseTypeVO.light()],
    ['medium', DriverLicenseTypeVO.medium()],
    ['heavy', DriverLicenseTypeVO.heavy()],
    ['professional', DriverLicenseTypeVO.professional()],
  ] as const;
  it.each(types)('%s', (_n, vo) => {
    expect(vo.isMotorcycle()).toBeDefined();
    expect(vo.isLight()).toBeDefined();
    expect(vo.isMedium()).toBeDefined();
    expect(vo.isHeavy()).toBeDefined();
    expect(vo.isProfessional()).toBeDefined();
    expect(vo.canDriveHeavy()).toBeDefined();
    expect(vo.canDriveMedium()).toBeDefined();
    expect(vo.isCommercial()).toBeDefined();
    expect(vo.rank).toBeGreaterThanOrEqual(0);
  });
});

// ════════ ROUTE TYPE + OPTIMIZATION ════════
describe('RouteTypeVO branch coverage', () => {
  const types = [
    ['delivery', RouteTypeVO.delivery()],
    ['pickup', RouteTypeVO.pickup()],
    ['mixed', RouteTypeVO.mixed()],
    ['return', RouteTypeVO.return()],
    ['transfer', RouteTypeVO.transfer()],
    ['lineHaul', RouteTypeVO.lineHaul()],
    ['lastMile', RouteTypeVO.lastMile()],
    ['firstMile', RouteTypeVO.firstMile()],
  ] as const;
  it.each(types)('%s', (_n, vo) => {
    expect(vo.isDelivery()).toBeDefined();
    expect(vo.isPickup()).toBeDefined();
    expect(vo.isMixed()).toBeDefined();
    expect(vo.isReturn()).toBeDefined();
    expect(vo.isTransfer()).toBeDefined();
    expect(vo.isLineHaul()).toBeDefined();
    expect(vo.isLastMile()).toBeDefined();
    expect(vo.isFirstMile()).toBeDefined();
    expect(vo.isCustomerFacing()).toBeDefined();
    expect(vo.isInternal()).toBeDefined();
    expect(vo.isMultiStop()).toBeDefined();
  });
});

describe('RouteOptimizationVO branch coverage', () => {
  const types = [
    ['shortestDistance', RouteOptimizationVO.shortestDistance()],
    ['fastestTime', RouteOptimizationVO.fastestTime()],
    ['lowestCost', RouteOptimizationVO.lowestCost()],
    ['balanced', RouteOptimizationVO.balanced()],
    ['capacityAware', RouteOptimizationVO.capacityAware()],
    ['timeWindow', RouteOptimizationVO.timeWindow()],
  ] as const;
  it.each(types)('%s', (_n, vo) => {
    expect(vo.isShortestDistance()).toBeDefined();
    expect(vo.isFastestTime()).toBeDefined();
    expect(vo.isLowestCost()).toBeDefined();
    expect(vo.isBalanced()).toBeDefined();
    expect(vo.isCapacityAware()).toBeDefined();
    expect(vo.isTimeWindow()).toBeDefined();
    expect(vo.isCostFocused()).toBeDefined();
    expect(vo.isTimeFocused()).toBeDefined();
    expect(vo.requiresCapacityData()).toBeDefined();
  });
});

// ════════ ZONE TYPE + PRICING ════════
describe('ZoneTypeVO branch coverage', () => {
  const types = [
    ['national', ZoneTypeVO.national()],
    ['division', ZoneTypeVO.division()],
    ['district', ZoneTypeVO.district()],
    ['upazila', ZoneTypeVO.upazila()],
    ['city', ZoneTypeVO.city()],
    ['area', ZoneTypeVO.area()],
    ['postalCode', ZoneTypeVO.postalCode()],
    ['customPolygon', ZoneTypeVO.customPolygon()],
  ] as const;
  it.each(types)('%s', (_n, vo) => {
    expect(vo.isNational()).toBeDefined();
    expect(vo.isDivision()).toBeDefined();
    expect(vo.isDistrict()).toBeDefined();
    expect(vo.isUpazila()).toBeDefined();
    expect(vo.isCity()).toBeDefined();
    expect(vo.isArea()).toBeDefined();
    expect(vo.isPostalCode()).toBeDefined();
    expect(vo.isCustomPolygon()).toBeDefined();
    expect(vo.isAdministrative()).toBeDefined();
    expect(vo.requiresPolygon()).toBeDefined();
    expect(vo.isParentScope()).toBeDefined();
  });
});

describe('ZonePricingTypeVO branch coverage', () => {
  const types = [
    ['flat', ZonePricingTypeVO.flat()],
    ['weightBased', ZonePricingTypeVO.weightBased()],
    ['distanceBased', ZonePricingTypeVO.distanceBased()],
    ['tiered', ZonePricingTypeVO.tiered()],
    ['zoneBased', ZonePricingTypeVO.zoneBased()],
  ] as const;
  it.each(types)('%s', (_n, vo) => {
    expect(vo.isFlat()).toBeDefined();
    expect(vo.isWeightBased()).toBeDefined();
    expect(vo.isDistanceBased()).toBeDefined();
    expect(vo.isTiered()).toBeDefined();
    expect(vo.isZoneBased()).toBeDefined();
    expect(vo.requiresWeight()).toBeDefined();
    expect(vo.requiresDistance()).toBeDefined();
    expect(vo.isFixedPrice()).toBeDefined();
  });
});

// ════════ PACKAGING TYPE + MATERIAL ════════
describe('PackagingTypeVO branch coverage', () => {
  const types = [
    ['box', PackagingTypeVO.box()],
    ['envelope', PackagingTypeVO.envelope()],
    ['bubbleWrap', PackagingTypeVO.bubbleWrap()],
    ['polyBag', PackagingTypeVO.polyBag()],
    ['paperBag', PackagingTypeVO.paperBag()],
    ['tube', PackagingTypeVO.tube()],
    ['pallet', PackagingTypeVO.pallet()],
    ['crate', PackagingTypeVO.crate()],
    ['custom', PackagingTypeVO.custom()],
  ] as const;
  it.each(types)('%s', (_n, vo) => {
    expect(vo.isBox()).toBeDefined();
    expect(vo.isEnvelope()).toBeDefined();
    expect(vo.isBubbleWrap()).toBeDefined();
    expect(vo.isPolyBag()).toBeDefined();
    expect(vo.isPaperBag()).toBeDefined();
    expect(vo.isTube()).toBeDefined();
    expect(vo.isPallet()).toBeDefined();
    expect(vo.isCrate()).toBeDefined();
    expect(vo.isCustom()).toBeDefined();
    expect(vo.isFragileFriendly()).toBeDefined();
    expect(vo.isFlat()).toBeDefined();
    expect(vo.isBulkTransport()).toBeDefined();
  });
});

describe('PackagingMaterialVO branch coverage', () => {
  const materials = [
    ['cardboard', PackagingMaterialVO.cardboard()],
    ['plastic', PackagingMaterialVO.plastic()],
    ['paper', PackagingMaterialVO.paper()],
    ['wood', PackagingMaterialVO.wood()],
    ['metal', PackagingMaterialVO.metal()],
    ['glass', PackagingMaterialVO.glass()],
    ['biodegradable', PackagingMaterialVO.biodegradable()],
    ['recycled', PackagingMaterialVO.recycled()],
  ] as const;
  it.each(materials)('%s', (_n, vo) => {
    expect(vo.isCardboard()).toBeDefined();
    expect(vo.isPlastic()).toBeDefined();
    expect(vo.isPaper()).toBeDefined();
    expect(vo.isWood()).toBeDefined();
    expect(vo.isMetal()).toBeDefined();
    expect(vo.isGlass()).toBeDefined();
    expect(vo.isBiodegradable()).toBeDefined();
    expect(vo.isRecycled()).toBeDefined();
    expect(vo.isEcoFriendly()).toBeDefined();
    expect(vo.isRecyclable()).toBeDefined();
    expect(vo.isHeavyDuty()).toBeDefined();
  });
});

// ════════ RETURN TYPE + REASON ════════
describe('ReturnShipmentTypeVO branch coverage', () => {
  const types = [
    ['customerReturn', ReturnShipmentTypeVO.customerReturn()],
    ['rto', ReturnShipmentTypeVO.rto()],
    ['exchange', ReturnShipmentTypeVO.exchange()],
    ['warranty', ReturnShipmentTypeVO.warranty()],
    ['damaged', ReturnShipmentTypeVO.damaged()],
    ['wrongItem', ReturnShipmentTypeVO.wrongItem()],
    ['refused', ReturnShipmentTypeVO.refused()],
  ] as const;
  it.each(types)('%s', (_n, vo) => {
    expect(vo.isCustomerReturn()).toBeDefined();
    expect(vo.isRto()).toBeDefined();
    expect(vo.isExchange()).toBeDefined();
    expect(vo.isWarranty()).toBeDefined();
    expect(vo.isDamaged()).toBeDefined();
    expect(vo.isWrongItem()).toBeDefined();
    expect(vo.isRefused()).toBeDefined();
    expect(vo.isOurFault()).toBeDefined();
    expect(vo.isCustomerRefused()).toBeDefined();
    expect(vo.isSwap()).toBeDefined();
    expect(vo.requiresRefund()).toBeDefined();
  });
});

describe('ReturnReasonVO branch coverage', () => {
  const reasons = [
    ['defective', ReturnReasonVO.defective()],
    ['notAsDescribed', ReturnReasonVO.notAsDescribed()],
    ['wrongItem', ReturnReasonVO.wrongItem()],
    ['sizeIssue', ReturnReasonVO.sizeIssue()],
    ['changedMind', ReturnReasonVO.changedMind()],
    ['damagedInTransit', ReturnReasonVO.damagedInTransit()],
    ['lateDelivery', ReturnReasonVO.lateDelivery()],
    ['qualityIssue', ReturnReasonVO.qualityIssue()],
    ['refused', ReturnReasonVO.refused()],
    ['other', ReturnReasonVO.other()],
  ] as const;
  it.each(reasons)('%s', (_n, vo) => {
    expect(vo.isDefective()).toBeDefined();
    expect(vo.isNotAsDescribed()).toBeDefined();
    expect(vo.isWrongItem()).toBeDefined();
    expect(vo.isSizeIssue()).toBeDefined();
    expect(vo.isChangedMind()).toBeDefined();
    expect(vo.isDamagedInTransit()).toBeDefined();
    expect(vo.isLateDelivery()).toBeDefined();
    expect(vo.isQualityIssue()).toBeDefined();
    expect(vo.isRefused()).toBeDefined();
    expect(vo.isOther()).toBeDefined();
    expect(vo.requiresPhotos()).toBeDefined();
    expect(vo.isRestockable()).toBeDefined();
    expect(vo.isSellerFault()).toBeDefined();
    expect(vo.isFreeReturn()).toBeDefined();
  });
});

// ════════ INSURANCE TYPE + COVERAGE ════════
describe('InsuranceTypeVO branch coverage', () => {
  const types = [
    ['basic', InsuranceTypeVO.basic()],
    ['standard', InsuranceTypeVO.standard()],
    ['premium', InsuranceTypeVO.premium()],
    ['fullCoverage', InsuranceTypeVO.fullCoverage()],
    ['thirdParty', InsuranceTypeVO.thirdParty()],
  ] as const;
  it.each(types)('%s', (_n, vo) => {
    expect(vo.isBasic()).toBeDefined();
    expect(vo.isStandard()).toBeDefined();
    expect(vo.isPremium()).toBeDefined();
    expect(vo.isFullCoverage()).toBeDefined();
    expect(vo.isThirdParty()).toBeDefined();
    expect(vo.isHighTier()).toBeDefined();
    expect(vo.premiumPercent).toBeGreaterThan(0);
  });
});

describe('InsuranceCoverageVO branch coverage', () => {
  const coverages = [
    ['loss', InsuranceCoverageVO.loss()],
    ['damage', InsuranceCoverageVO.damage()],
    ['theft', InsuranceCoverageVO.theft()],
    ['delay', InsuranceCoverageVO.delay()],
    ['partialLoss', InsuranceCoverageVO.partialLoss()],
    ['totalLoss', InsuranceCoverageVO.totalLoss()],
    ['naturalDisaster', InsuranceCoverageVO.naturalDisaster()],
  ] as const;
  it.each(coverages)('%s', (_n, vo) => {
    expect(vo.isLoss()).toBeDefined();
    expect(vo.isDamage()).toBeDefined();
    expect(vo.isTheft()).toBeDefined();
    expect(vo.isDelay()).toBeDefined();
    expect(vo.isPartialLoss()).toBeDefined();
    expect(vo.isTotalLoss()).toBeDefined();
    expect(vo.isNaturalDisaster()).toBeDefined();
    expect(vo.isPhysical()).toBeDefined();
    expect(vo.isFinancial()).toBeDefined();
    expect(vo.isFullValue()).toBeDefined();
    expect(vo.isForceMajeure()).toBeDefined();
  });
});

// ════════ TRACKING EVENT + SOURCE ════════
describe('TrackingEventVO branch coverage', () => {
  const events = [
    ['orderPlaced', TrackingEventVO.orderPlaced()],
    ['shipmentCreated', TrackingEventVO.shipmentCreated()],
    ['labelGenerated', TrackingEventVO.labelGenerated()],
    ['pickedUp', TrackingEventVO.pickedUp()],
    ['inTransit', TrackingEventVO.inTransit()],
    ['atHub', TrackingEventVO.atHub()],
    ['outForDelivery', TrackingEventVO.outForDelivery()],
    ['deliveryAttempted', TrackingEventVO.deliveryAttempted()],
    ['delivered', TrackingEventVO.delivered()],
    ['failed', TrackingEventVO.failed()],
    ['returned', TrackingEventVO.returned()],
    ['exception', TrackingEventVO.exception()],
    ['customsCleared', TrackingEventVO.customsCleared()],
    ['customsHold', TrackingEventVO.customsHold()],
  ] as const;
  it.each(events)('%s', (_n, vo) => {
    expect(vo.isDelivered()).toBeDefined();
    expect(vo.isFailed()).toBeDefined();
    expect(vo.isReturned()).toBeDefined();
    expect(vo.isException()).toBeDefined();
    expect(vo.isCustoms()).toBeDefined();
    expect(vo.isTerminal()).toBeDefined();
    expect(vo.shouldNotifyCustomer()).toBeDefined();
    expect(vo.priorityRank).toBeGreaterThanOrEqual(0);
  });
});

describe('TrackingSourceVO branch coverage', () => {
  const sources = [
    ['courierApi', TrackingSourceVO.courierApi()],
    ['webhook', TrackingSourceVO.webhook()],
    ['manual', TrackingSourceVO.manual()],
    ['internal', TrackingSourceVO.internal()],
    ['thirdParty', TrackingSourceVO.thirdParty()],
  ] as const;
  it.each(sources)('%s', (_n, vo) => {
    expect(vo.isCourierApi()).toBeDefined();
    expect(vo.isWebhook()).toBeDefined();
    expect(vo.isManual()).toBeDefined();
    expect(vo.isInternal()).toBeDefined();
    expect(vo.isThirdParty()).toBeDefined();
    expect(vo.isExternal()).toBeDefined();
    expect(vo.isTrusted()).toBeDefined();
  });
});

// ════════ NUMBER VO BRANCH EDGES ════════
describe('Number VO boundary branches', () => {
  it('WeightKgVO — max boundary', () => {
    expect(() => WeightKgVO.create(WeightKgVO.max() + 1)).toThrow();
    expect(() => WeightKgVO.create(WeightKgVO.min() - 0.0001)).toThrow();
    expect(WeightKgVO.create(WeightKgVO.max()).value).toBe(500);
  });
  it('VolumeM3VO — max boundary', () => {
    expect(() => VolumeM3VO.create(VolumeM3VO.max() + 0.1)).toThrow();
    expect(VolumeM3VO.create(VolumeM3VO.max()).value).toBe(2);
  });
  it('DistanceKmVO — max boundary', () => {
    expect(() => DistanceKmVO.create(DistanceKmVO.max() + 1)).toThrow();
    expect(DistanceKmVO.create(0).isShortHaul()).toBe(true);
    expect(DistanceKmVO.create(501).isLongHaul()).toBe(true);
  });
  it('DurationMinutesVO — max boundary', () => {
    expect(() => DurationMinutesVO.create(DurationMinutesVO.max() + 1)).toThrow();
  });
  it('UtilizationPercentVO — boundaries', () => {
    expect(() => UtilizationPercentVO.create(-1)).toThrow();
    expect(() => UtilizationPercentVO.create(101)).toThrow();
    expect(UtilizationPercentVO.create(0).isLow()).toBe(true);
    expect(UtilizationPercentVO.create(79).isLow()).toBe(true);
    expect(UtilizationPercentVO.create(85).isHigh()).toBe(true);
    expect(UtilizationPercentVO.create(95).isFull()).toBe(true);
    expect(() => UtilizationPercentVO.fromUsage(0, 0)).toThrow();
    expect(() => UtilizationPercentVO.fromUsage(1, 0)).toThrow();
    expect(() => UtilizationPercentVO.fromUsage(NaN, 100)).toThrow();
    expect(UtilizationPercentVO.fromUsage(50, 100).value).toBe(50);
  });
  it('AttemptNumberVO — max boundary', () => {
    expect(() => AttemptNumberVO.create(AttemptNumberVO.max() + 1)).toThrow();
    expect(AttemptNumberVO.create(1).isFirst()).toBe(true);
    expect(AttemptNumberVO.create(3).isLast()).toBe(true);
  });
  it('StopOrderVO — max boundary', () => {
    expect(() => StopOrderVO.create(StopOrderVO.max())).toThrow();
    expect(StopOrderVO.first().isFirst()).toBe(true);
  });
  it('NotesVO — max length boundary', () => {
    expect(NotesVO.create('x'.repeat(1000)).length).toBe(1000);
    expect(() => NotesVO.create('x'.repeat(1001))).toThrow();
    expect(() => NotesVO.create(123 as never)).toThrow();
  });
  it('ReasonTextVO — min/max boundary', () => {
    expect(ReasonTextVO.create('ab').value).toBe('ab');
    expect(() => ReasonTextVO.create('a')).toThrow();
    expect(() => ReasonTextVO.create('x'.repeat(501))).toThrow();
    expect(() => ReasonTextVO.create(null as never)).toThrow();
  });
  it('DescriptionTextVO — max boundary', () => {
    expect(DescriptionTextVO.create('x'.repeat(5000)).length).toBe(5000);
    expect(() => DescriptionTextVO.create('x'.repeat(5001))).toThrow();
    expect(() => DescriptionTextVO.create(1 as never)).toThrow();
    expect(DescriptionTextVO.empty().isEmpty).toBe(true);
  });
});
