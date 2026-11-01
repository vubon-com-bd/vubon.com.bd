/**
 * UserContactEntity — BaseEntity
 * @module identity-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';
import { UserEmailVO } from '../value-objects/primitives/user-email.vo.js';
import { UserPhoneVO } from '../value-objects/primitives/user-phone.vo.js';
import type { ContactTypeValue } from '../value-objects/composites/user-contact.vo.js';

// Re-export type so barrel order doesn't matter
export type { ContactTypeValue };

export interface UserContactEntityProps {
  readonly userId: UserIdVO;
  readonly contactType: ContactTypeValue;
  email?: UserEmailVO;
  phone?: UserPhoneVO;
  contactValue: string;
  label?: string;
  isPrimary: boolean;
  isVerified: boolean;
  verifiedAt?: string;
}

export class UserContactEntity extends BaseEntity<string> {
  private props: UserContactEntityProps;

  private constructor(id: string, createdAt: string, updatedAt: string, props: UserContactEntityProps) {
    super(id, createdAt, updatedAt, null);
    this.props = props;
  }

  get userId(): UserIdVO { return this.props.userId; }
  get contactType(): ContactTypeValue { return this.props.contactType; }
  get email(): UserEmailVO | undefined { return this.props.email; }
  get phone(): UserPhoneVO | undefined { return this.props.phone; }
  get contactValue(): string { return this.props.contactValue; }
  get label(): string | undefined { return this.props.label; }
  get isPrimary(): boolean { return this.props.isPrimary; }
  get isVerified(): boolean { return this.props.isVerified; }
  get verifiedAt(): string | undefined { return this.props.verifiedAt; }

  isEmail(): boolean { return this.props.contactType === 'email'; }
  isPhone(): boolean { return this.props.contactType === 'phone'; }

  markVerified(now: string = new Date().toISOString()): void {
    this.props = { ...this.props, isVerified: true, verifiedAt: now };
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: string;
    props: Omit<UserContactEntityProps, 'isVerified'>;
    now: string;
  }): UserContactEntity {
    return new UserContactEntity(params.id, params.now, params.now, {
      ...params.props,
      isVerified: false,
    });
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: UserContactEntityProps;
  }): UserContactEntity {
    return new UserContactEntity(params.id, params.createdAt, params.updatedAt, params.props);
  }
}
