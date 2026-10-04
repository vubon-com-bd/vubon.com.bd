/**
 * Tax Rate Value Types
 * @module shared-types/business/tax
 *
 * Values আসে shared-constants/business/tax/tax-rate.constants থেকে।
 */

import type { TAX_RATE, TAX_RATE_TYPE, TAX_INCLUSION } from '@vubon/shared-constants/business';

export type TaxRateValue = (typeof TAX_RATE)[keyof typeof TAX_RATE];

export type TaxRateTypeValue = (typeof TAX_RATE_TYPE)[keyof typeof TAX_RATE_TYPE];

export type TaxInclusionValue = (typeof TAX_INCLUSION)[keyof typeof TAX_INCLUSION];

export interface TaxRateMetadata {
  readonly value: TaxRateValue;
  readonly label: string;
  readonly type: TaxRateTypeValue;
  readonly inclusion: TaxInclusionValue;
}

export interface TaxRateDefinition {
  readonly id: string;
  readonly name: string;
  readonly type: TaxRateTypeValue;
  readonly rate: number;
  readonly inclusion: TaxInclusionValue;
  readonly region: string;
  readonly isActive: boolean;
  readonly effectiveFrom: string;
  readonly effectiveTo?: string;
}
