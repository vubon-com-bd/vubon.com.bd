import { TAX } from '@vubon/shared-constants/src/common/tax.constants';

export const taxConfig = {
  defaultRate: TAX.BD.VAT_STANDARD,
  inclusive: true,
  taxTypes: Object.values(TAX.TYPE) as readonly string[],
  exemptThreshold: 1000,
} as const;
