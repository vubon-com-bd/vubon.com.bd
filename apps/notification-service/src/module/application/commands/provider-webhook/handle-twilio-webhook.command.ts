import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class HandleTwilioWebhookCommand extends BaseCommand {
  readonly type = 'provider-webhook.twilio';

  constructor(
    public readonly messageSid: string,
    public readonly status: string,
    public readonly to: string,
    public readonly errorCode?: string,
  ) {
    super();
  }
}
