import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { CreateModelRequestDTO } from '../../dtos/requests/model/create-model.dto';

export class CreateModelCommand extends BaseCommand {
  readonly type = 'ai.model.create';

  constructor(
    public readonly input: CreateModelRequestDTO,
    public readonly userId: string,
    public readonly correlationId?: string,
  ) {
    super();
  }
}
