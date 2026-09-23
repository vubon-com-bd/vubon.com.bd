import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SelectPackagingCommand } from './select-packaging.command';
import type { PackagingServiceInterface } from '../../services/interfaces/packaging.service.interface';
import type { PackagingEntity } from '../../../domain/entities/packaging.entity';

@CommandHandler(SelectPackagingCommand)
export class SelectPackagingHandler
  extends BaseCommandHandler<SelectPackagingCommand, PackagingEntity | null>
  implements ICommandHandler<SelectPackagingCommand>
{
  readonly commandType = 'logistics.packaging.select';

  constructor(private readonly packagingService: PackagingServiceInterface) {
    super();
  }

  async execute(command: SelectPackagingCommand): Promise<PackagingEntity | null> {
    return this.packagingService.select({
      weightKg: command.weightKg,
      dimensions: command.dimensions,
    });
  }
}
