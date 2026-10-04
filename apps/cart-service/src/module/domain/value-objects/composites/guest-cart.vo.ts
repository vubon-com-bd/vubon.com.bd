/**
 * GuestCart Composite VO
 * @module cart-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { GuestCartIdVO } from '../primitives/guest-cart-id.vo.js';
import { GuestCartStatusVO } from '../primitives/guest-cart-status.vo.js';
import { GuestTokenVO } from '../primitives/guest-token.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export interface GuestCartProps {
  readonly id: GuestCartIdVO;
  readonly token: GuestTokenVO;
  readonly status: GuestCartStatusVO;
  readonly itemCount: number;
  readonly createdAt: string;
  readonly expiresAt: string;
  readonly mergedIntoCartId?: string;
}

export class GuestCartCompositeVO extends BaseVO<GuestCartProps> {
  private constructor(props: GuestCartProps) {
    super(props);
  }

  static create(props: GuestCartProps): GuestCartCompositeVO {
    if (props.itemCount < 0) {
      throw new ValidationError('itemCount cannot be negative', 'itemCount');
    }
    return new GuestCartCompositeVO(props);
  }

  static reconstitute(props: GuestCartProps): GuestCartCompositeVO {
    return new GuestCartCompositeVO(props);
  }

  get id(): GuestCartIdVO { return this.value.id; }
  get token(): GuestTokenVO { return this.value.token; }
  get status(): GuestCartStatusVO { return this.value.status; }
  get itemCount(): number { return this.value.itemCount; }
  get createdAt(): string { return this.value.createdAt; }
  get expiresAt(): string { return this.value.expiresAt; }
  get mergedIntoCartId(): string | undefined { return this.value.mergedIntoCartId; }

  isExpired(now: Date = new Date()): boolean {
    return now.getTime() > Date.parse(this.value.expiresAt);
  }

  canBeMerged(): boolean {
    return this.value.status.canBeMerged() && !this.isExpired();
  }

  isMerged(): boolean {
    return this.value.status.isMerged();
  }
}
