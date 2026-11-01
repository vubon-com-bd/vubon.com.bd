import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListDigestsQuery } from './list-digests.query.js';
import {
  DIGEST_SERVICE,
  type IDigestService,
} from '@application/services/interfaces/digest.service.interface.js';
import type { DigestListResponseDTO } from '@application/dtos/responses/digest-response.dto.js';

@QueryHandler(ListDigestsQuery)
export class ListDigestsHandler
  implements IQueryHandler<ListDigestsQuery, DigestListResponseDTO>
{
  constructor(@Inject(DIGEST_SERVICE) private readonly service: IDigestService) {}

  async execute(q: ListDigestsQuery): Promise<DigestListResponseDTO> {
    return this.service.list(q.options);
  }
}
