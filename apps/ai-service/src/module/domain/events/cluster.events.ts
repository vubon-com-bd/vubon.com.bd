import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE_TYPE = 'AiCluster';

export class ClusterCreatedEvent extends BaseDomainEvent<
  'ai.cluster.created',
  { clusterId: string; algorithm: string; clusterCount: number }
> {
  constructor(aggregateId: string, clusterId: string, algorithm: string, clusterCount: number, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'ai.cluster.created',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { clusterId, algorithm, clusterCount },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}
