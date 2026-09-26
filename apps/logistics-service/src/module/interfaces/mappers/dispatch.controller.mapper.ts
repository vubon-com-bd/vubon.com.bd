import { Injectable } from '@nestjs/common';

@Injectable()
export class DispatchControllerMapper {
  toResponse(data: unknown): unknown {
    return data;
  }
}
