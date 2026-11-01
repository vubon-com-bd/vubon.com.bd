/**
 * Session List Response DTO
 * @module identity-service/interfaces/dtos/responses/session
 */
import { ApiProperty } from '@nestjs/swagger';
import { AuthSessionPublicHttpResponseDTO } from './session-public.response.dto.js';

export class SessionListHttpResponseDTO {
  @ApiProperty({ example: true }) readonly success!: true;
  @ApiProperty({ type: [AuthSessionPublicHttpResponseDTO] })
  readonly sessions!: readonly AuthSessionPublicHttpResponseDTO[];
  @ApiProperty({ example: 3 }) readonly total!: number;
}
