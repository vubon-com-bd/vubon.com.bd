import { VendorShippingConfigVO } from '../../../../../src/module/domain/value-objects/composites/vendor-shipping-config.vo.js';
import { ShippingMethodVO } from '../../../../../src/module/domain/value-objects/primitives/shipping-method.vo.js';
import { ShippingZoneVO } from '../../../../../src/module/domain/value-objects/primitives/shipping-zone.vo.js';
import { ShippingCostVO } from '../../../../../src/module/domain/value-objects/primitives/shipping-cost.vo.js';
import { DeliveryDaysVO } from '../../../../../src/module/domain/value-objects/primitives/delivery-days.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

function makeRate(method: string, zone: string, cost = 100) {
  return {
    method: ShippingMethodVO.create(method),
    zone: ShippingZoneVO.create(zone),
    cost: ShippingCostVO.create(cost, 'BDT'),
    deliveryDays: DeliveryDaysVO.create(1, 3),
    isActive: true,
  };
}

function makeConfig(overrides: {
  rates?: ReturnType<typeof makeRate>[];
  defaultMethod?: string;
} = {}): VendorShippingConfigVO {
  return VendorShippingConfigVO.create({
    rates: overrides.rates ?? [makeRate('standard', 'inside_city')],
    defaultMethod: ShippingMethodVO.create(overrides.defaultMethod ?? 'standard'),
    trackingRequired: true,
    allowPickup: true,
    allowCourier: true,
  });
}

describe('VendorShippingConfigVO', () => {
  describe('create()', () => {
    it('creates with valid rates', () => {
      const v = makeConfig();
      expect(v.rates).toHaveLength(1);
    });

    it('throws when no rates', () => {
      expect(() => makeConfig({ rates: [] })).toThrow(ValidationError);
    });

    it('throws on duplicate method+zone', () => {
      expect(() =>
        makeConfig({
          rates: [makeRate('standard', 'inside_city'), makeRate('standard', 'inside_city')],
        }),
      ).toThrow(ValidationError);
    });

    it('throws when default method has no active rate', () => {
      expect(() =>
        makeConfig({
          rates: [makeRate('standard', 'inside_city')],
          defaultMethod: 'express',
        }),
      ).toThrow(ValidationError);
    });
  });

  describe('queries', () => {
    it('getActiveRates', () => {
      expect(makeConfig().getActiveRates()).toHaveLength(1);
    });

    it('getRatesForZone', () => {
      expect(makeConfig().getRatesForZone(ShippingZoneVO.create('inside_city'))).toHaveLength(1);
    });

    it('findRate', () => {
      const r = makeConfig().findRate(
        ShippingMethodVO.create('standard'),
        ShippingZoneVO.create('inside_city'),
      );
      expect(r).toBeDefined();
    });

    it('getCheapestRate', () => {
      const v = makeConfig({
        rates: [
          makeRate('standard', 'inside_city', 100),
          makeRate('express', 'inside_city', 200),
        ],
      });
      expect(v.getCheapestRate(ShippingZoneVO.create('inside_city'))?.cost.amount).toBe(100);
    });

    it('getFastestRate', () => {
      const v = makeConfig({
        rates: [
          { ...makeRate('standard', 'inside_city'), deliveryDays: DeliveryDaysVO.create(3, 5) },
          { ...makeRate('express', 'inside_city'), deliveryDays: DeliveryDaysVO.create(1, 2) },
        ],
      });
      expect(v.getFastestRate(ShippingZoneVO.create('inside_city'))?.method.value).toBe('express');
    });

    it('supportsZone', () => {
      expect(makeConfig().supportsZone(ShippingZoneVO.create('inside_city'))).toBe(true);
      expect(makeConfig().supportsZone(ShippingZoneVO.create('international'))).toBe(false);
    });

    it('supportsMethod', () => {
      expect(makeConfig().supportsMethod(ShippingMethodVO.create('standard'))).toBe(true);
      expect(makeConfig().supportsMethod(ShippingMethodVO.create('express'))).toBe(false);
    });

    it('getCheapestRate undefined for no zone rates', () => {
      expect(makeConfig().getCheapestRate(ShippingZoneVO.create('international'))).toBeUndefined();
    });

    it('getFastestRate undefined for no zone rates', () => {
      expect(makeConfig().getFastestRate(ShippingZoneVO.create('international'))).toBeUndefined();
    });
  });
});
