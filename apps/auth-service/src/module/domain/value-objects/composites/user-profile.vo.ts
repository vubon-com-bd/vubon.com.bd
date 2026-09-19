import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { UserNameVO } from '../primitives/user-name.vo';

export interface UserProfileProps {
  readonly userId: UserIdVO;
  readonly firstName: UserNameVO;
  readonly lastName: UserNameVO;
  readonly bio: string | null;
  readonly avatarUrl: string | null;
  readonly dateOfBirth: Date | null;
  readonly gender: string | null;
}

export class UserProfileVO extends BaseVO<UserProfileProps> {
  private constructor(props: UserProfileProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: UserProfileProps): UserProfileVO {
    return new UserProfileVO(props);
  }

  get userId(): UserIdVO { return this.value.userId; }
  get firstName(): UserNameVO { return this.value.firstName; }
  get lastName(): UserNameVO { return this.value.lastName; }
  get bio(): string | null { return this.value.bio; }
  get avatarUrl(): string | null { return this.value.avatarUrl; }
  get dateOfBirth(): Date | null { return this.value.dateOfBirth; }
  get gender(): string | null { return this.value.gender; }

  get fullName(): string {
    return `${this.value.firstName.value} ${this.value.lastName.value}`.trim();
  }
}
