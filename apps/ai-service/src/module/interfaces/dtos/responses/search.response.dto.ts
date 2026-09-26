import { ApiProperty } from '@nestjs/swagger';

export class SearchMatchResponseDTO {
  @ApiProperty()
  documentId!: string;

  @ApiProperty()
  score!: number;

  @ApiProperty({ nullable: true })
  snippet!: string | null;
}

export class SearchResponseDTO {
  @ApiProperty()
  query!: string;

  @ApiProperty({ type: [SearchMatchResponseDTO] })
  matches!: SearchMatchResponseDTO[];

  @ApiProperty()
  totalHits!: number;

  @ApiProperty()
  tookMs!: number;
}
