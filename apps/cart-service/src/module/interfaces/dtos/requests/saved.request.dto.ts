import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SaveForLaterHttpDTO {
  @ApiPropertyOptional() readonly notes?: string;
}

export class MoveToCartHttpDTO {
  @ApiPropertyOptional({ minimum: 1 }) readonly quantity?: number;
}
