export interface ChatbotMessageRequest {
  readonly message: string;
  readonly sessionId?: string;
  readonly context?: Record<string, unknown>;
}

export interface ChatbotMessageResponse {
  readonly reply: string;
  readonly sessionId: string;
  readonly suggestions?: readonly string[];
  readonly intent?: string;
  readonly confidence?: number;
}
