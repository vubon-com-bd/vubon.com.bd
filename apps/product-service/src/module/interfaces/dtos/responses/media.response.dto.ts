/**
 * Media Response DTO
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MediaResponseDTO {
  @ApiProperty()
  readonly id!: string;

  @ApiProperty()
  readonly productId!: string;

  @ApiProperty({ enum: ['image', 'video', 'document'] })
  readonly type!: string;

  @ApiProperty()
  readonly url!: string;

  @ApiPropertyOptional()
  readonly thumbnailUrl?: string;

  @ApiPropertyOptional()
  readonly alt?: string;

  @ApiProperty()
  readonly sortOrder!: number;

  @ApiPropertyOptional()
  readonly sizeBytes?: number;

  @ApiProperty()
  readonly isPrimary!: boolean;

  @ApiProperty()
  readonly createdAt!: string;

  @ApiProperty()
  readonly updatedAt!: string;
}
