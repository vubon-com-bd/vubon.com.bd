import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateBrandRequestDTO } from '../../dtos/requests/brand/create-brand.dto.js';

export class CreateBrandCommand extends BaseCommand {
  readonly type = 'brand.create';
  constructor(
    public readonly dto: CreateBrandRequestDTO,
    public readonly actorId: string,
  ) { super(); }
}
