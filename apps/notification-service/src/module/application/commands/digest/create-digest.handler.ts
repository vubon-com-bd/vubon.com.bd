import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateDigestCommand } from './create-digest.command';
import type { DigestResponseDTO } from '../../dtos/responses/digest-response.dto';
import type { DigestRepository } from '../../../domain/repositories/digest.repository.interface';
import { DigestEntity } from '../../../domain/entities/digest.entity';
import { DigestStatusVO } from '../../../domain/value-objects/primitives/digest-status.vo';
import { DigestTypeVO } from '../../../domain/value-objects/primitives/digest-type.vo';
import { DigestPeriodVO } from '../../../domain/value-objects/primitives/digest-period.vo';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';

@CommandHandler(CreateDigestCommand)
export class CreateDigestHandler
  extends BaseCommandHandler<CreateDigestCommand, DigestResponseDTO>
  implements ICommandHandler<CreateDigestCommand>
{
  readonly commandType = 'digest.create';

  constructor(private readonly digestRepo: DigestRepository) {
    super();
  }

  async execute(command: CreateDigestCommand): Promise<DigestResponseDTO> {
    const entity = DigestEntity.create({
      userId: UserIdVO.create(command.userId),
      type: DigestTypeVO.create(command.digestType),
      status: DigestStatusVO.create('pending'),
      period: DigestPeriodVO.create(command.frequency),
      scheduledAt: new Date(command.scheduledAt),
      sentAt: null,
    });

    const saved = await this.digestRepo.save(entity);

    return {
      id: saved.id.value,
      userId: saved.userId.value,
      type: saved.type.value,
      frequency: saved.period.value,
      status: saved.status.value,
      scheduledAt: saved.scheduledAt.toISOString(),
      sentAt: saved.sentAt?.toISOString() ?? null,
      itemCount: 0,
    };
  }
}
