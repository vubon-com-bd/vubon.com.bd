import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateZoneRequestDTO } from '@application/dtos/requests/zone/index.js';
export class UpdateZoneCommand extends BaseCommand {
  readonly type = 'logistics.zone.update';
  constructor(public readonly dto: UpdateZoneRequestDTO, public readonly actorId: string) { super(); }
}
