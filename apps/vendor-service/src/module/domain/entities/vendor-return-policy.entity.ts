/**
 * VendorReturnPolicyEntity — vendor's return policy (1:1 with vendor)
 * @module vendor-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_RETURN_POLICY } from '@vubon/shared-constants/business';
import { ReturnTypeVO } from '../value-objects/primitives/return-type.vo.js';
import { ReturnWindowDaysVO } from '../value-objects/primitives/return-window-days.vo.js';
import { ReturnPolicyNoteVO } from '../value-objects/primitives/return-policy-note.vo.js';

export interface VendorReturnPolicyEntityProps {
  readonly vendorId: string;
  readonly type: ReturnTypeVO;
  readonly window: ReturnWindowDaysVO;
  readonly freeReturn: boolean;
  readonly restockFeePercent: number;
  readonly requireReason: boolean;
  readonly requireImages: boolean;
  readonly maxImages: number;
  readonly autoApprove: boolean;
  readonly approvalSlaHours: number;
  readonly exclusions: readonly string[];
  readonly note?: ReturnPolicyNoteVO;
}

export class VendorReturnPolicyEntity extends BaseEntity<string> {
  private _type: ReturnTypeVO;
  private _window: ReturnWindowDaysVO;
  private _freeReturn: boolean;
  private _restockFeePercent: number;
  private _requireReason: boolean;
  private _requireImages: boolean;
  private _maxImages: number;
  private _autoApprove: boolean;
  private _approvalSlaHours: number;
  private _exclusions: string[];
  private _note?: ReturnPolicyNoteVO;

  private readonly _vendorId: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: VendorReturnPolicyEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vendorId = props.vendorId;
    this._type = props.type;
    this._window = props.window;
    this._freeReturn = props.freeReturn;
    this._restockFeePercent = props.restockFeePercent;
    this._requireReason = props.requireReason;
    this._requireImages = props.requireImages;
    this._maxImages = props.maxImages;
    this._autoApprove = props.autoApprove;
    this._approvalSlaHours = props.approvalSlaHours;
    this._exclusions = [...props.exclusions];
    this._note = props.note;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._restockFeePercent < 0 || this._restockFeePercent > 100) {
      throw new ValidationError('Restock fee percent must be 0-100', 'restockFeePercent');
    }
    if (!Number.isInteger(this._maxImages) || this._maxImages < 0 || this._maxImages > 10) {
      throw new ValidationError('Max images must be 0-10', 'maxImages');
    }
    if (!Number.isInteger(this._approvalSlaHours) || this._approvalSlaHours <= 0) {
      throw new ValidationError('Approval SLA hours must be positive', 'approvalSlaHours');
    }
    if (!this._type.allowsReturn() && this._window.days > 0) {
      throw new ValidationError('NO_RETURN policy cannot have positive window', 'window');
    }
    if (this._exclusions.length > 50) {
      throw new ValidationError('Exclusions cannot exceed 50 items', 'exclusions');
    }
  }

  get vendorId(): string { return this._vendorId; }
  get type(): ReturnTypeVO { return this._type; }
  get window(): ReturnWindowDaysVO { return this._window; }
  get freeReturn(): boolean { return this._freeReturn; }
  get restockFeePercent(): number { return this._restockFeePercent; }
  get requireReason(): boolean { return this._requireReason; }
  get requireImages(): boolean { return this._requireImages; }
  get maxImages(): number { return this._maxImages; }
  get autoApprove(): boolean { return this._autoApprove; }
  get approvalSlaHours(): number { return this._approvalSlaHours; }
  get exclusions(): readonly string[] { return this._exclusions; }
  get note(): ReturnPolicyNoteVO | undefined { return this._note; }

  allowsReturn(): boolean { return this._type.allowsReturn(); }
  allowsRefund(): boolean { return this._type.allowsRefund(); }
  isExchangeOnly(): boolean { return this._type.isExchangeOnly(); }

  canReturnAt(deliveredAt: Date, now: Date = new Date()): boolean {
    return this._window.isWithinWindow(deliveredAt, now);
  }

  getReturnDeadline(deliveredAt: Date): Date {
    return this._window.calculateDeadline(deliveredAt);
  }

  /** Compute restock fee for a refund. */
  calculateRestockFee(refundAmount: number): number {
    if (this._freeReturn) return 0;
    return Math.round(refundAmount * (this._restockFeePercent / 100) * 100) / 100;
  }

  isExcluded(term: string): boolean {
    const lower = term.toLowerCase();
    return this._exclusions.some((e) => e.toLowerCase() === lower);
  }

  addExclusion(term: string, now: string = new Date().toISOString()): void {
    const trimmed = term.trim();
    if (!trimmed || this.isExcluded(trimmed)) return;
    if (this._exclusions.length >= 50) {
      throw new ValidationError('Exclusions cannot exceed 50 items', 'exclusions');
    }
    this._exclusions = [...this._exclusions, trimmed];
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  removeExclusion(term: string, now: string = new Date().toISOString()): void {
    const lower = term.toLowerCase();
    this._exclusions = this._exclusions.filter((e) => e.toLowerCase() !== lower);
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  updateWindow(window: ReturnWindowDaysVO, now: string = new Date().toISOString()): void {
    if (!this._type.allowsReturn() && window.days > 0) {
      throw new ValidationError('Cannot set window for NO_RETURN policy', 'window');
    }
    this._window = window;
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  updateType(type: ReturnTypeVO, now: string = new Date().toISOString()): void {
    if (!type.allowsReturn() && this._window.days > 0) {
      this._window = ReturnWindowDaysVO.create(0);
    }
    this._type = type;
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: string;
    vendorId: string;
    now: string;
    overrides?: Partial<Omit<VendorReturnPolicyEntityProps, 'vendorId'>>;
  }): VendorReturnPolicyEntity {
    const defaults: VendorReturnPolicyEntityProps = {
      vendorId: params.vendorId,
      type: ReturnTypeVO.reconstitute('full_return'),
      window: ReturnWindowDaysVO.default(),
      freeReturn: VENDOR_RETURN_POLICY.FREE_RETURN,
      restockFeePercent: VENDOR_RETURN_POLICY.RESTOCK_FEE_PERCENT,
      requireReason: VENDOR_RETURN_POLICY.REQUIRE_REASON,
      requireImages: VENDOR_RETURN_POLICY.REQUIRE_IMAGES,
      maxImages: VENDOR_RETURN_POLICY.MAX_IMAGES,
      autoApprove: VENDOR_RETURN_POLICY.AUTO_APPROVE,
      approvalSlaHours: VENDOR_RETURN_POLICY.APPROVAL_SLA_HOURS,
      exclusions: [],
    };
    return new VendorReturnPolicyEntity(params.id, params.now, params.now, {
      ...defaults,
      ...params.overrides,
    });
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: VendorReturnPolicyEntityProps;
    deletedAt?: string | null;
  }): VendorReturnPolicyEntity {
    return new VendorReturnPolicyEntity(
      params.id, params.createdAt, params.updatedAt, params.props, params.deletedAt,
    );
  }
}
