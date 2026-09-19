import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { AuthSessionResponseDTO } from '../../../application/dtos/responses/auth-session-response.dto';

export class SessionResponseDTO implements AuthSessionResponseDTO {
  @ApiProperty()
  id!: string;

  @ApiProperty({ example: 'active' })
  status!: string;

  @ApiPropertyOptional()
  ipAddress?: string;

  @ApiPropertyOptional()
  userAgent?: string;

  @ApiPropertyOptional()
  deviceId?: string;

  @ApiProperty()
  createdAt!: string;

  @ApiProperty()
  expiresAt!: string;

  @ApiProperty()
  lastAccessedAt!: string;

  @ApiProperty({ example: false })
  isCurrent!: boolean;
}

export class SessionListResponseDTO {
  @ApiProperty()
  success!: true;

  @ApiProperty({ type: [SessionResponseDTO] })
  sessions!: SessionResponseDTO[];

  @ApiProperty()
  total!: number;
}
