export class SubmitVerificationRequestDto {
  vendorId!: string;
  documents!: ReadonlyArray<{
    type: string;
    url: string;
    number?: string;
    expiresAt?: string;
  }>;
}
