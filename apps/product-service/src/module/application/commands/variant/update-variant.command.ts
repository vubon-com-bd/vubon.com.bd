import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateVariantRequestDTO } from '../../dtos/requests/variant/index.js';

export class UpdateVariantCommand extends BaseCommand {
  readonly type = 'product.variant.update';
  constructor(public readonly dto: UpdateVariantRequestDTO) {
    super();
  }
}
