import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { TestModelRequestDTO } from '../../dtos/requests/model/test-model.dto';

export class TestModelCommand extends BaseCommand {
  readonly type = 'ai.model.test';

  constructor(
    public readonly input: TestModelRequestDTO,
    public readonly userId: string,
  ) {
    super();
  }
}
