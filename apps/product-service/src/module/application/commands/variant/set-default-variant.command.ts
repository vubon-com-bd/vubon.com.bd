import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SetDefaultVariantRequestDTO } from '../../dtos/requests/variant/index.js';

export class SetDefaultVariantCommand extends BaseCommand {
  readonly type = 'product.variant.set_default';
  constructor(public readonly dto: SetDefaultVariantRequestDTO) {
    super();
  }
}
