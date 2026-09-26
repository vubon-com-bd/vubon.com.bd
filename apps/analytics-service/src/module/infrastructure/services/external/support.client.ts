import { Injectable, Logger } from '@nestjs/common';
import axios, { type AxiosInstance } from 'axios';

export interface TicketSummary {
  readonly ticketId: string;
  readonly status: string;
  readonly resolvedAt: string | null;
}

@Injectable()
export class SupportHttpClient {
  private readonly logger = new Logger(SupportHttpClient.name);
  private readonly http: AxiosInstance;

  constructor() {
    const baseURL = process.env.SUPPORT_SERVICE_URL ?? 'http://support-service:3000';
    this.http = axios.create({
      baseURL,
      timeout: 5000,
      headers: { 'X-Internal-Caller': 'analytics-service' },
    });
  }

  async getTicket(ticketId: string): Promise<TicketSummary | null> {
    try {
      const { data } = await this.http.get<TicketSummary>(`/tickets/${ticketId}`);
      return data;
    } catch (error) {
      this.logger.warn(`Failed to fetch ticket ${ticketId}: ${String(error)}`);
      return null;
    }
  }
}
