export interface SubscriptionRenewedInput {
  readonly subscriptionId: string;
  readonly plan: string;
}

export function subscriptionRenewedEmail(input: SubscriptionRenewedInput): {
  readonly subject: string;
  readonly html: string;
} {
  return {
    subject: `Subscription Renewed — ${input.plan}`,
    html: `
      <h2>Subscription Renewed</h2>
      <p>Your subscription <strong>${input.subscriptionId}</strong> has been renewed.</p>
      <p>Plan: <strong>${input.plan}</strong></p>
    `,
  };
}
