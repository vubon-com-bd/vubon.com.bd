/**
 * SsoResponseDTO
 * @module auth-service/interfaces/dtos/responses
 */
import { ApiProperty } from '@nestjs/swagger';
import { AuthResponseDTO } from './auth.response.dto';

export class SsoLoginResponseDTO extends AuthResponseDTO {
  @ApiProperty() tenantId!: string;
}
