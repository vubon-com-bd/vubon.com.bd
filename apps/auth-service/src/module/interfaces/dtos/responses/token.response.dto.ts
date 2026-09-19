import { ApiProperty } from '@nestjs/swagger';
import type { AuthTokenResponseDTO } from '../../../application/dtos/responses/auth-token-response.dto';

export class TokenResponseDTO implements AuthTokenResponseDTO {
  @ApiProperty()
  accessToken!: string;

  @ApiProperty()
  refreshToken!: string;

  @ApiProperty()
  accessExpiresAt!: number;

  @ApiProperty()
  refreshExpiresAt!: number;

  @ApiProperty({ example: 'Bearer' })
  tokenType!: 'Bearer';
}
