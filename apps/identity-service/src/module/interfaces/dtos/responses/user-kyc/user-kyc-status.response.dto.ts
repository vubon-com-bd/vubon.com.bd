import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserKycStatusHttpResponseDTO {
  @ApiProperty() readonly userId!: string;
  @ApiProperty() readonly status!: string;
  @ApiPropertyOptional() readonly verifiedAt?: string;
  @ApiPropertyOptional() readonly rejectionReason?: string;
}
