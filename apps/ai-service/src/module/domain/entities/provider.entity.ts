import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { ModelProviderIdVO } from '../value-objects/primitives/model-provider-id.vo';
import { ProviderNameVO } from '../value-objects/primitives/provider-name.vo';
import { ProviderConfigVO } from '../value-objects/composites/provider-config.vo';

export interface ProviderEntityProps {
  readonly name: ProviderNameVO;
  readonly status: string;
  readonly config: ProviderConfigVO;
}

export class ProviderEntity extends AggregateRoot<ModelProviderIdVO> {
  private readonly _name: ProviderNameVO;
  private readonly _status: string;
  private readonly _config: ProviderConfigVO;

  private constructor(
    id: ModelProviderIdVO,
    props: ProviderEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._name = props.name;
    this._status = props.status;
    this._config = props.config;
  }

  static create(props: ProviderEntityProps): ProviderEntity {
    const now = new Date().toISOString();
    const id = ModelProviderIdVO.create(crypto.randomUUID());
    return new ProviderEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: ModelProviderIdVO,
    props: ProviderEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): ProviderEntity {
    return new ProviderEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  isAvailable(): boolean {
    return this._status === 'active' && this._config.enabled;
  }

  get name(): ProviderNameVO { return this._name; }
  get status(): string { return this._status; }
  get config(): ProviderConfigVO { return this._config; }
}
