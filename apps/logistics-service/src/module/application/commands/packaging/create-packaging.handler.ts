import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreatePackagingCommand } from './create-packaging.command';
import type { PackagingServiceInterface } from '../../services/interfaces/packaging.service.interface';
import type { PackagingEntity } from '../../../domain/entities/packaging.entity';

@CommandHandler(CreatePackagingCommand)
export class CreatePackagingHandler
  extends BaseCommandHandler<CreatePackagingCommand, PackagingEntity>
  implements ICommandHandler<CreatePackagingCommand>
{
  readonly commandType = 'logistics.packaging.create';

  constructor(private readonly packagingService: PackagingServiceInterface) {
    super();
  }

  async execute(command: CreatePackagingCommand): Promise<PackagingEntity> {
    return this.packagingService.create({
      type: command.packagingType,
      material: command.material,
      size: command.size,
      cost: command.cost,
      currency: command.currency,
      maxWeight: command.maxWeight,
    } as never);
  }
}
