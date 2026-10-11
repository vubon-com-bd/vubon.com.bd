/**
 * WebhookPayloadVO — outbound webhook request body + headers
 * @module notification-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export interface WebhookPayloadVOProps {
  readonly body: Readonly<Record<string, unknown>>;
  readonly headers: Readonly<Record<string, string>>;
  readonly signature?: string;
}

const MAX_BODY_BYTES = 256 * 1024; // 256 KB

export class WebhookPayloadVO extends BaseVO<WebhookPayloadVOProps> {
  private constructor(props: WebhookPayloadVOProps) {
    super(props);
  }

  static create(props: WebhookPayloadVOProps): WebhookPayloadVO {
    const vo = new WebhookPayloadVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: WebhookPayloadVOProps): WebhookPayloadVO {
    return new WebhookPayloadVO(props);
  }

  protected validate(): void {
    const v = this.value;
    let size: number;
    try {
      size = JSON.stringify(v.body).length;
    } catch {
      throw new ValidationError('Webhook body must be JSON-serializable', 'body');
    }
    if (size > MAX_BODY_BYTES) {
      throw new ValidationError(
        `Webhook body exceeds ${MAX_BODY_BYTES} bytes`,
        'body',
      );
    }
    const headerKeys = Object.keys(v.headers);
    if (headerKeys.length > 20) {
      throw new ValidationError('Too many webhook headers (max 20)', 'headers');
    }
  }

  get body(): Readonly<Record<string, unknown>> { return this.value.body; }
  get headers(): Readonly<Record<string, string>> { return this.value.headers; }
  get signature(): string | undefined { return this.value.signature; }

  hasSignature(): boolean { return this.value.signature !== undefined; }
}
