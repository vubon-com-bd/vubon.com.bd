/**
 * CreateTicketRequestDTO — HTTP layer class-based DTO
 * @module support-service/interfaces/dtos/requests/ticket
 *
 * Rule: class-validator + Swagger decorators
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsEnum,
  IsArray,
  MinLength,
  MaxLength,
  ArrayMaxSize,
} from 'class-validator';

export class CreateTicketRequestDTO {
  @ApiProperty({ example: 'Order not received', minLength: 3, maxLength: 200 })
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  subject!: string;

  @ApiProperty({
    example: 'My order was supposed to arrive 3 days ago...',
    minLength: 10,
    maxLength: 5000,
  })
  @IsString()
  @MinLength(10)
  @MaxLength(5000)
  description!: string;

  @ApiProperty({ example: 'technical' })
  @IsString()
  type!: string;

  @ApiProperty({ example: 'high' })
  @IsString()
  priority!: string;

  @ApiProperty({ example: 'email' })
  @IsString()
  channel!: string;

  @ApiProperty({ example: 'general' })
  @IsString()
  category!: string;

  @ApiPropertyOptional({ example: 'a1b2c3d4-...' })
  @IsOptional()
  @IsString()
  customerId?: string;

  @ApiPropertyOptional({ example: 'user@example.com' })
  @IsOptional()
  @IsString()
  customerEmail?: string;

  @ApiPropertyOptional({ example: 'John Doe' })
  @IsOptional()
  @IsString()
  customerName?: string;

  @ApiPropertyOptional({ example: 'order-123' })
  @IsOptional()
  @IsString()
  orderId?: string;

  @ApiPropertyOptional({ example: 'product-456' })
  @IsOptional()
  @IsString()
  productId?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(5)
  @IsString({ each: true })
  attachments?: string[];

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(10)
  @IsString({ each: true })
  tags?: string[];
}
