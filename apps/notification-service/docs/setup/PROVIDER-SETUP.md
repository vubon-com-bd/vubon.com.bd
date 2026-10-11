# Provider Setup Guide

Multi-provider notification service. Each channel has a resolver that picks
the active provider from config or per-message override.

## Overview

| Channel | Providers        | Free Tier              |
|---------|------------------|------------------------|
| Email   | Resend, SMTP     | 3000/mo, 500/day       |
| SMS     | Twilio, SSLWire  | $15 trial, paid (BD)   |
| Push    | FCM, Web Push    | Unlimited, Unlimited   |

Env vars:
- EMAIL_PROVIDER = resend | smtp
- SMS_PROVIDER   = twilio | sslwireless
- PUSH_PROVIDER  = fcm | web_push

## Prerequisites

    cd ~/vubon.com.bd/apps/notification-service
    cp .env.example .env.local

`.env.local` overrides monorepo root `.env`. Never commit it.

## Email - Resend (Recommended)

Signup: https://resend.com/signup (no credit card)

Steps:
1. Dashboard > API Keys > Create API Key
2. Copy key (starts with `re_`)
3. Configure `.env.local`:

    RESEND_ENABLED=true
    RESEND_API_KEY=re_your_key_here
    RESEND_FROM_EMAIL=onboarding@resend.dev
    RESEND_FROM_NAME=Vubon
    RESEND_TIMEOUT_MS=15000
    RESEND_MAX_RETRIES=3
    EMAIL_ENABLED=true
    EMAIL_PROVIDER=resend

Test:

    curl -X POST http://localhost:4007/api/v1/email \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer YOUR_JWT" \
      -d '{"to":"test@example.com","subject":"Test","text":"Hello"}'

Free tier: 3000 emails/month, 100/day, 10 req/sec.

## Email - SMTP (Gmail)

App Password setup:
1. Enable 2FA: https://myaccount.google.com/security
2. Create:    https://myaccount.google.com/apppasswords
3. Copy 16-char password

Config:

    SMTP_ENABLED=true
    SMTP_HOST=smtp.gmail.com
    SMTP_PORT=587
    SMTP_SECURE=false
    SMTP_USER=your@email.com
    SMTP_PASSWORD=your-16-char-app-password
    SMTP_POOL=true
    SMTP_MAX_CONNECTIONS=5
    SMTP_TLS_STRICT=true
    EMAIL_ENABLED=true
    EMAIL_PROVIDER=smtp
    EMAIL_FROM_NAME=Vubon
    EMAIL_FROM_ADDRESS=your@email.com

Other SMTP providers:

| Provider  | Host                    | Port | Free       |
|-----------|-------------------------|------|------------|
| Gmail     | smtp.gmail.com          | 587  | 500/day    |
| Outlook   | smtp.office365.com      | 587  | 300/day    |
| Mailgun   | smtp.mailgun.org        | 587  | 100/day    |
| SendGrid  | smtp.sendgrid.net       | 587  | 100/day    |
| Brevo     | smtp-relay.brevo.com    | 587  | 300/day    |

## SMS - Twilio

Signup: https://twilio.com/try-twilio ($15 credit)

Steps:
1. Get trial number: Console > Phone Numbers > Buy a number
2. Verify test phone: Console > Verified Caller IDs
3. Config:

    TWILIO_ENABLED=true
    TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    TWILIO_AUTH_TOKEN=your_auth_token
    TWILIO_FROM_NUMBER=+15551234567
    SMS_ENABLED=true
    SMS_PROVIDER=twilio

Trial limitation: only send to verified phone numbers.

## SMS - SSLWireless (Bangladesh)

Business account required. Contact https://sslwireless.com/

Config:

    SSLWIRELESS_ENABLED=true
    SSLWIRELESS_API_KEY=your_key
    SSLWIRELESS_SENDER_ID=VUBON
    SSLWIRELESS_BASE_URL=https://esms.mimsms.com
    SMS_ENABLED=true
    SMS_PROVIDER=sslwireless

## Push - FCM (Android + Web, 100% free)

Steps:
1. https://console.firebase.google.com > Create project
2. Project Settings > Service Accounts > Generate new private key
3. JSON will download. Copy entire JSON as single-line string:

    FCM_ENABLED=true
    FCM_PROJECT_ID=your-project-id
    FCM_SERVICE_ACCOUNT_JSON={"type":"service_account","project_id":"...","private_key":"...","client_email":"...","token_uri":"https://oauth2.googleapis.com/token"}
    PUSH_ENABLED=true
    PUSH_PROVIDER=fcm

## Push - Web Push (VAPID, 100% free)

Generate keys:

    npx web-push generate-vapid-keys

Output shows Public Key and Private Key. Config:

    WEB_PUSH_ENABLED=true
    WEB_PUSH_VAPID_PUBLIC=BGxxxxx...
    WEB_PUSH_VAPID_PRIVATE=yyyyy...
    WEB_PUSH_SUBJECT=mailto:admin@yourdomain.com
    PUSH_ENABLED=true
    PUSH_PROVIDER=web_push

## Multi-Provider Strategy

Resolvers support fallback and per-message override:

- SendNotificationRequestDTO.provider = "resend" > forces Resend for that message
- If preferred provider disabled > falls back to default
- If default disabled > uses first enabled
- If none enabled > returns NO_PROVIDER error

## Verification

After config, verify enabled providers:

    cd ~/vubon.com.bd/apps/notification-service
    NODE_OPTIONS=--experimental-vm-modules pnpm start:dev

Look for log lines:

    [EmailProviderResolver] ...
    [SmsProviderResolver] ...
    [PushProviderResolver] ...

Health endpoint shows provider availability:

    curl http://localhost:4007/api/v1/health

## Troubleshooting

**PROVIDER_DISABLED error**
- Check `*_ENABLED=true` in .env.local
- Restart service (env not hot-reloaded)

**NETWORK_ERROR**
- Provider API unreachable — check internet, retry
- Rate limited — wait for `retry-after` header

**HTTP_401 / HTTP_403**
- Invalid or expired API key
- Check provider dashboard

**HTTP_429**
- Rate limit exceeded
- Free tier limits: Resend 100/day, Twilio trial ~50/day

**FCM: Invalid service account**
- Paste entire JSON (single line), no line breaks
- Escape newlines in private_key as `\n`
