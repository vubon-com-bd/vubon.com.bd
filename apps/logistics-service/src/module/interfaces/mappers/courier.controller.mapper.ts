import { Injectable } from '@nestjs/common';

@Injectable()
export class CourierControllerMapper {
  toResponse(data: unknown): unknown {
    return data;
  }
}
