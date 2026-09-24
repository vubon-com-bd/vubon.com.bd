import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UserIdVO } from '../primitives/user-id.vo';

export interface InAppMessageProps {
  readonly userId: UserIdVO;
  readonly title: string;
  readonly body: string;
  readonly position: 'top' | 'bottom' | 'center' | 'toast';
  readonly actionUrl: string | null;
  readonly autoDismissMs: number | null;
}

export class InAppMessageVO extends BaseVO<InAppMessageProps> {
  private constructor(props: InAppMessageProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: InAppMessageProps): InAppMessageVO {
    return new InAppMessageVO(props);
  }

  get userId(): UserIdVO { return this.value.userId; }
  get title(): string { return this.value.title; }
  get body(): string { return this.value.body; }
  get position(): 'top' | 'bottom' | 'center' | 'toast' { return this.value.position; }
  get actionUrl(): string | null { return this.value.actionUrl; }
  get autoDismissMs(): number | null { return this.value.autoDismissMs; }
}
