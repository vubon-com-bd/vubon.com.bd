/**
 * TrackingIndexer — index tracking to search
 */
import { Injectable } from '@nestjs/common';
import { SearchService } from '../search.service.js';

@Injectable()
export class TrackingIndexer {
  private readonly INDEX = 'trackings';
  constructor(private readonly search: SearchService) {}

  async index(tracking: {
    id: string; trackingNumber: string; status: string;
    shipmentId?: string; orderId?: string;
  }): Promise<boolean> {
    return this.search.index(this.INDEX, {
      id: tracking.id,
      trackingNumber: tracking.trackingNumber,
      status: tracking.status,
      shipmentId: tracking.shipmentId ?? '',
      orderId: tracking.orderId ?? '',
    });
  }

  async remove(id: string): Promise<boolean> {
    return this.search.delete(this.INDEX, id);
  }
}
