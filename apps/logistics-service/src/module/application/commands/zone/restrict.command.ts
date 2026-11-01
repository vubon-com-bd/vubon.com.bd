import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RestrictZoneRequestDTO } from '@application/dtos/requests/zone/index.js';
export class RestrictZoneCommand extends BaseCommand {
  readonly type = 'logistics.zone.restrict';
  constructor(public readonly dto: RestrictZoneRequestDTO, public readonly actorId: string) { super(); }
}
