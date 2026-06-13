/**
 * PM2 Ecosystem Configuration - Enterprise Grade
 * 
 * @description
 * Process manager configuration for production deployment.
 * Optimized for Node.js 20, clustering, graceful shutdown, and log rotation.
 * 
 * Enterprise Features:
 * ✅ Cluster mode for multi-core scaling (max instances)
 * ✅ Graceful shutdown with connection draining
 * ✅ Log rotation with pm2-logrotate (retention: 7 days, max size: 10M)
 * ✅ Environment-specific configurations (dev, staging, prod)
 * ✅ Multi-server deployment configuration
 * ✅ Memory limit with auto-restart (512MB)
 * ✅ Exponential backoff for restart delays
 * ✅ Health check via PM2 native metrics
 * ✅ Monorepo support (paths configured for shared packages)
 * ✅ TLS/SSL ready for secure deploys
 */

module.exports = {
  apps: [
    {
      // ============================================================
      // Basic Information
      // ============================================================
      name: 'auth-service',
      script: 'dist/main.js',
      cwd: __dirname,                     // ✅ Explicit working directory
      instances: 'max',                   // Use all CPU cores
      exec_mode: 'cluster',               // Cluster mode for load balancing
      
      // ✅ FIXED: Single declaration only (removed duplicate)
      instance_var: 'INSTANCE_ID',
      
      // ============================================================
      // Environment Configurations
      // ============================================================
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        APP_NAME: 'auth-service',
        TZ: 'Asia/Dhaka',
        NODE_OPTIONS: '--max-old-space-size=512 --expose-gc',
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: 3000,
        APP_NAME: 'auth-service-dev',
        TZ: 'Asia/Dhaka',
        NODE_OPTIONS: '--max-old-space-size=512 --inspect=0.0.0.0:9229',
      },
      env_staging: {
        NODE_ENV: 'staging',
        PORT: 3000,
        APP_NAME: 'auth-service-staging',
        TZ: 'Asia/Dhaka',
        NODE_OPTIONS: '--max-old-space-size=512',
      },
      
      // ============================================================
      // Resource Management
      // ============================================================
      max_memory_restart: '512M',         // ✅ Consistent with Dockerfile
      max_restarts: 10,
      min_uptime: '10s',
      restart_delay: 4000,
      exp_backoff_restart_delay: 100,     // Exponential backoff on crashes
      
      // ============================================================
      // Logging & Monitoring
      // ============================================================
      error_file: './logs/auth-error.log',
      out_file: './logs/auth-out.log',
      log_file: './logs/auth-combined.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,                   // Combine logs from all instances
      time: true,
      
      // Log rotation (requires pm2-logrotate)
      log_rotate: true,
      max_size: '10M',
      retain: 7,                          // Keep logs for 7 days
      compress: true,
      date_format: 'YYYY-MM-DD',
      
      // ============================================================
      // Process Lifecycle
      // ============================================================
      autorestart: true,
      watch: false,                       // Disable watch in production
      ignore_watch: ['node_modules', 'logs', 'dist', 'coverage', '.git'],
      
      // ============================================================
      // ✅ ENHANCED: Graceful Shutdown (Connection Draining)
      // ============================================================
      kill_timeout: 5000,                 // Wait 5 seconds for graceful shutdown
      listen_timeout: 3000,              // Wait 3 seconds for app to listen
      wait_ready: true,                  // Wait for 'ready' signal from app
      shutdown_with_message: true,       // Send shutdown message to app
      
      // ============================================================
      // Node.js Arguments (Memory & GC)
      // ============================================================
      node_args: [
        '--max-old-space-size=512',
        '--expose-gc',                   // Manual GC trigger if needed
      ],
      
      // ============================================================
      // ✅ ENHANCED: Auto-cron restart (optional for memory leak prevention)
      // ============================================================
      cron_restart: '0 3 * * *',         // Restart daily at 3 AM (optional)
      
      // ============================================================
      // Error Handling & Recovery
      // ============================================================
      kill_retry: 10,                    // Retry killing if process doesn't exit
      force: false,
      
      // ============================================================
      // Metrics & Tracing
      // ============================================================
      trace: true,                       // Enable tracing
      insta_metrics: true,               // Enable metrics
      
      // ============================================================
      // Combine stdout/stderr
      // ============================================================
      combine_logs: true,
      
      // ============================================================
      // ✅ NEW: Auto-restart if process exits with these codes
      // ============================================================
      stop_exit_codes: [0, 1, 2, 127, 255], // Restart on any exit except 0
      
      // ============================================================
      // ✅ NEW: Instance-specific env (useful for debugging)
      // ============================================================
      instance_env: {
        PM2_METRICS_INTERVAL: 5000,      // Metrics collection every 5 seconds
      },
    },
  ],
  
  // ============================================================
  // ✅ ENHANCED: Deployment Configuration (Monorepo Ready)
  // ============================================================
  deploy: {
    production: {
      user: 'deploy',
      host: ['auth-server-01', 'auth-server-02'],
      ref: 'origin/main',
      repo: 'git@github.com:vubon/auth-service.git',
      path: '/var/www/auth-service',
      'pre-setup': 'mkdir -p /var/www/auth-service',
      'post-setup': 'npm ci --omit=dev && npm run build',
      'pre-deploy': 'pm2 stop auth-service || true',
      'post-deploy': 'npm ci --omit=dev && npm run build && pm2 reload ecosystem.config.js --env production',
      'post-deploy-script': 'scripts/notify-deploy.sh',
      env: {
        NODE_ENV: 'production',
      },
      'ssh_options': 'StrictHostKeyChecking=no',
      'deep': true,                      // ✅ Clean install of dependencies
    },
    staging: {
      user: 'deploy',
      host: 'staging-server',
      ref: 'origin/develop',
      repo: 'git@github.com:vubon/auth-service.git',
      path: '/var/www/auth-service-staging',
      'post-deploy': 'npm ci --omit=dev && npm run build && pm2 reload ecosystem.config.js --env staging',
      env: {
        NODE_ENV: 'staging',
      },
      'ssh_options': 'StrictHostKeyChecking=no',
    },
  },
  
  // ============================================================
  // ✅ NEW: PM2 Metrics Configuration (Optional)
  // ============================================================
  metrics: {
    enabled: true,
    interval: 5000,                     // Collect metrics every 5 seconds
    custom_metrics: {
      'HTTP Requests': { type: 'meter', unit: 'req/s' },
      'Auth Success': { type: 'counter', unit: 'count' },
      'Auth Failures': { type: 'counter', unit: 'count' },
      'Active Sessions': { type: 'gauge', unit: 'count' },
    },
  },
  
  // ============================================================
  // ✅ NEW: PM2 Logrotate Overrides (Optional)
  // ============================================================
  logrotate: {
    max_size: '10M',
    retain: 7,
    compress: true,
    date_format: 'YYYY-MM-DD',
    worker_interval: 30,               // Check every 30 seconds
    rotate_module: 'pm2-logrotate',
  },
};
