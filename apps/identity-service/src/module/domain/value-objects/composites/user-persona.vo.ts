/**
 * UserPersonaVO — Composite combining user + profile + preferences
 * @module identity-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { UserIdVO } from '../primitives/user-id.vo.js';
import { UserNameVO } from '../primitives/user-name.vo.js';
import { UserGenderVO } from '../primitives/user-gender.vo.js';
import { UserLanguageVO } from '../primitives/user-language.vo.js';
import { UserTimezoneVO } from '../primitives/user-timezone.vo.js';
import { UserAvatarVO } from '../primitives/user-avatar.vo.js';
import { UserBioVO } from '../primitives/user-bio.vo.js';
import { ProfileVisibilityVO } from '../primitives/profile-visibility.vo.js';

export interface UserPersonaVOProps {
  readonly userId: UserIdVO;
  readonly displayName: UserNameVO;
  readonly gender?: UserGenderVO;
  readonly language: UserLanguageVO;
  readonly timezone: UserTimezoneVO;
  readonly avatarUrl?: UserAvatarVO;
  readonly bio?: UserBioVO;
  readonly visibility: ProfileVisibilityVO;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class UserPersonaVO extends BaseVO<UserPersonaVOProps> {
  private constructor(props: UserPersonaVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: UserPersonaVOProps): UserPersonaVO {
    const vo = new UserPersonaVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: UserPersonaVOProps): UserPersonaVO {
    return new UserPersonaVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (!v.userId) {
      throw new ValidationError('userId is required for UserPersona', 'userId');
    }
    if (!v.displayName) {
      throw new ValidationError('displayName is required for UserPersona', 'displayName');
    }
  }

  get userId(): UserIdVO { return this.value.userId; }
  get displayName(): UserNameVO { return this.value.displayName; }
  get gender(): UserGenderVO | undefined { return this.value.gender; }
  get language(): UserLanguageVO { return this.value.language; }
  get timezone(): UserTimezoneVO { return this.value.timezone; }
  get avatarUrl(): UserAvatarVO | undefined { return this.value.avatarUrl; }
  get bio(): UserBioVO | undefined { return this.value.bio; }
  get visibility(): ProfileVisibilityVO { return this.value.visibility; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  hasAvatar(): boolean { return this.avatarUrl !== undefined; }
  hasBio(): boolean { return this.bio !== undefined && !this.bio.isEmpty; }
  isDiscoverable(): boolean { return this.visibility.isDiscoverable(); }
  completionPercent(): number {
    const fields = [
      this.value.displayName,
      this.value.avatarUrl,
      this.value.bio,
      this.value.gender,
      this.value.language,
      this.value.timezone,
    ];
    const filled = fields.filter((f) => f !== undefined).length;
    return Math.round((filled / fields.length) * 100);
  }
}
