/**
 * ShipmentIndexer — index shipments to search
 */
import { Injectable, Logger } from '@nestjs/common';
import { SearchService } from '../search.service.js';

@Injectable()
export class ShipmentIndexer {
  private readonly logger = new Logger(ShipmentIndexer.name);
  private readonly INDEX = 'shipments';

  constructor(private readonly search: SearchService) {}

  async index(shipment: {
    id: string; trackingNumber: string; shipmentNumber: string; status: string;
    orderId?: string; userId?: string; vendorId?: string;
  }): Promise<boolean> {
    return this.search.index(this.INDEX, {
      id: shipment.id,
      trackingNumber: shipment.trackingNumber,
      shipmentNumber: shipment.shipmentNumber,
      status: shipment.status,
      orderId: shipment.orderId ?? '',
      userId: shipment.userId ?? '',
      vendorId: shipment.vendorId ?? '',
    });
  }

  async remove(id: string): Promise<boolean> {
    return this.search.delete(this.INDEX, id);
  }
}
