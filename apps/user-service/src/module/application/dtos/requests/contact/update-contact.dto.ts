/**
 * UpdateContactRequestDTO
 */
export interface UpdateContactRequestDTO {
  readonly userId: string;
  readonly contactId: string;
  readonly value?: string;
  readonly label?: string;
  readonly isPrimary?: boolean;
}
