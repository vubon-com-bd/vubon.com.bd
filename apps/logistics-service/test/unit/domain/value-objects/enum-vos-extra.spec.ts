/**
 * Extra enum VO tests — targets low-coverage enums.
 */
import { describe, it, expect } from '@jest/globals';

import { WarehouseTypeVO } from '@domain/value-objects/primitives/warehouse-type.vo.js';
import { WarehouseZoneVO } from '@domain/value-objects/primitives/warehouse-zone.vo.js';
import { DispatchTypeVO } from '@domain/value-objects/primitives/dispatch-type.vo.js';
import { ShippingMethodValueVO } from '@domain/value-objects/primitives/shipping-method-value.vo.js';
import { ShippingRateTypeVO } from '@domain/value-objects/primitives/shipping-rate-type.vo.js';
import { FulfillmentPriorityVO } from '@domain/value-objects/primitives/fulfillment-priority.vo.js';

// ═══ WarehouseType ═══
describe('WarehouseTypeVO', () => {
  it('create + named', () => {
    expect(WarehouseTypeVO.create('main').value).toBe('main');
    expect(WarehouseTypeVO.main().isMain()).toBe(true);
    expect(WarehouseTypeVO.regional().isRegional()).toBe(true);
    expect(WarehouseTypeVO.local().isLocal()).toBe(true);
    expect(WarehouseTypeVO.fulfillmentCenter().isFulfillmentCenter()).toBe(true);
    expect(WarehouseTypeVO.crossDock().isCrossDock()).toBe(true);
    expect(WarehouseTypeVO.coldStorage().isColdStorage()).toBe(true);
    expect(WarehouseTypeVO.darkStore().isDarkStore()).toBe(true);
  });
  it('predicates', () => {
    expect(WarehouseTypeVO.main().isHub()).toBe(true);
    expect(WarehouseTypeVO.regional().isHub()).toBe(true);
    expect(WarehouseTypeVO.coldStorage().supportsColdChain()).toBe(true);
    expect(WarehouseTypeVO.crossDock().isHighThroughput()).toBe(true);
    expect(WarehouseTypeVO.darkStore().isHighThroughput()).toBe(true);
    expect(WarehouseTypeVO.fulfillmentCenter().isHighThroughput()).toBe(true);
    expect(WarehouseTypeVO.local().isLastMileOrigin()).toBe(true);
    expect(WarehouseTypeVO.darkStore().isLastMileOrigin()).toBe(true);
    expect(WarehouseTypeVO.main().defaultCapacityM3).toBeGreaterThan(0);
    expect(WarehouseTypeVO.darkStore().defaultCapacityM3).toBeGreaterThan(0);
  });
  it('invalid throws', () => { expect(() => WarehouseTypeVO.create('bad')).toThrow(); });
});

// ═══ WarehouseZone (0%) ═══
describe('WarehouseZoneVO', () => {
  it('create + named constructors', () => {
    expect(WarehouseZoneVO.create('receiving').value).toBe('receiving');
    expect(WarehouseZoneVO.receiving().isReceiving()).toBe(true);
    expect(WarehouseZoneVO.storage().isStorage()).toBe(true);
    expect(WarehouseZoneVO.picking().isPicking()).toBe(true);
    expect(WarehouseZoneVO.packing().isPacking()).toBe(true);
    expect(WarehouseZoneVO.shipping().isShipping()).toBe(true);
    expect(WarehouseZoneVO.returns().isReturns()).toBe(true);
    expect(WarehouseZoneVO.quarantine().isQuarantine()).toBe(true);
    expect(WarehouseZoneVO.dispatch().isDispatch()).toBe(true);
  });
  it('predicates', () => {
    expect(WarehouseZoneVO.receiving().isInbound()).toBe(true);
    expect(WarehouseZoneVO.quarantine().isInbound()).toBe(true);
    expect(WarehouseZoneVO.shipping().isOutbound()).toBe(true);
    expect(WarehouseZoneVO.dispatch().isOutbound()).toBe(true);
    expect(WarehouseZoneVO.picking().isFulfillment()).toBe(true);
    expect(WarehouseZoneVO.packing().isFulfillment()).toBe(true);
  });
  it('reconstitute works', () => { expect(WarehouseZoneVO.reconstitute('storage').value).toBe('storage'); });
  it('invalid throws', () => { expect(() => WarehouseZoneVO.create('bad')).toThrow(); });
});

// ═══ DispatchType (38%) ═══
describe('DispatchTypeVO', () => {
  it('create + named', () => {
    expect(DispatchTypeVO.create('single').value).toBe('single');
    expect(DispatchTypeVO.single().isSingle()).toBe(true);
    expect(DispatchTypeVO.batch().isBatch()).toBe(true);
    expect(DispatchTypeVO.bulk().isBulk()).toBe(true);
    expect(DispatchTypeVO.urgent().isUrgent()).toBe(true);
    expect(DispatchTypeVO.scheduled().isScheduled()).toBe(true);
  });
  it('predicates', () => {
    expect(DispatchTypeVO.urgent().isElevated()).toBe(true);
    expect(DispatchTypeVO.single().isElevated()).toBe(false);
    expect(DispatchTypeVO.batch().isMultiItem()).toBe(true);
    expect(DispatchTypeVO.bulk().isMultiItem()).toBe(true);
    expect(DispatchTypeVO.single().isMultiItem()).toBe(false);
  });
  it('invalid throws', () => { expect(() => DispatchTypeVO.create('bad')).toThrow(); });
});

