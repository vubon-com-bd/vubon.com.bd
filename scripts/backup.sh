#!/data/data/com.termux/files/usr/bin/bash
# ═══════════════════════════════════════════════════════════
# Vubon.com.bd — Backup Script (Termux)
# Backs up: PostgreSQL (all DBs), Redis, logs
# Usage: bash scripts/backup.sh
# ═══════════════════════════════════════════════════════════
set -e

TS=$(date +%Y%m%d-%H%M%S)
BACKUP_ROOT="$HOME/backups"
PG_DIR="$BACKUP_ROOT/postgres/$TS"
REDIS_DIR="$BACKUP_ROOT/redis/$TS"
LOG_DIR="$BACKUP_ROOT/logs/$TS"

mkdir -p "$PG_DIR" "$REDIS_DIR" "$LOG_DIR"

echo "═══════════════════════════════════════════════════════"
echo "  Vubon Backup — $TS"
echo "═══════════════════════════════════════════════════════"
echo ""

# ─── 1. PostgreSQL ───
echo "📦 PostgreSQL backup..."
DBS="vubon_identity vubon_product vubon_vendors vubon_cart vubon_order vubon_payment vubon_notification"
for db in $DBS; do
  if pg_dump -h localhost -p 5432 -U $(whoami) -Fc "$db" > "$PG_DIR/$db.dump" 2>/dev/null; then
    size=$(du -h "$PG_DIR/$db.dump" | cut -f1)
    echo "  ✅ $db ($size)"
  else
    echo "  ⚠️  $db (empty or skip)"
  fi
done

# ─── 2. Redis ───
echo ""
echo "📦 Redis backup..."
if redis-cli SAVE > /dev/null 2>&1; then
  cp ~/dump.rdb "$REDIS_DIR/dump.rdb" 2>/dev/null && echo "  ✅ dump.rdb" || echo "  ⚠️  dump.rdb not found"
  redis-cli --rdb "$REDIS_DIR/redis-dump.rdb" > /dev/null 2>&1 && echo "  ✅ redis-dump.rdb" || true
else
  echo "  ⚠️  Redis SAVE failed"
fi

# ─── 3. Logs ───
echo ""
echo "📦 Logs backup..."
for log in ~/logs/*.log ~/identity.log ~/product.log ~/vendor.log ~/cart.log ~/order.log ~/payment.log ~/notification.log; do
  [ -f "$log" ] && cp "$log" "$LOG_DIR/" 2>/dev/null || true
done
LOGS_COUNT=$(ls "$LOG_DIR" 2>/dev/null | wc -l)
echo "  ✅ $LOGS_COUNT log files"

# ─── 4. Compress ───
echo ""
echo "📦 Compressing..."
cd "$BACKUP_ROOT"
tar -czf "vubon-backup-$TS.tar.gz" "postgres/$TS" "redis/$TS" "logs/$TS" 2>/dev/null
SIZE=$(du -h "vubon-backup-$TS.tar.gz" | cut -f1)
echo "  ✅ vubon-backup-$TS.tar.gz ($SIZE)"

# ─── 5. Cleanup raw dirs ───
rm -rf "postgres/$TS" "redis/$TS" "logs/$TS"

# ─── 6. Retention: keep last 7 backups ───
BACKUP_COUNT=$(ls vubon-backup-*.tar.gz 2>/dev/null | wc -l)
if [ "$BACKUP_COUNT" -gt 7 ]; then
  ls -t vubon-backup-*.tar.gz | tail -n +8 | xargs rm -f
  echo "  🧹 Cleaned old backups (kept 7 newest)"
fi

echo ""
echo "═══════════════════════════════════════════════════════"
echo "  ✅ Backup complete: $BACKUP_ROOT/vubon-backup-$TS.tar.gz"
echo "═══════════════════════════════════════════════════════"
