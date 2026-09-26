export interface PromptResponseDTO {
  readonly id: string;
  readonly type: string;
  readonly text: string;
  readonly role: string;
  readonly tokenCount: number;
  readonly createdAt: string;
}

export interface PromptTemplateResponseDTO {
  readonly id: string;
  readonly name: string;
  readonly template: string;
  readonly role: string;
  readonly variables: readonly string[];
}

export interface CompletionResponseDTO {
  readonly id: string;
  readonly promptId: string;
  readonly text: string;
  readonly tokensUsed: number;
  readonly model: string;
  readonly finishReason: string;
  readonly createdAt: string;
}
