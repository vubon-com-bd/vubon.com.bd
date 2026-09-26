import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SubmitVerificationRequestDto {
  @ApiProperty()
  vendorId!: string;

  @ApiProperty({ type: [Object] })
  documents!: ReadonlyArray<{
    type: string;
    url: string;
    number?: string;
    expiresAt?: string;
  }>;
}

export class UploadDocumentRequestDto {
  @ApiProperty()
  vendorId!: string;

  @ApiProperty()
  type!: string;

  @ApiProperty()
  url!: string;

  @ApiPropertyOptional()
  number?: string;

  @ApiPropertyOptional()
  expiresAt?: string;
}

export class ReverifyRequestDto {
  @ApiProperty()
  vendorId!: string;

  @ApiPropertyOptional()
  reason?: string;
}
