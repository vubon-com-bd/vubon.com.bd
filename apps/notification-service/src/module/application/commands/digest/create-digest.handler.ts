import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateDigestCommand } from './create-digest.command.js';
import {
  DIGEST_SERVICE,
  type IDigestService,
} from '@application/services/interfaces/digest.service.interface.js';
import type { DigestResponseDTO } from '@application/dtos/responses/digest-response.dto.js';

@CommandHandler(CreateDigestCommand)
export class CreateDigestHandler
  implements ICommandHandler<CreateDigestCommand, DigestResponseDTO>
{
  constructor(@Inject(DIGEST_SERVICE) private readonly service: IDigestService) {}

  async execute(c: CreateDigestCommand): Promise<DigestResponseDTO> {
    return this.service.create(c.dto, c.actorId);
  }
}
