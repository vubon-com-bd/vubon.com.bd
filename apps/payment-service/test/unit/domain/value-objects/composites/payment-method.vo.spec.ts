/**
 * PaymentMethodVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { PaymentMethodVO } from '@domain/composites/payment-method.vo';
import { PaymentMethodIdVO } from '@domain/primitives/payment-method-id.vo';
import { PaymentMethodTypeVO } from '@domain/primitives/payment-method-type.vo';
import { PaymentMethodProviderVO } from '@domain/primitives/payment-method-provider.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS, TEST_DATES } from '@fixtures/index';

function makeProps(overrides: Partial<Parameters<typeof PaymentMethodVO.create>[0]> = {}) {
  return {
    id: PaymentMethodIdVO.create(TEST_IDS.METHOD_ID),
    type: PaymentMethodTypeVO.create('card', 'online'),
    provider: PaymentMethodProviderVO.create('stripe', 'sandbox'),
    label: 'Credit Card',
    isActive: true,
    createdAt: TEST_DATES.NOW,
    updatedAt: TEST_DATES.NOW,
    ...overrides,
  };
}

describe('PaymentMethodVO', () => {
  describe('create()', () => {
    it('creates valid payment method', () => {
      const vo = PaymentMethodVO.create(makeProps());
      expect(vo.label).toBe('Credit Card');
      expect(vo.isActive).toBe(true);
      expect(vo.isOnline()).toBe(true);
    });
    it('throws when label missing', () => {
      expect(() => PaymentMethodVO.create(makeProps({ label: '' }))).toThrow(ValidationError);
    });
    it('throws when online method without provider', () => {
      expect(() =>
        PaymentMethodVO.create(makeProps({ provider: undefined })),
      ).toThrow(ValidationError);
    });
    it('accepts COD without provider', () => {
      const vo = PaymentMethodVO.create(
        makeProps({
          type: PaymentMethodTypeVO.create('cash_on_delivery', 'offline'),
          provider: undefined,
          label: 'COD',
        }),
      );
      expect(vo.isCod()).toBe(true);
    });
  });

  describe('reconstitute()', () => {
    it('does not re-validate', () => {
      const vo = PaymentMethodVO.reconstitute(makeProps({ label: '' }));
      expect(vo.label).toBe('');
    });
  });

  describe('predicates', () => {
    it('isOnline / isCard', () => {
      const vo = PaymentMethodVO.create(makeProps());
      expect(vo.isOnline()).toBe(true);
      expect(vo.isCard()).toBe(true);
      expect(vo.isCod()).toBe(false);
    });
    it('isUsable — active with provider', () => {
      expect(PaymentMethodVO.create(makeProps()).isUsable()).toBe(true);
    });
    it('isUsable — inactive', () => {
      expect(PaymentMethodVO.create(makeProps({ isActive: false })).isUsable()).toBe(false);
    });
    it('isUsable — COD no provider', () => {
      const vo = PaymentMethodVO.create(
        makeProps({
          type: PaymentMethodTypeVO.create('cash_on_delivery', 'offline'),
          provider: undefined,
        }),
      );
      expect(vo.isUsable()).toBe(true);
    });
  });
});
