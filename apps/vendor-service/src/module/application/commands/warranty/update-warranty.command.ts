import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateWarrantyRequestDTO } from '../../dtos/requests/warranty/index.js';

export class UpdateWarrantyCommand extends BaseCommand {
  readonly type = 'vendor.warranty.update';
  constructor(
    public readonly dto: UpdateWarrantyRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
