import { Injectable, Logger } from '@nestjs/common';
import axios, { type AxiosInstance } from 'axios';

export interface UserPublic {
  readonly id: string;
  readonly email: string | null;
  readonly phone: string | null;
  readonly name: string | null;
  readonly locale: string | null;
  readonly timezone: string | null;
}

@Injectable()
export class UserClient {
  private readonly logger = new Logger(UserClient.name);
  private readonly http: AxiosInstance;
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = process.env.USER_SERVICE_URL ?? 'http://localhost:3002';
    this.http = axios.create({
      baseURL: this.baseUrl,
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
        'X-Internal-Service': 'notification-service',
      },
    });
  }

  async getById(userId: string): Promise<UserPublic | null> {
    try {
      const { data } = await this.http.get<UserPublic>(`/users/${userId}`);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Failed to fetch user ${userId}: ${message}`);
      return null;
    }
  }

  async getMany(userIds: readonly string[]): Promise<readonly UserPublic[]> {
    if (userIds.length === 0) return [];
    try {
      const { data } = await this.http.post<readonly UserPublic[]>(
        '/users/batch',
        { ids: userIds },
      );
      return data;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Failed to batch fetch users: ${message}`);
      return [];
    }
  }
}
