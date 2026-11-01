import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { DispatchWithManifestRequestDTO } from '@application/dtos/requests/dispatch/index.js';
export class DispatchDispatchCommand extends BaseCommand {
  readonly type = 'logistics.dispatch.dispatch';
  constructor(public readonly dto: DispatchWithManifestRequestDTO, public readonly actorId: string) { super(); }
}
