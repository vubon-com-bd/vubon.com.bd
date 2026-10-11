/**
 * UserServiceClient — cross-service calls to user-service
 * @module notification-service/infrastructure/services/external
 *
 * Used to fetch user contact info (email, phone) before sending.
 * Gracefully no-ops when USER_SERVICE_URL is missing.
 */
import { Injectable } from '@nestjs/common';
import { BaseHttpClient } from './http-client.client.js';

export const USER_SERVICE_CLIENT = Symbol('USER_SERVICE_CLIENT');

export interface UserContact {
  readonly id: string;
  readonly email: string;
  readonly phone?: string;
  readonly name?: string;
  readonly locale?: string;
  readonly timezone?: string;
}

@Injectable()
export class UserServiceClient extends BaseHttpClient {
  constructor() {
    super({
      name: 'UserServiceClient',
      envKey: 'USER_SERVICE_URL',
      defaultTimeoutMs: 8_000,
    });
  }

  async getContact(userId: string): Promise<UserContact | null> {
    return this.get<UserContact>(`/api/v1/users/${userId}/contact`);
  }

  async getManyContacts(userIds: readonly string[]): Promise<readonly UserContact[]> {
    if (userIds.length === 0) return [];
    const res = await this.post<{ items: readonly UserContact[] }>(
      '/api/v1/users/contacts',
      { ids: userIds },
    );
    return res?.items ?? [];
  }

  async getPreferences(userId: string): Promise<Readonly<Record<string, unknown>> | null> {
    return this.get(`/api/v1/users/${userId}/preferences`);
  }
}
