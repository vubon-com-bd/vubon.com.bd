import { Injectable } from '@nestjs/common';
import type { MethodResponseDTO } from '../../application/dtos/responses/method-response.dto';
import { MethodResponseDto } from '../dtos/responses/method.response.dto';

@Injectable()
export class MethodControllerMapper {
  toResponse(app: MethodResponseDTO): MethodResponseDto {
    return {
      id: app.id,
      type: app.type,
      provider: app.provider ?? null,
      cardLast4: app.cardLast4 ?? null,
      cardBrand: app.cardBrand ?? null,
      isDefault: app.isDefault,
      isActive: app.isActive,
      createdAt: app.createdAt,
    };
  }
}
