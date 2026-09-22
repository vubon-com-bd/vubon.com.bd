export interface AbandonedCart1hInput {
  readonly userName: string;
  readonly itemCount: number;
  readonly cartUrl: string;
}

export function abandonedCart1hEmail(input: AbandonedCart1hInput): {
  readonly subject: string;
  readonly html: string;
} {
  return {
    subject: '🛒 You left something in your cart!',
    html: `
      <h2>Hi ${input.userName},</h2>
      <p>You have <strong>${input.itemCount}</strong> item(s) waiting in your cart.</p>
      <p>Complete your purchase before they sell out:</p>
      <p><a href="${input.cartUrl}">Return to Cart</a></p>
    `,
  };
}
