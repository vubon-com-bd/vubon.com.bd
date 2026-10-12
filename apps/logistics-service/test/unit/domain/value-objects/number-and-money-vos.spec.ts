/**
 * Tests for Number VOs, Text VOs, Money VOs.
 */
import { describe, it, expect } from '@jest/globals';

import { WeightKgVO } from '@domain/value-objects/primitives/weight-kg.vo.js';
import { VolumeM3VO } from '@domain/value-objects/primitives/volume-m3.vo.js';
import { DimensionCmVO } from '@domain/value-objects/primitives/dimension-cm.vo.js';
import { DistanceKmVO } from '@domain/value-objects/primitives/distance-km.vo.js';
import { DurationMinutesVO } from '@domain/value-objects/primitives/duration-minutes.vo.js';
import { UtilizationPercentVO } from '@domain/value-objects/primitives/utilization-percent.vo.js';
import { AttemptNumberVO } from '@domain/value-objects/primitives/attempt-number.vo.js';
import { StopOrderVO } from '@domain/value-objects/primitives/stop-order.vo.js';
import { TrackingNumberVO } from '@domain/value-objects/primitives/tracking-number.vo.js';
import { RmaNumberVO } from '@domain/value-objects/primitives/rma-number.vo.js';
import { PolicyNumberVO } from '@domain/value-objects/primitives/policy-number.vo.js';
import { DispatchNumberVO } from '@domain/value-objects/primitives/dispatch-number.vo.js';
import { IdempotencyKeyVO } from '@domain/value-objects/primitives/idempotency-key.vo.js';
import { NotesVO } from '@domain/value-objects/primitives/notes.vo.js';
import { ReasonTextVO } from '@domain/value-objects/primitives/reason-text.vo.js';
import { DescriptionTextVO } from '@domain/value-objects/primitives/description-text.vo.js';
import { WarehouseCodeVO } from '@domain/value-objects/primitives/warehouse-code.vo.js';
import { RouteCodeVO } from '@domain/value-objects/primitives/route-code.vo.js';
import { CodAmountVO } from '@domain/value-objects/primitives/cod-amount.vo.js';
import { DeclaredValueVO } from '@domain/value-objects/primitives/declared-value.vo.js';
import { ShippingCostVO } from '@domain/value-objects/primitives/shipping-cost.vo.js';
import { InsurancePremiumVO } from '@domain/value-objects/primitives/insurance-premium.vo.js';
import { RefundAmountVO } from '@domain/value-objects/primitives/refund-amount.vo.js';
import { DistanceSurchargeVO } from '@domain/value-objects/primitives/distance-surcharge.vo.js';

// ═══ NUMBERS ═══
describe('WeightKgVO', () => {
  it('create positive', () => { expect(WeightKgVO.create(5.5).value).toBe(5.5); });
  it('rejects 0', () => { expect(() => WeightKgVO.create(0)).toThrow(); });
  it('rejects negative', () => { expect(() => WeightKgVO.create(-1)).toThrow(); });
  it('rejects above max (500)', () => { expect(() => WeightKgVO.create(600)).toThrow(); });
  it('toGrams', () => { expect(WeightKgVO.create(1.5).toGrams()).toBe(1500); });
  it('isHeavy', () => { expect(WeightKgVO.create(50).isHeavy()).toBe(true); });
});

describe('VolumeM3VO', () => {
  it('create + toLiters', () => { expect(VolumeM3VO.create(1.5).toLiters()).toBe(1500); });
  it('rejects > 2', () => { expect(() => VolumeM3VO.create(5)).toThrow(); });
});

describe('DimensionCmVO', () => {
  it('create + girth + longest side', () => {
    const d = DimensionCmVO.create(20, 10, 15);
    expect(d.lengthCm).toBe(20);
    expect(d.girthCm).toBe(50);
    expect(d.longestSideCm).toBe(20);
    expect(d.volumetricWeightKg).toBeGreaterThan(0);
  });
  it('rejects zero', () => { expect(() => DimensionCmVO.create(0, 10, 10)).toThrow(); });
});

