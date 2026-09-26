import { Injectable } from '@nestjs/common';

@Injectable()
export class TrackingControllerMapper {
  toResponse(data: unknown): unknown {
    return data;
  }
}
