/**
 * UserClient — cross-service client to user-service
 * @module support-service/infrastructure/services/external
 *
 * Rule: interface only, no business logic, timeout + retry
 */
import { Injectable, Logger } from '@nestjs/common';

export interface UserSummary {
  readonly id: string;
  readonly name: string;
  readonly email: string;
}

@Injectable()
export class UserClient {
  private readonly logger = new Logger(UserClient.name);
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = process.env.USER_SERVICE_URL ?? 'http://localhost:3001';
  }

  async getById(userId: string): Promise<UserSummary | null> {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      const response = await fetch(`${this.baseUrl}/users/${userId}`, {
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (!response.ok) return null;
      return (await response.json()) as UserSummary;
    } catch (error) {
      this.logger.warn(
        `UserClient.getById failed for ${userId}: ${(error as Error).message}`,
      );
      return null;
    }
  }
}
