import { VendorBankAccountVO } from '../../../../../src/module/domain/value-objects/composites/vendor-bank-account.vo.js';
import { BankNameVO } from '../../../../../src/module/domain/value-objects/primitives/bank-name.vo.js';
import { BankAccountNumberVO } from '../../../../../src/module/domain/value-objects/primitives/bank-account-number.vo.js';
import { BankRoutingNumberVO } from '../../../../../src/module/domain/value-objects/primitives/bank-routing-number.vo.js';
import { AccountHolderNameVO } from '../../../../../src/module/domain/value-objects/primitives/account-holder-name.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

function makeBankAccount(): VendorBankAccountVO {
  return VendorBankAccountVO.create({
    bankName: BankNameVO.create('Dutch Bangla Bank'),
    accountNumber: BankAccountNumberVO.create('1234567890123'),
    routingNumber: BankRoutingNumberVO.create('123456789'),
    accountHolderName: AccountHolderNameVO.create('Md Rahim Uddin'),
  });
}

describe('VendorBankAccountVO', () => {
  describe('create()', () => {
    it('creates with all fields', () => {
      const v = makeBankAccount();
      expect(v.bankName.value).toBe('Dutch Bangla Bank');
      expect(v.accountNumber.last4()).toBe('0123');
    });

    it('throws on invalid bankName type', () => {
      expect(() =>
        VendorBankAccountVO.create({
          bankName: 'bad' as never,
          accountNumber: BankAccountNumberVO.create('12345678'),
          routingNumber: BankRoutingNumberVO.create('123456789'),
          accountHolderName: AccountHolderNameVO.create('Md Rahim'),
        }),
      ).toThrow(ValidationError);
    });
  });

  describe('masked()', () => {
    it('returns masked representation', () => {
      const r = makeBankAccount().masked();
      expect(r.accountNumber).toContain('*');
      expect(r.bankName).toBe('Dutch Bangla Bank');
    });
  });

  describe('fingerprint()', () => {
    it('returns routing:last4', () => {
      const r = makeBankAccount().fingerprint();
      expect(r).toContain('123456789');
      expect(r).toContain('0123');
    });

    it('same fingerprint for same routing + last4', () => {
      const a = makeBankAccount();
      const b = VendorBankAccountVO.create({
        bankName: BankNameVO.create('Other Bank'),
        accountNumber: BankAccountNumberVO.create('9999999990123'),
        routingNumber: BankRoutingNumberVO.create('123456789'),
        accountHolderName: AccountHolderNameVO.create('Md Rahim'),
      });
      expect(a.fingerprint()).toBe(b.fingerprint());
    });
  });
});
