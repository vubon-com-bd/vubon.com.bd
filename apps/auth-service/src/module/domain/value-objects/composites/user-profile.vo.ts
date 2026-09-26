/**
 * UserProfileVO — Public-facing profile information
 * @module auth-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { UserNameVO } from '../primitives/user-name.vo';

export interface UserProfileVOProps {
  readonly userId: UserIdVO;
  readonly displayName: UserNameVO;
  readonly bio?: string;
  readonly avatarUrl?: string;
  readonly locale?: string;
}

const MAX_BIO = 500;
const MAX_URL = 2048;

export class UserProfileVO extends BaseVO<UserProfileVOProps> {
  private constructor(props: UserProfileVOProps) {
    super(props);
  }

  static of(props: UserProfileVOProps): UserProfileVO {
    if (props.bio && props.bio.length > MAX_BIO) {
      throw new Error(`Bio exceeds ${MAX_BIO} chars`);
    }
    if (props.avatarUrl && props.avatarUrl.length > MAX_URL) {
      throw new Error('Avatar URL too long');
    }
    return new UserProfileVO(props);
  }

  get userId(): UserIdVO { return this.value.userId; }
  get displayName(): UserNameVO { return this.value.displayName; }
  get bio(): string | undefined { return this.value.bio; }
  get avatarUrl(): string | undefined { return this.value.avatarUrl; }
  get locale(): string { return this.value.locale ?? 'bn-BD'; }

  hasAvatar(): boolean {
    return typeof this.value.avatarUrl === 'string' && this.value.avatarUrl.length > 0;
  }
}