describe('DistanceKmVO', () => {
  it('create + toMeters', () => { expect(DistanceKmVO.create(5).toMeters()).toBe(5000); });
  it('add', () => { expect(DistanceKmVO.create(5).add(DistanceKmVO.create(3)).value).toBe(8); });
  it('isLongHaul', () => { expect(DistanceKmVO.create(600).isLongHaul()).toBe(true); });
  it('isShortHaul', () => { expect(DistanceKmVO.create(10).isShortHaul()).toBe(true); });
});

describe('DurationMinutesVO', () => {
  it('create + hours/minutes', () => {
    const d = DurationMinutesVO.create(125);
    expect(d.hours).toBe(2);
    expect(d.remainingMinutes).toBe(5);
  });
  it('add', () => { expect(DurationMinutesVO.create(60).add(DurationMinutesVO.create(30)).value).toBe(90); });
});

describe('UtilizationPercentVO', () => {
  it('fromUsage', () => { expect(UtilizationPercentVO.fromUsage(50, 100).value).toBe(50); });
  it('thresholds', () => {
    expect(UtilizationPercentVO.create(10).isLow()).toBe(true);
    expect(UtilizationPercentVO.create(90).isHigh()).toBe(true);
    expect(UtilizationPercentVO.create(99).isFull()).toBe(true);
  });
  it('rejects > 100', () => { expect(() => UtilizationPercentVO.create(101)).toThrow(); });
});

describe('AttemptNumberVO', () => {
  it('first', () => { expect(AttemptNumberVO.first().value).toBe(1); });
  it('next', () => { expect(AttemptNumberVO.create(2).next().value).toBe(3); });
  it('isFirst', () => { expect(AttemptNumberVO.first().isFirst()).toBe(true); });
  it('isLast', () => { expect(AttemptNumberVO.create(3).isLast()).toBe(true); });
  it('rejects 0', () => { expect(() => AttemptNumberVO.create(0)).toThrow(); });
  it('rejects > 3', () => { expect(() => AttemptNumberVO.create(4)).toThrow(); });
});

describe('StopOrderVO', () => {
  it('first is 0', () => { expect(StopOrderVO.first().value).toBe(0); });
  it('next', () => { expect(StopOrderVO.create(3).next().value).toBe(4); });
  it('rejects negative', () => { expect(() => StopOrderVO.create(-1)).toThrow(); });
});

// ═══ NUMBER-CODES ═══
describe('TrackingNumberVO', () => {
  it('generate has prefix', () => { expect(TrackingNumberVO.generate().value.startsWith('SH')).toBe(true); });
  it('create valid', () => { expect(TrackingNumberVO.create('SHTEST12345678').value).toBe('SHTEST12345678'); });
  it('rejects invalid', () => { expect(() => TrackingNumberVO.create('@@')).toThrow(); });
  it('startsWithShipmentPrefix', () => { expect(TrackingNumberVO.create('SHTEST12345678').startsWithShipmentPrefix()).toBe(true); });
});

describe('RmaNumberVO', () => {
  it('generate + year/seq', () => {
    const r = RmaNumberVO.generate(123, 2026);
    expect(r.value).toBe('RMA-2026-000123');
    expect(r.year).toBe(2026);
    expect(r.sequence).toBe(123);
  });
  it('create valid', () => { expect(RmaNumberVO.create('RMA-2026-000123').value).toBe('RMA-2026-000123'); });
  it('rejects invalid', () => { expect(() => RmaNumberVO.create('nope')).toThrow(); });
});

describe('PolicyNumberVO', () => {
  it('generate', () => { expect(PolicyNumberVO.generate(5, 2026).value).toBe('POL-2026-000005'); });
  it('rejects invalid', () => { expect(() => PolicyNumberVO.create('nope')).toThrow(); });
});

describe('DispatchNumberVO', () => {
  it('generate', () => {
    const d = DispatchNumberVO.generate(42, new Date('2026-05-15'));
    expect(d.value).toBe('DSP-20260515-0042');
    expect(d.sequence).toBe(42);
  });
  it('rejects invalid', () => { expect(() => DispatchNumberVO.create('nope')).toThrow(); });
});

