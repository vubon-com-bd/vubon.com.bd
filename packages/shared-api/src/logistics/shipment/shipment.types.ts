export type ShipmentStatus =
  'created' | 'picked_up' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'failed' | 'returned';

export interface Shipment {
  readonly id: string;
  readonly orderId: string;
  readonly trackingNumber?: string;
  readonly courierId?: string;
  readonly status: ShipmentStatus;
  readonly weight?: number;
  readonly dimensions?: { readonly l: number; readonly w: number; readonly h: number };
  readonly fromAddressId: string;
  readonly toAddressId: string;
  readonly createdAt: string;
}

export interface CreateShipmentRequest {
  readonly orderId: string;
  readonly courierId?: string;
  readonly fromAddressId: string;
  readonly toAddressId: string;
  readonly weight?: number;
  readonly dimensions?: { readonly l: number; readonly w: number; readonly h: number };
}

export interface ShipmentListResponse {
  readonly shipments: readonly Shipment[];
  readonly total: number;
}
