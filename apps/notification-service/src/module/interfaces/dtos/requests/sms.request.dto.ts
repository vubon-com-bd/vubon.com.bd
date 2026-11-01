/**
 * SMS HTTP Request DTOs
 * @module notification-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { SMS_TYPE } from '@vubon/shared-constants/platform';

const SMS_TYPE_VALUES = Object.values(SMS_TYPE) as string[];

export class SendSmsHttpDTO {
  @ApiProperty({
    example: '+8801712345678',
    description: 'Single phone or array of phones',
    oneOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' } }],
  })
  @ValidateIf((o: SendSmsHttpDTO) => typeof o.to === 'string')
  @IsString()
  @ValidateIf((o: SendSmsHttpDTO) => Array.isArray(o.to))
  @IsArray()
  @MinLength(1)
  readonly to!: string | readonly string[];

  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(1600)
  readonly message!: string;

  @ApiProperty({ enum: SMS_TYPE_VALUES })
  @IsEnum(SMS_TYPE_VALUES)
  readonly type!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(11)
  readonly senderId?: string;
}

export class SendBulkSmsHttpDTO {
  @ApiProperty({ isArray: true })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(1000)
  readonly recipients!: readonly {
    readonly phone: string;
    readonly message?: string;
  }[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(1600)
  readonly message?: string;

  @ApiProperty({ enum: SMS_TYPE_VALUES })
  @IsEnum(SMS_TYPE_VALUES)
  readonly type!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(11)
  readonly senderId?: string;
}
