import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CouponHttpDTO {
  @ApiProperty() readonly cartId!: string;
  @ApiProperty() readonly code!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly discountAmount!: number;
  @ApiProperty() readonly currency!: string;
  @ApiProperty() readonly appliedAt!: string;
}

export class CouponValidationHttpDTO {
  @ApiProperty() readonly valid!: boolean;
  @ApiProperty() readonly code!: string;
  @ApiProperty() readonly discountAmount!: number;
  @ApiPropertyOptional() readonly reason?: string;
  @ApiPropertyOptional() readonly errorCode?: string;
}
