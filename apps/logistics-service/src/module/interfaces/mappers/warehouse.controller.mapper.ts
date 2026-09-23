import { Injectable } from '@nestjs/common';

@Injectable()
export class WarehouseControllerMapper {
  toResponse(data: unknown): unknown {
    return data;
  }
}
