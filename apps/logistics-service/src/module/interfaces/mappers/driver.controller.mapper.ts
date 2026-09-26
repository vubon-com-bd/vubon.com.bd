import { Injectable } from '@nestjs/common';

@Injectable()
export class DriverControllerMapper {
  toResponse(data: unknown): unknown {
    return data;
  }
}
