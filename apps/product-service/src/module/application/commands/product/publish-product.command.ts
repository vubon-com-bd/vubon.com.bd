/**
 * PublishProductCommand
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class PublishProductCommand extends BaseCommand {
  readonly type = 'product.publish';
  constructor(
    public readonly productId: string,
    public readonly actorId: string,
  ) { super(); }
}
