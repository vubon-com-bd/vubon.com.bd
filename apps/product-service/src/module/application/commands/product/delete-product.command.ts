/**
 * DeleteProductCommand
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class DeleteProductCommand extends BaseCommand {
  readonly type = 'product.delete';
  constructor(
    public readonly productId: string,
    public readonly actorId: string,
  ) { super(); }
}
