import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SuspendZoneRequestDTO } from '../../dtos/requests/zone/zone.dto.js';
export class SuspendZoneCommand extends BaseCommand {
  readonly type = 'logistics.zone.suspend';
  constructor(public readonly dto: SuspendZoneRequestDTO, public readonly actorId?: string) { super(); }
}
