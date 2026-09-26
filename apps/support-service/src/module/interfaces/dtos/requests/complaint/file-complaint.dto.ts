/**
 * FileComplaintRequestDTO — HTTP layer
 * @module support-service/interfaces/dtos/requests/complaint
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ArrayMaxSize,
} from 'class-validator';

export class FileComplaintRequestDTO {
  @ApiProperty({ example: 'Damaged product received' })
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  subject!: string;

  @ApiProperty({ example: 'The product arrived with a broken seal...' })
  @IsString()
  @MinLength(10)
  @MaxLength(5000)
  description!: string;

  @ApiProperty({ example: 'product_quality' })
  @IsString()
  type!: string;

  @ApiProperty({ example: 'high' })
  @IsString()
  severity!: string;

  @ApiPropertyOptional({ example: 'order-uuid' })
  @IsOptional()
  @IsString()
  orderId?: string;

  @ApiPropertyOptional({ example: 'product-uuid' })
  @IsOptional()
  @IsString()
  productId?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(5)
  @IsString({ each: true })
  attachments?: string[];
}
