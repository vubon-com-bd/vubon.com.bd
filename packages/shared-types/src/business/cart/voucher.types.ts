/**
 * Voucher Types
 * @module shared-types/business/cart
 *
 * Values আসে shared-constants/business/cart/voucher.constants থেকে।
 */

import type { VOUCHER_STATUS, VOUCHER_TYPE } from '@vubon/shared-constants/business';
import type { VoucherId, Money, UserId } from '../../common/primitives';
import type { BaseEntity } from '../../common/base';

export type VoucherStatusValue = (typeof VOUCHER_STATUS)[keyof typeof VOUCHER_STATUS];

export type VoucherTypeValue = (typeof VOUCHER_TYPE)[keyof typeof VOUCHER_TYPE];

export interface Voucher extends BaseEntity<VoucherId> {
  readonly code: string;
  readonly type: VoucherTypeValue;
  readonly status: VoucherStatusValue;
  readonly initialAmount: Money;
  readonly remainingAmount: Money;
  readonly currency: string;
  readonly issuedTo?: UserId;
  readonly issuedBy?: UserId;
  readonly orderId?: string;
  readonly expiresAt: string;
  readonly redeemedAt?: string;
  readonly partialRedeemAllowed: boolean;
  readonly isActive: boolean;
}

export interface VoucherPublic {
  readonly id: VoucherId;
  readonly code: string;
  readonly type: VoucherTypeValue;
  readonly remainingAmount: Money;
  readonly currency: string;
  readonly expiresAt: string;
}

export interface VoucherRedeemInput {
  readonly code: string;
  readonly userId: UserId;
  readonly orderId: string;
  readonly amount: Money;
}

export interface VoucherRedeemResult {
  readonly success: boolean;
  readonly voucherId?: VoucherId;
  readonly redeemedAmount?: Money;
  readonly remainingAmount?: Money;
  readonly reason?: string;
}

export interface VoucherUsage {
  readonly voucherId: VoucherId;
  readonly userId: UserId;
  readonly orderId: string;
  readonly redeemedAmount: Money;
  readonly redeemedAt: string;
}
