import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RemoveVariantRequestDTO } from '../../dtos/requests/variant/index.js';

export class RemoveVariantCommand extends BaseCommand {
  readonly type = 'product.variant.remove';
  constructor(public readonly dto: RemoveVariantRequestDTO) {
    super();
  }
}
