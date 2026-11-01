import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { DeactivateZoneRequestDTO } from '@application/dtos/requests/zone/index.js';
export class DeactivateZoneCommand extends BaseCommand {
  readonly type = 'logistics.zone.deactivate';
  constructor(public readonly dto: DeactivateZoneRequestDTO, public readonly actorId: string) { super(); }
}
