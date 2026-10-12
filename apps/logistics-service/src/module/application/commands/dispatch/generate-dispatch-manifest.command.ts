import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { GenerateDispatchManifestRequestDTO } from '../../dtos/requests/dispatch/dispatch.dto.js';
export class GenerateDispatchManifestCommand extends BaseCommand {
  readonly type = 'logistics.dispatch.generate_manifest';
  constructor(public readonly dto: GenerateDispatchManifestRequestDTO, public readonly actorId?: string) { super(); }
}
