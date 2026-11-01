export interface UserContact {
  readonly id: string;
  readonly name: string;
  readonly relationship: string;
  readonly phone: string;
  readonly email?: string;
  readonly isPrimary: boolean;
}

export interface CreateContactRequest {
  readonly name: string;
  readonly relationship: string;
  readonly phone: string;
  readonly email?: string;
  readonly isPrimary?: boolean;
}

export interface ContactListResponse {
  readonly contacts: readonly UserContact[];
}
