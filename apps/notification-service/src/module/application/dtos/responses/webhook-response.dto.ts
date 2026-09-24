export interface WebhookResponseDTO {
  readonly id: string;
  readonly userId: string;
  readonly type: string;
  readonly url: string;
  readonly status: string;
  readonly events: readonly string[];
  readonly createdAt: string;
  readonly updatedAt: string;
}
