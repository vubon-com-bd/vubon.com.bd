export type AiModelKind = 'llm' | 'embedding' | 'classification' | 'regression' | 'vision';

export interface AiModel {
  readonly id: string;
  readonly name: string;
  readonly kind: AiModelKind;
  readonly version: string;
  readonly provider?: string;
  readonly contextWindow?: number;
  readonly available: boolean;
}

export interface AiModelListResponse {
  readonly models: readonly AiModel[];
  readonly total: number;
}

export interface AiInferRequest {
  readonly input: unknown;
  readonly params?: Record<string, unknown>;
  readonly stream?: boolean;
}

export interface AiInferResponse {
  readonly output: unknown;
  readonly modelId: string;
  readonly usage?: {
    readonly promptTokens?: number;
    readonly completionTokens?: number;
    readonly totalTokens?: number;
  };
  readonly latencyMs?: number;
}
