import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ActivateZoneRequestDTO } from '../../dtos/requests/zone/zone.dto.js';
export class ActivateZoneCommand extends BaseCommand {
  readonly type = 'logistics.zone.activate';
  constructor(public readonly dto: ActivateZoneRequestDTO, public readonly actorId?: string) { super(); }
}
