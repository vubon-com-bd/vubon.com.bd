import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetPromptQuery } from './get-prompt.query';
import type { PromptRepository } from '../../../domain/repositories/prompt.repository.interface';
import { PromptIdVO } from '../../../domain/value-objects/primitives/prompt-id.vo';
import { PromptNotFoundError } from '../../errors/prompt.errors';
import type { PromptResponseDTO } from '../../dtos/responses/prompt-response.dto';

@QueryHandler(GetPromptQuery)
export class GetPromptHandler
  extends BaseQueryHandler<GetPromptQuery, PromptResponseDTO>
  implements IQueryHandler<GetPromptQuery>
{
  readonly queryType = 'ai.prompt.get';
  constructor(private readonly promptRepo: PromptRepository) { super(); }

  async execute(query: GetPromptQuery): Promise<PromptResponseDTO> {
    const entity = await this.promptRepo.findById(PromptIdVO.create(query.promptId));
    if (!entity) throw new PromptNotFoundError(query.promptId);
    return {
      id: entity.id.value,
      type: entity.type,
      text: entity.text,
      role: entity.role,
      tokenCount: entity.tokenCount.value,
      createdAt: entity.createdAt,
    };
  }
}
