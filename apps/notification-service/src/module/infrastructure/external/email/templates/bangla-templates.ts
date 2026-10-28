/**
 * Bangla Email Templates — All Bangla notifications
 * @module notification-service/infrastructure/external/email/templates
 */
import { BanglaEmailTemplate } from './bangla-base.template.js';

// ═══════════════════════════════════════════════════════════
// WELCOME EMAIL
// ═══════════════════════════════════════════════════════════
export interface WelcomeEmailInput {
  readonly name: string;
  readonly email: string;
  readonly locale?: 'en' | 'bn';
  readonly dashboardUrl?: string;
}

export function renderWelcomeEmail(input: WelcomeEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'ভুবনে স্বাগতম',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>ভুবন.কম.বিডি-তে আপনাকে আন্তরিক স্বাগতম! 🎉</p>
        <p>আপনার অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে। এখনই শুরু করুন:</p>
        <ul style="padding-left:20px;">
          <li>হাজারো পণ্য ব্রাউজ করুন</li>
          <li>সহজে অর্ডার করুন</li>
          <li>bKash, Nagad, Rocket দিয়ে পেমেন্ট করুন</li>
          <li>সারাদেশে হোম ডেলিভারি</li>
        </ul>
        <p>যেকোনো প্রশ্নে যোগাযোগ করুন: <a href="mailto:support@vubon.com.bd">support@vubon.com.bd</a></p>
      `,
      ctaButton: {
        label: 'শপিং শুরু করুন',
        url: input.dashboardUrl ?? 'https://vubon.com.bd/shop',
        variant: 'primary',
      },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'Welcome to Vubon',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>Welcome to Vubon.com.bd! 🎉</p>
      <p>Your account has been created successfully. Start exploring:</p>
      <ul style="padding-left:20px;">
        <li>Browse thousands of products</li>
        <li>Easy ordering</li>
        <li>Pay with bKash, Nagad, Rocket</li>
        <li>Home delivery nationwide</li>
      </ul>
    `,
    ctaButton: {
      label: 'Start Shopping',
      url: input.dashboardUrl ?? 'https://vubon.com.bd/shop',
      variant: 'primary',
    },
  });
}

// ═══════════════════════════════════════════════════════════
// ORDER CONFIRMATION EMAIL
// ═══════════════════════════════════════════════════════════
export interface OrderConfirmationEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly total: number;
  readonly currency: string;
  readonly items?: readonly { name: string; quantity: number; price: number }[];
  readonly locale?: 'en' | 'bn';
  readonly trackUrl?: string;
}

export function renderOrderConfirmationEmail(input: OrderConfirmationEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const fmtAmount = (n: number) => {
    if (isBangla) {
      return `৳${n.toLocaleString('bn-BD')}`;
    }
    return `৳${n.toLocaleString('en-BD')}`;
  };

  const itemsHtml = (input.items ?? [])
    .map(
      (item) => `
      <tr>
        <td style="padding:8px;border-bottom:1px solid #e2e8f0;">${item.name}</td>
        <td style="padding:8px;border-bottom:1px solid #e2e8f0;text-align:center;">${item.quantity}</td>
        <td style="padding:8px;border-bottom:1px solid #e2e8f0;text-align:right;">${fmtAmount(item.price)}</td>
      </tr>
    `,
    )
    .join('');

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: `অর্ডার কনফার্ম - ${input.orderId}`,
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার অর্ডার <strong>#${input.orderId}</strong> সফলভাবে গ্রহণ করা হয়েছে। ✅</p>
        <table style="width:100%;margin:20px 0;border-collapse:collapse;">
          ${itemsHtml}
          <tr>
            <td colspan="2" style="padding:12px 8px;text-align:right;font-weight:600;">মোট:</td>
            <td style="padding:12px 8px;text-align:right;font-weight:600;color:#10b981;">${fmtAmount(input.total)}</td>
          </tr>
        </table>
        <p>আমরা শীঘ্রই আপনার অর্ডার প্রসেস করা শুরু করব। ট্র্যাকিং আপডেট SMS-এ পাবেন।</p>
      `,
      ctaButton: {
        label: 'অর্ডার ট্র্যাক করুন',
        url: input.trackUrl ?? `https://vubon.com.bd/orders/${input.orderId}`,
        variant: 'primary',
      },
    });
  }

  return BanglaEmailTemplate.render({
    title: `Order Confirmed - ${input.orderId}`,
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>Your order <strong>#${input.orderId}</strong> has been confirmed. ✅</p>
      <table style="width:100%;margin:20px 0;border-collapse:collapse;">
        ${itemsHtml}
        <tr>
          <td colspan="2" style="padding:12px 8px;text-align:right;font-weight:600;">Total:</td>
          <td style="padding:12px 8px;text-align:right;font-weight:600;color:#10b981;">${fmtAmount(input.total)}</td>
        </tr>
      </table>
    `,
    ctaButton: {
      label: 'Track Order',
      url: input.trackUrl ?? `https://vubon.com.bd/orders/${input.orderId}`,
      variant: 'primary',
    },
  });
}

