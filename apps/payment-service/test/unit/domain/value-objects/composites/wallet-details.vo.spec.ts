/**
 * WalletDetailsVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { WalletDetailsVO } from '@domain/composites/wallet-details.vo';
import { WalletAddressVO } from '@domain/primitives/wallet-address.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS } from '@fixtures/index';

function makeProps(overrides: Partial<Parameters<typeof WalletDetailsVO.create>[0]> = {}) {
  return {
    wallet: WalletAddressVO.create(TEST_IDS.WALLET_ADDRESS, 'bkash'),
    provider: 'bkash',
    isVerified: true,
    ...overrides,
  };
}

describe('WalletDetailsVO', () => {
  describe('create()', () => {
    it('creates valid wallet', () => {
      const vo = WalletDetailsVO.create(makeProps());
      expect(vo.provider).toBe('bkash');
      expect(vo.isVerified).toBe(true);
    });
    it('accepts holder name', () => {
      const vo = WalletDetailsVO.create(makeProps({ holderName: 'Jane Doe' }));
      expect(vo.holderName).toBe('Jane Doe');
    });
    it('throws when provider missing', () => {
      expect(() => WalletDetailsVO.create(makeProps({ provider: '' }))).toThrow(ValidationError);
    });
    it('throws when holderName blank', () => {
      expect(() => WalletDetailsVO.create(makeProps({ holderName: '   ' }))).toThrow(ValidationError);
    });
  });

  describe('reconstitute()', () => {
    it('skips validation', () => {
      const vo = WalletDetailsVO.reconstitute(makeProps({ provider: '' }));
      expect(vo.provider).toBe('');
    });
  });

  describe('display()', () => {
    it('shows provider + masked wallet', () => {
      const display = WalletDetailsVO.create(makeProps()).display();
      expect(display).toContain('BKASH');
      expect(display).toContain('***');
    });
  });
});
