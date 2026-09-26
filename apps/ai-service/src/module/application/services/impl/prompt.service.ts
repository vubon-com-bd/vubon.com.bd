import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { PromptServiceInterface } from '../interfaces/prompt.service.interface';
import type { PromptRepository } from '../../../domain/repositories/prompt.repository.interface';
import type { PromptTemplateRepository } from '../../../domain/repositories/prompt-template.repository.interface';
import { PromptEntity } from '../../../domain/entities/prompt.entity';
import { PromptIdVO } from '../../../domain/value-objects/primitives/prompt-id.vo';
import { PromptTokenCountVO } from '../../../domain/value-objects/primitives/prompt-token-count.vo';
import { CompletionTextVO } from '../../../domain/value-objects/primitives/completion-text.vo';
import { CompletionEntity } from '../../../domain/entities/completion.entity';
import { PromptEngineService } from '../../../domain/services/prompt-engine.service';
import { TokenCounterService } from '../../../domain/services/token-counter.service';
import { PromptNotFoundError, PromptTooLongError } from '../../errors/prompt.errors';
import type { ExecutePromptRequestDTO } from '../../dtos/requests/prompt/execute-prompt.dto';
import type { GenerateCompletionRequestDTO } from '../../dtos/requests/prompt/generate-completion.dto';
import type { CompletionResponseDTO } from '../../dtos/responses/prompt-response.dto';

type PromptRole = 'system' | 'user' | 'assistant';

@Injectable()
export class PromptService
  extends BaseService<PromptEntity, PromptIdVO>
  implements PromptServiceInterface
{
  readonly name = 'PromptService';

  constructor(
    private readonly promptRepo: PromptRepository,
    private readonly templateRepo: PromptTemplateRepository,
    private readonly promptEngine: PromptEngineService,
    private readonly tokenCounter: TokenCounterService,
  ) {
    super();
  }

  async execute(input: ExecutePromptRequestDTO): Promise<CompletionResponseDTO> {
    let text = input.text ?? '';
    let role: PromptRole = (input.role as PromptRole | undefined) ?? 'user';

    if (input.templateId) {
      const template = await this.templateRepo.findByPromptId(
        PromptIdVO.create(input.templateId),
      );
      if (!template) throw new PromptNotFoundError(input.templateId);

      const rendered = this.promptEngine.render({
        template: template.template,
        variables: input.variables ?? {},
      });
      text = rendered.text;
      role = template.template.role as PromptRole;
    }

    if (!text) throw new PromptNotFoundError('no text or template');

    const tokenCount = this.tokenCounter.estimate(text);
    if (input.maxTokens && tokenCount > input.maxTokens) {
      throw new PromptTooLongError(tokenCount, input.maxTokens);
    }

    const prompt = PromptEntity.create({
      type: 'execute',
      text,
      role,
      template: null,
      tokenCount: PromptTokenCountVO.create(tokenCount),
    });
    await this.promptRepo.save(prompt);

    return this.generateCompletion({
      promptId: prompt.id.value,
      model: input.model,
      maxTokens: input.maxTokens ?? 1000,
      temperature: input.temperature ?? 0.7,
    });
  }

  async generateCompletion(input: GenerateCompletionRequestDTO): Promise<CompletionResponseDTO> {
    const prompt = await this.promptRepo.findById(PromptIdVO.create(input.promptId));
    if (!prompt) throw new PromptNotFoundError(input.promptId);

    const completionText = `[Generated completion for model ${input.model}]`;
    const tokensUsed = this.tokenCounter.estimate(completionText);

    const completion = CompletionEntity.create({
      promptId: prompt.id,
      text: CompletionTextVO.create(completionText),
      tokensUsed,
      model: input.model,
      finishReason: 'stop',
    });

    return {
      id: completion.id.value,
      promptId: completion.promptId.value,
      text: completion.text.value,
      tokensUsed: completion.tokensUsed,
      model: completion.model,
      finishReason: completion.finishReason,
      createdAt: completion.createdAt,
    };
  }

  async renderTemplate(
    templateId: string,
    variables: Readonly<Record<string, string | number | boolean>>,
  ): Promise<{ readonly text: string; readonly missingVariables: readonly string[] }> {
    const template = await this.templateRepo.findByPromptId(PromptIdVO.create(templateId));
    if (!template) throw new PromptNotFoundError(templateId);

    const rendered = this.promptEngine.render({
      template: template.template,
      variables,
    });
    return { text: rendered.text, missingVariables: rendered.missingVariables };
  }
}
