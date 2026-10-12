/**
 * SocialAccountVO
 * @module identity-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';

import { AuthIdVO } from '../primitives/auth-id.vo.js';
import { UserIdVO } from '../primitives/user-id.vo.js';
import { SocialProviderVO } from '../primitives/social-provider.vo.js';

export interface SocialAccountVOProps {
  readonly id: string;
  readonly authId: AuthIdVO;
  readonly userId: UserIdVO;
  readonly provider: SocialProviderVO;
  readonly providerUserId: string;
  readonly email?: string;
  readonly name?: string;
  readonly avatarUrl?: string;
  readonly connectedAt: string;
  readonly lastUsedAt?: string;
  readonly isActive: boolean;
}

export class SocialAccountVO extends BaseVO<SocialAccountVOProps> {
  private constructor(props: SocialAccountVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: SocialAccountVOProps): SocialAccountVO {
    return new SocialAccountVO(props);
  }

  static reconstitute(props: SocialAccountVOProps): SocialAccountVO {
    return new SocialAccountVO(props);
  }

  get id(): string { return this.value.id; }
  get authId(): AuthIdVO { return this.value.authId; }
  get userId(): UserIdVO { return this.value.userId; }
  get provider(): SocialProviderVO { return this.value.provider; }
  get providerUserId(): string { return this.value.providerUserId; }
  get email(): string | undefined { return this.value.email; }
  get name(): string | undefined { return this.value.name; }
  get avatarUrl(): string | undefined { return this.value.avatarUrl; }
  get connectedAt(): string { return this.value.connectedAt; }
  get lastUsedAt(): string | undefined { return this.value.lastUsedAt; }
  get isActive(): boolean { return this.value.isActive; }
}
