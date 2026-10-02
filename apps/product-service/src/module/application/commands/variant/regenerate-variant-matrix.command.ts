/**
 * RegenerateVariantMatrixCommand
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class RegenerateVariantMatrixCommand extends BaseCommand {
  readonly type = 'variant.regenerate';
  constructor(
    public readonly productId: string,
    public readonly actorId: string,
  ) { super(); }
}
