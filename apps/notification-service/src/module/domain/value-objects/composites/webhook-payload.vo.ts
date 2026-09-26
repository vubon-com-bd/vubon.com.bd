import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { WebhookIdVO } from '../primitives/webhook-id.vo';

export interface WebhookPayloadProps {
  readonly webhookId: WebhookIdVO;
  readonly event: string;
  readonly data: Readonly<Record<string, unknown>>;
  readonly timestamp: Date;
  readonly signature: string;
}

export class WebhookPayloadVO extends BaseVO<WebhookPayloadProps> {
  private constructor(props: WebhookPayloadProps) {
    super(
      Object.freeze({
        ...props,
        data: Object.freeze({ ...props.data }),
      }),
    );
  }

  static create(props: WebhookPayloadProps): WebhookPayloadVO {
    return new WebhookPayloadVO(props);
  }

  get webhookId(): WebhookIdVO { return this.value.webhookId; }
  get event(): string { return this.value.event; }
  get data(): Readonly<Record<string, unknown>> { return this.value.data; }
  get timestamp(): Date { return this.value.timestamp; }
  get signature(): string { return this.value.signature; }
}
