import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CompleteFulfillmentCommand extends BaseCommand {
  readonly type = 'fulfillment.complete';

  constructor(public readonly fulfillmentId: string) {
    super();
  }
}
