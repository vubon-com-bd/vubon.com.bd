/**
 * FeatureProductCommand
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class FeatureProductCommand extends BaseCommand {
  readonly type = 'product.feature';
  constructor(
    public readonly productId: string,
    public readonly actorId: string,
    public readonly featured: boolean,
  ) { super(); }
}
