export interface LiveChatResponseDTO {
  readonly id: string;
  readonly userId: string;
  readonly agentId: string | null;
  readonly status: string;
  readonly startedAt: string;
  readonly endedAt: string | null;
}
