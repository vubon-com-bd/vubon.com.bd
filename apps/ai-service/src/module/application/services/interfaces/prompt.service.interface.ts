import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { PromptEntity } from '../../../domain/entities/prompt.entity';
import type { PromptIdVO } from '../../../domain/value-objects/primitives/prompt-id.vo';
import type { ExecutePromptRequestDTO } from '../../dtos/requests/prompt/execute-prompt.dto';
import type { GenerateCompletionRequestDTO } from '../../dtos/requests/prompt/generate-completion.dto';
import type { PromptResponseDTO, CompletionResponseDTO } from '../../dtos/responses/prompt-response.dto';

export interface PromptServiceInterface
  extends BaseServiceInterface<PromptEntity, PromptIdVO> {
  execute(input: ExecutePromptRequestDTO): Promise<CompletionResponseDTO>;
  generateCompletion(input: GenerateCompletionRequestDTO): Promise<CompletionResponseDTO>;
  renderTemplate(templateId: string, variables: Readonly<Record<string, string | number | boolean>>): Promise<{ readonly text: string; readonly missingVariables: readonly string[] }>;
}
