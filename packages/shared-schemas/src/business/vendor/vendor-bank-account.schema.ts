import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { MoneySchema } from '../../common/money.schema';
import { VENDOR_BANK_ACCOUNT } from '@vubon/shared-constants/src/business/vendor/vendor-bank-account.constants';

const vendorBankAccountTypeKeys = Object.keys(VENDOR_BANK_ACCOUNT.TYPES) as [string, ...string[]];
const vendorBankAccountAccountKeys = Object.keys(VENDOR_BANK_ACCOUNT.ACCOUNT_TYPES) as [
  string,
  ...string[],
];

export const VendorBankAccountSchema = BaseSchema.extend({
  accountId: z.string().uuid(),
  vendorId: z.string().uuid(),
  type: z.enum(vendorBankAccountTypeKeys),
  accountType: z.enum(vendorBankAccountAccountKeys),
  bankName: z.string().min(1).max(255),
  branchName: z.string().min(1).max(255),
  accountNumber: z.string().min(1).max(50),
  routingNumber: z.string().min(1).max(20),
  swiftCode: z.string().optional(),
  isDefault: z.boolean().default(false),
  isVerified: z.boolean().default(false),
  isActive: z.boolean().default(true),
  balance: MoneySchema,
  metadata: z.record(z.unknown()).optional(),
});
