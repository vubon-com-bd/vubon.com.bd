import { Injectable } from '@nestjs/common';

@Injectable()
export class FulfillmentControllerMapper {
  toResponse(data: unknown): unknown {
    return data;
  }
}
