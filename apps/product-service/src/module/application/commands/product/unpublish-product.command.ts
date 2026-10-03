/**
 * UnpublishProductCommand
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class UnpublishProductCommand extends BaseCommand {
  readonly type = 'product.unpublish';
  constructor(
    public readonly productId: string,
    public readonly actorId: string,
    public readonly reason?: string,
  ) { super(); }
}
