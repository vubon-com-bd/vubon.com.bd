import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateGuestCartHttpDTO {
  @ApiProperty({ example: 'gXk9LmN2pQrStUvWxYz0123456789ABCDEF' })
  readonly token!: string;

  @ApiPropertyOptional({ example: 'BDT' })
  readonly currency?: string;

  @ApiPropertyOptional() readonly expiresAt?: string;
}

export class MergeGuestCartHttpDTO {
  @ApiProperty({ example: 'gXk9LmN2pQrStUvWxYz0123456789ABCDEF' })
  readonly guestToken!: string;

  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  readonly targetCartId!: string;

  @ApiPropertyOptional({ enum: ['sum_quantity', 'max_quantity', 'keep_latest', 'keep_existing', 'replace'] })
  readonly strategy?: string;
}
