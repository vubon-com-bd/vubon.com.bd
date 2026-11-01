#!/data/data/com.termux/files/usr/bin/bash
# Identity Service Helper Script (Termux-safe)

WORK_DIR="/data/data/com.termux/files/home/vubon.com.bd"
RUNTIME_DIR="$WORK_DIR/.runtime"
PID_FILE="$RUNTIME_DIR/identity-service.pid"
LOG_FILE="$RUNTIME_DIR/identity-service.log"

# Ensure runtime dir exists
mkdir -p "$RUNTIME_DIR"

case "$1" in
  start)
    if [ -f "$PID_FILE" ] && kill -0 "$(cat "$PID_FILE")" 2>/dev/null; then
      echo "⚠️  Identity Service already running (PID: $(cat "$PID_FILE"))"
      exit 1
    fi
    cd "$WORK_DIR" || exit 1
    nohup pnpm --filter @vubon/identity-service start:dev > "$LOG_FILE" 2>&1 &
    echo $! > "$PID_FILE"
    echo "✅ Identity Service started (PID: $(cat "$PID_FILE"))"
    echo "📋 Log: tail -f $LOG_FILE"
    ;;
  
  stop)
    if [ -f "$PID_FILE" ]; then
      PID=$(cat "$PID_FILE")
      if kill -0 "$PID" 2>/dev/null; then
        kill "$PID"
        rm -f "$PID_FILE"
        echo "✅ Identity Service stopped (PID: $PID)"
      else
        rm -f "$PID_FILE"
        echo "⚠️  PID file stale, removed"
      fi
    else
      echo "⚠️  Not running"
    fi
    pkill -f "@vubon/identity-service" 2>/dev/null || true
    ;;
  
  restart)
    $0 stop
    sleep 2
    $0 start
    ;;
  
  status)
    if [ -f "$PID_FILE" ] && kill -0 "$(cat "$PID_FILE")" 2>/dev/null; then
      echo "✅ Running (PID: $(cat "$PID_FILE"))"
      echo "📋 Log size: $(wc -l < "$LOG_FILE" 2>/dev/null || echo 0) lines"
      echo ""
      echo "Last 5 lines:"
      tail -5 "$LOG_FILE" 2>/dev/null || echo "(no log yet)"
    else
      echo "❌ Not running"
    fi
    ;;
  
  logs)
    tail -f "$LOG_FILE"
    ;;
  
  health)
    curl -s http://localhost:3001/api/v1/health | python3 -m json.tool 2>/dev/null || \
    curl -s http://localhost:3001/api/v1/health
    ;;
  
  routes)
    grep "Mapped {" "$LOG_FILE" | wc -l
    ;;
  
  *)
    echo "Usage: $0 {start|stop|restart|status|logs|health|routes}"
    exit 1
    ;;
esac
