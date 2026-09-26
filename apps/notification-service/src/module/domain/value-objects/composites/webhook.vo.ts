import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { WebhookIdVO } from '../primitives/webhook-id.vo';
import { WebhookStatusVO } from '../primitives/webhook-status.vo';
import { WebhookTypeVO } from '../primitives/webhook-type.vo';
import { WebhookUrlVO } from '../primitives/webhook-url.vo';
import { WebhookSecretVO } from '../primitives/webhook-secret.vo';
import { UserIdVO } from '../primitives/user-id.vo';

export interface WebhookProps {
  readonly id: WebhookIdVO;
  readonly userId: UserIdVO;
  readonly type: WebhookTypeVO;
  readonly url: WebhookUrlVO;
  readonly secret: WebhookSecretVO;
  readonly status: WebhookStatusVO;
  readonly events: readonly string[];
}

export class WebhookVO extends BaseVO<WebhookProps> {
  private constructor(props: WebhookProps) {
    super(
      Object.freeze({
        ...props,
        events: Object.freeze([...props.events]),
      }),
    );
  }

  static create(props: WebhookProps): WebhookVO {
    return new WebhookVO(props);
  }

  get id(): WebhookIdVO { return this.value.id; }
  get userId(): UserIdVO { return this.value.userId; }
  get type(): WebhookTypeVO { return this.value.type; }
  get url(): WebhookUrlVO { return this.value.url; }
  get secret(): WebhookSecretVO { return this.value.secret; }
  get status(): WebhookStatusVO { return this.value.status; }
  get events(): readonly string[] { return this.value.events; }
}
