import { Injectable, Logger } from '@nestjs/common';
import axios, { type AxiosInstance } from 'axios';

export interface ShipmentSummary {
  readonly shipmentId: string;
  readonly status: string;
  readonly deliveredAt: string | null;
}

@Injectable()
export class LogisticsHttpClient {
  private readonly logger = new Logger(LogisticsHttpClient.name);
  private readonly http: AxiosInstance;

  constructor() {
    const baseURL = process.env.LOGISTICS_SERVICE_URL ?? 'http://logistics-service:3000';
    this.http = axios.create({
      baseURL,
      timeout: 5000,
      headers: { 'X-Internal-Caller': 'analytics-service' },
    });
  }

  async getShipment(shipmentId: string): Promise<ShipmentSummary | null> {
    try {
      const { data } = await this.http.get<ShipmentSummary>(
        `/shipments/${shipmentId}`,
      );
      return data;
    } catch (error) {
      this.logger.warn(`Failed to fetch shipment ${shipmentId}: ${String(error)}`);
      return null;
    }
  }
}
