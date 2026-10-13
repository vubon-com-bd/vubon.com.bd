import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { PublishProductRequestDTO } from '../../dtos/requests/product/index.js';

export class PublishProductCommand extends BaseCommand {
  readonly type = 'product.product.publish';
  constructor(public readonly dto: PublishProductRequestDTO) {
    super();
  }
}
