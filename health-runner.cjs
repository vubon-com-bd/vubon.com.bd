/**
 * Health Runner — periodic health check via PM2 cron
 * Every 15 minutes
 */
const { execSync } = require('node:child_process');

const TS = new Date().toISOString();
try {
  execSync('bash /data/data/com.termux/files/home/vubon.com.bd/scripts/health-check.sh', {
    encoding: 'utf8',
    timeout: 30000,
    stdio: 'inherit',
  });
  console.log(`[${TS}] ✅ Health OK`);
} catch (err) {
  console.error(`[${TS}] 🔴 Health FAIL:`, err.message);
  // PM2 will log to out_file
}
process.exit(0);
