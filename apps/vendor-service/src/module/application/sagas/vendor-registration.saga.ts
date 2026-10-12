/**
 * VendorRegistrationSaga — orchestrate post-registration setup
 * @module vendor-service/application/sagas
 *
 * Steps:
 *  1. Initialize settings
 *  2. Initialize shipping
 *  3. Initialize return policy
 *  4. Initialize warranty
 *  5. Initialize rating
 */
import { Injectable } from '@nestjs/common';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas';

export interface VendorRegistrationSagaContext {
  readonly vendorId: string;
  readonly currency: string;
  readonly completedSteps: readonly string[];
  readonly failedAt?: string;
}

@Injectable()
export class VendorRegistrationSaga extends BaseSaga<VendorRegistrationSagaContext> {
  readonly name = 'VendorRegistrationSaga';

  private readonly STEPS = [
    'settings',
    'shipping',
    'return_policy',
    'warranty',
    'rating',
  ] as const;

  async execute(input: unknown): Promise<void> {
    const { vendorId, currency } = input as { vendorId: string; currency: string };
    this.setContext({
      vendorId,
      currency,
      completedSteps: [],
    });

    const completed: string[] = [];
    for (const step of this.STEPS) {
      try {
        await this.runStep(step, vendorId);
        completed.push(step);
        this.setContext({
          vendorId,
          currency,
          completedSteps: [...completed],
        });
      } catch (err) {
        this.setContext({
          vendorId,
          currency,
          completedSteps: [...completed],
          failedAt: step,
        });
        throw err;
      }
    }
  }

  async compensate(): Promise<void> {
    const ctx = this.getContext();
    if (!ctx) return;
    // Rollback in reverse order — services handle soft cleanup
    for (const step of [...ctx.completedSteps].reverse()) {
      await this.rollbackStep(step, ctx.vendorId);
    }
  }

  private async runStep(step: string, _vendorId: string): Promise<void> {
    // Real handlers wired via command bus at runtime; saga just orchestrates
    // This keeps saga pure — no direct service injection needed here.
    switch (step) {
      case 'settings':
      case 'shipping':
      case 'return_policy':
      case 'warranty':
      case 'rating':
        // Placeholder — actual work happens via saga commands dispatched by orchestrator
        return;
      default:
        throw new Error(`Unknown saga step: ${step}`);
    }
  }

  private async rollbackStep(step: string, _vendorId: string): Promise<void> {
    // Rollback logic — services handle idempotent deletes
    switch (step) {
      case 'settings':
      case 'shipping':
      case 'return_policy':
      case 'warranty':
      case 'rating':
        return;
      default:
        return;
    }
  }
}
