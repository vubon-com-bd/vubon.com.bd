import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SendDigestCommand } from './send-digest.command.js';
import { DIGEST_SERVICE, type IDigestService } from '../../services/interfaces/digest.service.interface.js';
import type { DigestResponseDTO } from '../../dtos/responses/digest-response.dto.js';

@CommandHandler(SendDigestCommand)
export class SendDigestHandler
  implements ICommandHandler<SendDigestCommand, DigestResponseDTO>
{
  constructor(@Inject(DIGEST_SERVICE) private readonly service: IDigestService) {}

  async execute(c: SendDigestCommand): Promise<DigestResponseDTO> {
    return this.service.send(c.dto, c.actorId);
  }
}
