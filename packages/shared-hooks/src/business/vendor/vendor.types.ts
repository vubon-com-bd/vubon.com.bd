export type VendorStatus = 'pending' | 'active' | 'suspended' | 'closed';

export interface Vendor {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly status: VendorStatus;
  readonly email: string;
  readonly logoUrl?: string;
}

export interface VendorAnalytics {
  readonly vendorId: string;
  readonly totalOrders: number;
  readonly totalRevenue: number;
  readonly currency: string;
  readonly avgRating: number;
}
