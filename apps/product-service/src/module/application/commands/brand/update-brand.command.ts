import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateBrandRequestDTO } from '../../dtos/requests/brand/update-brand.dto.js';

export class UpdateBrandCommand extends BaseCommand {
  readonly type = 'brand.update';
  constructor(
    public readonly dto: UpdateBrandRequestDTO,
    public readonly actorId: string,
  ) { super(); }
}
