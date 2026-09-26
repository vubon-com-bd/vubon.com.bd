import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { CompletionServiceInterface } from '../interfaces/completion.service.interface';
import type { CompletionRepository } from '../../../domain/repositories/completion.repository.interface';
import { CompletionEntity } from '../../../domain/entities/completion.entity';
import { CompletionIdVO } from '../../../domain/value-objects/primitives/completion-id.vo';
import { PromptIdVO } from '../../../domain/value-objects/primitives/prompt-id.vo';
import { CompletionValidatorService } from '../../../domain/services/completion-validator.service';
import { PromptNotFoundError } from '../../errors/prompt.errors';

@Injectable()
export class CompletionService
  extends BaseService<CompletionEntity, CompletionIdVO>
  implements CompletionServiceInterface
{
  readonly name = 'CompletionService';

  constructor(
    private readonly completionRepo: CompletionRepository,
    private readonly validator: CompletionValidatorService,
  ) {
    super();
  }

  async findByPromptId(promptId: string): Promise<readonly CompletionEntity[]> {
    return this.completionRepo.findByPromptId(PromptIdVO.create(promptId));
  }

  async validate(
    completionId: string,
  ): Promise<{ readonly valid: boolean; readonly reasons: readonly string[] }> {
    const entity = await this.completionRepo.findById(
      CompletionIdVO.create(completionId),
    );
    if (!entity) throw new PromptNotFoundError(completionId);

    return this.validator.validate({
      text: entity.text.value,
      finishReason: entity.finishReason,
      tokensUsed: entity.tokensUsed,
      maxTokens: 128000,
    });
  }
}
