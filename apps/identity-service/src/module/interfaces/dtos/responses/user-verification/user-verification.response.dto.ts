import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserVerificationHttpResponseDTO {
  @ApiProperty() readonly userId!: string;
  @ApiProperty() readonly emailVerified!: boolean;
  @ApiPropertyOptional() readonly emailVerifiedAt?: string;
  @ApiProperty() readonly phoneVerified!: boolean;
  @ApiPropertyOptional() readonly phoneVerifiedAt?: string;
  @ApiProperty() readonly identityVerified!: boolean;
  @ApiPropertyOptional() readonly identityVerifiedAt?: string;
  @ApiProperty() readonly addressVerified!: boolean;
  @ApiPropertyOptional() readonly addressVerifiedAt?: string;
  @ApiProperty() readonly kycStatus!: string;
  @ApiProperty() readonly updatedAt!: string;
}
