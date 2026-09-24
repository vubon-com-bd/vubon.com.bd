import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class HandleApnsWebhookCommand extends BaseCommand {
  readonly type = 'provider-webhook.apns';

  constructor(
    public readonly apnsId: string,
    public readonly deviceToken: string,
    public readonly status: string,
    public readonly reason?: string,
  ) {
    super();
  }
}
