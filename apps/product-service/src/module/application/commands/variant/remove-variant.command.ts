/**
 * RemoveVariantCommand
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class RemoveVariantCommand extends BaseCommand {
  readonly type = 'variant.remove';
  constructor(
    public readonly variantId: string,
    public readonly actorId: string,
  ) { super(); }
}
