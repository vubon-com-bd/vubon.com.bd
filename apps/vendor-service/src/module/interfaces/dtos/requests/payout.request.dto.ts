import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RequestPayoutRequestDto {
  @ApiProperty()
  vendorId!: string;

  @ApiProperty()
  bankAccountId!: string;

  @ApiProperty({ example: 5000 })
  amount!: number;

  @ApiProperty({ example: 'BDT' })
  currency!: string;

  @ApiPropertyOptional()
  notes?: string;
}

export class ApprovePayoutRequestDto {
  @ApiProperty()
  payoutId!: string;

  @ApiPropertyOptional()
  notes?: string;
}

export class RejectPayoutRequestDto {
  @ApiProperty()
  payoutId!: string;

  @ApiProperty()
  reason!: string;
}

export class ProcessPayoutRequestDto {
  @ApiProperty()
  payoutId!: string;

  @ApiProperty()
  status!: string;

  @ApiPropertyOptional()
  transactionRef?: string;

  @ApiPropertyOptional()
  failureReason?: string;
}
