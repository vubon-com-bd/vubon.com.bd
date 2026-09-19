/**
 * Tax Core Types
 * @module shared-types/business/tax
 *
 * Tax configuration + calculation।
 */

import type { Money } from '../../common/primitives';
import type { BaseEntity } from '../../common/base';
import type { TaxTypeValue, TaxCategoryValue } from './tax-type.types';
import type { TaxRateTypeValue, TaxInclusionValue } from './tax-rate.types';

export type TaxStatusValue = 'active' | 'inactive' | 'draft' | 'archived' | 'expired';

export type TaxAppliesToValue =
  'product' | 'category' | 'brand' | 'shipping' | 'service' | 'digital' | 'order';

export type TaxRegionValue = 'bd' | 'in' | 'us' | 'eu' | 'uk' | 'ae' | 'sa' | 'global';

export interface Tax extends BaseEntity<string> {
  readonly name: string;
  readonly code: string;
  readonly type: TaxTypeValue;
  readonly category: TaxCategoryValue;
  readonly status: TaxStatusValue;
  readonly appliesTo: TaxAppliesToValue;
  readonly region: TaxRegionValue;
  readonly rate: number;
  readonly rateType: TaxRateTypeValue;
  readonly inclusion: TaxInclusionValue;
  readonly description?: string;
  readonly isCompound: boolean;
  readonly priority: number;
  readonly effectiveFrom: string;
  readonly effectiveTo?: string;
}

export interface TaxPublic {
  readonly id: string;
  readonly name: string;
  readonly code: string;
  readonly type: TaxTypeValue;
  readonly rate: number;
  readonly inclusion: TaxInclusionValue;
  readonly region: TaxRegionValue;
}

export interface TaxCalculationInput {
  readonly amount: Money;
  readonly currency: string;
  readonly region?: TaxRegionValue;
  readonly productType?: string;
  readonly categoryIds?: readonly string[];
}

export interface TaxCalculationResult {
  readonly taxableAmount: Money;
  readonly taxAmount: Money;
  readonly totalAmount: Money;
  readonly currency: string;
  readonly appliedTaxes: readonly AppliedTax[];
}

export interface AppliedTax {
  readonly taxId: string;
  readonly name: string;
  readonly rate: number;
  readonly amount: Money;
}

export interface TaxRule {
  readonly id: string;
  readonly taxId: string;
  readonly condition: Readonly<Record<string, unknown>>;
  readonly overrideRate?: number;
  readonly priority: number;
  readonly isActive: boolean;
}
