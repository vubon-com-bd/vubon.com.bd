import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { FileClaimRequestDTO } from '../../dtos/requests/insurance/insurance.dto.js';
export class FileInsuranceClaimCommand extends BaseCommand {
  readonly type = 'logistics.insurance.file_claim';
  constructor(public readonly dto: FileClaimRequestDTO, public readonly actorId?: string) { super(); }
}
