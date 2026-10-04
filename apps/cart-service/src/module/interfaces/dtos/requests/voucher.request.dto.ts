import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ApplyVoucherHttpDTO {
  @ApiProperty({ example: 'GC-ABCD1234' })
  readonly code!: string;
}

export class RemoveVoucherHttpDTO {
  @ApiPropertyOptional() readonly reason?: string;
}
