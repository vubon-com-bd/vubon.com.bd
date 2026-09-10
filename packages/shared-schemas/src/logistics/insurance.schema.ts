import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { MoneySchema } from '../common/money.schema';
import { ShipmentSchema } from './shipment.schema';
import { INSURANCE } from '@vubon/shared-constants/src/logistics/insurance.constants';
import { CURRENCY } from '@vubon/shared-constants/src/common/currency.constants';

const insuranceStatusKeys = Object.keys(INSURANCE.STATUS) as [string, ...string[]];
const insuranceTypeKeys = Object.keys(INSURANCE.TYPES) as [string, ...string[]];
const currencyKeys = Object.keys(CURRENCY) as [string, ...string[]];

export const InsuranceSchema = BaseSchema.extend({
  insuranceId: z.string().uuid(),
  shipmentId: z.string().uuid(),
  shipment: ShipmentSchema,
  provider: z.string(),
  policyNumber: z.string(),
  status: z.enum(insuranceStatusKeys),
  type: z.enum(insuranceTypeKeys),
  coverageAmount: MoneySchema,
  premiumAmount: MoneySchema,
  coveragePercentage: z.number().min(0).max(100),
  deductable: MoneySchema,
  currency: z.enum(currencyKeys),
  startDate: z.date(),
  endDate: z.date(),
  isActive: z.boolean().default(true),
  claimStatus: z.enum(['none', 'pending', 'approved', 'rejected', 'settled']).default('none'),
  claimAmount: MoneySchema.optional(),
  claimDate: z.date().optional(),
  settlementDate: z.date().optional(),
  notes: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});
