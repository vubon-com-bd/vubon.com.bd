export interface RetryPolicyInput {
  readonly attempt: number;
  readonly maxAttempts: number;
}

export interface RetryDecision {
  readonly shouldRetry: boolean;
  readonly delayMs: number;
}

export class RetryPolicyService {
  decide(input: RetryPolicyInput): RetryDecision {
    if (input.attempt >= input.maxAttempts) {
      return { shouldRetry: false, delayMs: 0 };
    }
    const baseDelayMs = 1000;
    const delayMs = baseDelayMs * Math.pow(2, input.attempt - 1);
    return { shouldRetry: true, delayMs };
  }
}
