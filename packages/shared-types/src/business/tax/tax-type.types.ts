/**
 * Tax Type Value Types
 * @module shared-types/business/tax
 *
 * Values আসে shared-constants/business/tax/tax-type.constants থেকে।
 */

import type { TAX_TYPE, TAX_CATEGORY } from '@vubon/shared-constants/business';

export type TaxTypeValue = (typeof TAX_TYPE)[keyof typeof TAX_TYPE];

export type TaxCategoryValue = (typeof TAX_CATEGORY)[keyof typeof TAX_CATEGORY];

export interface TaxTypeMetadata {
  readonly value: TaxTypeValue;
  readonly label: string;
  readonly category: TaxCategoryValue;
  readonly isPercentage: boolean;
}
