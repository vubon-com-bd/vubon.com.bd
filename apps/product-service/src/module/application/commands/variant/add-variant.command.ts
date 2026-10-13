import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { AddVariantCommandDTO } from '../../dtos/requests/variant/index.js';

export class AddVariantCommand extends BaseCommand {
  readonly type = 'product.variant.add';
  constructor(
    public readonly dto: AddVariantCommandDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
