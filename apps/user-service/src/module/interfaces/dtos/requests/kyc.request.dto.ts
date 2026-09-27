/**
 * KYC Request DTOs
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsString,
  IsOptional,
  IsBoolean,
  IsUrl,
  IsEnum,
  MinLength,
  MaxLength,
  ArrayMinSize,
  ArrayMaxSize,
} from 'class-validator';
import { USER_KYC_DOCUMENT, USER_KYC } from '@vubon/shared-constants/user';

export class KycDocumentInputDto {
  @ApiProperty({ enum: Object.values(USER_KYC_DOCUMENT) })
  @IsEnum(Object.values(USER_KYC_DOCUMENT) as string[])
  type!: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(100)
  number?: string;

  @ApiProperty({ example: 'https://cdn.example.com/nid-front.jpg' })
  @IsUrl()
  frontUrl!: string;

  @ApiPropertyOptional() @IsOptional() @IsUrl()
  backUrl?: string;

  @ApiPropertyOptional() @IsOptional() @IsUrl()
  selfieUrl?: string;
}

export class SubmitKycRequestDto {
  @ApiProperty({ type: [KycDocumentInputDto] })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(USER_KYC.MAX_DOCUMENTS)
  documents!: KycDocumentInputDto[];

  @ApiProperty({ example: true })
  @IsBoolean()
  acceptTerms!: boolean;
}

export class RejectKycRequestDto {
  @ApiProperty({ example: 'Document image is blurred' })
  @IsString() @MinLength(3) @MaxLength(500)
  reason!: string;
}