// ═══════════════════════════════════════════════════════════
// PAYMENT RECEIPT EMAIL
// ═══════════════════════════════════════════════════════════
export interface PaymentReceiptEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly amount: number;
  readonly currency: string;
  readonly transactionId: string;
  readonly method?: string;
  readonly locale?: 'en' | 'bn';
}

export function renderPaymentReceiptEmail(input: PaymentReceiptEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const fmtAmount = isBangla
    ? `৳${input.amount.toLocaleString('bn-BD')}`
    : `৳${input.amount.toLocaleString('en-BD')}`;

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'পেমেন্ট রিসিট',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার পেমেন্ট সফলভাবে গ্রহণ করা হয়েছে। ✅</p>
        <table style="width:100%;margin:20px 0;border-collapse:collapse;background:#f0fdf4;border-radius:8px;">
          <tr><td style="padding:12px;">অর্ডার:</td><td style="padding:12px;text-align:right;font-weight:600;">#${input.orderId}</td></tr>
          <tr><td style="padding:12px;">পরিমাণ:</td><td style="padding:12px;text-align:right;font-weight:600;color:#10b981;font-size:18px;">${fmtAmount}</td></tr>
          <tr><td style="padding:12px;">পেমেন্ট পদ্ধতি:</td><td style="padding:12px;text-align:right;">${input.method ?? 'Mobile Wallet'}</td></tr>
          <tr><td style="padding:12px;">ট্রানজেকশন:</td><td style="padding:12px;text-align:right;font-family:monospace;">${input.transactionId}</td></tr>
        </table>
        <p>এই রিসিট সংরক্ষণ করুন। আপনার অর্ডার শীঘ্রই প্রসেস হবে।</p>
      `,
      ctaButton: {
        label: 'অর্ডার দেখুন',
        url: `https://vubon.com.bd/orders/${input.orderId}`,
        variant: 'primary',
      },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'Payment Receipt',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>Your payment has been received successfully. ✅</p>
      <table style="width:100%;margin:20px 0;border-collapse:collapse;background:#f0fdf4;border-radius:8px;">
        <tr><td style="padding:12px;">Order:</td><td style="padding:12px;text-align:right;font-weight:600;">#${input.orderId}</td></tr>
        <tr><td style="padding:12px;">Amount:</td><td style="padding:12px;text-align:right;font-weight:600;color:#10b981;font-size:18px;">${fmtAmount}</td></tr>
        <tr><td style="padding:12px;">Method:</td><td style="padding:12px;text-align:right;">${input.method ?? 'Mobile Wallet'}</td></tr>
        <tr><td style="padding:12px;">Transaction:</td><td style="padding:12px;text-align:right;font-family:monospace;">${input.transactionId}</td></tr>
      </table>
    `,
  });
}

// ═══════════════════════════════════════════════════════════
// PASSWORD RESET EMAIL
// ═══════════════════════════════════════════════════════════
export interface PasswordResetEmailInput {
  readonly name?: string;
  readonly resetUrl: string;
  readonly expiresIn?: string;
  readonly locale?: 'en' | 'bn';
}

export function renderPasswordResetEmail(input: PasswordResetEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const expiry = input.expiresIn ?? (isBangla ? '৩০ মিনিট' : '30 minutes');

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'পাসওয়ার্ড রিসেট',
      locale: 'bn',
      greeting: input.name ? `প্রিয় ${input.name},` : 'প্রিয় গ্রাহক,',
      bodyHtml: `
        <p>আপনার পাসওয়ার্ড রিসেট করার জন্য অনুরোধ পেয়েছি।</p>
        <p>নিচের বাটনে ক্লিক করে নতুন পাসওয়ার্ড সেট করুন:</p>
        <p style="color:#ef4444;">⚠️ এই লিংক ${expiry}-এর জন্য বৈধ।</p>
        <p>যদি আপনি এই অনুরোধ না করে থাকেন, দয়া করে এই ইমেইল উপেক্ষা করুন। আপনার পাসওয়ার্ড পরিবর্তন হবে না।</p>
      `,
      ctaButton: {
        label: 'পাসওয়ার্ড রিসেট করুন',
        url: input.resetUrl,
        variant: 'primary',
      },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'Password Reset',
    locale: 'en',
    greeting: input.name ? `Hi ${input.name},` : 'Hello,',
    bodyHtml: `
      <p>We received a request to reset your password.</p>
      <p>Click the button below to set a new password:</p>
      <p style="color:#ef4444;">⚠️ This link is valid for ${expiry}.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `,
    ctaButton: {
      label: 'Reset Password',
      url: input.resetUrl,
      variant: 'primary',
    },
  });
}

// ═══════════════════════════════════════════════════════════
// MFA CODE EMAIL
// ═══════════════════════════════════════════════════════════
export interface MfaCodeEmailInput {
  readonly name?: string;
  readonly code: string;
  readonly expiresIn?: string;
  readonly locale?: 'en' | 'bn';
}

export function renderMfaCodeEmail(input: MfaCodeEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const expiry = input.expiresIn ?? (isBangla ? '৫ মিনিট' : '5 minutes');

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'ভেরিফিকেশন কোড',
      locale: 'bn',
      greeting: input.name ? `প্রিয় ${input.name},` : 'প্রিয় গ্রাহক,',
      bodyHtml: `
        <p>আপনার ওয়ান-টাইম ভেরিফিকেশন কোড:</p>
        <div style="text-align:center;margin:24px 0;">
          <div style="display:inline-block;background:#f1f5f9;border-radius:8px;padding:16px 32px;font-size:32px;font-weight:700;letter-spacing:8px;color:#0f172a;font-family:monospace;">
            ${input.code}
          </div>
        </div>
        <p style="color:#ef4444;text-align:center;">এই কোড ${expiry}-এর জন্য বৈধ।</p>
        <p style="font-size:13px;color:#64748b;">আপনি এই কোড কারও সাথে শেয়ার করবেন না।</p>
      `,
    });
  }

  return BanglaEmailTemplate.render({
    title: 'Verification Code',
    locale: 'en',
    greeting: input.name ? `Hi ${input.name},` : 'Hello,',
    bodyHtml: `
      <p>Your one-time verification code:</p>
      <div style="text-align:center;margin:24px 0;">
        <div style="display:inline-block;background:#f1f5f9;border-radius:8px;padding:16px 32px;font-size:32px;font-weight:700;letter-spacing:8px;color:#0f172a;font-family:monospace;">
          ${input.code}
        </div>
      </div>
      <p style="color:#ef4444;text-align:center;">This code is valid for ${expiry}.</p>
    `,
  });
}

// ═══════════════════════════════════════════════════════════
// DELIVERY NOTIFICATION EMAIL
// ═══════════════════════════════════════════════════════════
export interface DeliveryEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly status: 'shipped' | 'out_for_delivery' | 'delivered' | 'failed';
  readonly trackingNumber?: string;
  readonly estimatedAt?: string;
  readonly locale?: 'en' | 'bn';
}

export function renderDeliveryEmail(input: DeliveryEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';

  const statusBn = {
    shipped: 'পাঠানো হয়েছে',
    out_for_delivery: 'ডেলিভারির জন্য পথে',
    delivered: 'ডেলিভারি সম্পন্ন',
    failed: 'ডেলিভারি ব্যর্থ',
  };

  const statusEn = {
    shipped: 'Shipped',
    out_for_delivery: 'Out for Delivery',
    delivered: 'Delivered',
    failed: 'Delivery Failed',
  };

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: `ডেলিভারি - ${statusBn[input.status]}`,
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার অর্ডার <strong>#${input.orderId}</strong>-এর স্ট্যাটাস: <strong style="color:#3b82f6;">${statusBn[input.status]}</strong></p>
        ${input.trackingNumber ? `<p>ট্র্যাকিং নম্বর: <code style="background:#f1f5f9;padding:2px 8px;border-radius:4px;">${input.trackingNumber}</code></p>` : ''}
        ${input.estimatedAt ? `<p>সম্ভাব্য ডেলিভারি: ${input.estimatedAt}</p>` : ''}
        ${input.status === 'delivered' ? '<p>🎉 ধন্যবাদ! আপনার অর্ডার সফলভাবে ডেলিভারি হয়েছে।</p>' : ''}
      `,
      ctaButton: {
        label: 'ট্র্যাক করুন',
        url: `https://vubon.com.bd/orders/${input.orderId}/track`,
        variant: 'primary',
      },
    });
  }

  return BanglaEmailTemplate.render({
    title: `Delivery - ${statusEn[input.status]}`,
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>Your order <strong>#${input.orderId}</strong> status: <strong>${statusEn[input.status]}</strong></p>
      ${input.trackingNumber ? `<p>Tracking: <code>${input.trackingNumber}</code></p>` : ''}
    `,
  });
}

// ═══════════════════════════════════════════════════════════
// PAYMENT FAILED EMAIL
// ═══════════════════════════════════════════════════════════
export interface PaymentFailedEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly amount: number;
  readonly currency: string;
  readonly reason?: string;
  readonly locale?: 'en' | 'bn';
}

export function renderPaymentFailedEmail(input: PaymentFailedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'পেমেন্ট ব্যর্থ হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>দুঃখিত! আপনার পেমেন্ট সম্পন্ন হয়নি।</p>
        <p><strong>অর্ডার:</strong> #${input.orderId}</p>
        <p><strong>পরিমাণ:</strong> ৳${input.amount.toLocaleString('bn-BD')}</p>
        ${input.reason ? `<p><strong>কারণ:</strong> ${input.reason}</p>` : ''}
        <p>আবার চেষ্টা করুন অথবা অন্য পেমেন্ট পদ্ধতি বেছে নিন।</p>
      `,
      ctaButton: {
        label: 'আবার পেমেন্ট করুন',
        url: `https://vubon.com.bd/orders/${input.orderId}/retry`,
        variant: 'primary',
      },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Payment Failed',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>Sorry! Your payment did not complete.</p>
      <p><strong>Order:</strong> #${input.orderId}</p>
      <p><strong>Amount:</strong> ৳${input.amount.toLocaleString('en-BD')}</p>
      ${input.reason ? `<p><strong>Reason:</strong> ${input.reason}</p>` : ''}
    `,
    ctaButton: { label: 'Retry Payment', url: `https://vubon.com.bd/orders/${input.orderId}/retry`, variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// REFUND EMAIL
// ═══════════════════════════════════════════════════════════
export interface RefundEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly amount: number;
  readonly currency: string;
  readonly locale?: 'en' | 'bn';
}

export function renderRefundEmail(input: RefundEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'রিফান্ড সম্পন্ন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার রিফান্ড সফলভাবে প্রক্রিয়া করা হয়েছে। ✅</p>
        <p><strong>অর্ডার:</strong> #${input.orderId}</p>
        <p><strong>রিফান্ড পরিমাণ:</strong> ৳${input.amount.toLocaleString('bn-BD')}</p>
        <p>আপনার অ্যাকাউন্টে ৩-৭ কর্মদিবসের মধ্যে জমা হবে।</p>
      `,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Refund Processed',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>Your refund has been processed successfully. ✅</p>
      <p><strong>Order:</strong> #${input.orderId}</p>
      <p><strong>Amount:</strong> ৳${input.amount.toLocaleString('en-BD')}</p>
      <p>It will appear in your account within 3-7 business days.</p>
    `,
  });
}

