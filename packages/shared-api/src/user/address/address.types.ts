export interface Address {
  readonly id: string;
  readonly label: string;
  readonly line1: string;
  readonly line2?: string;
  readonly city: string;
  readonly state: string;
  readonly postalCode: string;
  readonly country: string;
  readonly isDefault: boolean;
}

export interface CreateAddressRequest {
  readonly label: string;
  readonly line1: string;
  readonly line2?: string;
  readonly city: string;
  readonly state: string;
  readonly postalCode: string;
  readonly country: string;
  readonly isDefault?: boolean;
}

export interface UpdateAddressRequest {
  readonly label?: string;
  readonly line1?: string;
  readonly line2?: string;
  readonly city?: string;
  readonly state?: string;
  readonly postalCode?: string;
  readonly country?: string;
  readonly isDefault?: boolean;
}

export interface AddressListResponse {
  readonly addresses: readonly Address[];
}
