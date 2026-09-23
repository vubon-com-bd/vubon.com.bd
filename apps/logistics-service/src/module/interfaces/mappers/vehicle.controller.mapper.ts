import { Injectable } from '@nestjs/common';

@Injectable()
export class VehicleControllerMapper {
  toResponse(data: unknown): unknown {
    return data;
  }
}
