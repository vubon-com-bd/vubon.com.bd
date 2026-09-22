import { Injectable } from '@nestjs/common';

export interface ShipmentCreateResult {
  readonly success: boolean;
  readonly trackingNumber?: string;
  readonly estimatedDelivery?: string;
  readonly error?: string;
}

@Injectable()
export class ShippingService {
  async createShipment(
    _orderId: string,
    _address: string,
    _carrier?: string,
  ): Promise<ShipmentCreateResult> {
    throw new Error('Shipping SDK not yet wired');
  }

  async track(_trackingNumber: string): Promise<ShipmentCreateResult> {
    throw new Error('Shipping tracking not yet wired');
  }

  async cancel(_trackingNumber: string): Promise<ShipmentCreateResult> {
    throw new Error('Shipping cancel not yet wired');
  }
}
