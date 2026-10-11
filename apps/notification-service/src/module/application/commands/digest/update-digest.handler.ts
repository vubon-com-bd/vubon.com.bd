import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateDigestCommand } from './update-digest.command.js';
import { DIGEST_SERVICE, type IDigestService } from '../../services/interfaces/digest.service.interface.js';
import type { DigestResponseDTO } from '../../dtos/responses/digest-response.dto.js';

@CommandHandler(UpdateDigestCommand)
export class UpdateDigestHandler
  implements ICommandHandler<UpdateDigestCommand, DigestResponseDTO>
{
  constructor(@Inject(DIGEST_SERVICE) private readonly service: IDigestService) {}

  async execute(c: UpdateDigestCommand): Promise<DigestResponseDTO> {
    return this.service.update(c.dto, c.actorId);
  }
}
