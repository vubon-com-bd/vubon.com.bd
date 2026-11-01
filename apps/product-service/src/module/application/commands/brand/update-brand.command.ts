import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateBrandRequestDTO } from '../../dtos/requests/brand/index.js';

export class UpdateBrandCommand extends BaseCommand {
  readonly type = 'product.brand.update';
  constructor(public readonly dto: UpdateBrandRequestDTO) {
    super();
  }
}
