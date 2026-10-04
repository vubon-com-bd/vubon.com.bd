export type VendorStatus = 'pending' | 'active' | 'suspended' | 'closed';

export interface Vendor {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly status: VendorStatus;
  readonly email: string;
  readonly phone?: string;
  readonly logoUrl?: string;
  readonly createdAt: string;
}

export interface CreateVendorRequest {
  readonly name: string;
  readonly email: string;
  readonly phone?: string;
}

export interface UpdateVendorRequest {
  readonly name?: string;
  readonly phone?: string;
  readonly logoUrl?: string;
}

export interface VendorListResponse {
  readonly vendors: readonly Vendor[];
  readonly total: number;
}
