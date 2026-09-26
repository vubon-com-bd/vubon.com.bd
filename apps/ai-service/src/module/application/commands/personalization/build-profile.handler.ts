import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { BuildProfileCommand } from './build-profile.command';
import type { PersonalizationProfileServiceInterface } from '../../services/interfaces/personalization-profile.service.interface';

@CommandHandler(BuildProfileCommand)
export class BuildProfileHandler
  extends BaseCommandHandler<BuildProfileCommand, { readonly userId: string }>
  implements ICommandHandler<BuildProfileCommand>
{
  readonly commandType = 'ai.personalization.build-profile';
  constructor(
    private readonly profileService: PersonalizationProfileServiceInterface,
    private readonly eventBus: EventBus,
  ) { super(); }

  async execute(command: BuildProfileCommand): Promise<{ readonly userId: string }> {
    const entity = await this.profileService.build(command.input);
    return { userId: entity.profile.userId.value };
  }
}
