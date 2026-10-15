/**
 * GuestCartVO — Composite Value Object
 * @module cart-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { GuestCartIdVO } from '../primitives/guest-cart-id.vo.js';
import { GuestCartStatusVO } from '../primitives/guest-cart-status.vo.js';
import { GuestTokenVO } from '../primitives/guest-token.vo.js';

export interface GuestCartVOProps {
  readonly id: GuestCartIdVO;
  readonly token: GuestTokenVO;
  readonly status: GuestCartStatusVO;
  readonly itemCount: number;
  readonly createdAt: string;
  readonly expiresAt: string;
}

export class GuestCartVO extends BaseVO<GuestCartVOProps> {
  private constructor(props: GuestCartVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: GuestCartVOProps): GuestCartVO {
    const vo = new GuestCartVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: GuestCartVOProps): GuestCartVO {
    return new GuestCartVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (!Number.isInteger(v.itemCount) || v.itemCount < 0) {
      throw new ValidationError('itemCount must be a non-negative integer', 'itemCount');
    }
  }

  get id(): GuestCartIdVO { return this.value.id; }
  get token(): GuestTokenVO { return this.value.token; }
  get status(): GuestCartStatusVO { return this.value.status; }
  get itemCount(): number { return this.value.itemCount; }
  get createdAt(): string { return this.value.createdAt; }
  get expiresAt(): string { return this.value.expiresAt; }

  isActive(): boolean { return this.status.isActiveStatus(); }
  isExpired(at: Date = new Date()): boolean {
    return new Date(this.value.expiresAt).getTime() < at.getTime();
  }
  canMerge(): boolean { return this.status.isActiveStatus() && this.value.itemCount > 0; }
}