// ═══════════════════════════════════════════════════════════
// USER SUSPENDED EMAIL
// ═══════════════════════════════════════════════════════════
export interface AccountSuspendedEmailInput {
  readonly name: string;
  readonly reason?: string;
  readonly locale?: 'en' | 'bn';
}

export function renderAccountSuspendedEmail(input: AccountSuspendedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'অ্যাকাউন্ট স্থগিত',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার অ্যাকাউন্ট সাময়িকভাবে স্থগিত করা হয়েছে।</p>
        ${input.reason ? `<p><strong>কারণ:</strong> ${input.reason}</p>` : ''}
        <p>বিস্তারিত জানতে বা আপিল করতে যোগাযোগ করুন: <a href="mailto:support@vubon.com.bd">support@vubon.com.bd</a></p>
      `,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Account Suspended',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>Your account has been temporarily suspended.</p>
      ${input.reason ? `<p><strong>Reason:</strong> ${input.reason}</p>` : ''}
      <p>Contact us to appeal: <a href="mailto:support@vubon.com.bd">support@vubon.com.bd</a></p>
    `,
  });
}

// ═══════════════════════════════════════════════════════════
// STATUS CHANGED EMAIL
// ═══════════════════════════════════════════════════════════
export interface StatusChangedEmailInput {
  readonly name: string;
  readonly fromStatus: string;
  readonly toStatus: string;
  readonly reason?: string;
  readonly locale?: 'en' | 'bn';
}

