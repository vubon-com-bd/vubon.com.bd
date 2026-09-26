export class RegisterVendorRequestDto {
  businessName!: string;
  businessType!: string;
  businessRegistration?: string;
  businessDescription?: string;
  contactPhone!: string;
  contactEmail!: string;
  addressLine1!: string;
  addressLine2?: string;
  division!: string;
  district!: string;
  upazila?: string;
  postalCode?: string;
  documents?: ReadonlyArray<{
    type: string;
    url: string;
  }>;
}
