import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { DuplicateProductRequestDTO } from '../../dtos/requests/product/index.js';

export class DuplicateProductCommand extends BaseCommand {
  readonly type = 'product.product.duplicate';
  constructor(public readonly dto: DuplicateProductRequestDTO) {
    super();
  }
}
