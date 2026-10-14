import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ReinstateVendorRequestDTO } from '../../dtos/requests/suspension/index.js';

export class ReinstateVendorCommand extends BaseCommand {
  readonly type = 'vendor.suspension.reinstate';
  constructor(
    public readonly dto: ReinstateVendorRequestDTO,
    public readonly actorId: string,
  ) {
    super();
  }
}
