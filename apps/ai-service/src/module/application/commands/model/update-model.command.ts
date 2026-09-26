import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { UpdateModelRequestDTO } from '../../dtos/requests/model/update-model.dto';

export class UpdateModelCommand extends BaseCommand {
  readonly type = 'ai.model.update';

  constructor(
    public readonly modelId: string,
    public readonly input: UpdateModelRequestDTO,
    public readonly userId: string,
  ) {
    super();
  }
}
