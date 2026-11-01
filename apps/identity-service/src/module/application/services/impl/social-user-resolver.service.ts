/**
 * SocialUserResolverImpl — find or create user from OAuth profile
 * @module identity-service/application/services/impl
 */
import { Injectable, Inject, Logger } from '@nestjs/common';
import type { ISocialUserResolver } from './auth-social.service.js';
import {
  USER_SERVICE,
  type UserServiceInterface,
} from '../interfaces/user.service.interface.js';
import {
  AUTH_SERVICE,
  type AuthServiceInterface,
} from '../interfaces/auth.service.interface.js';

@Injectable()
export class SocialUserResolverImpl implements ISocialUserResolver {
  private readonly logger = new Logger(SocialUserResolverImpl.name);

  constructor(
    @Inject(USER_SERVICE)
    private readonly userService: UserServiceInterface,
    @Inject(AUTH_SERVICE)
    private readonly authService: AuthServiceInterface,
  ) {}

  async findOrCreateByEmail(input: {
    email: string;
    emailVerified: boolean;
    provider: string;
    providerUserId: string;
    displayName?: string;
    avatarUrl?: string;
  }): Promise<{
    user: {
      id: string;
      email: string;
      status: string;
      type: string;
      roles: readonly string[];
      emailVerified: boolean;
      createdAt: string;
    };
    isNewUser: boolean;
  }> {
    // Try to find existing user
    const existingResult = await this.userService.findByEmail(input.email);
    if (existingResult) {
      // findByEmail returns { success, user: {...} }
      const existing = (existingResult as { user?: Record<string, unknown> }).user ?? existingResult;
      const existingUser = existing as Record<string, unknown>;
      this.logger.log(`Found existing user via ${input.provider}: ${existingUser.id}`);

      return {
        user: {
          id: String(existingUser.id ?? ''),
          email: String(existingUser.email ?? input.email),
          status: String(existingUser.status ?? 'active'),
          type: String(existingUser.type ?? 'individual'),
          roles: (existingUser.roles as readonly string[]) ?? ['customer'],
          emailVerified: Boolean(existingUser.emailVerified ?? input.emailVerified),
          createdAt: String(existingUser.createdAt ?? new Date().toISOString()),
        },
        isNewUser: false,
      };
    }

    // Register new user via existing auth service
    this.logger.log(`Registering new user via ${input.provider}: ${input.email}`);

    try {
      const result = await this.authService.register({
        email: input.email,
        password: `oauth_${input.provider}_${Date.now()}_${Math.random().toString(36)}`,
        type: 'individual',
        acceptTerms: true,
      } as never);

      // register() returns { success, user: {...} }
      const resultAny = result as unknown as { user?: Record<string, unknown> };
      const registeredUser = resultAny.user ?? (result as unknown as Record<string, unknown>);
      const ru = registeredUser as Record<string, unknown>;

      return {
        user: {
          id: String(ru.id ?? ''),
          email: String(ru.email ?? input.email),
          status: String(ru.status ?? 'active'),
          type: String(ru.type ?? 'individual'),
          roles: (ru.roles as readonly string[]) ?? ['customer'],
          emailVerified: Boolean(ru.emailVerified ?? input.emailVerified),
          createdAt: String(ru.createdAt ?? new Date().toISOString()),
        },
        isNewUser: true,
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      // If register fails (e.g., race), try finding again
      const retryResult = await this.userService.findByEmail(input.email);
      if (retryResult) {
        const retry = (retryResult as { user?: Record<string, unknown> }).user ?? retryResult;
        const retryUser = retry as Record<string, unknown>;
        this.logger.warn(`Race condition on ${input.email}, using existing user`);
        return {
          user: {
            id: String(retryUser.id ?? ''),
            email: String(retryUser.email ?? input.email),
            status: String(retryUser.status ?? 'active'),
            type: String(retryUser.type ?? 'individual'),
            roles: (retryUser.roles as readonly string[]) ?? ['customer'],
            emailVerified: Boolean(retryUser.emailVerified ?? input.emailVerified),
            createdAt: String(retryUser.createdAt ?? new Date().toISOString()),
          },
          isNewUser: false,
        };
      }
      throw new Error(`Failed to register OAuth user: ${msg}`);
    }
  }
}
