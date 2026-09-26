/**
 * EscalateComplaintCommand
 * @module support-service/application/commands/complaint
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { EscalateComplaintRequestDTO } from '../../dtos/requests/complaint/escalate-complaint.dto';

export class EscalateComplaintCommand extends BaseCommand {
  readonly type = 'support.complaint.escalate';

  constructor(public readonly payload: EscalateComplaintRequestDTO) {
    super();
  }
}
