import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { RouteIdVO } from '../value-objects/primitives/route-id.vo';
import { RouteNameVO } from '../value-objects/primitives/route-name.vo';
import { RouteStatusVO } from '../value-objects/primitives/route-status.vo';
import { RouteTypeVO } from '../value-objects/primitives/route-type.vo';
import { RouteDistanceVO } from '../value-objects/primitives/route-distance.vo';
import { RouteOptimizationVO } from '../value-objects/primitives/route-optimization.vo';
import { ZoneIdVO } from '../value-objects/primitives/zone-id.vo';
import {
  RouteCreatedEvent,
  RouteOptimizedEvent,
} from '../events/route.events';

export interface RouteEntityProps {
  readonly name: RouteNameVO;
  readonly status: RouteStatusVO;
  readonly type: RouteTypeVO;
  readonly distance: RouteDistanceVO | null;
  readonly optimization: RouteOptimizationVO | null;
  readonly zones: readonly ZoneIdVO[];
  readonly optimized: boolean;
}

export class RouteEntity extends AggregateRoot<RouteIdVO> {
  private readonly _name: RouteNameVO;
  private readonly _status: RouteStatusVO;
  private readonly _type: RouteTypeVO;
  private readonly _distance: RouteDistanceVO | null;
  private readonly _optimization: RouteOptimizationVO | null;
  private readonly _zones: readonly ZoneIdVO[];
  private readonly _optimized: boolean;

  private constructor(
    id: RouteIdVO,
    props: RouteEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._name = props.name;
    this._status = props.status;
    this._type = props.type;
    this._distance = props.distance;
    this._optimization = props.optimization;
    this._zones = Object.freeze([...props.zones]);
    this._optimized = props.optimized;
  }

  static create(props: RouteEntityProps): RouteEntity {
    const now = new Date().toISOString();
    const id = RouteIdVO.create(crypto.randomUUID());
    const entity = new RouteEntity(id, props, now, now, null);
    entity.addDomainEvent(
      new RouteCreatedEvent(id.value, id.value, props.name.value, 0),
    );
    return entity;
  }

  static reconstitute(
    id: RouteIdVO,
    props: RouteEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): RouteEntity {
    return new RouteEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  markOptimized(distanceKm: number): RouteEntity {
    const now = new Date().toISOString();
    const updated = new RouteEntity(
      this.id,
      { ...this._toProps(), optimized: true },
      this.createdAt,
      now,
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new RouteOptimizedEvent(this.id.value, this.id.value, distanceKm, this.version + 1),
    );
    return updated;
  }

  get name(): RouteNameVO { return this._name; }
  get status(): RouteStatusVO { return this._status; }
  get type(): RouteTypeVO { return this._type; }
  get distance(): RouteDistanceVO | null { return this._distance; }
  get optimization(): RouteOptimizationVO | null { return this._optimization; }
  get zones(): readonly ZoneIdVO[] { return this._zones; }
  get optimized(): boolean { return this._optimized; }

  private _toProps(): RouteEntityProps {
    return {
      name: this._name,
      status: this._status,
      type: this._type,
      distance: this._distance,
      optimization: this._optimization,
      zones: this._zones,
      optimized: this._optimized,
    };
  }
}
