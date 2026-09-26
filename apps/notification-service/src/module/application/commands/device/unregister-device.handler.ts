import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UnregisterDeviceCommand } from './unregister-device.command';
import type { DeviceRepository } from '../../../domain/repositories/device.repository.interface';
import { DeviceIdVO } from '../../../domain/value-objects/primitives/device-id.vo';
import { DeviceUnregisteredEvent } from '../../../domain/events/device.events';

@CommandHandler(UnregisterDeviceCommand)
export class UnregisterDeviceHandler
  extends BaseCommandHandler<UnregisterDeviceCommand, void>
  implements ICommandHandler<UnregisterDeviceCommand>
{
  readonly commandType = 'device.unregister';

  constructor(
    private readonly deviceRepo: DeviceRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: UnregisterDeviceCommand): Promise<void> {
    const idVO = DeviceIdVO.create(command.deviceId);
    const entity = await this.deviceRepo.findById(idVO);
    if (!entity) throw new Error(`Device not found: ${command.deviceId}`);

    await this.deviceRepo.delete(idVO);

    // ✅ Fixed: 3 args
    await this.eventBus.publish(
      new DeviceUnregisteredEvent(
        entity.id.value,
        entity.id,
        entity.userId,
        0,
      ),
    );
  }
}
