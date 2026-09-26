import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { DeprecateModelRequestDTO } from '../../dtos/requests/model/deprecate-model.dto';

export class DeprecateModelCommand extends BaseCommand {
  readonly type = 'ai.model.deprecate';

  constructor(
    public readonly input: DeprecateModelRequestDTO,
    public readonly userId: string,
  ) {
    super();
  }
}
