# 🚢 Vubon.com.bd — Deployment Guide

Two deployment targets: **Termux** (dev/demo) and **VPS** (production).

---

## 1. Termux (Android — Development)

### Prerequisites

    pkg install nodejs-lts postgresql redis -y
    npm install -g pnpm pm2

### Setup

    # Clone
    git clone https://github.com/vubon-com-bd/vubon.com.bd.git
    cd vubon.com.bd

    # Install
    pnpm install

    # PostgreSQL
    initdb ~/.postgres-data
    pg_ctl -D ~/.postgres-data -l ~/.postgres-data/logfile start
    for db in vubon_identity vubon_product vubon_vendors vubon_cart vubon_order vubon_payment vubon_notification; do
      createdb -h localhost $db
    done

    # Redis
    redis-server --daemonize yes --ignore-warnings ARM64-COW-BUG

    # Build all services
    for svc in identity product vendor cart order payment notification; do
      (cd apps/${svc}-service && pnpm build)
    done

    # PM2 start
    pm2 start ecosystem.config.cjs
    pm2 save
    pm2 list

### Auto-start on boot

1. Install **Termux:Boot** from F-Droid
2. Boot script already at `~/.termux/boot/start-vubon.sh`
3. On reboot, PM2 will auto-resurrect

### Daily operations

    pm2 status                    # process list
    pm2 logs identity             # tail logs
    pm2 restart identity          # restart service
    pm2 monit                     # real-time monitor

    bash scripts/health-check.sh  # verify all services
    bash scripts/backup.sh        # manual backup

---

## 2. VPS (Production — Docker)

### Requirements

- Ubuntu 22.04+ / Debian 12+
- 4GB RAM minimum (8GB recommended)
- 2 vCPU
- 40GB SSD
- Docker 24+ + Docker Compose v2
- Domain DNS pointing to VPS IP

### Recommended providers

| Provider | Plan | Price | Specs |
|----------|------|------:|-------|
| Hetzner | CPX21 | €7/mo | 3GB RAM, 2 vCPU |
| Hetzner | CPX31 | €13/mo | 8GB RAM, 4 vCPU |
| DigitalOcean | Basic | $24/mo | 4GB RAM, 2 vCPU |
| Vultr | Regular | $18/mo | 4GB RAM, 2 vCPU |

### Step-by-step deploy

#### 1. Server setup

    ssh root@your-vps-ip

    # Update
    apt update && apt upgrade -y

    # Docker
    curl -fsSL https://get.docker.com | sh
    apt install docker-compose-plugin -y

    # Firewall
    ufw allow 22/tcp
    ufw allow 80/tcp
    ufw allow 443/tcp
    ufw enable

#### 2. Clone + configure

    git clone https://github.com/vubon-com-bd/vubon.com.bd.git
    cd vubon.com.bd

    cp .env.production.example .env.production
    nano .env.production
    # Fill in:
    #   POSTGRES_PASSWORD (strong random)
    #   REDIS_PASSWORD (strong random)
    #   JWT_SECRET (min 32 chars random)
    #   SENDGRID_API_KEY (or RESEND_API_KEY)
    #   Payment gateway credentials
    #   Domain-specific URLs

#### 3. SSL (Let's Encrypt)

    apt install certbot -y

    # Stop port 80 if needed
    docker compose down 2>/dev/null

    # Get cert
    certbot certonly --standalone \
      -d vubon.com.bd -d www.vubon.com.bd \
      --email admin@vubon.com.bd --agree-tos --non-interactive

    # Copy certs
    mkdir -p nginx/ssl
    cp /etc/letsencrypt/live/vubon.com.bd/fullchain.pem nginx/ssl/
    cp /etc/letsencrypt/live/vubon.com.bd/privkey.pem nginx/ssl/

#### 4. Deploy

    bash scripts/deploy.sh

#### 5. Verify

    docker compose ps
    docker compose logs -f identity
    curl https://vubon.com.bd/health

#### 6. Auto-renew SSL

    crontab -e
    # Add:
    0 3 * * * certbot renew --quiet && docker compose -f /root/vubon.com.bd/docker-compose.yml restart nginx

### Daily operations

    docker compose ps              # service list
    docker compose logs -f         # all logs
    docker compose restart identity
    docker compose down            # stop all
    docker compose up -d           # start all

    # Backup
    docker compose exec postgres pg_dump -U vubon vubon_identity > backup.sql

---

## 3. Environment Variables (critical)

| Variable | Where | Notes |
|----------|-------|-------|
| `POSTGRES_PASSWORD` | All | Strong random |
| `REDIS_PASSWORD` | All | Strong random |
| `JWT_SECRET` | All | Same across all services |
| `SENDGRID_API_KEY` | notification | Production email |
| `BKASH_APP_KEY` | payment | bKash sandbox/prod |
| `STRIPE_SECRET_KEY` | payment | Stripe key |

---

## 4. Monitoring

### Health checks

    bash scripts/health-check.sh

### PM2 (Termux)

    pm2 monit
    pm2 logs

### Docker (VPS)

    docker stats
    docker compose logs -f --tail=100

### Log aggregation (VPS)

    # All logs
    docker compose logs > all.log

    # Specific service
    docker compose logs identity > identity.log

---

## 5. Backup

### Termux

Auto: PM2 cron 3 AM daily

Manual: `bash scripts/backup.sh`

Location: `~/backups/vubon-backup-*.tar.gz`

### VPS

    crontab -e
    # Add:
    0 3 * * * cd /root/vubon.com.bd && \
      docker compose exec -T postgres pg_dumpall -U vubon | \
      gzip > /root/backups/db-$(date +\%Y\%m\%d).sql.gz

    # Keep 7 days
    0 4 * * * find /root/backups -name 'db-*.sql.gz' -mtime +7 -delete

---

## 6. Scaling

### Horizontal (multiple VPS)

- Add load balancer (Nginx, HAProxy)
- Run 2+ VPS with same services
- Shared PostgreSQL + Redis (managed service)
- Session storage in Redis

### Vertical (bigger VPS)

- Move to 16GB RAM instance
- Nginx worker_processes auto
- PostgreSQL tuning (shared_buffers, work_mem)

---

## 7. Troubleshooting

### Service won't start

    # Termux
    pm2 logs <service>
    # VPS
    docker compose logs <service>

### Database connection failed

    # Termux
    pg_isready -h localhost
    # VPS
    docker compose exec postgres pg_isready

### Redis connection failed

    # Termux
    redis-cli ping
    # VPS
    docker compose exec redis redis-cli -a $REDIS_PASSWORD ping

### Port already in use

    # Termux
    fuser -k 3001/tcp
    # VPS
    docker compose down && docker compose up -d

### Out of memory

    pm2 delete all
    free -h
    # VPS: upgrade plan
