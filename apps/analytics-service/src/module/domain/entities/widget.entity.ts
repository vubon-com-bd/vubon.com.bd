/**
 * Widget Entity
 * @module analytics-service/domain/entities
 *
 * Dashboard widget instance।
 * Business Rule:
 * - Belongs to exactly one dashboard
 * - Position immutable (updates via replace)
 * - Widget config editable
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base';
import { WidgetIdVO } from '../value-objects/primitives/widget-id.vo.js';
import { WidgetTypeVO } from '../value-objects/primitives/widget-type.vo.js';
import { WidgetConfigVO } from '../value-objects/primitives/widget-config.vo.js';
import { DashboardIdVO } from '../value-objects/primitives/dashboard-id.vo.js';

export interface WidgetEntityProps {
  readonly widgetId: WidgetIdVO;
  readonly dashboardId: DashboardIdVO;
  readonly type: WidgetTypeVO;
  readonly title: string;
  readonly config: WidgetConfigVO;
  readonly position: {
    readonly x: number;
    readonly y: number;
    readonly w: number;
    readonly h: number;
  };
}

export class WidgetEntity extends BaseEntity<string> {
  private props: WidgetEntityProps;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: WidgetEntityProps
  ) {
    super(id, createdAt, updatedAt, null);
    this.props = props;
  }

  static create(params: {
    widgetId: WidgetIdVO;
    dashboardId: DashboardIdVO;
    type: WidgetTypeVO;
    title: string;
    config: WidgetConfigVO;
    position: { x: number; y: number; w: number; h: number };
    now: string;
  }): WidgetEntity {
    if (!params.widgetId || !params.dashboardId || !params.type || !params.config) {
      throw new Error('WidgetEntity requires widgetId, dashboardId, type, config');
    }
    if (params.position.x < 0 || params.position.y < 0) {
      throw new Error('Position must be non-negative');
    }
    if (params.position.w <= 0 || params.position.h <= 0) {
      throw new Error('Widget size must be positive');
    }

    return new WidgetEntity(
      params.widgetId.value,
      params.now,
      params.now,
      {
        widgetId: params.widgetId,
        dashboardId: params.dashboardId,
        type: params.type,
        title: params.title.trim(),
        config: params.config,
        position: Object.freeze({ ...params.position }),
      }
    );
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: WidgetEntityProps;
  }): WidgetEntity {
    return new WidgetEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props
    );
  }

  get widgetId(): WidgetIdVO { return this.props.widgetId; }
  get dashboardId(): DashboardIdVO { return this.props.dashboardId; }
  get type(): WidgetTypeVO { return this.props.type; }
  get title(): string { return this.props.title; }
  get config(): WidgetConfigVO { return this.props.config; }
  get position(): { x: number; y: number; w: number; h: number } { return this.props.position; }

  isVisual(): boolean { return this.props.type.isVisualization(); }
  requiresData(): boolean { return this.props.type.requiresDataQuery(); }

  /** Area in grid units */
  area(): number {
    return this.props.position.w * this.props.position.h;
  }
}
