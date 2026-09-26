import { ApiProperty } from '@nestjs/swagger';

export class PayoutResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  vendorId!: string;

  @ApiProperty()
  bankAccountId!: string;

  @ApiProperty()
  amount!: number;

  @ApiProperty()
  currency!: string;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  requestedAt!: string;

  @ApiProperty({ nullable: true })
  processedAt!: string | null;

  @ApiProperty({ nullable: true })
  failureReason!: string | null;
}
