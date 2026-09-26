import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { DashboardIdVO } from '../value-objects/primitives/dashboard-id.vo';
import { DashboardNameVO } from '../value-objects/primitives/dashboard-name.vo';
import { DashboardLayoutVO } from '../value-objects/primitives/dashboard-layout.vo';
import { WidgetIdVO } from '../value-objects/primitives/widget-id.vo';
import { DashboardCreatedEvent, WidgetAddedEvent } from '../events/dashboard.events';

export interface DashboardEntityProps {
  readonly name: DashboardNameVO;
  readonly layout: DashboardLayoutVO;
  readonly ownerId: string;
  readonly widgetIds: readonly WidgetIdVO[];
}

const MAX_WIDGETS = 20;

export class DashboardEntity extends AggregateRoot<DashboardIdVO> {
  private readonly _name: DashboardNameVO;
  private readonly _layout: DashboardLayoutVO;
  private readonly _ownerId: string;
  private readonly _widgetIds: readonly WidgetIdVO[];

  private constructor(
    id: DashboardIdVO,
    props: DashboardEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._name = props.name;
    this._layout = props.layout;
    this._ownerId = props.ownerId;
    this._widgetIds = Object.freeze([...props.widgetIds]);
  }

  static create(props: DashboardEntityProps): DashboardEntity {
    if (props.widgetIds.length > MAX_WIDGETS) {
      throw new Error(`Dashboard cannot have more than ${MAX_WIDGETS} widgets`);
    }
    const now = new Date().toISOString();
    const id = DashboardIdVO.create(crypto.randomUUID());
    const entity = new DashboardEntity(id, props, now, now, null);
    entity.addDomainEvent(
      new DashboardCreatedEvent(id.value, id.value, props.name.value, 0),
    );
    return entity;
  }

  static reconstitute(
    id: DashboardIdVO,
    props: DashboardEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): DashboardEntity {
    return new DashboardEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  addWidget(widgetId: WidgetIdVO): DashboardEntity {
    if (this._widgetIds.length >= MAX_WIDGETS) {
      throw new Error(`Dashboard widget limit reached (${MAX_WIDGETS})`);
    }
    if (this._widgetIds.some((w) => w.value === widgetId.value)) {
      throw new Error(`Widget already exists: ${widgetId.value}`);
    }
    const now = new Date().toISOString();
    const updated = new DashboardEntity(
      this.id,
      { ...this._toProps(), widgetIds: [...this._widgetIds, widgetId] },
      this.createdAt,
      now,
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new WidgetAddedEvent(
        this.id.value,
        this.id.value,
        widgetId.value,
        this.version + 1,
      ),
    );
    return updated;
  }

  removeWidget(widgetId: WidgetIdVO): DashboardEntity {
    const filtered = this._widgetIds.filter((w) => w.value !== widgetId.value);
    if (filtered.length === this._widgetIds.length) {
      throw new Error(`Widget not found: ${widgetId.value}`);
    }
    return new DashboardEntity(
      this.id,
      { ...this._toProps(), widgetIds: filtered },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  get name(): DashboardNameVO { return this._name; }
  get layout(): DashboardLayoutVO { return this._layout; }
  get ownerId(): string { return this._ownerId; }
  get widgetIds(): readonly WidgetIdVO[] { return this._widgetIds; }

  get widgetCount(): number { return this._widgetIds.length; }

  private _toProps(): DashboardEntityProps {
    return {
      name: this._name,
      layout: this._layout,
      ownerId: this._ownerId,
      widgetIds: this._widgetIds,
    };
  }
}
