/**
 * ComplaintMapper — domain ↔ DTO
 * @module support-service/application/mappers
 */
import { OneWayMapper } from '@vubon/shared-kernel/application/mappers';
import { ComplaintEntity } from '../../domain/entities/complaint.entity';
import type { ComplaintResponseDTO } from '../dtos/responses/complaint-response.dto';

export class ComplaintMapper extends OneWayMapper<
  ComplaintEntity,
  ComplaintResponseDTO
> {
  map(entity: ComplaintEntity): ComplaintResponseDTO {
    const snapshot = entity.toSnapshot();
    return {
      id: snapshot.id,
      complaintNumber: snapshot.id,
      subject: snapshot.description.slice(0, 80),
      description: snapshot.description,
      type: snapshot.type as ComplaintResponseDTO['type'],
      status: snapshot.status as ComplaintResponseDTO['status'],
      severity: snapshot.severity as ComplaintResponseDTO['severity'],
      userId: snapshot.userId,
      orderId: snapshot.orderId,
      resolvedAt: snapshot.resolvedAt,
      createdAt: snapshot.createdAt,
      updatedAt: snapshot.updatedAt,
    };
  }

  toList(entities: readonly ComplaintEntity[]): readonly ComplaintResponseDTO[] {
    return entities.map((e) => this.map(e));
  }
}
