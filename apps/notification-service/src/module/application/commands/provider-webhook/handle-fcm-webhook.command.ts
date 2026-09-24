import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class HandleFcmWebhookCommand extends BaseCommand {
  readonly type = 'provider-webhook.fcm';

  constructor(
    public readonly messageId: string,
    public readonly deviceToken: string,
    public readonly status: string,
    public readonly error?: string,
  ) {
    super();
  }
}
