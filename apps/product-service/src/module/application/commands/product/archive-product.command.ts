/**
 * ArchiveProductCommand
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class ArchiveProductCommand extends BaseCommand {
  readonly type = 'product.archive';
  constructor(
    public readonly productId: string,
    public readonly actorId: string,
  ) { super(); }
}
