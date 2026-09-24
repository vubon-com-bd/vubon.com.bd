import { Injectable, Logger } from '@nestjs/common';
import type { ExternalClient, ClientResponse } from './http-client.types';

export interface UserDTO {
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly status: string;
}

@Injectable()
export class UserClient {
  private readonly logger = new Logger(UserClient.name);

  constructor(private readonly http: ExternalClient) {}

  async getById(userId: string): Promise<UserDTO | null> {
    try {
      const res: ClientResponse<UserDTO> = await this.http.get<UserDTO>(
        `/users/${userId}`,
      );
      return res.data;
    } catch (error) {
      this.logger.warn(
        `Failed to fetch user ${userId}: ${error instanceof Error ? error.message : 'unknown'}`,
      );
      return null;
    }
  }
}
