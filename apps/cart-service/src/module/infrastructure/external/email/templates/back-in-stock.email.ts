export interface BackInStockInput {
  readonly userName: string;
  readonly productName: string;
  readonly productUrl: string;
}

export function backInStockEmail(input: BackInStockInput): {
  readonly subject: string;
  readonly html: string;
} {
  return {
    subject: `✅ ${input.productName} is back in stock`,
    html: `
      <h2>Hi ${input.userName},</h2>
      <p><strong>${input.productName}</strong> is back in stock!</p>
      <p><a href="${input.productUrl}">Buy Now</a></p>
    `,
  };
}
