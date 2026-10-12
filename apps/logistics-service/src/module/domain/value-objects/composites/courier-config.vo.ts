/**
 * CourierConfigVO — API credentials + timeout settings
 * @module logistics-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export interface CourierConfigValue {
  readonly baseUrl: string;
  readonly apiKeyName: string;
  readonly webhookSecretName?: string;
  readonly timeoutMs: number;
  readonly retryAttempts: number;
  readonly isEnabled: boolean;
}

export class CourierConfigVO extends BaseVO<CourierConfigValue> {
  private constructor(value: CourierConfigValue) { super(value); }

  static create(input: CourierConfigValue): CourierConfigVO {
    if (!input.baseUrl || !/^https?:\/\//.test(input.baseUrl)) {
      throw new ValidationError('baseUrl must start with http:// or https://', 'baseUrl');
    }
    if (!input.apiKeyName || input.apiKeyName.trim().length === 0) {
      throw new ValidationError('apiKeyName required', 'apiKeyName');
    }
    if (!Number.isInteger(input.timeoutMs) || input.timeoutMs < 1000) {
      throw new ValidationError('timeoutMs must be >= 1000', 'timeoutMs');
    }
    if (!Number.isInteger(input.retryAttempts) || input.retryAttempts < 0 || input.retryAttempts > 10) {
      throw new ValidationError('retryAttempts must be 0-10', 'retryAttempts');
    }
    return new CourierConfigVO({
      ...input,
      baseUrl: input.baseUrl.trim(),
      apiKeyName: input.apiKeyName.trim(),
    });
  }

  static reconstitute(value: CourierConfigValue): CourierConfigVO {
    return new CourierConfigVO(value);
  }

  get baseUrl(): string { return this.value.baseUrl; }
  get apiKeyName(): string { return this.value.apiKeyName; }
  get webhookSecretName(): string | undefined { return this.value.webhookSecretName; }
  get timeoutMs(): number { return this.value.timeoutMs; }
  get retryAttempts(): number { return this.value.retryAttempts; }
  get isEnabled(): boolean { return this.value.isEnabled; }

  hasWebhook(): boolean { return this.value.webhookSecretName !== undefined; }
  canRetry(attempt: number): boolean { return this.value.isEnabled && attempt < this.value.retryAttempts; }
}
