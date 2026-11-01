/**
 * CardDetailsVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { CardDetailsVO } from '@domain/composites/card-details.vo';
import { CardTokenVO } from '@domain/primitives/card-token.vo';
import { CardLast4VO } from '@domain/primitives/card-last4.vo';
import { CardBrandVO } from '@domain/primitives/card-brand.vo';
import { CardExpiryVO } from '@domain/primitives/card-expiry.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS } from '@fixtures/index';

const REF_DATE = new Date('2025-01-15');

function makeProps(overrides: Partial<Parameters<typeof CardDetailsVO.create>[0]> = {}) {
  return {
    token: CardTokenVO.create(TEST_IDS.CARD_TOKEN),
    last4: CardLast4VO.create('4242'),
    brand: CardBrandVO.create('visa'),
    expiry: CardExpiryVO.create(12, 2030, REF_DATE),
    ...overrides,
  };
}

describe('CardDetailsVO', () => {
  describe('create()', () => {
    it('creates valid card', () => {
      const vo = CardDetailsVO.create(makeProps());
      expect(vo.last4.value).toBe('4242');
      expect(vo.brand.value).toBe('visa');
    });
    it('accepts holder name', () => {
      const vo = CardDetailsVO.create(makeProps({ holderName: 'John Doe' }));
      expect(vo.holderName).toBe('John Doe');
    });
    it('throws when holderName is blank', () => {
      expect(() => CardDetailsVO.create(makeProps({ holderName: '   ' }))).toThrow(ValidationError);
    });
  });

  describe('reconstitute()', () => {
    it('skips validation', () => {
      const vo = CardDetailsVO.reconstitute(makeProps({ holderName: '   ' }));
      expect(vo.holderName).toBe('   ');
    });
  });

  describe('display()', () => {
    it('shows brand + masked last4', () => {
      const display = CardDetailsVO.create(makeProps()).display();
      expect(display).toContain('VISA');
      expect(display).toContain('**** **** **** 4242');
    });
  });
});
