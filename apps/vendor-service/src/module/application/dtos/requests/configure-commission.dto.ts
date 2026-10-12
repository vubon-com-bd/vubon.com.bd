/**
 * ConfigureCommissionRequestDto — set commission rules
 * @module vendor-service/application/dtos/requests
 */
import type { VENDOR_COMMISSION_TYPE } from '@vubon/shared-constants/business';

export class ConfigureCommissionRequestDto {
  vendorId!: string;
  type!: (typeof VENDOR_COMMISSION_TYPE)[keyof typeof VENDOR_COMMISSION_TYPE];
  percent!: number;
  fixedAmount?: number;
  currency!: string;
  applyOnShipping!: boolean;
  applyOnTax!: boolean;
  effectiveFrom?: string;
  effectiveTo?: string;
  idempotencyKey?: string;
}
