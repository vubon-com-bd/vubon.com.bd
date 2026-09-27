/**
 * SuspendUserRequestDTO
 */
export interface SuspendUserRequestDTO {
  readonly userId: string;
  readonly reason: string;
  readonly suspendedUntil?: string;
}
