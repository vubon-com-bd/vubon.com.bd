import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ModelResponseDTO {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  version!: string;

  @ApiProperty()
  type!: string;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  providerId!: string;

  @ApiPropertyOptional({ nullable: true })
  endpoint!: string | null;

  @ApiPropertyOptional({ nullable: true })
  description!: string | null;
}
