/**
 * UpdateVendorBusinessCommand
 * @module vendor-service/application/commands/vendor
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateVendorBusinessRequestDto } from '../../dtos/requests/update-business.dto.js';

export class UpdateVendorBusinessCommand extends BaseCommand {
  readonly type = 'vendor.business.update';
  constructor(
    public readonly dto: UpdateVendorBusinessRequestDto,
    public readonly actorId?: string,
  ) {
    super();
  }
}
