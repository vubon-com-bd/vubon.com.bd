import { ApiProperty } from '@nestjs/swagger';

export class KycDocumentInputDto {
  @ApiProperty({ example: 'national_id' })
  type!: string;

  @ApiProperty()
  frontUrl!: string;

  @ApiProperty()
  number?: string;

  @ApiProperty()
  backUrl?: string;

  @ApiProperty()
  selfieUrl?: string;
}

export class SubmitKycRequestDto {
  @ApiProperty({ type: [KycDocumentInputDto] })
  documents!: KycDocumentInputDto[];

  @ApiProperty({ example: true })
  acceptTerms!: true;
}

export class VerifyKycRequestDto {
  @ApiProperty()
  kycId!: string;
}

export class RejectKycRequestDto {
  @ApiProperty()
  kycId!: string;

  @ApiProperty()
  reason!: string;
}

export class ReverifyKycRequestDto {
  @ApiProperty()
  kycId!: string;
}
