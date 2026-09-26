import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ProviderApiKeyRefVO } from '../primitives/provider-api-key-ref.vo';
import { ProviderEndpointVO } from '../primitives/provider-endpoint.vo';

export interface ProviderConfigProps {
  readonly endpoint: ProviderEndpointVO;
  readonly apiKeyRef: ProviderApiKeyRefVO | null;
  readonly timeoutMs: number;
  readonly maxRetries: number;
  readonly enabled: boolean;
}

export class ProviderConfigVO extends BaseVO<ProviderConfigProps> {
  static create(props: ProviderConfigProps): ProviderConfigVO {
    if (props.timeoutMs <= 0) {
      throw new Error('ProviderConfig: timeoutMs must be positive');
    }
    if (props.maxRetries < 0 || props.maxRetries > 10) {
      throw new Error('ProviderConfig: maxRetries must be in [0,10]');
    }
    return new ProviderConfigVO(props);
  }

  private constructor(props: ProviderConfigProps) {
    super(Object.freeze({ ...props }));
  }

  get endpoint(): ProviderEndpointVO { return this.value.endpoint; }
  get apiKeyRef(): ProviderApiKeyRefVO | null { return this.value.apiKeyRef; }
  get timeoutMs(): number { return this.value.timeoutMs; }
  get maxRetries(): number { return this.value.maxRetries; }
  get enabled(): boolean { return this.value.enabled; }

  requiresAuth(): boolean {
    return this.value.apiKeyRef !== null;
  }
}
