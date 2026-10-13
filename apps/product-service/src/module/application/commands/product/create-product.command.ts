/**
 * CreateProductCommand
 * @module product-service/application/commands/product
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateProductCommandDTO } from '../../dtos/requests/product/index.js';

export class CreateProductCommand extends BaseCommand {
  readonly type = 'product.product.create';

  constructor(
    public readonly dto: CreateProductCommandDTO,
    public readonly userId: string,
    public readonly actorId?: string,
  ) {
    super();
  }
}
