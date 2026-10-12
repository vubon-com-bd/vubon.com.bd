/**
 * UpdateVendorProfileCommand
 * @module vendor-service/application/commands/vendor
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateVendorProfileRequestDto } from '../../dtos/requests/update-profile.dto.js';

export class UpdateVendorProfileCommand extends BaseCommand {
  readonly type = 'vendor.profile.update';
  constructor(
    public readonly dto: UpdateVendorProfileRequestDto,
    public readonly actorId?: string,
  ) {
    super();
  }
}
