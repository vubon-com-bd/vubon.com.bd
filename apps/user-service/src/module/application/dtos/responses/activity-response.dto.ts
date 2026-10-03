/**
 * ActivityResponseDTO
 */
export interface ActivityResponseDTO {
  readonly id: string;
  readonly userId: string;
  readonly type: string;
  readonly timestamp: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}
