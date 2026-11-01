/**
 * UserVerificationEntity — AggregateRoot
 * @module identity-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';

import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';
import { VerificationStatusVO } from '../value-objects/primitives/verification-status.vo.js';

export interface UserVerificationEntityProps {
  readonly userId: UserIdVO;
  emailVerified: boolean;
  emailVerifiedAt?: string;
  phoneVerified: boolean;
  phoneVerifiedAt?: string;
  identityVerified: boolean;
  identityVerifiedAt?: string;
  addressVerified: boolean;
  addressVerifiedAt?: string;
  kycStatus: VerificationStatusVO;
}

export class UserVerificationEntity extends AggregateRoot<string> {
  private props: UserVerificationEntityProps;

  private constructor(id: string, createdAt: string, updatedAt: string, props: UserVerificationEntityProps) {
    super(id, createdAt, updatedAt, null);
    this.props = props;
  }

  get userId(): UserIdVO { return this.props.userId; }
  get emailVerified(): boolean { return this.props.emailVerified; }
  get emailVerifiedAt(): string | undefined { return this.props.emailVerifiedAt; }
  get phoneVerified(): boolean { return this.props.phoneVerified; }
  get phoneVerifiedAt(): string | undefined { return this.props.phoneVerifiedAt; }
  get identityVerified(): boolean { return this.props.identityVerified; }
  get identityVerifiedAt(): string | undefined { return this.props.identityVerifiedAt; }
  get addressVerified(): boolean { return this.props.addressVerified; }
  get addressVerifiedAt(): string | undefined { return this.props.addressVerifiedAt; }
  get kycStatus(): VerificationStatusVO { return this.props.kycStatus; }

  isFullyVerified(): boolean {
    return this.props.emailVerified && this.props.phoneVerified && this.props.identityVerified;
  }
  hasBasicVerification(): boolean {
    return this.props.emailVerified && this.props.phoneVerified;
  }

  verifyEmail(now: string = new Date().toISOString()): void {
    if (this.props.emailVerified) return;
    this.props = { ...this.props, emailVerified: true, emailVerifiedAt: now };
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  verifyPhone(now: string = new Date().toISOString()): void {
    if (this.props.phoneVerified) return;
    this.props = { ...this.props, phoneVerified: true, phoneVerifiedAt: now };
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  verifyIdentity(now: string = new Date().toISOString()): void {
    if (this.props.identityVerified) return;
    this.props = { ...this.props, identityVerified: true, identityVerifiedAt: now };
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  verifyAddress(now: string = new Date().toISOString()): void {
    if (this.props.addressVerified) return;
    this.props = { ...this.props, addressVerified: true, addressVerifiedAt: now };
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  static create(params: { id: string; userId: UserIdVO; now: string }): UserVerificationEntity {
    return new UserVerificationEntity(params.id, params.now, params.now, {
      userId: params.userId,
      emailVerified: false,
      phoneVerified: false,
      identityVerified: false,
      addressVerified: false,
      kycStatus: VerificationStatusVO.pending(),
    });
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: UserVerificationEntityProps;
    version?: number;
  }): UserVerificationEntity {
    const entity = new UserVerificationEntity(params.id, params.createdAt, params.updatedAt, params.props);
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
