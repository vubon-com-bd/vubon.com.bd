import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export interface SendGridEvent {
  readonly email: string;
  readonly event: string;
  readonly timestamp: number;
}

export class HandleSendGridWebhookCommand extends BaseCommand {
  readonly type = 'provider-webhook.sendgrid';

  constructor(public readonly events: readonly SendGridEvent[]) {
    super();
  }
}
