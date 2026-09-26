import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UserIdVO } from '../primitives/user-id.vo';

export interface PreferenceMatrixProps {
  readonly userId: UserIdVO;
  readonly emailOptIn: boolean;
  readonly smsOptIn: boolean;
  readonly pushOptIn: boolean;
  readonly inAppOptIn: boolean;
  readonly webhookOptIn: boolean;
}

export class PreferenceMatrixVO extends BaseVO<PreferenceMatrixProps> {
  private constructor(props: PreferenceMatrixProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: PreferenceMatrixProps): PreferenceMatrixVO {
    return new PreferenceMatrixVO(props);
  }

  get userId(): UserIdVO { return this.value.userId; }
  get emailOptIn(): boolean { return this.value.emailOptIn; }
  get smsOptIn(): boolean { return this.value.smsOptIn; }
  get pushOptIn(): boolean { return this.value.pushOptIn; }
  get inAppOptIn(): boolean { return this.value.inAppOptIn; }
  get webhookOptIn(): boolean { return this.value.webhookOptIn; }

  isOptedIn(channel: string): boolean {
    switch (channel) {
      case 'email': return this.value.emailOptIn;
      case 'sms': return this.value.smsOptIn;
      case 'push': return this.value.pushOptIn;
      case 'in_app': return this.value.inAppOptIn;
      case 'webhook': return this.value.webhookOptIn;
      default: return false;
    }
  }
}
