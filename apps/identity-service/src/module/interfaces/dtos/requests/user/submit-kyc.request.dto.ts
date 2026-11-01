/**
 * Submit KYC HTTP Request DTO
 * @module identity-service/interfaces/dtos/requests/user
 */
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

const DOCUMENT_TYPES = [
  'national_id',
  'passport',
  'driving_license',
  'birth_certificate',
  'trade_license',
  'tin_certificate',
  'utility_bill',
  'bank_statement',
] as const;

export class KycDocumentHttpDTO {
  @ApiProperty({ enum: DOCUMENT_TYPES, example: 'national_id' })
  @IsEnum(DOCUMENT_TYPES)
  type!: (typeof DOCUMENT_TYPES)[number];

  @ApiProperty({ example: '1234567890123' })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  number!: string;

  @ApiProperty({ example: 'https://cdn.vubon.com.bd/kyc/front.jpg' })
  @IsUrl()
  frontUrl!: string;

  @ApiProperty({ example: 'https://cdn.vubon.com.bd/kyc/back.jpg' })
  @IsUrl()
  backUrl!: string;

  @ApiProperty({ example: 'https://cdn.vubon.com.bd/kyc/selfie.jpg' })
  @IsUrl()
  selfieUrl!: string;
}

export class SubmitKycHttpDTO {
  @ApiProperty({ type: [KycDocumentHttpDTO] })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @ValidateNested({ each: true })
  @Type(() => KycDocumentHttpDTO)
  documents!: KycDocumentHttpDTO[];
}
