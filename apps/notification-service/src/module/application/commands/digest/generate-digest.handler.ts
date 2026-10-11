import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GenerateDigestCommand } from './generate-digest.command.js';
import { DIGEST_SERVICE, type IDigestService } from '../../services/interfaces/digest.service.interface.js';
import type { DigestResponseDTO } from '../../dtos/responses/digest-response.dto.js';

@CommandHandler(GenerateDigestCommand)
export class GenerateDigestHandler
  implements ICommandHandler<GenerateDigestCommand, DigestResponseDTO>
{
  constructor(@Inject(DIGEST_SERVICE) private readonly service: IDigestService) {}

  async execute(c: GenerateDigestCommand): Promise<DigestResponseDTO> {
    return this.service.generate(c.dto, c.actorId);
  }
}
