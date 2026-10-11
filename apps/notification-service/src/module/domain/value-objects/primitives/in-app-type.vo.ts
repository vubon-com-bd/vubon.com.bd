/**
 * InAppType Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { IN_APP_TYPE } from '@vubon/shared-constants/platform/notification';
import { InvalidInAppTypeError } from '../../errors/delivery.errors.js';

type InAppTypeValue = (typeof IN_APP_TYPE)[keyof typeof IN_APP_TYPE];
const ALLOWED = Object.values(IN_APP_TYPE) as readonly string[];

export class InAppTypeVO extends BaseTypeVO<InAppTypeValue> {
  private constructor(value: InAppTypeValue) {
    super(value);
  }

  static override allowedValues(): ReadonlySet<string> {
    return new Set<string>(ALLOWED);
  }

  static create(raw: string): InAppTypeVO {
    if (!ALLOWED.includes(raw)) {
      throw new InvalidInAppTypeError(raw, ALLOWED);
    }
    return new InAppTypeVO(raw as InAppTypeValue);
  }

  static reconstitute(raw: string): InAppTypeVO {
    return new InAppTypeVO(raw as InAppTypeValue);
  }

  static toast(): InAppTypeVO { return new InAppTypeVO(IN_APP_TYPE.TOAST); }
  static banner(): InAppTypeVO { return new InAppTypeVO(IN_APP_TYPE.BANNER); }
  static modal(): InAppTypeVO { return new InAppTypeVO(IN_APP_TYPE.MODAL); }
  static snackbar(): InAppTypeVO { return new InAppTypeVO(IN_APP_TYPE.SNACKBAR); }
  static popup(): InAppTypeVO { return new InAppTypeVO(IN_APP_TYPE.POPUP); }
  static badge(): InAppTypeVO { return new InAppTypeVO(IN_APP_TYPE.BADGE); }
  static inbox(): InAppTypeVO { return new InAppTypeVO(IN_APP_TYPE.INBOX); }
  static bell(): InAppTypeVO { return new InAppTypeVO(IN_APP_TYPE.BELL); }
  static fullScreen(): InAppTypeVO { return new InAppTypeVO(IN_APP_TYPE.FULL_SCREEN); }

  /** Requires user dismissal. */
  isBlocking(): boolean {
    return (
      this.value === IN_APP_TYPE.MODAL ||
      this.value === IN_APP_TYPE.FULL_SCREEN ||
      this.value === IN_APP_TYPE.POPUP
    );
  }

  /** Auto-dismisses. */
  isTransient(): boolean {
    return (
      this.value === IN_APP_TYPE.TOAST ||
      this.value === IN_APP_TYPE.SNACKBAR ||
      this.value === IN_APP_TYPE.BANNER
    );
  }

  /** Persisted in user's inbox. */
  isPersistent(): boolean {
    return this.value === IN_APP_TYPE.INBOX || this.value === IN_APP_TYPE.BELL;
  }
}
