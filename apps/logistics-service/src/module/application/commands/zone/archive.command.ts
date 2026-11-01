import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ZoneActionRequestDTO } from '@application/dtos/requests/zone/index.js';
export class ArchiveZoneCommand extends BaseCommand {
  readonly type = 'logistics.zone.archive';
  constructor(public readonly dto: ZoneActionRequestDTO, public readonly actorId: string) { super(); }
}
