/**
 * AddressResponseDTO
 */
export interface AddressResponseDTO {
  readonly id: string;
  readonly userId: string;
  readonly type: string;
  readonly line1: string;
  readonly line2?: string;
  readonly city: string;
  readonly state?: string;
  readonly postalCode?: string;
  readonly country: string;
  readonly isDefault: boolean;
  readonly isDefaultShipping: boolean;
  readonly isDefaultBilling: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}
