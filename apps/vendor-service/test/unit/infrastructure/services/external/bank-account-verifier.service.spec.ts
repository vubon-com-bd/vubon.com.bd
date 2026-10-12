/**
 * BankAccountVerifierService — unit tests
 */
import { BankAccountVerifierService } from '../../../../../src/module/infrastructure/services/external/bank-account-verifier.service.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

describe('BankAccountVerifierService', () => {
  let service: BankAccountVerifierService;

  beforeEach(() => {
    service = new BankAccountVerifierService();
  });

  describe('verifyBankAccount()', () => {
    it('returns verified for valid input', async () => {
      const r = await service.verifyBankAccount({
        accountNumber: '1234567890123',
        routingNumber: '123456789',
        accountHolderName: 'Md Rahim',
        bankName: 'Dutch Bangla Bank',
      });
      expect(r.verified).toBe(true);
      expect(r.referenceId).toBeDefined();
      expect(r.verifiedAt).toBeDefined();
    });

    it('rejects short account number', async () => {
      const r = await service.verifyBankAccount({
        accountNumber: '123',
        routingNumber: '123456789',
        accountHolderName: 'Md Rahim',
        bankName: 'Test Bank',
      });
      expect(r.verified).toBe(false);
      expect(r.reason).toBe('account_number_too_short');
    });

    it('rejects invalid routing number', async () => {
      const r = await service.verifyBankAccount({
        accountNumber: '1234567890123',
        routingNumber: 'abc',
        accountHolderName: 'Md Rahim',
        bankName: 'Test Bank',
      });
      expect(r.verified).toBe(false);
      expect(r.reason).toBe('invalid_routing_number');
    });

    it('returns unique reference ids', async () => {
      const a = await service.verifyBankAccount({
        accountNumber: '1234567890123',
        routingNumber: '123456789',
        accountHolderName: 'A',
        bankName: 'B',
      });
      const b = await service.verifyBankAccount({
        accountNumber: '1234567890123',
        routingNumber: '123456789',
        accountHolderName: 'A',
        bankName: 'B',
      });
      expect(a.referenceId).not.toBe(b.referenceId);
    });
  });

  describe('verifyMobileBanking()', () => {
    it('accepts valid BD mobile number (bkash)', async () => {
      const r = await service.verifyMobileBanking({
        number: '01712345678',
        provider: 'bkash',
        accountHolderName: 'Md Rahim',
      });
      expect(r.verified).toBe(true);
      expect(r.provider).toBe('bkash');
    });

    it('accepts international format', async () => {
      const r = await service.verifyMobileBanking({
        number: '8801712345678',
        provider: 'nagad',
        accountHolderName: 'Md Rahim',
      });
      expect(r.verified).toBe(true);
    });

    it('rejects invalid mobile number', async () => {
      const r = await service.verifyMobileBanking({
        number: '12345',
        provider: 'rocket',
        accountHolderName: 'Md Rahim',
      });
      expect(r.verified).toBe(false);
      expect(r.reason).toBe('invalid_mobile_number');
    });

    it('returns referenceId and verifiedAt', async () => {
      const r = await service.verifyMobileBanking({
        number: '01712345678',
        provider: 'bkash',
        accountHolderName: 'A',
      });
      expect(r.referenceId).toBeDefined();
      expect(r.verifiedAt).toBeDefined();
    });
  });

  describe('assertVerified()', () => {
    it('passes for valid input', async () => {
      await expect(
        service.assertVerified({
          accountNumber: '1234567890123',
          routingNumber: '123456789',
          accountHolderName: 'Md Rahim',
          bankName: 'Test Bank',
        }),
      ).resolves.not.toThrow();
    });

    it('throws BusinessRuleError for invalid input', async () => {
      await expect(
        service.assertVerified({
          accountNumber: '123',
          routingNumber: '123456789',
          accountHolderName: 'Md Rahim',
          bankName: 'Test Bank',
        }),
      ).rejects.toThrow(BusinessRuleError);
    });
  });
});
