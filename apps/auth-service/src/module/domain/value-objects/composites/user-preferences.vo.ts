/**
 * UserPreferencesVO — User behavior preferences (non-critical toggles)
 * @module auth-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UserIdVO } from '../primitives/user-id.vo';

export interface UserPreferencesVOProps {
  readonly userId: UserIdVO;
  readonly theme: 'light' | 'dark' | 'system';
  readonly currency: string;
  readonly dateFormat: string;
  readonly reduceMotion: boolean;
}

export class UserPreferencesVO extends BaseVO<UserPreferencesVOProps> {
  private constructor(props: UserPreferencesVOProps) {
    super(props);
  }

  static of(props: UserPreferencesVOProps): UserPreferencesVO {
    if (!['light', 'dark', 'system'].includes(props.theme)) {
      throw new Error(`Invalid theme: ${props.theme}`);
    }
    if (props.currency.length !== 3) {
      throw new Error('Currency must be ISO 4217 (3 letters)');
    }
    return new UserPreferencesVO(props);
  }

  static defaults(userId: UserIdVO): UserPreferencesVO {
    return new UserPreferencesVO({
      userId,
      theme: 'system',
      currency: 'BDT',
      dateFormat: 'DD/MM/YYYY',
      reduceMotion: false,
    });
  }

  get userId(): UserIdVO { return this.value.userId; }
  get theme(): 'light' | 'dark' | 'system' { return this.value.theme; }

  isDark(): boolean { return this.value.theme === 'dark'; }
}