export function renderStatusChangedEmail(input: StatusChangedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'অ্যাকাউন্ট স্ট্যাটাস পরিবর্তন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার অ্যাকাউন্টের স্ট্যাটাস পরিবর্তন হয়েছে।</p>
        <p><strong>আগের:</strong> ${input.fromStatus}</p>
        <p><strong>নতুন:</strong> ${input.toStatus}</p>
        ${input.reason ? `<p><strong>কারণ:</strong> ${input.reason}</p>` : ''}
      `,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Account Status Changed',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>Your account status has changed.</p>
      <p><strong>From:</strong> ${input.fromStatus}</p>
      <p><strong>To:</strong> ${input.toStatus}</p>
      ${input.reason ? `<p><strong>Reason:</strong> ${input.reason}</p>` : ''}
    `,
  });
}

// ═══════════════════════════════════════════════════════════
// ROLE ASSIGNED EMAIL
// ═══════════════════════════════════════════════════════════
export interface RoleAssignedEmailInput {
  readonly name: string;
  readonly role: string;
  readonly locale?: 'en' | 'bn';
}

export function renderRoleAssignedEmail(input: RoleAssignedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নতুন রোল নির্ধারিত',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>আপনার অ্যাকাউন্টে নতুন রোল যোগ করা হয়েছে: <strong>${input.role}</strong></p>`,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'New Role Assigned',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>A new role has been assigned to your account: <strong>${input.role}</strong></p>`,
  });
}

