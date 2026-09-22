import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class VerificationResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  paymentId!: string;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  method!: string;

  @ApiPropertyOptional()
  verifiedAt?: string;
}
