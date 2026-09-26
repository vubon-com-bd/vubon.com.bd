export interface CompletionInput {
  readonly text: string;
  readonly finishReason: string;
  readonly tokensUsed: number;
  readonly maxTokens: number;
}

export interface ValidationResult {
  readonly valid: boolean;
  readonly reasons: readonly string[];
}

export class CompletionValidatorService {
  validate(input: CompletionInput): ValidationResult {
    const reasons: string[] = [];

    if (input.text.trim().length === 0) {
      reasons.push('Empty completion text');
    }

    if (input.tokensUsed > input.maxTokens) {
      reasons.push(
        `Tokens used (${input.tokensUsed}) exceeds max (${input.maxTokens})`,
      );
    }

    if (input.finishReason === 'content_filter') {
      reasons.push('Content was filtered');
    }

    return {
      valid: reasons.length === 0,
      reasons,
    };
  }

  isComplete(input: CompletionInput): boolean {
    return input.finishReason === 'stop';
  }
}
