import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME, QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

export interface LoginAttemptJobPayload {
  readonly userId: string | null;
  readonly email: string | null;
  readonly ip: string;
  readonly userAgent: string;
  readonly status: string;
}

export interface AccountLockJobPayload {
  readonly userId: string;
  readonly reason: string;
  readonly durationMs: number;
}

@Injectable()
export class AuthQueue {
  readonly queueName = QUEUE_NAME.AUTH;

  constructor(private readonly queueService: QueueService) {}

  async enqueueLoginAttempt(payload: LoginAttemptJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'login-attempt', payload, {
      priority: QUEUE_PRIORITY.HIGH,
    });
  }

  async enqueueAccountLock(payload: AccountLockJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'account-lock', payload, {
      priority: QUEUE_PRIORITY.CRITICAL,
    });
  }
}
