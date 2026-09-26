export interface DigestResponseDTO {
  readonly id: string;
  readonly userId: string;
  readonly type: string;
  readonly frequency: string;
  readonly status: string;
  readonly scheduledAt: string;
  readonly sentAt: string | null;
  readonly itemCount: number;
}
