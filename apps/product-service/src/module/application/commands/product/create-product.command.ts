/**
 * CreateProductCommand
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateProductRequestDTO } from '../../dtos/requests/product/create-product.dto.js';

export class CreateProductCommand extends BaseCommand {
  readonly type = 'product.create';
  constructor(
    public readonly dto: CreateProductRequestDTO,
    public readonly actorId: string,
  ) { super(); }
}
