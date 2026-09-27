/**
 * UserPersonaVO — Aggregated View VO
 * @module user-service/domain/value-objects/composites
 *
 * Read-only view combining user + profile + preferences.
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UserVO } from './user.vo.js';
import { UserProfileVO } from './user-profile.vo.js';
import { UserPreferencesVO } from './user-preferences.vo.js';

export interface UserPersonaVOProps {
  readonly user: UserVO;
  readonly profile: UserProfileVO;
  readonly preferences: UserPreferencesVO;
}

export class UserPersonaVO extends BaseVO<UserPersonaVOProps> {
  private constructor(props: UserPersonaVOProps) {
    super(props);
  }

  static create(props: UserPersonaVOProps): UserPersonaVO {
    if (!props.user) throw new Error('UserPersonaVO: user required');
    if (!props.profile) throw new Error('UserPersonaVO: profile required');
    if (!props.preferences) throw new Error('UserPersonaVO: preferences required');
    if (props.user.id.value !== props.profile.userId.value) {
      throw new Error('UserPersonaVO: user.id and profile.userId mismatch');
    }
    if (props.user.id.value !== props.preferences.userId) {
      throw new Error('UserPersonaVO: user.id and preferences.userId mismatch');
    }
    return new UserPersonaVO(props);
  }

  get user(): UserVO { return this.value.user; }
  get profile(): UserProfileVO { return this.value.profile; }
  get preferences(): UserPreferencesVO { return this.value.preferences; }

  displayName(): string {
    return this.value.user.name.value;
  }

  avatarUrl(): string {
    return this.value.profile.avatar.value;
  }

  isFullyOnboarded(): boolean {
    return (
      this.value.profile.isComplete() &&
      this.value.user.hasPhone() &&
      this.value.user.status.isActive()
    );
  }

  calculateEngagementScore(): number {
    let score = 0;
    if (this.value.profile.hasAvatar()) score += 20;
    if (this.value.profile.hasBio()) score += 20;
    if (this.value.user.hasPhone()) score += 20;
    if (this.value.user.isActive()) score += 20;
    if (this.value.preferences.entries.length > 0) score += 20;
    return score;
  }
}
