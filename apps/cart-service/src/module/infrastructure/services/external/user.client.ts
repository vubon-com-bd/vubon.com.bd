/**
 * UserClient — HTTP client for identity-service
 * @module cart-service/infrastructure/services/external
 */
import { Injectable, Logger } from '@nestjs/common';
import { getOptionalEnv } from '@vubon/shared-config/common';

export interface UserDTO {
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly phone?: string;
  readonly status: string;
}

@Injectable()
export class UserClient {
  private readonly logger = new Logger(UserClient.name);
  private readonly baseUrl = getOptionalEnv('IDENTITY_SERVICE_URL', 'http://localhost:3001/api/v1');
  private readonly timeout = Number(getOptionalEnv('IDENTITY_SERVICE_TIMEOUT', '5000'));

  async getById(id: string): Promise<UserDTO | null> {
    try {
      const res = await fetch(`${this.baseUrl}/users/public/${id}`, {
        signal: AbortSignal.timeout(this.timeout),
      });
      if (!res.ok) return null;
      return (await res.json()) as UserDTO;
    } catch (err) {
      this.logger.warn(`User ${id} fetch failed`);
      return null;
    }
  }

  async isActive(id: string): Promise<boolean> {
    const u = await this.getById(id);
    return u?.status === 'active';
  }
}
