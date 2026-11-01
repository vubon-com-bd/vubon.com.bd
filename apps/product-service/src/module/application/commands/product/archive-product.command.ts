import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ArchiveProductRequestDTO } from '../../dtos/requests/product/index.js';

export class ArchiveProductCommand extends BaseCommand {
  readonly type = 'product.product.archive';
  constructor(public readonly dto: ArchiveProductRequestDTO) {
    super();
  }
}
