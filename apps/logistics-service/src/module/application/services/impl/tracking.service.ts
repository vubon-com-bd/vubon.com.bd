import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { TrackingServiceInterface } from '../interfaces/tracking.service.interface';
import type { TrackingRepository } from '../../../domain/repositories/tracking.repository.interface';
import { TrackingEntity } from '../../../domain/entities/tracking.entity';
import { TrackingNumberVO } from '../../../domain/value-objects/primitives/tracking-number.vo';
import { ShipmentIdVO } from '../../../domain/value-objects/primitives/shipment-id.vo';
import { TrackingIdVO } from '../../../domain/value-objects/primitives/tracking-id.vo';
import type { TrackingResponseDTO } from '../../dtos/responses/tracking-response.dto';

@Injectable()
export class TrackingService
  extends BaseService<TrackingEntity, string>
  implements TrackingServiceInterface
{
  readonly name = 'TrackingService';

  constructor(private readonly repo: TrackingRepository) {
    super();
  }

  async findByNumber(number: string): Promise<TrackingResponseDTO | null> {
    const entity = await this.repo.findByNumber(TrackingNumberVO.create(number));
    return entity ? this.toDTO(entity) : null;
  }

  async findByShipment(shipmentId: string): Promise<TrackingResponseDTO | null> {
    const entity = await this.repo.findByShipment(ShipmentIdVO.create(shipmentId));
    return entity ? this.toDTO(entity) : null;
  }

  async sync(trackingId: string): Promise<TrackingResponseDTO> {
    const entity = await this.repo.findById(TrackingIdVO.create(trackingId));
    if (!entity) throw new Error('Tracking not found');
    return this.toDTO(entity);
  }

  private toDTO(entity: TrackingEntity): TrackingResponseDTO {
    return {
      id: entity.id.value,
      trackingNumber: entity.number.value,
      shipmentId: entity.shipmentId.value,
      status: entity.status.value,
    } as unknown as TrackingResponseDTO;
  }
}
