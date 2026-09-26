import { ExecutePromptHandler } from '../../../application/commands/prompt/execute-prompt.handler';
import { CreateTemplateHandler } from '../../../application/commands/prompt/create-template.handler';
import { GenerateCompletionHandler } from '../../../application/commands/prompt/generate-completion.handler';

export const PromptCommandHandlers = [
  ExecutePromptHandler,
  CreateTemplateHandler,
  GenerateCompletionHandler,
];
