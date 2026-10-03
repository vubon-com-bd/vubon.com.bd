/**
 * AddContactRequestDTO
 */
import type { AddContactRequestSchemaType } from '@vubon/shared-schemas/user';

export interface AddContactRequestDTO {
  readonly userId: string;
  readonly type: string;
  readonly value: string;
  readonly label?: string;
  readonly isPrimary?: boolean;
}

export type AddContactRequestInput = AddContactRequestSchemaType;
