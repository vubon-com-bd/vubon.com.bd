import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateProfileCommand } from './update-profile.command';
import type { PersonalizationProfileServiceInterface } from '../../services/interfaces/personalization-profile.service.interface';

@CommandHandler(UpdateProfileCommand)
export class UpdateProfileHandler
  extends BaseCommandHandler<UpdateProfileCommand, void>
  implements ICommandHandler<UpdateProfileCommand>
{
  readonly commandType = 'ai.personalization.update-profile';
  constructor(
    private readonly profileService: PersonalizationProfileServiceInterface,
    private readonly eventBus: EventBus,
  ) { super(); }

  async execute(command: UpdateProfileCommand): Promise<void> {
    await this.profileService.update(command.input);
  }
}
