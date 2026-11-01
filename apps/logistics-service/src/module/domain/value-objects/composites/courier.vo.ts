/**
 * Courier Value Object (Composite)
 * @module logistics-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { CourierIdVO } from '../primitives/courier-id.vo.js';
import { CourierNameVO } from '../primitives/courier-name.vo.js';
import { CourierStatusVO } from '../primitives/courier-status.vo.js';
import { CourierTypeVO } from '../primitives/courier-type.vo.js';

export interface CourierVOProps {
  readonly id: CourierIdVO;
  readonly code: string;
  readonly name: CourierNameVO;
  readonly displayName: string;
  readonly status: CourierStatusVO;
  readonly type: CourierTypeVO;
  readonly logoUrl?: string;
  readonly website?: string;
  readonly contactPhone?: string;
  readonly contactEmail?: string;
  readonly trackingUrlTemplate?: string;
  readonly apiEnabled: boolean;
  readonly coverageZones?: readonly string[];
  readonly supportsCOD: boolean;
  readonly supportsInsurance: boolean;
  readonly supportsInternational: boolean;
  readonly averageDeliveryDays: number;
  readonly isDefault: boolean;
  readonly priority: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class CourierVO extends BaseVO<CourierVOProps> {
  private constructor(props: CourierVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: CourierVOProps): CourierVO {
    const vo = new CourierVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: CourierVOProps): CourierVO {
    return new CourierVO(props);
  }

  protected validate(): void {
    const v = this.value;

    if (!v.code || v.code.trim().length === 0) {
      throw new ValidationError('Courier code cannot be empty', 'code');
    }
    if (v.code.length > 50) {
      throw new ValidationError('Courier code cannot exceed 50 chars', 'code');
    }
    if (!v.displayName || v.displayName.trim().length === 0) {
      throw new ValidationError('Display name cannot be empty', 'displayName');
    }
    if (v.averageDeliveryDays < 0 || v.averageDeliveryDays > 90) {
      throw new ValidationError(
        'Average delivery days must be 0-90',
        'averageDeliveryDays',
      );
    }
    if (!Number.isInteger(v.priority) || v.priority < 0) {
      throw new ValidationError('Priority must be non-negative integer', 'priority');
    }
    if (v.contactEmail && !v.contactEmail.includes('@')) {
      throw new ValidationError('Contact email is invalid', 'contactEmail');
    }
  }

  get id(): CourierIdVO { return this.value.id; }
  get code(): string { return this.value.code; }
  get name(): CourierNameVO { return this.value.name; }
  get displayName(): string { return this.value.displayName; }
  get status(): CourierStatusVO { return this.value.status; }
  get type(): CourierTypeVO { return this.value.type; }
  get logoUrl(): string | undefined { return this.value.logoUrl; }
  get website(): string | undefined { return this.value.website; }
  get contactPhone(): string | undefined { return this.value.contactPhone; }
  get contactEmail(): string | undefined { return this.value.contactEmail; }
  get trackingUrlTemplate(): string | undefined {
    return this.value.trackingUrlTemplate;
  }
  get apiEnabled(): boolean { return this.value.apiEnabled; }
  get coverageZones(): readonly string[] | undefined {
    return this.value.coverageZones;
  }
  get supportsCOD(): boolean { return this.value.supportsCOD; }
  get supportsInsurance(): boolean { return this.value.supportsInsurance; }
  get supportsInternational(): boolean { return this.value.supportsInternational; }
  get averageDeliveryDays(): number { return this.value.averageDeliveryDays; }
  get isDefault(): boolean { return this.value.isDefault; }
  get priority(): number { return this.value.priority; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  isActive(): boolean { return this.status.isActive(); }
  isOperational(): boolean { return this.status.isOperational(); }
  isFinal(): boolean { return this.status.isFinal(); }

  isFast(): boolean {
    return this.averageDeliveryDays <= 2;
  }

  hasApi(): boolean {
    return this.apiEnabled && !!this.trackingUrlTemplate;
  }

  coversZone(zone: string): boolean {
    if (!this.coverageZones || this.coverageZones.length === 0) {
      return true; // empty = all zones
    }
    return this.coverageZones.includes(zone);
  }
}
