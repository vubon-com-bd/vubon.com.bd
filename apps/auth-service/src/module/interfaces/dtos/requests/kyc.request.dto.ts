import { ApiProperty } from '@nestjs/swagger';

export class KycDocumentInput {
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

export class KycSubmitRequestDTO {
  @ApiProperty({ type: [KycDocumentInput] })
  documents!: KycDocumentInput[];

  @ApiProperty({ example: true })
  acceptTerms!: true;
}

export class KycVerifyRequestDTO {
  @ApiProperty()
  userId!: string;

  @ApiProperty()
  kycId!: string;
}

export class KycRejectRequestDTO {
  @ApiProperty()
  userId!: string;

  @ApiProperty()
  kycId!: string;

  @ApiProperty()
  reason!: string;
}