// ═══ ShippingMethodValue (24%) ═══
describe('ShippingMethodValueVO', () => {
  it('create + named', () => {
    expect(ShippingMethodValueVO.create('standard').value).toBe('standard');
    expect(ShippingMethodValueVO.standard().isStandard()).toBe(true);
    expect(ShippingMethodValueVO.express().isExpress()).toBe(true);
    expect(ShippingMethodValueVO.sameDay().isSameDay()).toBe(true);
    expect(ShippingMethodValueVO.nextDay().isNextDay()).toBe(true);
    expect(ShippingMethodValueVO.overnight().isOvernight()).toBe(true);
    expect(ShippingMethodValueVO.economy().isEconomy()).toBe(true);
    expect(ShippingMethodValueVO.international().isInternational()).toBe(true);
    expect(ShippingMethodValueVO.freight().isFreight()).toBe(true);
    expect(ShippingMethodValueVO.pickup().isPickup()).toBe(true);
    expect(ShippingMethodValueVO.localDelivery().isLocalDelivery()).toBe(true);
  });
  it('predicates', () => {
    expect(ShippingMethodValueVO.express().isFastTrack()).toBe(true);
    expect(ShippingMethodValueVO.sameDay().isFastTrack()).toBe(true);
    expect(ShippingMethodValueVO.nextDay().isFastTrack()).toBe(true);
    expect(ShippingMethodValueVO.overnight().isFastTrack()).toBe(true);
    expect(ShippingMethodValueVO.standard().isFastTrack()).toBe(false);
    expect(ShippingMethodValueVO.economy().isCheap()).toBe(true);
    expect(ShippingMethodValueVO.standard().isCheap()).toBe(true);
    expect(ShippingMethodValueVO.express().isCheap()).toBe(false);
    expect(ShippingMethodValueVO.pickup().isSelfPickup()).toBe(true);
  });
  it('invalid throws', () => { expect(() => ShippingMethodValueVO.create('bad')).toThrow(); });
});

// ═══ ShippingRateType (45%) ═══
describe('ShippingRateTypeVO', () => {
  it('create + named', () => {
    expect(ShippingRateTypeVO.create('flat').value).toBe('flat');
    expect(ShippingRateTypeVO.flat().isFlat()).toBe(true);
    expect(ShippingRateTypeVO.weightBased().isWeightBased()).toBe(true);
    expect(ShippingRateTypeVO.priceBased().isPriceBased()).toBe(true);
    expect(ShippingRateTypeVO.quantityBased().isQuantityBased()).toBe(true);
    expect(ShippingRateTypeVO.distanceBased().isDistanceBased()).toBe(true);
    expect(ShippingRateTypeVO.tiered().isTiered()).toBe(true);
  });
  it('predicates', () => {
    expect(ShippingRateTypeVO.weightBased().requiresWeight()).toBe(true);
    expect(ShippingRateTypeVO.tiered().requiresWeight()).toBe(true);
    expect(ShippingRateTypeVO.distanceBased().requiresDistance()).toBe(true);
    expect(ShippingRateTypeVO.priceBased().requiresOrderValue()).toBe(true);
    expect(ShippingRateTypeVO.flat().isFixed()).toBe(true);
    expect(ShippingRateTypeVO.weightBased().isFixed()).toBe(false);
  });
  it('invalid throws', () => { expect(() => ShippingRateTypeVO.create('bad')).toThrow(); });
});

// ═══ FulfillmentPriority (41%) ═══
describe('FulfillmentPriorityVO', () => {
  it('create + named', () => {
    expect(FulfillmentPriorityVO.create('low').value).toBe('low');
    expect(FulfillmentPriorityVO.low().isLow()).toBe(true);
    expect(FulfillmentPriorityVO.normal().isNormal()).toBe(true);
    expect(FulfillmentPriorityVO.high().isHigh()).toBe(true);
    expect(FulfillmentPriorityVO.urgent().isUrgent()).toBe(true);
  });
  it('predicates', () => {
    expect(FulfillmentPriorityVO.high().isElevated()).toBe(true);
    expect(FulfillmentPriorityVO.urgent().isElevated()).toBe(true);
    expect(FulfillmentPriorityVO.normal().isElevated()).toBe(false);
    expect(FulfillmentPriorityVO.low().rank).toBe(0);
    expect(FulfillmentPriorityVO.normal().rank).toBe(1);
    expect(FulfillmentPriorityVO.high().rank).toBe(2);
    expect(FulfillmentPriorityVO.urgent().rank).toBe(3);
  });
  it('invalid throws', () => { expect(() => FulfillmentPriorityVO.create('bad')).toThrow(); });
});
