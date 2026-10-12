import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateZoneRequestDTO } from '../../dtos/requests/zone/zone.dto.js';
export class CreateZoneCommand extends BaseCommand {
  readonly type = 'logistics.zone.create';
  constructor(public readonly dto: CreateZoneRequestDTO, public readonly actorId?: string) { super(); }
}
