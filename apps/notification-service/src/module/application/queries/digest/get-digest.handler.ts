import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetDigestQuery } from './get-digest.query.js';
import {
  DIGEST_SERVICE,
  type IDigestService,
} from '@application/services/interfaces/digest.service.interface.js';
import type { DigestResponseDTO } from '@application/dtos/responses/digest-response.dto.js';

@QueryHandler(GetDigestQuery)
export class GetDigestHandler
  implements IQueryHandler<GetDigestQuery, DigestResponseDTO>
{
  constructor(@Inject(DIGEST_SERVICE) private readonly service: IDigestService) {}

  async execute(q: GetDigestQuery): Promise<DigestResponseDTO> {
    return this.service.getById(q.digestId);
  }
}
