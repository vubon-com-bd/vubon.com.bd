import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { InactivateZoneRequestDTO } from '../../dtos/requests/zone/zone.dto.js';
export class InactivateZoneCommand extends BaseCommand {
  readonly type = 'logistics.zone.inactivate';
  constructor(public readonly dto: InactivateZoneRequestDTO, public readonly actorId?: string) { super(); }
}
