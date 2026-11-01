import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProfileHttpResponseDTO {
  @ApiProperty() readonly userId!: string;
  @ApiPropertyOptional() readonly firstName?: string;
  @ApiPropertyOptional() readonly lastName?: string;
  @ApiPropertyOptional() readonly displayName?: string;
  @ApiPropertyOptional() readonly bio?: string;
  @ApiPropertyOptional() readonly avatarUrl?: string;
  @ApiPropertyOptional() readonly coverUrl?: string;
  @ApiPropertyOptional() readonly gender?: string;
  @ApiPropertyOptional() readonly dateOfBirth?: string;
  @ApiPropertyOptional() readonly website?: string;
  @ApiPropertyOptional() readonly language?: string;
  @ApiPropertyOptional() readonly locale?: string;
  @ApiPropertyOptional() readonly timezone?: string;
  @ApiProperty() readonly visibility!: string;
  @ApiProperty() readonly completionPercent!: number;
  @ApiProperty() readonly updatedAt!: string;
}
