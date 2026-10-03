/**
 * RemoveAttributeHandler
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RemoveAttributeCommand } from './remove-attribute.command.js';
import { ATTRIBUTE_SERVICE, type IAttributeService } from '../../services/interfaces/attribute.service.interface.js';

@CommandHandler(RemoveAttributeCommand)
export class RemoveAttributeHandler implements ICommandHandler<RemoveAttributeCommand, void> {
  constructor(@Inject(ATTRIBUTE_SERVICE) private readonly service: IAttributeService) {}
  async execute(c: RemoveAttributeCommand): Promise<void> {
    return this.service.remove(c.attributeId, c.actorId);
  }
}