// ═══════════════════════════════════════════════════════════
// ROLE REVOKED EMAIL
// ═══════════════════════════════════════════════════════════
export interface RoleRevokedEmailInput {
  readonly name: string;
  readonly role: string;
  readonly locale?: 'en' | 'bn';
}

export function renderRoleRevokedEmail(input: RoleRevokedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'রোল প্রত্যাহার',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>আপনার অ্যাকাউন্ট থেকে রোল প্রত্যাহার করা হয়েছে: <strong>${input.role}</strong></p>`,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Role Revoked',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>A role has been revoked from your account: <strong>${input.role}</strong></p>`,
  });
}

// ═══════════════════════════════════════════════════════════
// VENDOR WELCOME EMAIL
// ═══════════════════════════════════════════════════════════
export interface VendorWelcomeEmailInput {
  readonly name: string;
  readonly businessName: string;
  readonly locale?: 'en' | 'bn';
}

export function renderVendorWelcomeEmail(input: VendorWelcomeEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'ভেন্ডর হিসেবে স্বাগতম',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>ভুবন মার্কেটপ্লেসে ভেন্ডর হিসেবে আপনাকে স্বাগতম! 🎉</p>
        <p><strong>ব্যবসার নাম:</strong> ${input.businessName}</p>
        <p>পরবর্তী ধাপ:</p>
        <ul style="padding-left:20px;">
          <li>আপনার প্রোফাইল সম্পূর্ণ করুন</li>
          <li>ব্যবসার ডকুমেন্ট আপলোড করুন</li>
          <li>প্রথম পণ্য যোগ করুন</li>
          <li>অনুমোদনের জন্য অপেক্ষা করুন</li>
        </ul>
      `,
      ctaButton: { label: 'ভেন্ডর ড্যাশবোর্ডে যান', url: 'https://vubon.com.bd/vendor', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Welcome Vendor',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>Welcome to Vubon marketplace as a vendor! 🎉</p>
      <p><strong>Business:</strong> ${input.businessName}</p>
    `,
    ctaButton: { label: 'Go to Vendor Dashboard', url: 'https://vubon.com.bd/vendor', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// VENDOR APPROVED EMAIL
// ═══════════════════════════════════════════════════════════
export interface VendorApprovedEmailInput {
  readonly name: string;
  readonly businessName: string;
  readonly locale?: 'en' | 'bn';
}

export function renderVendorApprovedEmail(input: VendorApprovedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'ভেন্ডর অনুমোদিত',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>অভিনন্দন! 🎉 আপনার ভেন্ডর অ্যাকাউন্ট অনুমোদিত হয়েছে।</p>
        <p><strong>ব্যবসা:</strong> ${input.businessName}</p>
        <p>এখন আপনি পণ্য বিক্রি শুরু করতে পারবেন।</p>
      `,
      ctaButton: { label: 'পণ্য যোগ করুন', url: 'https://vubon.com.bd/vendor/products/new', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Vendor Approved',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Congratulations! 🎉 Your vendor account is approved.</p>`,
    ctaButton: { label: 'Add Products', url: 'https://vubon.com.bd/vendor/products/new', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// VENDOR SUSPENDED EMAIL
// ═══════════════════════════════════════════════════════════
export interface VendorSuspendedEmailInput {
  readonly name: string;
  readonly reason?: string;
  readonly locale?: 'en' | 'bn';
}

export function renderVendorSuspendedEmail(input: VendorSuspendedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'ভেন্ডর স্থগিত',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার ভেন্ডর অ্যাকাউন্ট স্থগিত করা হয়েছে।</p>
        ${input.reason ? `<p><strong>কারণ:</strong> ${input.reason}</p>` : ''}
        <p>বিস্তারিত বা আপিলের জন্য যোগাযোগ করুন: <a href="mailto:support@vubon.com.bd">support@vubon.com.bd</a></p>
      `,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Vendor Suspended',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Your vendor account has been suspended.</p>`,
  });
}

// ═══════════════════════════════════════════════════════════
// ABANDONED CART EMAIL
// ═══════════════════════════════════════════════════════════
export interface AbandonedCartEmailInput {
  readonly name: string;
  readonly cartId: string;
  readonly itemCount: number;
  readonly locale?: 'en' | 'bn';
}

export function renderAbandonedCartEmail(input: AbandonedCartEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'আপনার কার্টে পণ্য অপেক্ষা করছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার কার্টে <strong>${input.itemCount}টি পণ্য</strong> অপেক্ষা করছে! 🛒</p>
        <p>এখনই চেকআউট করুন এবং আপনার পণ্য বুঝে নিন।</p>
      `,
      ctaButton: { label: 'চেকআউট করুন', url: `https://vubon.com.bd/cart/${input.cartId}`, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Your Cart is Waiting',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>You have <strong>${input.itemCount} items</strong> in your cart! 🛒</p>`,
    ctaButton: { label: 'Checkout Now', url: `https://vubon.com.bd/cart/${input.cartId}`, variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// LOW STOCK EMAIL
// ═══════════════════════════════════════════════════════════
export interface LowStockEmailInput {
  readonly name: string;
  readonly productId: string;
  readonly available: number;
  readonly threshold: number;
  readonly locale?: 'en' | 'bn';
}

export function renderLowStockEmail(input: LowStockEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'স্টক কম',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>⚠️ আপনার একটি পণ্যের স্টক কমে গেছে।</p>
        <p><strong>পণ্য ID:</strong> ${input.productId}</p>
        <p><strong>বর্তমান স্টক:</strong> ${input.available}</p>
        <p><strong>থ্রেশহোল্ড:</strong> ${input.threshold}</p>
        <p>অনুগ্রহ করে স্টক পুনরায় পূরণ করুন।</p>
      `,
      ctaButton: { label: 'স্টক আপডেট করুন', url: `https://vubon.com.bd/vendor/products/${input.productId}`, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Low Stock Alert',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>⚠️ Low stock for one of your products.</p>
      <p><strong>Product ID:</strong> ${input.productId}</p>
      <p><strong>Available:</strong> ${input.available}</p>
      <p><strong>Threshold:</strong> ${input.threshold}</p>
    `,
  });
}

// ═══════════════════════════════════════════════════════════
// OUT OF STOCK EMAIL
// ═══════════════════════════════════════════════════════════
export interface OutOfStockEmailInput {
  readonly name: string;
  readonly productId: string;
  readonly locale?: 'en' | 'bn';
}

export function renderOutOfStockEmail(input: OutOfStockEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'স্টক শেষ',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>🚫 আপনার পণ্য স্টক শেষ হয়ে গেছে!</p>
        <p><strong>পণ্য ID:</strong> ${input.productId}</p>
        <p>অনুগ্রহ করে দ্রুত স্টক পুনরায় পূরণ করুন।</p>
      `,
      ctaButton: { label: 'স্টক আপডেট করুন', url: `https://vubon.com.bd/vendor/products/${input.productId}`, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Out of Stock',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>🚫 Your product is out of stock!</p><p><strong>Product ID:</strong> ${input.productId}</p>`,
  });
}

// ═══════════════════════════════════════════════════════════
// REVIEW POSTED EMAIL
// ═══════════════════════════════════════════════════════════
export interface ReviewPostedEmailInput {
  readonly name: string;
  readonly productId: string;
  readonly rating: number;
  readonly reviewText?: string;
  readonly locale?: 'en' | 'bn';
}

export function renderReviewPostedEmail(input: ReviewPostedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const stars = '⭐'.repeat(Math.min(input.rating, 5));
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নতুন রিভিউ',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার পণ্যে একটি নতুন রিভিউ এসেছে! 🎉</p>
        <p><strong>পণ্য ID:</strong> ${input.productId}</p>
        <p><strong>রেটিং:</strong> ${stars} (${input.rating}/5)</p>
        ${input.reviewText ? `<p><strong>রিভিউ:</strong> "${input.reviewText}"</p>` : ''}
      `,
      ctaButton: { label: 'রিভিউ দেখুন', url: `https://vubon.com.bd/vendor/reviews/${input.productId}`, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'New Review',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>A new review has been posted on your product! 🎉</p>
      <p><strong>Product:</strong> ${input.productId}</p>
      <p><strong>Rating:</strong> ${stars} (${input.rating}/5)</p>
    `,
  });
}
