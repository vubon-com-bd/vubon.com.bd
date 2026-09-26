import { Injectable, Logger } from '@nestjs/common';
import axios, { type AxiosInstance } from 'axios';
import type { UserClient } from '../../../application/ports';

interface UserResponse {
  readonly id: string;
  readonly email: string;
  readonly status: string;
}

@Injectable()
export class UserHttpClient implements UserClient {
  private readonly logger = new Logger(UserHttpClient.name);
  private readonly http: AxiosInstance;

  constructor() {
    const baseURL = process.env.USER_SERVICE_URL ?? 'http://user-service:3000';
    this.http = axios.create({
      baseURL,
      timeout: 5000,
      headers: { 'X-Internal-Caller': 'analytics-service' },
    });
  }

  async getById(userId: string): Promise<UserResponse | null> {
    try {
      const { data } = await this.http.get<UserResponse>(`/users/${userId}`);
      return data;
    } catch (error) {
      this.logger.warn(`Failed to fetch user ${userId}: ${String(error)}`);
      return null;
    }
  }
}
