import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { LeadEmailVO } from '../primitives/lead-email.vo';
import { UserIdVO } from '../primitives/user-id.vo';

export interface EmailSubscriberProps {
  readonly email: LeadEmailVO;
  readonly userId: UserIdVO | null;
  readonly status: string;
  readonly subscribedAt: Date;
  readonly unsubscribedAt: Date | null;
}

export class EmailSubscriberVO extends BaseVO<EmailSubscriberProps> {
  private constructor(props: EmailSubscriberProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: EmailSubscriberProps): EmailSubscriberVO {
    return new EmailSubscriberVO(props);
  }

  get email(): LeadEmailVO { return this.value.email; }
  get userId(): UserIdVO | null { return this.value.userId; }
  get status(): string { return this.value.status; }
  get subscribedAt(): Date { return this.value.subscribedAt; }
  get unsubscribedAt(): Date | null { return this.value.unsubscribedAt; }
}
