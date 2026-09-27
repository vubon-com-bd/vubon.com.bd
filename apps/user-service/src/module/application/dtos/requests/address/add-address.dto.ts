/**
 * AddAddressRequestDTO
 */
import type { AddAddressRequestSchemaType } from '@vubon/shared-schemas/user';

export interface AddAddressRequestDTO {
  readonly userId: string;
  readonly type: string;
  readonly line1: string;
  readonly line2?: string;
  readonly city: string;
  readonly state?: string;
  readonly postalCode?: string;
  readonly country: string;
  readonly isDefault?: boolean;
  readonly isDefaultShipping?: boolean;
  readonly isDefaultBilling?: boolean;
}

export type AddAddressRequestInput = AddAddressRequestSchemaType;
