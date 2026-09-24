export interface VendorClient {
  getById(vendorId: string): Promise<{
    readonly id: string;
    readonly name: string;
    readonly status: string;
  } | null>;
}
