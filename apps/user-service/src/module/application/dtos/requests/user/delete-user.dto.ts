/**
 * DeleteUserRequestDTO
 */
export interface DeleteUserRequestDTO {
  readonly userId: string;
  readonly reason?: string;
  readonly hardDelete?: boolean;
}
