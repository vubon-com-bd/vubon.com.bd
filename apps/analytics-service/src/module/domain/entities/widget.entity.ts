import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { WidgetIdVO } from '../value-objects/primitives/widget-id.vo';
import { WidgetTypeVO } from '../value-objects/primitives/widget-type.vo';
import { WidgetConfigVO } from '../value-objects/primitives/widget-config.vo';

export interface WidgetEntityProps {
  readonly type: WidgetTypeVO;
  readonly config: WidgetConfigVO;
  readonly position: number;
  readonly metricName: string;
  readonly dashboardId: string;
}

export class WidgetEntity extends BaseEntity<WidgetIdVO> {
  private readonly _type: WidgetTypeVO;
  private readonly _config: WidgetConfigVO;
  private readonly _position: number;
  private readonly _metricName: string;
  private readonly _dashboardId: string;

  private constructor(
    id: WidgetIdVO,
    props: WidgetEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._type = props.type;
    this._config = props.config;
    this._position = props.position;
    this._metricName = props.metricName;
    this._dashboardId = props.dashboardId;
  }

  static create(props: WidgetEntityProps): WidgetEntity {
    if (props.position < 0) {
      throw new Error('Widget position cannot be negative');
    }
    const now = new Date().toISOString();
    const id = WidgetIdVO.create(crypto.randomUUID());
    return new WidgetEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: WidgetIdVO,
    props: WidgetEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): WidgetEntity {
    return new WidgetEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  updateConfig(config: WidgetConfigVO): WidgetEntity {
    return new WidgetEntity(
      this.id,
      { ...this._toProps(), config },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  moveToPosition(position: number): WidgetEntity {
    if (position < 0) throw new Error('Position cannot be negative');
    return new WidgetEntity(
      this.id,
      { ...this._toProps(), position },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  get type(): WidgetTypeVO { return this._type; }
  get config(): WidgetConfigVO { return this._config; }
  get position(): number { return this._position; }
  get metricName(): string { return this._metricName; }
  get dashboardId(): string { return this._dashboardId; }

  private _toProps(): WidgetEntityProps {
    return {
      type: this._type,
      config: this._config,
      position: this._position,
      metricName: this._metricName,
      dashboardId: this._dashboardId,
    };
  }
}
