import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { TestModelCommand } from './test-model.command';
import type { ModelServiceInterface } from '../../services/interfaces/model.service.interface';

@CommandHandler(TestModelCommand)
export class TestModelHandler
  extends BaseCommandHandler<
    TestModelCommand,
    { readonly passed: boolean; readonly results: readonly unknown[] }
  >
  implements ICommandHandler<TestModelCommand>
{
  readonly commandType = 'ai.model.test';

  constructor(
    private readonly modelService: ModelServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(
    command: TestModelCommand,
  ): Promise<{ readonly passed: boolean; readonly results: readonly unknown[] }> {
    return this.modelService.test(command.input);
  }
}
