/**
 * UpdateAddressRequestDTO
 */
import type { UpdateAddressRequestSchemaType } from '@vubon/shared-schemas/user';

export interface UpdateAddressRequestDTO {
  readonly userId: string;
  readonly addressId: string;
  readonly type?: string;
  readonly line1?: string;
  readonly line2?: string;
  readonly city?: string;
  readonly state?: string;
  readonly postalCode?: string;
  readonly country?: string;
  readonly isDefault?: boolean;
  readonly isDefaultShipping?: boolean;
  readonly isDefaultBilling?: boolean;
}

export type UpdateAddressRequestInput = UpdateAddressRequestSchemaType;
