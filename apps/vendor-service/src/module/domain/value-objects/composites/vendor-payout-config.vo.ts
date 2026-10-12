/**
 * VendorPayoutConfigVO — how the platform pays the vendor
 * @module vendor-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { PayoutAmountVO } from '../primitives/payout-amount.vo.js';
import {
  VENDOR_PAYOUT_METHOD,
  VENDOR_PAYOUT_CYCLE,
  VENDOR_PAYOUT,
} from '@vubon/shared-constants/business';

export type PayoutMethod = (typeof VENDOR_PAYOUT_METHOD)[keyof typeof VENDOR_PAYOUT_METHOD];
export type PayoutCycle = (typeof VENDOR_PAYOUT_CYCLE)[keyof typeof VENDOR_PAYOUT_CYCLE];

const ALLOWED_METHODS = Object.values(VENDOR_PAYOUT_METHOD) as readonly string[];
const ALLOWED_CYCLES = Object.values(VENDOR_PAYOUT_CYCLE) as readonly string[];

export interface VendorPayoutConfigVOProps {
  readonly method: PayoutMethod;
  readonly cycle: PayoutCycle;
  readonly minAmount: PayoutAmountVO;
  readonly autoPayout: boolean;
  readonly requireApproval: boolean;
  readonly bankAccountId?: string;
}

export class VendorPayoutConfigVO extends BaseVO<VendorPayoutConfigVOProps> {
  private constructor(props: VendorPayoutConfigVOProps) {
    super(props);
  }

  static create(props: VendorPayoutConfigVOProps): VendorPayoutConfigVO {
    if (!ALLOWED_METHODS.includes(props.method)) {
      throw new ValidationError(`Invalid payout method "${props.method}"`, 'method');
    }
    if (!ALLOWED_CYCLES.includes(props.cycle)) {
      throw new ValidationError(`Invalid payout cycle "${props.cycle}"`, 'cycle');
    }
    if (!(props.minAmount instanceof PayoutAmountVO)) {
      throw new ValidationError('Payout config requires PayoutAmountVO', 'minAmount');
    }
    // Bank transfer requires a bank account
    if (
      (props.method === VENDOR_PAYOUT_METHOD.BANK_TRANSFER
        || props.method === VENDOR_PAYOUT_METHOD.MOBILE_BANKING)
      && !props.bankAccountId
    ) {
      throw new ValidationError(
        `Payout method "${props.method}" requires a bank account`,
        'bankAccountId',
      );
    }
    // Auto payout cannot require approval
    if (props.autoPayout && props.requireApproval) {
      throw new ValidationError('Auto payout and requireApproval cannot both be true', 'autoPayout');
    }
    return new VendorPayoutConfigVO(props);
  }

  static reconstitute(props: VendorPayoutConfigVOProps): VendorPayoutConfigVO {
    return new VendorPayoutConfigVO(props);
  }

  static defaults(currency: string): VendorPayoutConfigVO {
    return VendorPayoutConfigVO.create({
      method: VENDOR_PAYOUT_METHOD.BANK_TRANSFER,
      cycle: VENDOR_PAYOUT_CYCLE.WEEKLY,
      minAmount: PayoutAmountVO.minimum(currency),
      autoPayout: VENDOR_PAYOUT.AUTO_PAYOUT,
      requireApproval: VENDOR_PAYOUT.REQUIRE_APPROVAL,
      bankAccountId: 'pending',
    });
  }

  get method(): PayoutMethod { return this.value.method; }
  get cycle(): PayoutCycle { return this.value.cycle; }
  get minAmount(): PayoutAmountVO { return this.value.minAmount; }
  get autoPayout(): boolean { return this.value.autoPayout; }
  get requireApproval(): boolean { return this.value.requireApproval; }
  get bankAccountId(): string | undefined { return this.value.bankAccountId; }

  /** How many hours the hold period lasts after a sale. */
  getHoldDays(): number {
    return VENDOR_PAYOUT.HOLD_DAYS;
  }

  isBankTransfer(): boolean {
    return this.value.method === VENDOR_PAYOUT_METHOD.BANK_TRANSFER;
  }

  isMobileBanking(): boolean {
    return this.value.method === VENDOR_PAYOUT_METHOD.MOBILE_BANKING;
  }

  isOnDemand(): boolean {
    return this.value.cycle === VENDOR_PAYOUT_CYCLE.ON_DEMAND;
  }

  isAutoPayoutEnabled(): boolean {
    return this.value.autoPayout;
  }

  /** Cycle duration in hours (for scheduling next payout). */
  cycleHours(): number {
    const map: Record<string, number> = {
      [VENDOR_PAYOUT_CYCLE.DAILY]: 24,
      [VENDOR_PAYOUT_CYCLE.WEEKLY]: 24 * 7,
      [VENDOR_PAYOUT_CYCLE.BIWEEKLY]: 24 * 14,
      [VENDOR_PAYOUT_CYCLE.MONTHLY]: 24 * 30,
      [VENDOR_PAYOUT_CYCLE.ON_DEMAND]: 0,
    };
    return map[this.value.cycle] ?? 24 * 7;
  }

  withBankAccount(bankAccountId: string): VendorPayoutConfigVO {
    return new VendorPayoutConfigVO({ ...this.value, bankAccountId });
  }
}
