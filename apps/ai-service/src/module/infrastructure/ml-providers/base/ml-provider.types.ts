export interface EmbedInput {
  readonly texts: readonly string[];
  readonly model?: string;
  readonly dimension?: number;
}

export interface EmbedOutput {
  readonly vectors: readonly (readonly number[])[];
  readonly dimension: number;
  readonly model: string;
  readonly tokensUsed: number;
}

export interface CompleteInput {
  readonly prompt: string;
  readonly systemPrompt?: string;
  readonly model?: string;
  readonly maxTokens?: number;
  readonly temperature?: number;
  readonly stopSequences?: readonly string[];
}

export interface CompleteOutput {
  readonly text: string;
  readonly tokensUsed: number;
  readonly promptTokens: number;
  readonly completionTokens: number;
  readonly model: string;
  readonly finishReason: string;
}

export interface MlProviderHealth {
  readonly healthy: boolean;
  readonly latencyMs: number;
  readonly error?: string;
}
