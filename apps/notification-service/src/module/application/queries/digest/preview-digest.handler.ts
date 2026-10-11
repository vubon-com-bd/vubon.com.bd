import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { PreviewDigestQuery } from './preview-digest.query.js';
import { DIGEST_SERVICE, type IDigestService } from '../../services/interfaces/digest.service.interface.js';
import type { DigestPreviewResponseDTO } from '../../dtos/responses/digest-response.dto.js';

@QueryHandler(PreviewDigestQuery)
export class PreviewDigestHandler
  implements IQueryHandler<PreviewDigestQuery, DigestPreviewResponseDTO>
{
  constructor(@Inject(DIGEST_SERVICE) private readonly service: IDigestService) {}

  async execute(q: PreviewDigestQuery): Promise<DigestPreviewResponseDTO> {
    return this.service.preview(q.options);
  }
}
