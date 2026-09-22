import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { AddTeamMemberCommand } from './add-team-member.command';
import type { VendorTeamRepository } from '../../../domain/repositories/vendor-team.repository.interface';
import { VendorTeamEntity } from '../../../domain/entities/vendor-team.entity';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { TeamMemberIdVO } from '../../../domain/value-objects/primitives/team-member-id.vo';
import { TeamRoleVO } from '../../../domain/value-objects/primitives/team-role.vo';
import { TeamPermissionVO } from '../../../domain/value-objects/primitives/team-permission.vo';
import type { TeamMemberResponseDto } from '../../dtos/responses/team-response.dto';

@CommandHandler(AddTeamMemberCommand)
export class AddTeamMemberHandler
  extends BaseCommandHandler<AddTeamMemberCommand, TeamMemberResponseDto>
  implements ICommandHandler<AddTeamMemberCommand>
{
  readonly commandType = 'vendor.team.add-member';

  constructor(
    private readonly teamRepo: VendorTeamRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: AddTeamMemberCommand): Promise<TeamMemberResponseDto> {
    const entity = VendorTeamEntity.create({
      vendorId: VendorIdVO.create(command.vendorId),
      userId: UserIdVO.create(command.userId),
      role: TeamRoleVO.create(command.role),
      permissions: (command.permissions ?? []).map((p) => TeamPermissionVO.create(p)),
      invitedAt: new Date(),
      joinedAt: null,
    });

    await this.teamRepo.save(entity);

    const events = entity.pullDomainEvents();
    for (const event of events) {
      this.eventBus.publish(event as never);
    }

    return {
      id: entity.id.value,
      vendorId: entity.vendorId.value,
      userId: entity.userId.value,
      role: entity.role.value,
      permissions: entity.permissions.map((p) => p.value),
      invitedAt: entity.invitedAt.toISOString(),
      joinedAt: entity.joinedAt?.toISOString() ?? null,
    };
  }
}
