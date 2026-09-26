/**
 * ResolveComplaintCommand
 * @module support-service/application/commands/complaint
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { ResolveComplaintRequestDTO } from '../../dtos/requests/complaint/resolve-complaint.dto';

export class ResolveComplaintCommand extends BaseCommand {
  readonly type = 'support.complaint.resolve';

  constructor(public readonly payload: ResolveComplaintRequestDTO) {
    super();
  }
}
