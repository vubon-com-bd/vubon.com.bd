/**
 * FallbackDispatcherService — tries providers in priority order until one succeeds
 * @module notification-service/infrastructure/providers/base
 *
 * Flow:
 *  1. Get all available providers for channel (sorted by priority)
 *  2. Try each provider in order
 *  3. Return first success
 *  4. All fail → return aggregated error
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import type { IProviderResolver } from './provider.interface.js';
import { ProviderResolverService } from './provider-resolver.service.js';
import type {
  ProviderChannel,
  ProviderResult,
} from './provider.types.js';

export const FALLBACK_DISPATCHER = Symbol('FALLBACK_DISPATCHER');

export interface FallbackAttempt {
  readonly providerName: string;
  readonly priority: number;
  readonly success: boolean;
  readonly error?: string;
  readonly messageId?: string;
  readonly durationMs: number;
}

export interface FallbackResult {
  readonly success: boolean;
  readonly finalProvider?: string;
  readonly messageId?: string;
  readonly attempts: readonly FallbackAttempt[];
  readonly totalDurationMs: number;
  readonly error?: string;
}

@Injectable()
export class FallbackDispatcherService {
  private readonly logger = new Logger(FallbackDispatcherService.name);

  constructor(
    @Inject(ProviderResolverService)
    private readonly resolver: IProviderResolver,
  ) {}

  /**
   * Dispatch through providers with automatic fallback
   */
  async dispatchWithFallback<TInput, TProvider extends { send(input: TInput): Promise<ProviderResult>; metadata: { name: string; priority: number }; isEnabled(): boolean }>(
    channel: ProviderChannel,
    input: TInput,
  ): Promise<FallbackResult> {
    const startTime = Date.now();
    const attempts: FallbackAttempt[] = [];

    // 1. Get all providers for channel
    let providers: readonly unknown[];
    try {
      providers = this.resolver.resolveAll(channel) as readonly unknown[];
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.error(`No providers for channel ${channel}: ${msg}`);
      return {
        success: false,
        attempts: [],
        totalDurationMs: Date.now() - startTime,
        error: `No providers available for ${channel}`,
      };
    }

    // 2. Filter to sendable providers (has send method + enabled)
    const sendable = (providers as TProvider[]).filter(
      (p) => typeof p.send === 'function' && p.isEnabled(),
    );

    if (sendable.length === 0) {
      this.logger.warn(`No enabled sendable providers for ${channel}`);
      return {
        success: false,
        attempts: [],
        totalDurationMs: Date.now() - startTime,
        error: `No enabled providers for ${channel}`,
      };
    }

    // 3. Sort by priority (lower number = higher priority)
    const sorted = [...sendable].sort((a, b) => (a.metadata.priority ?? 99) - (b.metadata.priority ?? 99));

    this.logger.log(
      `🔄 Fallback dispatch on ${channel}: trying ${sorted.length} provider(s)`,
    );

    // 4. Try each provider in order
    for (const provider of sorted) {
      const providerName = provider.metadata.name;
      const attemptStart = Date.now();

      this.logger.log(`  → Trying ${providerName} (priority: ${provider.metadata.priority})`);

      try {
        const result = await provider.send(input);
        const durationMs = Date.now() - attemptStart;

        if (result.success) {
          attempts.push({
            providerName,
            priority: provider.metadata.priority,
            success: true,
            messageId: result.providerMessageId,
            durationMs,
          });

          this.logger.log(
            `  ✅ ${providerName} succeeded in ${durationMs}ms (msg: ${result.providerMessageId?.slice(0, 12) ?? 'N/A'})`,
          );

          return {
            success: true,
            finalProvider: providerName,
            messageId: result.providerMessageId,
            attempts,
            totalDurationMs: Date.now() - startTime,
          };
        }

        // Not successful but no throw
        attempts.push({
          providerName,
          priority: provider.metadata.priority,
          success: false,
          error: result.error ?? 'Provider returned failure',
          durationMs,
        });

        this.logger.warn(
          `  ⚠️  ${providerName} failed: ${result.error ?? 'unknown'} (${durationMs}ms)`,
        );
      } catch (err) {
        const durationMs = Date.now() - attemptStart;
        const msg = err instanceof Error ? err.message : String(err);

        attempts.push({
          providerName,
          priority: provider.metadata.priority,
          success: false,
          error: msg,
          durationMs,
        });

        this.logger.warn(`  ❌ ${providerName} threw: ${msg} (${durationMs}ms)`);
      }
    }

    // 5. All failed
    const totalDurationMs = Date.now() - startTime;
    this.logger.error(
      `🔴 Fallback dispatch FAILED on ${channel} after ${attempts.length} attempts (${totalDurationMs}ms)`,
    );

    return {
      success: false,
      attempts,
      totalDurationMs,
      error: `All ${attempts.length} providers failed for ${channel}`,
    };
  }

  /**
   * Get a summary of current provider status per channel
   */
  getProviderStatus(channel: ProviderChannel): readonly {
    name: string;
    priority: number;
    enabled: boolean;
  }[] {
    try {
      const providers = this.resolver.resolveAll(channel) as readonly unknown[];
      return (providers as Array<{ metadata: { name: string; priority: number }; isEnabled(): boolean }>)
        .filter((p) => typeof p.isEnabled === 'function')
        .map((p) => ({
          name: p.metadata.name,
          priority: p.metadata.priority,
          enabled: p.isEnabled(),
        }))
        .sort((a, b) => a.priority - b.priority);
    } catch {
      return [];
    }
  }
}
