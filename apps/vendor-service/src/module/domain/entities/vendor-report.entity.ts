/**
 * VendorReportEntity — generated report record
 * @module vendor-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_REPORT } from '@vubon/shared-constants/business';
import { VendorReportTypeVO } from '../value-objects/primitives/vendor-report-type.vo.js';
import { VendorReportFormatVO } from '../value-objects/primitives/vendor-report-format.vo.js';
import { VendorReportPeriodVO } from '../value-objects/primitives/vendor-report-period.vo.js';
import { VendorReportStatusVO } from '../value-objects/primitives/vendor-report-status.vo.js';

export interface VendorReportEntityProps {
  readonly vendorId: string;
  readonly type: VendorReportTypeVO;
  readonly format: VendorReportFormatVO;
  readonly period: VendorReportPeriodVO;
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly status: VendorReportStatusVO;
  readonly fileUrl?: string;
  readonly fileSize?: number;
  readonly generatedAt?: string;
  readonly expiresAt?: string;
  readonly generatedBy?: string;
  readonly failureReason?: string;
}

export class VendorReportEntity extends AggregateRoot<string> {
  private _status: VendorReportStatusVO;
  private _fileUrl?: string;
  private _fileSize?: number;
  private _generatedAt?: string;
  private _expiresAt?: string;
  private _failureReason?: string;

  private readonly _vendorId: string;
  private readonly _type: VendorReportTypeVO;
  private readonly _format: VendorReportFormatVO;
  private readonly _period: VendorReportPeriodVO;
  private readonly _periodStart: string;
  private readonly _periodEnd: string;
  private readonly _generatedBy?: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: VendorReportEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vendorId = props.vendorId;
    this._type = props.type;
    this._format = props.format;
    this._period = props.period;
    this._periodStart = props.periodStart;
    this._periodEnd = props.periodEnd;
    this._status = props.status;
    this._fileUrl = props.fileUrl;
    this._fileSize = props.fileSize;
    this._generatedAt = props.generatedAt;
    this._expiresAt = props.expiresAt;
    this._generatedBy = props.generatedBy;
    this._failureReason = props.failureReason;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (Date.parse(this._periodEnd) < Date.parse(this._periodStart)) {
      throw new ValidationError('periodEnd must be after periodStart', 'periodEnd');
    }
    const diffDays = (Date.parse(this._periodEnd) - Date.parse(this._periodStart)) / (24 * 60 * 60 * 1000);
    if (diffDays > VENDOR_REPORT.MAX_DATE_RANGE_DAYS) {
      throw new ValidationError(
        `Date range cannot exceed ${VENDOR_REPORT.MAX_DATE_RANGE_DAYS} days`,
        'period',
      );
    }
    if (this._fileSize !== undefined && (this._fileSize < 0 || !Number.isInteger(this._fileSize))) {
      throw new ValidationError('File size must be a non-negative integer', 'fileSize');
    }
    if (this._status.isReady() && !this._fileUrl) {
      throw new ValidationError('Ready report requires fileUrl', 'fileUrl');
    }
    if (this._status.isFailed() && !this._failureReason) {
      throw new ValidationError('Failed report requires failureReason', 'failureReason');
    }
  }

  get vendorId(): string { return this._vendorId; }
  get type(): VendorReportTypeVO { return this._type; }
  get format(): VendorReportFormatVO { return this._format; }
  get period(): VendorReportPeriodVO { return this._period; }
  get periodStart(): string { return this._periodStart; }
  get periodEnd(): string { return this._periodEnd; }
  get status(): VendorReportStatusVO { return this._status; }
  get fileUrl(): string | undefined { return this._fileUrl; }
  get fileSize(): number | undefined { return this._fileSize; }
  get generatedAt(): string | undefined { return this._generatedAt; }
  get expiresAt(): string | undefined { return this._expiresAt; }

  get generatedBy(): string | undefined { return this._generatedBy; }
  get failureReason(): string | undefined { return this._failureReason; }

  isReady(): boolean { return this._status.isReady(); }
  isExpired(at: Date = new Date()): boolean {
    if (!this._expiresAt) return false;
    return at.getTime() > Date.parse(this._expiresAt);
  }

  startGenerating(now: string = new Date().toISOString()): void {
    if (!this._status.canTransitionTo('generating')) {
      throw new BusinessRuleError(
        `Cannot start generating from status "${this._status.value}"`,
        'REPORT_NOT_GENERATABLE',
        { reportId: this.id, status: this._status.value },
      );
    }
    this._status = VendorReportStatusVO.generating();
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  markReady(fileUrl: string, fileSize: number, now: string = new Date().toISOString()): void {
    if (!this._status.canTransitionTo('ready')) {
      throw new BusinessRuleError(
        `Cannot mark ready from status "${this._status.value}"`,
        'REPORT_NOT_READYABLE',
        { reportId: this.id, status: this._status.value },
      );
    }
    if (!fileUrl || fileUrl.trim().length === 0) {
      throw new ValidationError('File URL is required', 'fileUrl');
    }
    if (!Number.isInteger(fileSize) || fileSize < 0) {
      throw new ValidationError('File size must be a non-negative integer', 'fileSize');
    }
    this._status = VendorReportStatusVO.ready();
    this._fileUrl = fileUrl;
    this._fileSize = fileSize;
    this._generatedAt = now;
    this._expiresAt = new Date(Date.parse(now) + VENDOR_REPORT.EXPORT_EXPIRY_HOURS * 60 * 60 * 1000).toISOString();
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  markFailed(reason: string, now: string = new Date().toISOString()): void {
    if (!this._status.canTransitionTo('failed')) {
      throw new BusinessRuleError(
        `Cannot mark failed from status "${this._status.value}"`,
        'REPORT_NOT_FAILABLE',
        { reportId: this.id, status: this._status.value },
      );
    }
    this._status = VendorReportStatusVO.failed();
    this._failureReason = reason;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  markExpired(now: string = new Date().toISOString()): void {
    if (!this._status.canTransitionTo('expired')) return;
    this._status = VendorReportStatusVO.expired();
    this._fileUrl = undefined;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  /** Can this report be downloaded right now? */
  canDownload(at: Date = new Date()): boolean {
    return this._status.isReady() && !this.isExpired(at) && this._fileUrl !== undefined;
  }

  static create(params: {
    id: string;
    props: Omit<VendorReportEntityProps, 'status'>;
    now: string;
  }): VendorReportEntity {
    return new VendorReportEntity(params.id, params.now, params.now, {
      ...params.props,
      status: VendorReportStatusVO.pending(),
    });
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: VendorReportEntityProps;
    deletedAt?: string | null;
    version?: number;
  }): VendorReportEntity {
    const entity = new VendorReportEntity(
      params.id, params.createdAt, params.updatedAt, params.props, params.deletedAt,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
