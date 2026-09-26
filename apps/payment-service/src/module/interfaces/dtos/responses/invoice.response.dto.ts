import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class InvoiceResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  number!: string;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  amount!: number;

  @ApiProperty()
  currency!: string;

  @ApiPropertyOptional()
  dueAt?: string;

  @ApiPropertyOptional()
  paidAt?: string;

  @ApiProperty()
  createdAt!: string;
}
