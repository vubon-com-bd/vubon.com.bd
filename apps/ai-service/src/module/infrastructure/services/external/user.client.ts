import { Injectable, Logger } from '@nestjs/common';
import axios, { type AxiosInstance } from 'axios';
import { getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

interface UserPublic {
  readonly id: string;
  readonly email: string;
  readonly status: string;
}

@Injectable()
export class UserClient {
  private readonly logger = new Logger(UserClient.name);
  private readonly http: AxiosInstance;
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = getOptionalEnv('USER_SERVICE_URL', 'http://localhost:3001');
    this.http = axios.create({
      baseURL: this.baseUrl,
      timeout: getOptionalEnvInt('USER_SERVICE_TIMEOUT_MS', 5000),
    });
  }

  async findById(userId: string): Promise<UserPublic | null> {
    try {
      const { data } = await this.http.get<UserPublic>(`/users/${userId}`);
      return data;
    } catch (error) {
      this.logger.warn(`User fetch failed for ${userId}`, error);
      return null;
    }
  }

  async exists(userId: string): Promise<boolean> {
    const user = await this.findById(userId);
    return user !== null;
  }
}
