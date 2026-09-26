import { Injectable } from '@nestjs/common';

@Injectable()
export class RouteControllerMapper {
  toResponse(data: unknown): unknown {
    return data;
  }
}
