import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { DeleteBrandRequestDTO } from '../../dtos/requests/brand/index.js';

export class DeleteBrandCommand extends BaseCommand {
  readonly type = 'product.brand.delete';
  constructor(public readonly dto: DeleteBrandRequestDTO) {
    super();
  }
}
