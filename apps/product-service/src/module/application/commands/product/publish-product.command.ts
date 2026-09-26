import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class PublishProductCommand extends BaseCommand {
  readonly type = 'product.publish';

  constructor(public readonly productId: string) {
    super();
  }
}
