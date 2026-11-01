import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ContactHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly userId!: string;
  @ApiProperty() readonly contactType!: string;
  @ApiProperty() readonly contactValue!: string;
  @ApiPropertyOptional() readonly label?: string;
  @ApiProperty() readonly isPrimary!: boolean;
  @ApiProperty() readonly isVerified!: boolean;
  @ApiPropertyOptional() readonly verifiedAt?: string;
  @ApiProperty() readonly createdAt!: string;
}
