#!/data/data/com.termux/files/usr/bin/bash
# Analytics-service dev launcher
cd ~/vubon.com.bd/apps/analytics-service
pkill -f "nest" 2>/dev/null
sleep 2
PRISMA_SKIP_ENGINE_BOOTSTRAP=true nohup pnpm start > $HOME/analytics-boot.log 2>&1 &
echo "🚀 Analytics starting..."
echo "   Logs: tail -f $HOME/analytics-boot.log"
echo "   Docs: http://localhost:4008/api/v1/docs"
