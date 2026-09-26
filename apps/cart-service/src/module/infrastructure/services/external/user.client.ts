import { Injectable, Logger } from '@nestjs/common';
import axios, { type AxiosInstance } from 'axios';

export interface UserSnapshot {
  readonly id: string;
  readonly email: string;
  readonly status: string;
}

@Injectable()
export class UserClient {
  private readonly logger = new Logger(UserClient.name);
  private readonly http: AxiosInstance;

  constructor() {
    const baseURL = process.env['USER_SERVICE_URL'] ?? 'http://localhost:3001';
    this.http = axios.create({ baseURL, timeout: 5000 });
  }

  async getById(userId: string): Promise<UserSnapshot | null> {
    try {
      const { data } = await this.http.get<UserSnapshot>(`/api/v1/users/${userId}`);
      return data;
    } catch {
      this.logger.warn(`User fetch failed for ${userId}`);
      return null;
    }
  }
}
