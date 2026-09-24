import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdateWebhookCommand extends BaseCommand {
  readonly type = 'webhook.update';

  constructor(
    public readonly webhookId: string,
    public readonly url?: string,
    public readonly secret?: string,
    public readonly events?: readonly string[],
    public readonly status?: string,
  ) {
    super();
  }
}
