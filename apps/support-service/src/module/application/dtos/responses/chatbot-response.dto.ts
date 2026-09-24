export interface ChatbotResponseDTO {
  readonly id: string;
  readonly name: string;
  readonly status: string;
  readonly type: string;
}

export interface ChatbotMessageResponseDTO {
  readonly chatbotId: string;
  readonly message: string;
  readonly response: string;
  readonly intent: string | null;
  readonly confidence: number;
}
