/**
 * Dashboard Entity (Aggregate Root)
 * @module analytics-service/domain/entities
 *
 * Analytics dashboard with widgets।
 * Business Rule:
 * - Max 50 widgets
 * - Widget IDs unique
 * - Public/private visibility
 * - Owner can share/unshare
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base';
import { DashboardIdVO } from '../value-objects/primitives/dashboard-id.vo.js';
import { DashboardNameVO } from '../value-objects/primitives/dashboard-name.vo.js';
import { DashboardLayoutVO } from '../value-objects/primitives/dashboard-layout.vo.js';
import { WidgetIdVO } from '../value-objects/primitives/widget-id.vo.js';
import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';
import { DashboardCreatedEvent } from '../events/dashboard.events.js';
import { WidgetAddedEvent } from '../events/dashboard.events.js';

const MAX_WIDGETS = 50;

export interface DashboardEntityProps {
  readonly name: DashboardNameVO;
  readonly layout: DashboardLayoutVO;
  readonly ownerId: UserIdVO;
  widgetIds: WidgetIdVO[];
  isPublic: boolean;
  isArchived: boolean;
}

export class DashboardEntity extends AggregateRoot<string> {
  private props: DashboardEntityProps;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: DashboardEntityProps
  ) {
    super(id, createdAt, updatedAt, null);
    this.props = props;
  }

  static create(params: {
    id: DashboardIdVO;
    name: DashboardNameVO;
    layout: DashboardLayoutVO;
    ownerId: UserIdVO;
    now: string;
  }): DashboardEntity {
    if (!params.id || !params.name || !params.layout || !params.ownerId) {
      throw new Error('DashboardEntity requires id, name, layout, ownerId');
    }

    const entity = new DashboardEntity(
      params.id.value,
      params.now,
      params.now,
      {
        name: params.name,
        layout: params.layout,
        ownerId: params.ownerId,
        widgetIds: [],
        isPublic: false,
        isArchived: false,
      }
    );

    entity.addDomainEvent(
      new DashboardCreatedEvent(params.id.value, params.name.value, params.ownerId.value, params.now)
    );
    entity.incrementVersion();
    return entity;
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: DashboardEntityProps;
  }): DashboardEntity {
    return new DashboardEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props
    );
  }

  get name(): DashboardNameVO { return this.props.name; }
  get layout(): DashboardLayoutVO { return this.props.layout; }
  get ownerId(): UserIdVO { return this.props.ownerId; }
  get widgetIds(): readonly WidgetIdVO[] { return this.props.widgetIds; }
  get isPublic(): boolean { return this.props.isPublic; }
  get isArchived(): boolean { return this.props.isArchived; }

  widgetCount(): number {
    return this.props.widgetIds.length;
  }

  isEmpty(): boolean {
    return this.props.widgetIds.length === 0;
  }

  isFull(): boolean {
    return this.props.widgetIds.length >= MAX_WIDGETS;
  }

  hasWidget(widgetId: WidgetIdVO): boolean {
    return this.props.widgetIds.some((w) => w.equals(widgetId));
  }

  /**
   * Business Action: Add widget
   */
  addWidget(widgetId: WidgetIdVO, now: string): void {
    if (this.props.isArchived) {
      throw new Error('Cannot modify archived dashboard');
    }
    if (this.isFull()) {
      throw new Error(`Dashboard supports max ${MAX_WIDGETS} widgets`);
    }
    if (this.hasWidget(widgetId)) {
      throw new Error(`Widget ${widgetId.value} already in dashboard`);
    }

    this.props.widgetIds.push(widgetId);
    this.addDomainEvent(
      new WidgetAddedEvent(this.id, widgetId.value, now)
    );
    this.incrementVersion();
  }

  /**
   * Business Action: Remove widget
   */
  removeWidget(widgetId: WidgetIdVO): void {
    if (this.props.isArchived) {
      throw new Error('Cannot modify archived dashboard');
    }
    const idx = this.props.widgetIds.findIndex((w) => w.equals(widgetId));
    if (idx === -1) {
      throw new Error(`Widget ${widgetId.value} not found`);
    }
    this.props.widgetIds.splice(idx, 1);
    this.incrementVersion();
  }

  makePublic(): void {
    if (this.props.isPublic) return;
    this.props.isPublic = true;
    this.incrementVersion();
  }

  makePrivate(): void {
    if (!this.props.isPublic) return;
    this.props.isPublic = false;
    this.incrementVersion();
  }

  archive(): void {
    if (this.props.isArchived) throw new Error('Already archived');
    this.props.isArchived = true;
    this.incrementVersion();
  }

  isOwnedBy(userId: UserIdVO): boolean {
    return this.props.ownerId.equals(userId);
  }

  isAccessibleBy(userId: UserIdVO): boolean {
    return this.props.isPublic || this.isOwnedBy(userId);
  }
}
