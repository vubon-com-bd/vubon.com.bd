import { ApiPropertyOptional } from '@nestjs/swagger';

export class ProfileUpdateRequestDTO {
  @ApiPropertyOptional()
  firstName?: string;

  @ApiPropertyOptional()
  lastName?: string;

  @ApiPropertyOptional()
  bio?: string;

  @ApiPropertyOptional()
  avatarUrl?: string;
}
