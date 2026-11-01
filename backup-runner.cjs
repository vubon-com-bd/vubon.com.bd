/**
 * Vubon Backup Runner — daily cron via PM2
 * Runs backup.sh at 3 AM daily
 */
const { execSync } = require('node:child_process');

console.log(`[${new Date().toISOString()}] Running backup...`);
try {
  const output = execSync('bash /data/data/com.termux/files/home/vubon.com.bd/scripts/backup.sh', {
    encoding: 'utf8',
    timeout: 300000,
  });
  console.log(output);
  console.log(`[${new Date().toISOString()}] Backup complete`);
} catch (err) {
  console.error(`[${new Date().toISOString()}] Backup failed:`, err.message);
  process.exit(1);
}

// Keep process alive (PM2 cron mode will restart next day)
setTimeout(() => {
  console.log(`[${new Date().toISOString()}] Backup runner exiting (waiting for next cron)`);
  process.exit(0);
}, 5000);
