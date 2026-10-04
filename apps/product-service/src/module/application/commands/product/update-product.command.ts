/**
 * UpdateProductCommand
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateProductRequestDTO } from '../../dtos/requests/product/update-product.dto.js';

export class UpdateProductCommand extends BaseCommand {
  readonly type = 'product.update';
  constructor(
    public readonly productId: string,
    public readonly dto: UpdateProductRequestDTO,
    public readonly actorId: string,
  ) { super(); }
}
