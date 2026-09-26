import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ModelProviderIdVO } from '../primitives/model-provider-id.vo';
import { ProviderNameVO } from '../primitives/provider-name.vo';
import { ProviderConfigVO } from './provider-config.vo';

export interface ProviderProps {
  readonly id: ModelProviderIdVO;
  readonly name: ProviderNameVO;
  readonly status: string;
  readonly config: ProviderConfigVO;
}

export class ProviderVO extends BaseVO<ProviderProps> {
  static create(props: ProviderProps): ProviderVO {
    return new ProviderVO(props);
  }

  private constructor(props: ProviderProps) {
    super(Object.freeze({ ...props }));
  }

  get id(): ModelProviderIdVO { return this.value.id; }
  get name(): ProviderNameVO { return this.value.name; }
  get status(): string { return this.value.status; }
  get config(): ProviderConfigVO { return this.value.config; }

  isAvailable(): boolean {
    return this.value.status === 'active' && this.value.config.enabled;
  }
}
