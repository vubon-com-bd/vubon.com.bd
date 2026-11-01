/**
 * BounceHandlerInfraService — process + persist bounces
 * @module notification-service/infrastructure/services/internal
 *
 * Wraps domain `BounceHandlerService` + `BouncePrismaRepository`।
 */
import { Injectable, Logger, Optional } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import { BounceHandlerService as DomainBounceHandler } from '@domain/services/bounce-handler.service.js';
import { BouncePrismaRepository } from '@infrastructure/persistence/prisma/repositories/bounce.prisma.repository.js';

export interface ProcessBounceRequest {
  readonly notificationId?: string;
  readonly userId?: string;
  readonly channel: string;
  readonly provider: string;
  readonly recipient: string;
  readonly errorCode: string;
  readonly reason: string;
  readonly raw?: Readonly<Record<string, unknown>>;
}

export interface ProcessBounceResult {
  readonly bounceType: 'soft' | 'hard' | 'complaint' | 'unknown';
  readonly action: 'retry' | 'block' | 'unsubscribe' | 'suppress';
  readonly reason: string;
  readonly persisted: boolean;
}

@Injectable()
export class BounceHandlerInfraService {
  private readonly logger = new Logger(BounceHandlerInfraService.name);

  constructor(
    @Optional()
    private readonly bounceRepo?: BouncePrismaRepository,
  ) {}

  async process(request: ProcessBounceRequest): Promise<ProcessBounceResult> {
    const classification = DomainBounceHandler.classify({
      errorCode: request.errorCode,
      reason: request.reason,
    });

    let persisted = false;
    if (!this.bounceRepo) {
      this.logger.warn('Bounce repository not available (memory mode) — skipping persistence');
      return {
        bounceType: classification.type,
        action: classification.action,
        reason: classification.reason,
        persisted: false,
      };
    }
    try {
      await this.bounceRepo.save({
        id: randomUUID(),
        notificationId: request.notificationId,
        userId: request.userId,
        channel: request.channel,
        provider: request.provider,
        bounceType: classification.type,
        bounceSubType: classification.action,
        reason: classification.reason,
        recipient: request.recipient,
        raw: request.raw,
        bouncedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      });
      persisted = true;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`Bounce persist failed: ${msg}`);
    }

    this.logger.log(
      `🔴 Bounce: type=${classification.type} action=${classification.action} recipient=${request.recipient.slice(0, 20)}...`,
    );

    return {
      bounceType: classification.type,
      action: classification.action,
      reason: classification.reason,
      persisted,
    };
  }

  /** Determine if a bounce should suppress future sends */
  shouldSuppress(bounceType: string): boolean {
    return bounceType === 'hard' || bounceType === 'complaint';
  }
}
