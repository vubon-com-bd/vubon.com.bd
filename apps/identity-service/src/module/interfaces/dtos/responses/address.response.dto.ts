import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AddressHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly userId!: string;
  @ApiProperty() readonly type!: string;
  @ApiPropertyOptional() readonly label?: string;
  @ApiProperty() readonly fullName!: string;
  @ApiProperty() readonly phone!: string;
  @ApiProperty() readonly addressLine1!: string;
  @ApiPropertyOptional() readonly addressLine2?: string;
  @ApiProperty() readonly city!: string;
  @ApiProperty() readonly division!: string;
  @ApiProperty() readonly district!: string;
  @ApiProperty() readonly postalCode!: string;
  @ApiProperty() readonly country!: string;
  @ApiProperty() readonly isDefault!: boolean;
  @ApiProperty() readonly isDefaultShipping!: boolean;
  @ApiProperty() readonly isDefaultBilling!: boolean;
  @ApiProperty() readonly isVerified!: boolean;
  @ApiProperty() readonly createdAt!: string;
}
