import { ExecutePromptSchema } from '../dtos/requests/prompt/execute-prompt.dto';

export class PromptValidator {
  static validateExecute(input: unknown) {
    return ExecutePromptSchema.parse(input);
  }

  static safeValidateExecute(input: unknown) {
    return ExecutePromptSchema.safeParse(input);
  }
}
