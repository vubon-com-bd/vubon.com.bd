import { Injectable, Logger } from '@nestjs/common';
import axios, { type AxiosInstance } from 'axios';
import { getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

interface CartPublic {
  readonly userId: string;
  readonly items: readonly { productId: string; quantity: number }[];
}

@Injectable()
export class CartClient {
  private readonly logger = new Logger(CartClient.name);
  private readonly http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: getOptionalEnv('CART_SERVICE_URL', 'http://localhost:3005'),
      timeout: getOptionalEnvInt('CART_SERVICE_TIMEOUT_MS', 5000),
    });
  }

  async findByUser(userId: string): Promise<CartPublic | null> {
    try {
      const { data } = await this.http.get<CartPublic>(`/cart/${userId}`);
      return data;
    } catch (error) {
      this.logger.warn(`Cart fetch failed for user ${userId}`, error);
      return null;
    }
  }
}
