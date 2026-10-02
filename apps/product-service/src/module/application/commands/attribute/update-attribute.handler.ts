/**
 * UpdateAttributeHandler
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateAttributeCommand } from './update-attribute.command.js';
import { ATTRIBUTE_SERVICE, type IAttributeService } from '../../services/interfaces/attribute.service.interface.js';
import type { AttributeResponseDTO } from '../../dtos/responses/attribute-response.dto.js';

@CommandHandler(UpdateAttributeCommand)
export class UpdateAttributeHandler implements ICommandHandler<UpdateAttributeCommand, AttributeResponseDTO> {
  constructor(@Inject(ATTRIBUTE_SERVICE) private readonly service: IAttributeService) {}
  async execute(c: UpdateAttributeCommand): Promise<AttributeResponseDTO> {
    return this.service.update(c.dto);
  }
}
