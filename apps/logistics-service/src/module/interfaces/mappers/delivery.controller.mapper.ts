import { Injectable } from '@nestjs/common';

@Injectable()
export class DeliveryControllerMapper {
  toResponse(data: unknown): unknown {
    return data;
  }
}
