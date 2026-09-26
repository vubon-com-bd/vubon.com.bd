import { Injectable } from '@nestjs/common';

@Injectable()
export class ShipmentControllerMapper {
  toResponse(data: unknown): unknown {
    return data;
  }
}
