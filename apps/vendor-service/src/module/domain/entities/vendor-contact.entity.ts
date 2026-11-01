/**
 * VendorContactEntity — Child Entity
 * @module vendor-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import {
  VendorContactVO,
  type VendorContactVOProps,
} from '../value-objects/composites/vendor-contact.vo.js';

export interface VendorContactEntityProps {
  readonly vo: VendorContactVO;
}

export class VendorContactEntity extends BaseEntity<string> {
  private _vo: VendorContactVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: VendorContactEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vo = props.vo;
  }

  // ═══ Getters ═══
  get vo(): VendorContactVO { return this._vo; }
  get contactId() { return this._vo.id; }
  get vendorId() { return this._vo.vendorId; }
  get type() { return this._vo.type; }
  get contactValue() { return this._vo.contactValue; }
  get label(): string | undefined { return this._vo.label; }
  get isPrimary(): boolean { return this._vo.isPrimary; }
  get isVerified(): boolean { return this._vo.isVerified; }
  get verifiedAt(): string | undefined { return this._vo.verifiedAt; }

  // ═══ Predicates ═══
  isEmail(): boolean { return this._vo.isEmail(); }
  isPhone(): boolean { return this._vo.isPhone(); }
  isWhatsapp(): boolean { return this._vo.isWhatsapp(); }
  isWebsite(): boolean { return this._vo.isWebsite(); }
  isSocial(): boolean { return this._vo.isSocial(); }
  isPublic(): boolean { return this._vo.isPublic(); }
  canBeVerified(): boolean { return this._vo.canBeVerified(); }
  needsReverification(): boolean { return this._vo.needsReverification(); }

  // ═══ Business Actions ═══
  markPrimary(now: string = new Date().toISOString()): void {
    if (this.isPrimary) return;
    const current = this._vo.value;
    this._vo = VendorContactVO.create({ ...current, isPrimary: true });
    this.touch(now);
  }

  unmarkPrimary(now: string = new Date().toISOString()): void {
    if (!this.isPrimary) return;
    const current = this._vo.value;
    this._vo = VendorContactVO.create({ ...current, isPrimary: false });
    this.touch(now);
  }

  verify(now: string = new Date().toISOString()): void {
    if (!this.canBeVerified()) {
      throw new BusinessRuleError(
        `Cannot verify contact of type "${this.type.value}" or already verified`,
        'CONTACT_CANNOT_BE_VERIFIED',
        { contactId: this.id, type: this.type.value },
      );
    }
    const current = this._vo.value;
    this._vo = VendorContactVO.create({
      ...current,
      isVerified: true,
      verifiedAt: now,
    });
    this.touch(now);
  }

  unverify(now: string = new Date().toISOString()): void {
    if (!this.isVerified) return;
    const current = this._vo.value;
    this._vo = VendorContactVO.create({
      ...current,
      isVerified: false,
      verifiedAt: undefined,
    });
    this.touch(now);
  }

  updateLabel(label: string | undefined, now: string = new Date().toISOString()): void {
    if (label && label.length > 50) {
      throw new ValidationError('Label max 50 chars', 'label');
    }
    const current = this._vo.value;
    this._vo = VendorContactVO.create({ ...current, label });
    this.touch(now);
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // ═══ Factories ═══
  static create(params: {
    id: string;
    vo: VendorContactVO;
    now: string;
  }): VendorContactEntity {
    return new VendorContactEntity(
      params.id,
      params.now,
      params.now,
      { vo: params.vo },
      null,
    );
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: VendorContactEntityProps;
  }): VendorContactEntity {
    return new VendorContactEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt ?? null,
    );
  }
}
