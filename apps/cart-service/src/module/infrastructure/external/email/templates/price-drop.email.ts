export interface PriceDropInput {
  readonly userName: string;
  readonly productName: string;
  readonly oldPrice: number;
  readonly newPrice: number;
  readonly currency: string;
  readonly productUrl: string;
}

export function priceDropEmail(input: PriceDropInput): {
  readonly subject: string;
  readonly html: string;
} {
  return {
    subject: `💸 Price drop on ${input.productName}`,
    html: `
      <h2>Hi ${input.userName},</h2>
      <p>Great news! <strong>${input.productName}</strong> is now cheaper.</p>
      <p>Was: <s>${input.oldPrice} ${input.currency}</s></p>
      <p>Now: <strong>${input.newPrice} ${input.currency}</strong></p>
      <p><a href="${input.productUrl}">View Product</a></p>
    `,
  };
}
