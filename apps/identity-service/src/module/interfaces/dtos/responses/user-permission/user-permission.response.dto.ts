import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserPermissionHttpResponseDTO {
  @ApiProperty() readonly userId!: string;
  @ApiProperty() readonly permission!: string;
  @ApiPropertyOptional() readonly grantedBy?: string;
  @ApiPropertyOptional() readonly grantedAt?: string;
  @ApiPropertyOptional() readonly expiresAt?: string;
}
