import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { DeployModelRequestDTO } from '../../dtos/requests/model/deploy-model.dto';

export class DeployModelCommand extends BaseCommand {
  readonly type = 'ai.model.deploy';

  constructor(
    public readonly input: DeployModelRequestDTO,
    public readonly userId: string,
  ) {
    super();
  }
}
