import { Injectable, Logger } from '@nestjs/common';
import axios, { type AxiosInstance } from 'axios';
import { getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

interface OrderPublic {
  readonly id: string;
  readonly userId: string;
  readonly productIds: readonly string[];
  readonly total: number;
}

@Injectable()
export class OrderClient {
  private readonly logger = new Logger(OrderClient.name);
  private readonly http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: getOptionalEnv('ORDER_SERVICE_URL', 'http://localhost:3003'),
      timeout: getOptionalEnvInt('ORDER_SERVICE_TIMEOUT_MS', 5000),
    });
  }

  async findByUser(userId: string, limit = 50): Promise<readonly OrderPublic[]> {
    try {
      const { data } = await this.http.get<readonly OrderPublic[]>(`/orders`, {
        params: { userId, limit },
      });
      return data;
    } catch (error) {
      this.logger.warn(`Orders fetch failed for user ${userId}`, error);
      return [];
    }
  }
}
