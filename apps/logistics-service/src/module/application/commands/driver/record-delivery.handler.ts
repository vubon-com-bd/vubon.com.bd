import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RecordDeliveryDriverCommand } from './record-delivery.command.js';
import { DRIVER_SERVICE, type IDriverService } from '@application/services/interfaces/driver.service.interface';
import type { DriverResponseDTO } from '@application/dtos/responses/driver/index.js';

@CommandHandler(RecordDeliveryDriverCommand)
export class RecordDeliveryDriverHandler implements ICommandHandler<RecordDeliveryDriverCommand, DriverResponseDTO> {
  constructor(@Inject(DRIVER_SERVICE) private readonly service: IDriverService) {}
  async execute(c: RecordDeliveryDriverCommand): Promise<DriverResponseDTO> { return this.service.recordDelivery(c.dto, c.actorId); }
}
