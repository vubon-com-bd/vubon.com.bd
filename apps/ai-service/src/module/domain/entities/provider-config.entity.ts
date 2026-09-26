import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ModelProviderIdVO } from '../value-objects/primitives/model-provider-id.vo';
import { ProviderConfigVO } from '../value-objects/composites/provider-config.vo';

export interface ProviderConfigEntityProps {
  readonly providerId: ModelProviderIdVO;
  readonly config: ProviderConfigVO;
}

export class ProviderConfigEntity extends BaseEntity<ModelProviderIdVO> {
  private readonly _providerId: ModelProviderIdVO;
  private readonly _config: ProviderConfigVO;

  private constructor(
    id: ModelProviderIdVO,
    props: ProviderConfigEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._providerId = props.providerId;
    this._config = props.config;
  }

  static create(props: ProviderConfigEntityProps): ProviderConfigEntity {
    const now = new Date().toISOString();
    return new ProviderConfigEntity(props.providerId, props, now, now, null);
  }

  static reconstitute(
    id: ModelProviderIdVO,
    props: ProviderConfigEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): ProviderConfigEntity {
    return new ProviderConfigEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  updateConfig(patch: {
    timeoutMs?: number;
    maxRetries?: number;
    enabled?: boolean;
  }): ProviderConfigEntity {
    const newConfig = ProviderConfigVO.create({
      endpoint: this._config.endpoint,
      apiKeyRef: this._config.apiKeyRef,
      timeoutMs: patch.timeoutMs ?? this._config.timeoutMs,
      maxRetries: patch.maxRetries ?? this._config.maxRetries,
      enabled: patch.enabled ?? this._config.enabled,
    });
    return new ProviderConfigEntity(
      this.id,
      { providerId: this._providerId, config: newConfig },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  get providerId(): ModelProviderIdVO { return this._providerId; }
  get config(): ProviderConfigVO { return this._config; }
}