describe('IdempotencyKeyVO', () => {
  it('generate is UUID', () => { expect(IdempotencyKeyVO.generate().isUuid()).toBe(true); });
  it('create min 8 chars', () => { expect(() => IdempotencyKeyVO.create('short')).toThrow(); });
  it('create valid', () => { expect(IdempotencyKeyVO.create('12345678').value).toBe('12345678'); });
});

// ═══ TEXT ═══
describe('NotesVO', () => {
  it('create + length', () => { expect(NotesVO.create('hello').length).toBe(5); });
  it('empty allowed', () => { expect(NotesVO.empty().isEmpty).toBe(true); });
  it('rejects > 1000', () => { expect(() => NotesVO.create('x'.repeat(1001))).toThrow(); });
});

describe('ReasonTextVO', () => {
  it('min 2', () => { expect(() => ReasonTextVO.create('a')).toThrow(); });
  it('max 500', () => { expect(() => ReasonTextVO.create('x'.repeat(501))).toThrow(); });
  it('create valid', () => { expect(ReasonTextVO.create('valid reason').value).toBe('valid reason'); });
});

describe('DescriptionTextVO', () => {
  it('max 5000', () => { expect(() => DescriptionTextVO.create('x'.repeat(5001))).toThrow(); });
  it('empty ok', () => { expect(DescriptionTextVO.empty().isEmpty).toBe(true); });
});

describe('WarehouseCodeVO', () => {
  it('uppercases + valid', () => { expect(WarehouseCodeVO.create('wh-01').value).toBe('WH-01'); });
  it('rejects bad', () => { expect(() => WarehouseCodeVO.create('!@')).toThrow(); });
});

describe('RouteCodeVO', () => {
  it('uppercases + valid', () => { expect(RouteCodeVO.create('rt-01').value).toBe('RT-01'); });
  it('rejects bad', () => { expect(() => RouteCodeVO.create('!@')).toThrow(); });
});

// ═══ MONEY ═══
describe('CodAmountVO', () => {
  it('create', () => { expect(CodAmountVO.create(500, 'BDT').amount).toBe(500); });
  it('zero factory', () => { expect(CodAmountVO.zero('BDT').isZero()).toBe(true); });
  it('rejects above 50000', () => { expect(() => CodAmountVO.create(60000, 'BDT')).toThrow(); });
});

describe('DeclaredValueVO', () => {
  it('create + currency', () => {
    const d = DeclaredValueVO.create(5000, 'BDT');
    expect(d.amount).toBe(5000);
    expect(d.currency).toBe('BDT');
  });
  it('isAboveInsuranceThreshold', () => { expect(DeclaredValueVO.create(1500, 'BDT').isAboveInsuranceThreshold()).toBe(true); });
  it('rejects > 10M', () => { expect(() => DeclaredValueVO.create(20000000, 'BDT')).toThrow(); });
});

describe('ShippingCostVO', () => {
  it('create + isFree', () => {
    expect(ShippingCostVO.zero('BDT').isFree()).toBe(true);
    expect(ShippingCostVO.create(100, 'BDT').isFree()).toBe(false);
  });
  it('rejects negative', () => { expect(() => ShippingCostVO.create(-1, 'BDT')).toThrow(); });
});

describe('InsurancePremiumVO', () => {
  it('calculate', () => {
    const p = InsurancePremiumVO.calculate(10000, 1, 'BDT');
    expect(p.amount).toBe(100);
  });
  it('rejects invalid percent', () => { expect(() => InsurancePremiumVO.calculate(10000, -1, 'BDT')).toThrow(); });
});

describe('RefundAmountVO', () => {
  it('applyRestockFee', () => {
    const r = RefundAmountVO.create(1000, 'BDT').applyRestockFee(10);
    expect(r.amount).toBe(900);
  });
  it('rejects negative', () => { expect(() => RefundAmountVO.create(-1, 'BDT')).toThrow(); });
});

describe('DistanceSurchargeVO', () => {
  it('zero', () => { expect(DistanceSurchargeVO.zero('BDT').isZero()).toBe(true); });
  it('rejects negative', () => { expect(() => DistanceSurchargeVO.create(-1, 'BDT')).toThrow(); });
});
