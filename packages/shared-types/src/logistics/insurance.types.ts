import { BaseEntity } from '../common/base.types';
import { Money } from '../common/money.types';
import { INSURANCE } from '@vubon/shared-constants/src/logistics/insurance.constants';
import { CURRENCY } from '@vubon/shared-constants/src/common/currency.constants';
import { Shipment } from './shipment.types';

export interface Insurance extends BaseEntity {
  insuranceId: string;
  shipmentId: string;
  shipment: Shipment;
  provider: string;
  policyNumber: string;
  status: keyof typeof INSURANCE.STATUS | string;
  type: keyof typeof INSURANCE.TYPES | string;
  coverageAmount: Money;
  premiumAmount: Money;
  coveragePercentage: number;
  deductable: Money;
  currency: keyof typeof CURRENCY | string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  claimStatus?: 'none' | 'pending' | 'approved' | 'rejected' | 'settled';
  claimAmount?: Money;
  claimDate?: Date;
  settlementDate?: Date;
  notes?: string;
  metadata: Record<string, unknown>;
}
