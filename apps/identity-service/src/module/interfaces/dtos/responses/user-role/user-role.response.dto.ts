import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserRoleHttpResponseDTO {
  @ApiProperty() readonly userId!: string;
  @ApiProperty() readonly role!: string;
  @ApiProperty() readonly level!: number;
  @ApiPropertyOptional() readonly assignedBy?: string;
  @ApiPropertyOptional() readonly assignedAt?: string;
  @ApiPropertyOptional() readonly expiresAt?: string;
  @ApiProperty() readonly isPrimary!: boolean;
}
