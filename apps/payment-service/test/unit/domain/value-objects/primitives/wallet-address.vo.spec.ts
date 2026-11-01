/**
 * WalletAddressVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { WalletAddressVO } from '@domain/primitives/wallet-address.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS } from '@fixtures/ids.fixture';

describe('WalletAddressVO', () => {
  describe('create()', () => {
    it('creates valid wallet', () => {
      const vo = WalletAddressVO.create(TEST_IDS.WALLET_ADDRESS, 'bkash');
      expect(vo.address).toBe(TEST_IDS.WALLET_ADDRESS);
      expect(vo.network).toBe('bkash');
    });
    it('defaults network to generic', () => {
      expect(WalletAddressVO.create('0xabc12345').network).toBe('generic');
    });
    it('normalizes network to lowercase', () => {
      expect(WalletAddressVO.create('0xabc12345', 'BKASH').network).toBe('bkash');
    });
    it('throws on empty address', () => {
      expect(() => WalletAddressVO.create('')).toThrow(ValidationError);
    });
    it('throws on too short', () => {
      expect(() => WalletAddressVO.create('abc')).toThrow(ValidationError);
    });
    it('throws on > 128 chars', () => {
      expect(() => WalletAddressVO.create('a'.repeat(129))).toThrow(ValidationError);
    });
    it('throws on empty network', () => {
      expect(() => WalletAddressVO.create('01712345678', '')).toThrow(ValidationError);
    });
  });

  describe('reconstitute()', () => {
    it('preserves values', () => {
      const vo = WalletAddressVO.reconstitute('0xabc12345', 'eth');
      expect(vo.address).toBe('0xabc12345');
      expect(vo.network).toBe('eth');
    });
  });

  describe('isMobileWallet()', () => {
    it('true for bkash/nagad', () => {
      expect(WalletAddressVO.create('01712345678', 'bkash').isMobileWallet()).toBe(true);
      expect(WalletAddressVO.create('01712345678', 'nagad').isMobileWallet()).toBe(true);
    });
    it('false for eth', () => {
      expect(WalletAddressVO.create('0xabc12345', 'eth').isMobileWallet()).toBe(false);
    });
  });

  describe('isCrypto()', () => {
    it('true for btc/eth/usdt', () => {
      expect(WalletAddressVO.create('0xabc12345', 'btc').isCrypto()).toBe(true);
      expect(WalletAddressVO.create('0xabc12345', 'eth').isCrypto()).toBe(true);
      expect(WalletAddressVO.create('0xabc12345', 'usdt').isCrypto()).toBe(true);
    });
    it('false for bkash', () => {
      expect(WalletAddressVO.create('01712345678', 'bkash').isCrypto()).toBe(false);
    });
  });

  describe('mask()', () => {
    it('masks long address', () => {
      const masked = WalletAddressVO.create('01712345678').mask();
      expect(masked).toBe('0171***78');
    });
    it('returns ****** for short', () => {
      expect(WalletAddressVO.reconstitute('abc', 'x').mask()).toBe('******');
    });
  });
});
