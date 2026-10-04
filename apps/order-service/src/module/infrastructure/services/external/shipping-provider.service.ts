/**
 * ShippingProviderService — external adapter (interface + stub)
 * @module order-service/infrastructure/services/external
 */
import { Injectable, Logger } from '@nestjs/common';

export const SHIPPING_PROVIDER_SERVICE = Symbol('SHIPPING_PROVIDER_SERVICE');

export interface ShipmentResult {
  readonly success: boolean;
  readonly shipmentId?: string;
  readonly trackingNumber?: string;
  readonly failureReason?: string;
}

export interface IShippingProviderService {
  createShipment(
    orderId: string,
    courierId?: string,
  ): Promise<ShipmentResult>;
  cancelShipment(shipmentId: string): Promise<boolean>;
  trackShipment(trackingNumber: string): Promise<{ status: string; location?: string }>;
}

@Injectable()
export class ShippingProviderService implements IShippingProviderService {
  private readonly logger = new Logger(ShippingProviderService.name);

  async createShipment(orderId: string, courierId?: string): Promise<ShipmentResult> {
    this.logger.log(`createShipment ${orderId} via courier ${courierId ?? 'default'}`);
    const trackingNumber = `TRK-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
    return {
      success: true,
      shipmentId: `shp_${Date.now()}`,
      trackingNumber,
    };
  }

  async cancelShipment(shipmentId: string): Promise<boolean> {
    this.logger.log(`cancelShipment ${shipmentId}`);
    return true;
  }

  async trackShipment(trackingNumber: string): Promise<{ status: string; location?: string }> {
    this.logger.log(`trackShipment ${trackingNumber}`);
    return { status: 'in_transit' };
  }
}
