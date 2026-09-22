import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RemoveTeamMemberCommand } from './remove-team-member.command';
import type { VendorTeamRepository } from '../../../domain/repositories/vendor-team.repository.interface';
import { TeamMemberIdVO } from '../../../domain/value-objects/primitives/team-member-id.vo';
import { VendorNotFoundAppError } from '../../errors/vendor.errors';

@CommandHandler(RemoveTeamMemberCommand)
export class RemoveTeamMemberHandler
  extends BaseCommandHandler<RemoveTeamMemberCommand, void>
  implements ICommandHandler<RemoveTeamMemberCommand>
{
  readonly commandType = 'vendor.team.remove-member';

  constructor(
    private readonly teamRepo: VendorTeamRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: RemoveTeamMemberCommand): Promise<void> {
    const member = await this.teamRepo.findById(
      TeamMemberIdVO.create(command.memberId),
    );
    if (!member) throw new VendorNotFoundAppError(command.memberId);

    const removed = member.remove();
    await this.teamRepo.save(removed);

    const events = removed.pullDomainEvents();
    for (const event of events) {
      this.eventBus.publish(event as never);
    }
  }
}
