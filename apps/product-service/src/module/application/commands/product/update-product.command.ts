import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateProductCommandDTO } from '../../dtos/requests/product/index.js';

export class UpdateProductCommand extends BaseCommand {
  readonly type = 'product.product.update';
  constructor(
    public readonly dto: UpdateProductCommandDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
