import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { RouteIdVO } from '../primitives/route-id.vo';
import { RouteNameVO } from '../primitives/route-name.vo';
import { RouteStatusVO } from '../primitives/route-status.vo';
import { RouteTypeVO } from '../primitives/route-type.vo';
import { RouteDistanceVO } from '../primitives/route-distance.vo';
import { RouteOptimizationVO } from '../primitives/route-optimization.vo';

export interface RouteProps {
  readonly id: RouteIdVO;
  readonly name: RouteNameVO;
  readonly status: RouteStatusVO;
  readonly type: RouteTypeVO;
  readonly distance: RouteDistanceVO | null;
  readonly optimization: RouteOptimizationVO | null;
}

export class RouteVO extends BaseVO<RouteProps> {
  private constructor(props: RouteProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: RouteProps): RouteVO {
    return new RouteVO(props);
  }

  get id(): RouteIdVO { return this.value.id; }
  get name(): RouteNameVO { return this.value.name; }
  get status(): RouteStatusVO { return this.value.status; }
  get type(): RouteTypeVO { return this.value.type; }
  get distance(): RouteDistanceVO | null { return this.value.distance; }
  get optimization(): RouteOptimizationVO | null { return this.value.optimization; }
}
