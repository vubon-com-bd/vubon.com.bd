import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CancelDigestCommand } from './cancel-digest.command.js';
import { DIGEST_SERVICE, type IDigestService } from '../../services/interfaces/digest.service.interface.js';
import type { DigestResponseDTO } from '../../dtos/responses/digest-response.dto.js';

@CommandHandler(CancelDigestCommand)
export class CancelDigestHandler
  implements ICommandHandler<CancelDigestCommand, DigestResponseDTO>
{
  constructor(@Inject(DIGEST_SERVICE) private readonly service: IDigestService) {}

  async execute(c: CancelDigestCommand): Promise<DigestResponseDTO> {
    return this.service.cancel(c.digestId, c.actorId);
  }
}
