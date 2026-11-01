import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SuspendVendorRequestDTO } from '../../dtos/requests/suspension/index.js';

export class SuspendVendorCommand extends BaseCommand {
  readonly type = 'vendor.suspension.suspend';
  constructor(
    public readonly dto: SuspendVendorRequestDTO,
    public readonly actorId: string,
  ) {
    super();
  }
}
