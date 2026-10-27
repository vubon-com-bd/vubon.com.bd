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
