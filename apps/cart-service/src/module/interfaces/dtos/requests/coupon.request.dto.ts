import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ApplyCouponHttpDTO {
  @ApiProperty({ example: 'SAVE10', minLength: 4, maxLength: 32 })
  readonly code!: string;
}

export class RemoveCouponHttpDTO {
  @ApiPropertyOptional() readonly reason?: string;
}

export class ValidateCouponHttpDTO {
  @ApiProperty({ example: 'SAVE10' })
  readonly code!: string;
}
