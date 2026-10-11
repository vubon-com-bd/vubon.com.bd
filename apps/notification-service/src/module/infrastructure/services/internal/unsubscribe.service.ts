/**
 * UnsubscribeService — persists user opt-outs (compliance)
 * @module notification-service/infrastructure/services/internal
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import {
  PREFERENCE_REPOSITORY,
  type PreferenceRepository,
} from '../../../domain/repositories/preference.repository.interface.js';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo.js';
import { PreferenceCacheRepository } from '../../persistence/cache/repositories/preference.cache.repository.js';

export const UNSUBSCRIBE_SERVICE = Symbol('UNSUBSCRIBE_SERVICE');

@Injectable()
export class UnsubscribeService {
  private readonly logger = new Logger(UnsubscribeService.name);

  constructor(
    private readonly prisma: PrismaService,
    @Inject(PREFERENCE_REPOSITORY) private readonly preferenceRepo: PreferenceRepository,
    private readonly preferenceCache: PreferenceCacheRepository,
  ) {}

  async record(input: {
    userId: string;
    scope: string;
    reason?: string;
    source?: string;
    ipAddress?: string;
    userAgent?: string;
  }): Promise<void> {
    try {
      await this.prisma.notificationUnsubscribe.create({
        data: {
          userId: input.userId,
          scope: input.scope,
          reason: input.reason ?? null,
          source: input.source ?? null,
          ipAddress: input.ipAddress ?? null,
          userAgent: input.userAgent ?? null,
        },
      });
    } catch (err) {
      this.logger.warn(`Unsubscribe record failed: ${(err as Error).message}`);
    }

    // Also apply to preference (opt-out)
    try {
      const pref = await this.preferenceRepo.findByUserId(UserIdVO.create(input.userId));
      if (pref) {
        pref.optOut(input.scope, input.reason);
        await this.preferenceRepo.save(pref);
        await this.preferenceCache.invalidate(input.userId);
      }
    } catch (err) {
      this.logger.warn(`Preference opt-out failed: ${(err as Error).message}`);
    }
  }

  async history(userId: string): Promise<readonly { scope: string; reason?: string; unsubscribedAt: string }[]> {
    const rows = await this.prisma.notificationUnsubscribe.findMany({
      where: { userId, deletedAt: null },
      orderBy: { unsubscribedAt: 'desc' },
    });
    return rows.map((r) => ({
      scope: r.scope,
      reason: r.reason ?? undefined,
      unsubscribedAt: new Date(r.unsubscribedAt).toISOString(),
    }));
  }
}
