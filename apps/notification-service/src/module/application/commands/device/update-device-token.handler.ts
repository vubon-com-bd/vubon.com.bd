import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateDeviceTokenCommand } from './update-device-token.command';
import type { DeviceTokenRepository } from '../../../domain/repositories/device-token.repository.interface';
import { DeviceTokenEntity } from '../../../domain/entities/device-token.entity';
import { DeviceIdVO } from '../../../domain/value-objects/primitives/device-id.vo';
import { DeviceTokenVO } from '../../../domain/value-objects/primitives/device-token.vo';

@CommandHandler(UpdateDeviceTokenCommand)
export class UpdateDeviceTokenHandler
  extends BaseCommandHandler<UpdateDeviceTokenCommand, void>
  implements ICommandHandler<UpdateDeviceTokenCommand>
{
  readonly commandType = 'device.update-token';

  constructor(private readonly tokenRepo: DeviceTokenRepository) {
    super();
  }

  async execute(command: UpdateDeviceTokenCommand): Promise<void> {
    const deviceId = DeviceIdVO.create(command.deviceId);
    const existing = await this.tokenRepo.findByDeviceId(deviceId);
    for (const t of existing) {
      await this.tokenRepo.delete(t.id);
    }

    const entity = DeviceTokenEntity.create({
      deviceId,
      token: DeviceTokenVO.create(command.token),
      lastUsedAt: new Date(),
    });
    await this.tokenRepo.save(entity);
  }
}
