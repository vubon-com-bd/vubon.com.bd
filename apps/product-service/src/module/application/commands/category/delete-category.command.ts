import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { DeleteCategoryRequestDTO } from '../../dtos/requests/category/index.js';

export class DeleteCategoryCommand extends BaseCommand {
  readonly type = 'product.category.delete';
  constructor(public readonly dto: DeleteCategoryRequestDTO) {
    super();
  }
}
