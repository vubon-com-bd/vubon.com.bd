import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GenerateDispatchManifestCommand } from './generate-dispatch-manifest.command.js';
import { DISPATCH_SERVICE, type IDispatchService } from '../../services/interfaces/dispatch.service.interface.js';
import type { DispatchResponseDTO } from '../../dtos/responses/dispatch/dispatch-response.dto.js';

@CommandHandler(GenerateDispatchManifestCommand)
export class GenerateDispatchManifestHandler implements ICommandHandler<GenerateDispatchManifestCommand, DispatchResponseDTO> {
  constructor(@Inject(DISPATCH_SERVICE) private readonly service: IDispatchService) {}
  async execute(c: GenerateDispatchManifestCommand): Promise<DispatchResponseDTO> { return this.service.generateManifest(c.dto, c.actorId); }
}
