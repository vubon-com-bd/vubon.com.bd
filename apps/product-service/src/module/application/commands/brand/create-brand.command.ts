import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateBrandRequestDTO } from '../../dtos/requests/brand/index.js';

export class CreateBrandCommand extends BaseCommand {
  readonly type = 'product.brand.create';
  constructor(public readonly dto: CreateBrandRequestDTO) {
    super();
  }
}
