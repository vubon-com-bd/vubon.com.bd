import { Injectable } from '@nestjs/common';

export interface ShipmentResult {
  readonly success: boolean;
  readonly trackingNumber?: string;
  readonly error?: string;
}

@Injectable()
export class ShippingProviderService {
  async createShipment(_orderId: string, _address: string): Promise<ShipmentResult> {
    throw new Error('Shipping provider not yet wired');
  }

  async trackShipment(_trackingNumber: string): Promise<ShipmentResult> {
    throw new Error('Shipping tracking not yet wired');
  }
}
