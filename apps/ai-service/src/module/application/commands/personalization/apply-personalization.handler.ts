import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ApplyPersonalizationCommand } from './apply-personalization.command';
import type { PersonalizationServiceInterface } from '../../services/interfaces/personalization.service.interface';

@CommandHandler(ApplyPersonalizationCommand)
export class ApplyPersonalizationHandler
  extends BaseCommandHandler<ApplyPersonalizationCommand, readonly { readonly itemId: string; readonly score: number }[]>
  implements ICommandHandler<ApplyPersonalizationCommand>
{
  readonly commandType = 'ai.personalization.apply';
  constructor(
    private readonly personalizationService: PersonalizationServiceInterface,
    private readonly eventBus: EventBus,
  ) { super(); }

  async execute(command: ApplyPersonalizationCommand): Promise<readonly { readonly itemId: string; readonly score: number }[]> {
    return this.personalizationService.apply(command.input);
  }
}
