import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { DeleteProductRequestDTO } from '../../dtos/requests/product/index.js';

export class DeleteProductCommand extends BaseCommand {
  readonly type = 'product.product.delete';
  constructor(public readonly dto: DeleteProductRequestDTO) {
    super();
  }
}
