export interface StartLiveChatRequest {
  readonly topic?: string;
  readonly metadata?: Record<string, unknown>;
}

export interface StartLiveChatResponse {
  readonly sessionId: string;
  readonly agentId?: string;
  readonly wsUrl?: string;
  readonly startedAt: string;
}

export interface EndLiveChatResponse {
  readonly sessionId: string;
  readonly endedAt: string;
  readonly duration: number;
}
