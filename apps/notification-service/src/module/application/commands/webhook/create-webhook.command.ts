import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CreateWebhookCommand extends BaseCommand {
  readonly type = 'webhook.create';

  constructor(
    public readonly userId: string,
    public readonly webhookType: string,
    public readonly url: string,
    public readonly events: readonly string[],
    public readonly secret?: string,
  ) {
    super();
  }
}
