import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class ArchiveProductCommand extends BaseCommand {
  readonly type = 'product.archive';

  constructor(public readonly productId: string) {
    super();
  }
}
