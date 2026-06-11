/**
 * PM2 Ecosystem Configuration
 * 
 * @description
 * Process manager configuration for production deployment.
 * 
 * Enterprise Rules:
 * ✅ Pure process management - No business logic
 * ✅ Cluster mode for multi-core scaling
 * ✅ Proper log management
 * ✅ Graceful shutdown
 */

module.exports = {
  apps: [
    {
      // Basic information
      name: 'auth-service',
      script: 'dist/main.js',
      instances: 'max',              // Use all CPU cores
      exec_mode: 'cluster',          // Cluster mode for load balancing
      
      // Instance identification
      instance_var: 'INSTANCE_ID',
      
      // Environment variables
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        APP_NAME: 'auth-service',
        TZ: 'Asia/Dhaka',
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: 3000,
        APP_NAME: 'auth-service-dev',
      },
      env_staging: {
        NODE_ENV: 'staging',
        PORT: 3000,
        APP_NAME: 'auth-service-staging',
      },
      
      // Resource management
      max_memory_restart: '1G',
      max_restarts: 10,
      min_uptime: '10s',
      restart_delay: 4000,
      
      // Cluster management
      instance_var: 'INSTANCE_ID',
      
      // Logging
      error_file: './logs/auth-error.log',
      out_file: './logs/auth-out.log',
      log_file: './logs/auth-combined.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,              // Combine logs from all instances
      time: true,
      
      // Log rotation (requires pm2-logrotate)
      log_rotate: true,
      max_size: '10M',
      retain: 7,
      compress: true,
      date_format: 'YYYY-MM-DD',
      
      // Process lifecycle
      autorestart: true,
      watch: false,                  // Disable watch in production
      ignore_watch: ['node_modules', 'logs', 'dist', 'coverage'],
      
      // Shutdown handling
      kill_timeout: 5000,            // Graceful shutdown timeout (5 seconds)
      listen_timeout: 3000,          // Startup timeout (3 seconds)
      wait_ready: true,              // Wait for 'ready' signal
      shutdown_with_message: true,   // Send shutdown message
      
      // Event listeners
      node_args: [
        '--max-old-space-size=512',
        '--expose-gc',
      ],
      
      // Cron restart (optional - for memory leak prevention)
      // cron_restart: '0 3 * * *',   // Restart at 3 AM daily
      
      // Advanced features
      kill_retry: 10,                // Retry killing if process doesn't exit
      force: false,
      
      // Metrics
      trace: true,                   // Enable tracing
      insta_metrics: true,          // Enable metrics
      
      // Deployment specific
      combine_logs: true,
      
      // Error handling
      exp_backoff_restart_delay: 100,
    },
  ],
  
  // Deployment configuration (optional)
  deploy: {
    production: {
      user: 'deploy',
      host: ['auth-server-01', 'auth-server-02'],
      ref: 'origin/main',
      repo: 'git@github.com:vubon/auth-service.git',
      path: '/var/www/auth-service',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
    },
    staging: {
      user: 'deploy',
      host: 'staging-server',
      ref: 'origin/develop',
      repo: 'git@github.com:vubon/auth-service.git',
      path: '/var/www/auth-service-staging',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env staging',
    },
  },
};
